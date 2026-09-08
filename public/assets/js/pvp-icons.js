(function () {
  const renderBase = 'https://render.albiononline.com/v1/item/';
  const itemIds = {
    'Claymore': 'T5_2H_CLAYMORE',
    'Warbow': 'T5_2H_BOW',
    'Great Nature Staff': 'T5_2H_NATURESTAFF',
    'Dual Swords': 'T5_2H_DUALSWORD',
    'Black Monk Stave': 'T5_2H_COMBATSTAFF_MORGANA',
    'Fire Staff': 'T5_MAIN_FIRESTAFF',
    'Great Fire Staff': 'T5_2H_FIRESTAFF',
    'Crossbow': 'T5_MAIN_CROSSBOW',
    'Halberd': 'T5_2H_HALBERD',
    'Daggers': 'T5_MAIN_DAGGER',
    'Mace': 'T5_MAIN_MACE',
    'Sword & Shield': 'T5_MAIN_SWORD',
    'Mercenary Jacket': 'T5_ARMOR_LEATHER_SET1',
    'Cleric Robe': 'T5_ARMOR_CLOTH_SET2',
    'Knight Armor': 'T5_ARMOR_PLATE_SET2',
    'Stalker Jacket': 'T5_ARMOR_LEATHER_SET3',
    'Mage Robe': 'T5_ARMOR_CLOTH_SET3',
    'Graveguard Armor': 'T5_ARMOR_LEATHER_UNDEAD',
    'Soldier Armor': 'T5_ARMOR_PLATE_SET1',
    'Hellion Jacket': 'T5_ARMOR_LEATHER_HELL',
    'Soldier Boots': 'T5_SHOES_PLATE_SET1',
    'Guardian Boots': 'T5_SHOES_PLATE_SET3',
    'Stalker Shoes': 'T5_SHOES_LEATHER_SET3',
    'Plate Boots': 'T5_SHOES_PLATE_SET1',
    'Scholar Sandals': 'T5_SHOES_CLOTH_SET1',
    'Guardian Helmet': 'T5_HEAD_PLATE_SET3',
    'Scholar Cowl': 'T5_HEAD_CLOTH_SET1',
    'Hunter Hood': 'T5_HEAD_LEATHER_SET2',
    'Mercenary Hood': 'T5_HEAD_LEATHER_SET1',
    'Stalker Cap': 'T5_HEAD_LEATHER_SET3'
  };

  function iconUrl(name) {
    const itemId = itemIds[name];
    return itemId ? `${renderBase}${encodeURIComponent(itemId)}.png?size=64` : '';
  }

  function createIcon(name, className) {
    const url = iconUrl(name);
    if (!url) return null;
    const image = document.createElement('img');
    image.className = className;
    image.alt = `${name} icon`;
    image.title = name;
    image.src = url;
    image.loading = 'lazy';
    image.addEventListener('error', () => image.remove(), { once: true });
    return image;
  }

  function replaceWeaponChips() {
    document.querySelectorAll('.weapon-chip').forEach((chip) => {
      const name = chip.textContent.trim();
      if (chip.querySelector('img')) return;
      const image = createIcon(name, 'pvp-item-icon');
      if (!image) return;
      chip.textContent = '';
      chip.appendChild(image);
      chip.appendChild(document.createTextNode(name));
    });
  }

  function replaceBuildSlots() {
    document.querySelectorAll('.bc-slot').forEach((slot) => {
      const name = slot.textContent.trim();
      if (slot.querySelector('img')) return;
      const image = createIcon(name, 'pvp-build-icon');
      if (!image) return;
      slot.textContent = '';
      slot.appendChild(image);
      slot.appendChild(document.createTextNode(name));
    });
  }

  function replaceArmorIcons() {
    document.querySelectorAll('.armor-row').forEach((row) => {
      const name = row.querySelector('.ar-name')?.textContent.trim();
      const icon = row.querySelector('.ar-icon');
      if (!name || !icon || icon.querySelector('img')) return;
      const image = createIcon(name, 'pvp-armor-icon');
      if (!image) return;
      icon.textContent = '';
      icon.appendChild(image);
    });
  }

  function renderIcons() {
    replaceWeaponChips();
    replaceBuildSlots();
    replaceArmorIcons();
  }

  window.addEventListener('load', renderIcons);
  window.renderPvpIcons = renderIcons;
})();
