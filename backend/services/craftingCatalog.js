const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '../..');
const craftingScriptPath = path.join(projectRoot, 'public/assets/js/crafting-page.js');
const recipesPath = path.join(projectRoot, 'public/assets/js/craftingRecipes.js');
const mappingsPath = path.join(projectRoot, 'public/assets/js/itemMappings.js');

function extractObjectLiteral(source, declaration) {
  const declarationIndex = source.indexOf(`const ${declaration} =`);
  if (declarationIndex < 0) throw new Error(`Missing ${declaration} in crafting catalog`);
  const start = source.indexOf('=', declarationIndex) + 1;
  let objectStart = start;
  while (/\s/.test(source[objectStart])) objectStart += 1;

  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = objectStart; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (depth === 0) return source.slice(objectStart, index + 1);
  }
  throw new Error(`Could not read ${declaration} from crafting catalog`);
}

function normalizeName(value) {
  return String(value).normalize('NFKD').replace(/[^a-z0-9]/gi, '').toUpperCase();
}

function findMapping(name, mappings) {
  const normalized = normalizeName(name);
  for (const [key, value] of Object.entries(mappings)) {
    const candidate = normalizeName(key);
    if (normalized === candidate || normalized === `${candidate}S` || `${normalized}S` === candidate) {
      return value;
    }
  }
  return null;
}

const GEAR_COMPONENT_ALTERNATIVES = {
  CLOTHROBE: ['SCHOLAR_ROBE', 'CLERIC_ROBE', 'MAGE_ROBE'],
  CLOTHCOWL: ['SCHOLAR_COWL', 'CLERIC_COWL', 'MAGE_COWL'],
  CLOTHSHOES: ['SCHOLAR_SANDALS', 'CLERIC_SANDALS', 'MAGE_SANDALS'],
  LEATHERJACKET: ['MERCENARY_JACKET', 'HUNTER_JACKET', 'ASSASSIN_JACKET'],
  LEATHERHOOD: ['MERCENARY_HOOD', 'HUNTER_HOOD', 'ASSASSIN_HOOD'],
  LEATHERSHOES: ['MERCENARY_BOOTS', 'HUNTER_BOOTS', 'ASSASSIN_BOOTS'],
  PLATEARMOR: ['SOLDIER_ARMOR', 'KNIGHT_ARMOR', 'GUARDIAN_ARMOR'],
  PLATEHELMET: ['SOLDIER_HELMET', 'KNIGHT_HELMET', 'GUARDIAN_HELMET'],
  PLATEBOOT: ['SOLDIER_BOOTS', 'KNIGHT_BOOTS', 'GUARDIAN_BOOTS']
};

// Recipe ingredient names sometimes differ from the labels used in the item
// map. These aliases point to existing map entries for the same artifact or
// resource; they do not add new Albion item IDs.
const INGREDIENT_MAPPING_ALIASES = {
  BROKENOATHS: 'OATHKEEPER_HAMMER',
  DAWNFEATHER: 'RUGGED_DAWNFEATHER',
  FLAWLESSGRIFFINBEAK: 'FLAWLESS_GRYPHON_BEAK',
  IMBUEDMACEHEAD: 'CAMLANN_MACE_BLADE',
  IMPSHORN: 'RUGGED_IMPS_HORN',
  INFERNALMACEHEAD: 'INCUBUS_MACE_RELIC',
  RUNESTONETOOTH: 'RUGGED_RUNESTONE_TOOTH',
  SEVEREDDEMONICHORNS: 'HELLFIRE_HAND',
  TIMEWORNWALKINGSTAFF: 'TIMED_WALKING_STAFF',
  URSINEGUARDIANREMAINS: 'URSINE_MAULER',
  WARPEDRAVENPLATE: 'RAVENSTRIKE_CESTUS',
  WEREWOLFFANGS: 'RUGGED_WEREWOLF_FANGS'
};

const INGREDIENT_ITEM_ID_OVERRIDES = {
  DAMAGEDAVALONIANGAUNTLET: 'ARTEFACT_2H_KNUCKLES_AVALON'
};

function loadCraftingCatalog() {
  const craftingSource = fs.readFileSync(craftingScriptPath, 'utf8');
  const recipesSource = fs.readFileSync(recipesPath, 'utf8');
  const mappingSource = fs.readFileSync(mappingsPath, 'utf8');
  const sandbox = {};
  vm.runInNewContext(
    `globalThis.GEAR = ${extractObjectLiteral(craftingSource, 'GEAR')};\n` +
    `globalThis.RECIPES = ${extractObjectLiteral(recipesSource, 'RECIPES')};`,
    sandbox,
    { timeout: 1000 }
  );
  const mappingSandbox = {};
  vm.runInNewContext(`${mappingSource}\nglobalThis.ITEM_MAPPINGS_EXPORT = ITEM_MAPPINGS;`, mappingSandbox, { timeout: 1000 });

  const gearItems = [];
  function collectItems(category, groups, pathParts = []) {
    for (const [groupName, value] of Object.entries(groups)) {
      if (Array.isArray(value)) {
        for (const item of value) gearItems.push({ ...item, category, subcategory: [...pathParts, groupName].join(' / ') });
      } else if (value && typeof value === 'object') {
        collectItems(category, value, [...pathParts, groupName]);
      }
    }
  }
  for (const [category, groups] of Object.entries(sandbox.GEAR)) collectItems(category, groups);
  return { gearItems, recipes: sandbox.RECIPES, mappings: mappingSandbox.ITEM_MAPPINGS_EXPORT };
}

function getRecipe(itemId, recipes) {
  if (recipes[itemId]) return recipes[itemId];
  // A few catalog IDs omit the underscore after the tier or include the
  // faction marker `FW_`, while the matching recipe key uses another form.
  const normalizedId = itemId.replace(/^T(\d+)(?=[A-Z])/, 'T$1_');
  const tier = (normalizedId.match(/^T\d+_/) || [''])[0];
  const base = normalizedId.replace(/^T\d+_/, '');
  const candidates = [
    normalizedId,
    base,
    `${tier}${base.replace(/^CAPEITEM_FW_/, 'CAPEITEM_')}`,
    base.replace(/^CAPEITEM_FW_/, 'CAPEITEM_')
  ];
  for (const candidate of candidates) {
    if (recipes[candidate]) return recipes[candidate];
  }
  return null;
}

function ingredientIds(ingredientName, outputTier, mappings) {
  const tierMatch = String(ingredientName).match(/^T(\d+)\s+(.+)$/i);
  const tier = tierMatch ? tierMatch[1] : outputTier;
  const name = tierMatch ? tierMatch[2] : ingredientName;
  const alternatives = GEAR_COMPONENT_ALTERNATIVES[normalizeName(name)];
  if (alternatives) {
    return [...new Set(alternatives.map((key) => mappings[key]).filter(Boolean).map((mapped) =>
      /^T\d+_/.test(mapped) || mapped.includes('@') ? mapped : `T${tier}_${mapped}`
    ))];
  }
  const mappingAlias = INGREDIENT_MAPPING_ALIASES[normalizeName(name)];
  const mapped = INGREDIENT_ITEM_ID_OVERRIDES[normalizeName(name)] ||
    (mappingAlias ? mappings[mappingAlias] : findMapping(name, mappings));
  if (!mapped) return [];
  if (/^T\d+_/.test(mapped) || mapped.includes('@')) return [mapped];
  return [`T${tier}_${mapped}`];
}

module.exports = { loadCraftingCatalog, getRecipe, ingredientIds };
