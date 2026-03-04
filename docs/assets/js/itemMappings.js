const ITEM_MAPPINGS = {

            // Bow mappings
            'BOW': '2H_BOW',
            'TWO_HANDED_BOW': '2H_BOW',
            'LONGBOW': '2H_LONGBOW',
            'LONG_BOW': '2H_LONGBOW',
            'WHISPERING_BOW': '2H_LONGBOW_UNDEAD',
            'WHISPERINGBOW': '2H_LONGBOW_UNDEAD',
            'UNDEAD_LONGBOW': '2H_LONGBOW_UNDEAD',
            'WAILING_BOW': '2H_BOW_HELL',
            'WAILINGBOW': '2H_BOW_HELL',
            'HELL_BOW': '2H_BOW_HELL',
            'BOW_OF_BADON': '2H_BOW_KEEPER',
            'BOWOFBADON': '2H_BOW_KEEPER',
            'BADON_BOW': '2H_BOW_KEEPER',
            'MISTPIERCER': '2H_BOW_AVALON',
            'MIST_PIERCER': '2H_BOW_CRYSTAL',
            'SKYSTRIDER_BOW': '2H_BOW_CRYSTAL',
            'WARBOW': '2H_WARBOW',
            'WAR_BOW': '2H_WARBOW',

            // Crossbow mappings
            'CROSSBOW': '2H_CROSSBOW',
            'HEAVY_CROSSBOW': '2H_CROSSBOW_HEAVY',
            'HEAVYCROSSBOW': '2H_CROSSBOW_HEAVY',
            'LIGHT_CROSSBOW': '2H_CROSSBOW_LIGHT',
            'LIGHTCROSSBOW': '2H_CROSSBOW_LIGHT',
            'WEEPING_REPEATER': 'RANGED_WEAPON_REPEATER',
            'WEEPINGREPEATER': 'RANGED_WEAPON_REPEATER',
            'REPEATER': 'RANGED_WEAPON_REPEATER',
            'BOLTCASTER': 'RANGED_WEAPON_BOLTCASTER',
            'BOLT_CASTER': 'RANGED_WEAPON_BOLTCASTER',
            'SIEGEBOW': 'RANGED_WEAPON_SIEGEBOW',
            'SIEGE_BOW': 'RANGED_WEAPON_SIEGEBOW',
            'ENERGY_SHAPER': 'RANGED_WEAPON_ENERGYSHAPER',
            'ENERGYSHAPER': 'RANGED_WEAPON_ENERGYSHAPER',
            'ARCLIGHT': 'RANGED_WEAPON_ARCLIGHT',
            'ARCLIGHT_BLASTER': 'RANGED_WEAPON_ARCLIGHT',
            'ARCLIGHTBLASTER': 'RANGED_WEAPON_ARCLIGHT',

            // Axe mappings
            'BATTLEAXE': 'MAIN_AXE',
            'BATTLE_AXE': 'MAIN_AXE',
            'GREATAXE': '2H_AXE',
            'GREAT_AXE': '2H_AXE',
            'HALBERD': '2H_HALBERD',
            'POLEARM': '2H_HALBERD',
            'CARRIONCALLER': '2H_HALBERD_MORGANA',
            'CARRION_CALLER': '2H_HALBERD_MORGANA',
            'INFERNAL_SCYTHE': '2H_SCYTHE_HELL',
            'INFERNALSCYTHE': '2H_SCYTHE_HELL',
            'BEAR_PAWS': '2H_FISTAXE_HELL',
            'BEARPAWS': '2H_FISTAXE_HELL',
            'REALMBREAKER': '2H_HAMMER_AVALON',
            'REALM_BREAKER': '2H_HAMMER_AVALON',
            'CRYSTAL_REAPER': '2H_SCYTHE_CRYSTAL',
            'CRYSTALREAPER': '2H_SCYTHE_CRYSTAL',

            // Dagger mappings
            'DAGGER': 'MAIN_DAGGER',
            'DAGGER_PAIR': '2H_DAGGERPAIR',
            'DAGGERPAIR': '2H_DAGGERPAIR',
            'CLAWS': '2H_CLAWPAIR',
            'BLOODLETTER': 'MAIN_RAPIER_MORGANA',
            'DEATHGIVERS': '2H_DUALSICKLE_UNDEAD',
            'DEMONFANG': 'MAIN_DAGGER_HELL',
            'HELL_DAGGER': 'MAIN_DAGGER_HELL',
            'BRIDLED_FURY': '2H_DAGGER_KATAR_AVALON',
            'BRIDLEDFURY': '2H_DAGGER_KATAR_AVALON',
            'TWIN_SLAYERS': '2H_DAGGERPAIR_CRYSTAL',

            // Hammer mappings
            'HAMMER': 'MAIN_HAMMER',
            'ONE_HANDED_HAMMER': 'MAIN_HAMMER',
            'GREAT_HAMMER': '2H_HAMMER',
            'GREATHAMMER': '2H_HAMMER',
            'POLEHAMMER': '2H_POLEHAMMER',
            'TOMBHAMMER': '2H_HAMMER_UNDEAD',
            'FORGE_HAMMERS': '2H_DUALHAMMER_HELL',
            'FORGEHAMMERS': '2H_DUALHAMMER_HELL',
            'DUAL_HAMMER': '2H_DUALHAMMER_HELL',
            'DUALHAMMER': '2H_DUALHAMMER_HELL',
            'GROVEKEEPER': '2H_RAM_KEEPER',
            'HAND_OF_JUSTICE': '2H_HAMMER_AVALON',
            'HANDOFJUSTICE': '2H_HAMMER_AVALON',
            'TRUEBOLT_HAMMER': '2H_HAMMER_CRYSTAL',
            'TRUEBOLTHAMMER': '2H_HAMMER_CRYSTAL',
            'CRYSTAL_HAMMER': '2H_HAMMER_CRYSTAL',

            // Fist weapon mappings
            'BRAWLER_GLOVES': '2H_KNUCKLES_SET1',
            'BATTLE_BRACERS': '2H_KNUCKLES_SET2',
            'SPIKED_GAUNTLETS': '2H_KNUCKLES_SET3',
            'URSINE_MAULERS': '2H_KNUCKLES_KEEPER',
            'HELLFIRE_HANDS': '2H_KNUCKLES_HELL',
            'RAVENSTRIKE_CESTUS': '2H_KNUCKLES_MORGANA',
            'FISTS_OF_AVALON': '2H_KNUCKLES_AVALON',
            'FORCEPULSE_BRACERS': '2H_KNUCKLES_CRYSTAL',

            // Mace mappings
            'MACE': 'MAIN_MACE',
            'HEAVY_MACE': '2H_MACE',
            'MORNING_STAR': '2H_FLAIL',
            'BEDROCK_MACE': 'MAIN_ROCKMACE_KEEPER',
            'INCUBUS_MACE': 'MAIN_MACE_HELL',
            'CAMLANN_MACE': '2H_MACE_MORGANA',
            'OATHKEEPERS': '2H_DUALMACE_AVALON',
            'DREADSTORM_MONARCH': 'MAIN_MACE_CRYSTAL',

            // last verified was mace

            // Quarterstaff mappings
            'QUARTERSTAFF': '2H_QUARTERSTAFF',
            'IRON_CLAD_STAFF': '2H_IRONCLADEDSTAFF',
            'DOUBLE_BLADED_STAFF': '2H_DOUBLEBLADEDSTAFF',
            'BLACK_MONK_STAVE': '2H_COMBATSTAFF_MORGANA',
            'SOULSCYTHE': '2H_TWINSCYTHE_HELL',
            'STAFF_OF_BALANCE': '2H_ROCKSTAFF_KEEPER',
            'GRAILSEEKER': '2H_QUARTERSTAFF_AVALON',
            'PHANTOM_TWINBLADE': '2H_DOUBLEBLADEDSTAFF_CRYSTAL',

            // Spear mappings
            'SPEAR': 'MAIN_SPEAR',
            'PIKE': '2H_SPEAR',
            'GLAIVE': '2H_GLAIVE',
            'HERON_SPEAR': 'MAIN_SPEAR_KEEPER',
            'SPIRITHUNTER': '2H_SPEAR_UNDEAD',
            'TRINITY_SPEAR': '2H_SPEAR_HELL',
            'DAYBREAKER': 'MAIN_SPEAR_AVALON',
            'RIFT_GLAIVE': '2H_GLAIVE_CRYSTAL',

            // Sword mappings
            'BROADSWORD': 'MAIN_SWORD',
            'CLAYMORE': '2H_CLAYMORE',
            'DUAL_SWORDS': '2H_DUALSWORD',
            'DUAL_SWORD': '2H_DUALSWORD',
            'CLARENT_BLADE': 'MAIN_SWORD_MORGANA',
            'CARVING_SWORD': '2H_CARVING_SWORD',
            'GALATINE_PAIR': '2H_DUAL_SWORD_AVALON',
            'KINGMAKER': '2H_CLEAVER_HELL',
            'VENOMSTRIKE': 'MAIN_SWORD_CRYSTAL',

            // Arcane staff mappings
            'ARCANE_STAFF': 'MAIN_ARCANESTAFF',
            'GREAT_ARCANE_STAFF': '2H_ARCANESTAFF',
            'ENIGMATIC_STAFF': '2H_ENIGMATICSTAFF',
            'WITCHWORK_STAFF': 'MAIN_ARCANESTAFF_MORGANA',
            'OCCULT_STAFF': '2H_ARCANESTAFF_HELL',
            'EVENSONG': '2H_ARCANESTAFF_UNDEAD',
            'MALEVOLENT_LOCUS': '2H_ENIGMATICSTAFF_AVALON',

            'ASTRAL_STAFF': 'MAIN_ARCANESTAFF_CRYSTAL',

            // Cursed staff mappings
            'CURSED_STAFF': 'MAIN_CURSEDSTAFF',
            'GREAT_CURSED_STAFF': '2H_CURSEDSTAFF',
            'DEMONIC_STAFF': '2H_DEMONICSTAFF',
            'LIFECURSE_STAFF': 'MAIN_CURSEDSTAFF_MORGANA',
            'CURSED_SKULL': '2H_SKULL_HELL',
            'DAMNATION_STAFF': '2H_CURSEDSTAFF_UNDEAD',
            'SHADOWCALLER': 'MAIN_CURSEDSTAFF_AVALON',
            'ROTCALLER_STAFF': '2H_CURSEDSTAFF_CRYSTAL',

            // Fire staff mappings
            'FIRE_STAFF': 'MAIN_FIRESTAFF',
            'GREAT_FIRE_STAFF': '2H_FIRESTAFF',
            'INFERNAL_STAFF': '2H_INFERNALSTAFF',
            'WILDFIRE_STAFF': 'MAIN_FIRESTAFF_KEEPER',
            'BRIMSTONE_STAFF': '2H_FIRESTAFF_HELL',
            'BLAZING_STAFF': '2H_FIRESTAFF_MORGANA',
            'DAWNSONG': '2H_FIRESTAFF_AVALON',
            'FLAMEWALKER_STAFF': '2H_FIRESTAFF_CRYSTAL',

            // Frost staff mappings
            'FROST_STAFF': 'MAIN_FROSTSTAFF',
            'GREAT_FROST_STAFF': '2H_FROSTSTAFF',
            'GLACIAL_STAFF': '2H_GLACIALSTAFF',
            'HOARFROST_STAFF': '2H_HOARFROSTSTAFF',
            'ICICLE_STAFF': '2H_ICICLESTAFF',
            'PERMAFROST_PRISM': '2H_PERMAFROST_MORGANA',
            'CHILLHOWL': 'MAIN_FROSTSTAFF_AVALON',
            'ARCTIC_STAFF': '2H_FROSTSTAFF_CRYSTAL',

            // Holy staff mappings
            'HOLY_STAFF': 'MAIN_HOLYSTAFF',
            'GREAT_HOLY_STAFF': '2H_HOLYSTAFF',
            'DIVINE_STAFF': '2H_DIVINESTAFF',
            'LIFETOUCH_STAFF': 'MAIN_HOLYSTAFF_MORGANA',
            'FALLEN_STAFF': '2H_HOLYSTAFF_HELL',
            'REDEMPTION_STAFF': '2H_HOLYSTAFF_UNDEAD',
            'HALLOWFALL': 'MAIN_HOLYSTAFF_AVALON',
            'EXALTED_STAFF': '2H_HOLYSTAFF_CRYSTAL',

            // Nature staff mappings
            'NATURE_STAFF': 'MAIN_NATURESTAFF',
            'GREAT_NATURE_STAFF': '2H_NATURESTAFF',
            'WILD_STAFF': '2H_WILDSTAFF',
            'DRUIDIC_STAFF': 'MAIN_NATURESTAFF_KEEPER',
            'BLIGHT_STAFF': '2H_NATURESTAFF_HELL',
            'RAMPANT_STAFF': '2H_NATURESTAFF_UNDEAD',
            'IRONROOT_STAFF': '2H_NATURESTAFF_AVALON',
            'FORGEBARK_STAFF': 'MAIN_NATURESTAFF_CRYSTAL',

            // Shapeshifter staff mappings
            'PROWLING_STAFF': '2H_SHAPESHIFTER_MORGANA',
            'ROOTBOUND_STAFF': '2H_SHAPESHIFTER_KEEPER',
            'PRIMAL_STAFF': '2H_SHAPESHIFTER_WILDMAN',
            'BLOODMOON_STAFF': '2H_SHAPESHIFTER_UNDEAD',
            'HELLSPAWN_STAFF': '2H_SHAPESHIFTER_HELL',
            'EARTHRUNE_STAFF': '2H_SHAPESHIFTER_GOLEM',
            'LIGHTCALLER': '2H_SHAPESHIFTER_AVALON',
            'STILLGAZE_STAFF': '2H_SHAPESHIFTER_CRYSTAL',

            //plate armor mappings
            'SOLDIER_ARMOR': 'ARMOR_PLATE_SET1',
            'SOLDIER_ARMOR': 'ARMOR_PLATE_SET1',
            'KNIGHT_ARMOR': 'ARMOR_PLATE_SET2',
            'GUARDIAN_ARMOR': 'ARMOR_PLATE_SET3',
            'GRAVEGUARD_ARMOR': 'ARMOR_PLATE_UNDEAD',
            'DEMON_ARMOR': 'ARMOR_PLATE_HELL',
            'JUDICATOR_ARMOR': 'ARMOR_PLATE_KEEPER_ARTIFACT',
            'ARMOR_OF_VALOR': 'ARMOR_PLATE_AVALON',
            'DUSKWEAVER_ARMOR': 'ARMOR_PLATE_FEY',
            'ROYAL_ARMOR': 'ARMOR_PLATE_ROYAL',

            //leather armor mappings
            'MERCENARY_JACKET': 'ARMOR_LEATHER_SET1',
            'HUNTER_JACKET': 'ARMOR_LEATHER_SET2',
            'ASSASSIN_JACKET': 'ARMOR_LEATHER_SET3',
            'STALKER_JACKET': 'ARMOR_LEATHER_MORGANA',
            'HELLION_JACKET': 'ARMOR_LEATHER_HELL',
            'SPECTER_JACKET': 'ARMOR_LEATHER_UNDEAD',
            'JACKET_OF_TENACITY': 'ARMOR_LEATHER_AVALON',
            'MISTWALKER_JACKET': 'ARMOR_LEATHER_FEY',
            'ROYAL_JACKET': 'ARMOR_LEATHER_ROYAL',

            //cloth armor mappings
            'SCHOLAR_ROBE': 'ARMOR_CLOTH_SET1',
            'CLERIC_ROBE': 'ARMOR_CLOTH_SET2',
            'MAGE_ROBE': 'ARMOR_CLOTH_SET3',
            'DRUID_ROBE': 'ARMOR_CLOTH_KEEPER',
            'FIEND_ROBE': 'ARMOR_CLOTH_HELL',
            'CULTIST_ROBE': 'ARMOR_CLOTH_MORGANA',
            'ROBE_OF_PURITY': 'ARMOR_CLOTH_AVALON',
            'FEYSCALE_ROBE': 'ARMOR_CLOTH_FEY',
            'ROYAL_ROBE': 'ARMOR_CLOTH_ROYAL',

            //leather helmet mappings
            'MERCENARY_HOOD': 'HEAD_LEATHER_SET1',
            'HUNTER_HOOD': 'HEAD_LEATHER_SET2',
            'ASSASSIN_HOOD': 'HEAD_LEATHER_SET3',
            'STALKER_HOOD': 'HEAD_LEATHER_MORGANA',
            'HELLION_HOOD': 'HEAD_LEATHER_HELL',
            'SPECTER_HOOD': 'HEAD_LEATHER_UNDEAD',
            'HOOD_OF_TENACITY': 'HEAD_LEATHER_AVALON',
            'MISTWALKER_HOOD': 'HEAD_LEATHER_FEY',
            'ROYAL_HOOD': 'HEAD_LEATHER_ROYAL',

            //cloth helmet mappings
            'SCHOLAR_COWL': 'HEAD_CLOTH_SET1',
            'CLERIC_COWL': 'HEAD_CLOTH_SET2',
            'MAGE_COWL': 'HEAD_CLOTH_SET3',
            'DRUID_COWL': 'HEAD_CLOTH_KEEPER',
            'FIEND_COWL': 'HEAD_CLOTH_HELL',
            'CULTIST_COWL': 'HEAD_CLOTH_MORGANA',
            'COWL_OF_PURITY': 'HEAD_CLOTH_AVALON',
            'FEYSCALE_COWL': 'HEAD_CLOTH_FEY',
            'ROYAL_COWL': 'HEAD_CLOTH_ROYAL',

            //plate helmet mappings
            'SOLDIER_HELMET': 'HEAD_PLATE_SET1',
            'KNIGHT_HELMET': 'HEAD_PLATE_SET2',
            'GUARDIAN_HELMET': 'HEAD_PLATE_SET3',
            'GRAVEGUARD_HELMET': 'HEAD_PLATE_UNDEAD',
            'DEMON_HELMET': 'HEAD_PLATE_HELL',
            'JUDICATOR_HELMET': 'HEAD_PLATE_KEEPER_ARTIFACT',
            'HELMET_OF_VALOR': 'HEAD_PLATE_AVALON',
            'DUSKWEAVER_HELMET': 'HEAD_PLATE_FEY',
            'ROYAL_HELMET': 'HEAD_PLATE_ROYAL',

            //cloth shoes mappings
            'SCHOLAR_SANDALS': 'SHOES_CLOTH_SET1',
            'CLERIC_SANDALS': 'SHOES_CLOTH_SET2',
            'MAGE_SANDALS': 'SHOES_CLOTH_SET3',
            'DRUID_SANDALS': 'SHOES_CLOTH_KEEPER',
            'FIEND_SANDALS': 'SHOES_CLOTH_HELL',
            'CULTIST_SANDALS': 'SHOES_CLOTH_MORGANA',
            'SANDALS_OF_PURITY': 'SHOES_CLOTH_AVALON',
            'FEYSCALE_SANDALS': 'SHOES_CLOTH_FEY',
            'ROYAL_SANDALS': 'SHOES_CLOTH_ROYAL',

            //leather shoes mappings
            'MERCENARY_BOOTS': 'SHOES_LEATHER_SET1',
            'HUNTER_BOOTS': 'SHOES_LEATHER_SET2',
            'ASSASSIN_BOOTS': 'SHOES_LEATHER_SET3',
            'STALKER_BOOTS': 'SHOES_LEATHER_MORGANA',
            'HELLION_BOOTS': 'SHOES_LEATHER_HELL',
            'SPECTER_BOOTS': 'SHOES_LEATHER_UNDEAD',
            'BOOTS_OF_TENACITY': 'SHOES_LEATHER_AVALON',
            'MISTWALKER_BOOTS': 'SHOES_LEATHER_FEY',
            'ROYAL_BOOTS': 'SHOES_LEATHER_ROYAL',

            //plate shoes mappings
            'SOLDIER_BOOTS': 'SHOES_PLATE_SET1',
            'KNIGHT_BOOTS': 'SHOES_PLATE_SET2',
            'GUARDIAN_BOOTS': 'SHOES_PLATE_SET3',
            'GRAVEGUARD_BOOTS': 'SHOES_PLATE_UNDEAD',
            'DEMON_BOOTS': 'SHOES_PLATE_HELL',
            'JUDICATOR_BOOTS': 'SHOES_PLATE_KEEPER_ARTIFACT',
            'BOOTS_OF_VALOR': 'SHOES_PLATE_AVALON',
            'DUSKWEAVER_BOOTS': 'SHOES_PLATE_FEY',
            'ROYAL_BOOTS': 'SHOES_PLATE_ROYAL',

            // off-hands 

            //mage off-hands
            'TOME_OF_SPELLS': 'OFF_BOOK',
            'EYE_OF_SECRETS': 'OFF_EYE_SECRETS_KEEPER',
            'MUISAK': 'OFF_DEMONSKULL_HELL',
            'TAPROOT': 'OFF_TOTEM_KEEPER',
            'CELESTIAL_CENSER': 'OFF_CENSER_AVALON',
            'SACRIFICIAL_LAMP': 'OFF_LAMP_UNDEAD',

            //hunter off-hands
            'TORCH': 'OFF_TORCH',
            'MISTCALLER': 'OFF_HORN_KEEPER',
            'LEERING_CANE': 'OFF_DEMONSKULL_HELL',
            'CRYPTCANDLE': 'OFF_CANDLE_MORGANA',
            'SACRED_SCEPTER': 'OFF_SCEPTER_AVALON',
            'BLUEFLAME_TORCH': 'OFF_TORCH_CRYSTAL',

            //warrior off-hands
            'SHIELD': 'OFF_SHIELD',
            'SARCOPHAGUS': 'OFF_SHIELD_KEEPER',
            'CAITIFF_SHIELD': 'OFF_SHIELD_HELL',
            'FACEBREAKER': 'OFF_SHIELD_UNDEAD',
            'ASTRAL_AEGIS': 'OFF_SHIELD_AVALON',
            'UNBREAKABLE_WARD': 'OFF_SHIELD_CRYSTAL',

            //capes

            // Mount mappings

            // Base mounts
            'MULE': 'MOUNT_MULE',
            'HORSE': 'MOUNT_HORSE',
            'ARMORED_HORSE': 'MOUNT_ARMORED_HORSE',
            'OX': 'MOUNT_OX',
            'GIANT_STAG': 'MOUNT_GIANTSTAG',
            'MOOSE': 'MOUNT_GIANTSTAG_MOOSE',
            'DIREWOLF': 'MOUNT_DIREWOLF',
            'SWIFTCLAW': 'MOUNT_COUGAR_KEEPER',
            'DIREBOAR': 'MOUNT_DIREBOAR',
            'SADDLED_DIREBOAR': 'MOUNT_DIREBOAR',//t7
            'SADDLED_DIREBEAR': 'MOUNT_DIREBEAR',
            'DIREBEAR': 'MOUNT_DIREBEAR',
            'SADDLED_SWAMP_DRAGON': 'MOUNT_SWAMPDRAGON',//t7
            'SWAMP_DRAGON': 'MOUNT_SWAMPDRAGON',//t7
            'DRAGON': 'MOUNT_SWAMPDRAGON',//t7
            'TRANSPORT_MAMMOTH': 'MOUNT_MAMMOTH_TRANSPORT',

            //Rare mounts

            'GALLANT_HORSE': 'UNIQUE_MOUNT_GIANT_HORSE_ADC',               // T7
            'SPECTRAL_BONEHORSE': 'MOUNT_HORSE_UNDEAD',                    // T8
            'BONEHORSE': 'MOUNT_HORSE_UNDEAD',
            'FROST_RAM': 'MOUNT_FROSTRAM_ADC',                             // T6
            'ELITE_BIGHORN_RAM': 'MOUNT_RAM_FW_MARTLOCK_ELITE',            // T8
            'ELITE_RAM': 'MOUNT_RAM_FW_MARTLOCK_ELITE',             // T8
            'SNOW_HUSKY': 'MOUNT_HUSKY_ADC',                               // T7
            'HUSKY': 'MOUNT_HUSKY_ADC',
            'ELITE_GREYWOLF': 'MOUNT_GREYWOLF_FW_CAERLEON_ELITE',          // T8
            'SWIFTCLAW': 'MOUNT_COUGAR_KEEPER',                            // T8
            'SPECTRAL_DIREBOAR': 'UNIQUE_MOUNT_UNDEAD_DIREBOAR_ADC',       // T7
            'ELITE_WILD_BOAR': 'MOUNT_DIREBOAR_FW_LYMHURST_ELITE',         // T8
            'GRIZZLY_BEAR': 'UNIQUE_MOUNT_BEAR_KEEPER_ADC',                // T7
            'GRIZZLY': 'UNIQUE_MOUNT_BEAR_KEEPER_ADC',
            'ELITE_WINTER_BEAR': 'MOUNT_DIREBEAR_FW_FORTSTERLING_ELITE',   // T8
            'ELITE_SWAMP_SALAMANDER': 'MOUNT_SWAMPDRAGON_FW_THETFORD_ELITE', // T8
            'ELITE_SALAMANDER': 'MOUNT_SWAMPDRAGON_FW_THETFORD_ELITE', // T8
            'PEST_LIZARD': 'MOUNT_MONITORLIZARD_ADC',                      // T7
            'HERETIC_COMBAT_MULE': 'UNIQUE_MOUNT_HERETIC_MULE_ADC',        // T6
            'COMBAT_MULE': 'UNIQUE_MOUNT_HERETIC_MULE_ADC',
            'SPECTRAL_BAT': 'UNIQUE_MOUNT_BAT_PERSONAL',                   // T7
            'TERRORBIRD': 'MOUNT_TERRORBIRD_ADC',
            'SADDLED_TERRORBIRD': 'MOUNT_TERRORBIRD_ADC',                  // T7
            'ELITE_TERRORBIRD': 'MOUNT_MOABIRD_FW_BRIDGEWATCH_ELITE',      // T8
            'ELITE_MYSTIC_OWL': 'MOUNT_OWL_FW_BRECILIEN_ELITE',            // T8
            'DIVINE_OWL': 'UNIQUE_MOUNT_DIVINE_OWL_ADC',                   // T6
            'SADDLED_MYSTIC_OWL': 'MOUNT_OWL_FW_BRECILIEN',                // T5
            'SPRING_COTTONTAIL': 'MOUNT_RABBIT_EASTER',                    // T8
            'MORGANA_RAVEN': 'UNIQUE_MOUNT_MORGANA_RAVEN_ADC',             // T6
            'HELLSPINNER': 'MOUNT_SPIDER_HELL',                            // T5
            'SOULSPINNER': 'MOUNT_SPIDER_HELL',                            // T8

            //Faction mounts
            'SADDLED_WILD_BOAR': 'MOUNT_DIREBOAR_FW_LYMHURST',
            'SADDLEDWILDBOAR': 'MOUNT_DIREBOAR_FW_LYMHURST',
            'WILD_BOAR': 'MOUNT_DIREBOAR_FW_LYMHURST',
            'SADDLED_BIGHORN_RAM': 'MOUNT_RAM_FW_MARTLOCK',
            'RAM': 'MOUNT_RAM_FW_MARTLOCK',
            'SADDLED_GREYWOLF': 'MOUNT_GREYWOLF_FW_CAERLEON',
            'GREYWOLF': 'MOUNT_GREYWOLF_FW_CAERLEON',
            'SADDLED_WINTER_BEAR': 'MOUNT_DIREBEAR_FW_FORTSTERLING',
            'WINTER_BEAR': 'MOUNT_DIREBEAR_FW_FORTSTERLING',
            'SADDLED_SWAMP_SALAMANDER': 'MOUNT_SWAMPDRAGON_FW_THETFORD',
            'SWAMP_SALAMANDER': 'MOUNT_SWAMPDRAGON_FW_THETFORD',
            'SALAMANDER': 'MOUNT_SWAMPDRAGON_FW_THETFORD',
            'SADDLED_MOABIRD': 'MOUNT_MOABIRD_FW_BRIDGEWATCH',
            'MOABIRD': 'MOUNT_MOABIRD_FW_BRIDGEWATCH',

            //Battle mounts

            'COMMAND_MAMMOTH': 'MOUNT_MAMMOTH_BATTLE',                      // T8
            'SIEGE_BALLISTA': 'MOUNT_SIEGE_BALLISTA',                       // T6
            'FLAME_BASILISK': 'MOUNT_SWAMPDRAGON_BATTLE',                   // T7
            'VENOM_BASILISK': 'MOUNT_ARMORED_SWAMPDRAGON_BATTLE',           // T7
            'AVALONIAN_BASILISK': 'MOUNT_SWAMPDRAGON_AVALON_BASILISK',      // T7

            'BRONZE_BATTLE_RHINO': 'UNIQUE_MOUNT_RHINO_SEASON_BRONZE',
            'SILVER_BATTLE_RHINO': 'UNIQUE_MOUNT_RHINO_SEASON_SILVER',
            'GOLD_BATTLE_RHINO': 'UNIQUE_MOUNT_RHINO_SEASON_GOLD',
            'CRYSTAL_BATTLE_RHINO': 'UNIQUE_MOUNT_RHINO_SEASON_CRYSTAL',

            'SILVER_TOWER_CHARIOT': 'UNIQUE_MOUNT_TOWER_CHARIOT_SILVER',
            'GOLD_TOWER_CHARIOT': 'UNIQUE_MOUNT_TOWER_CHARIOT_GOLD',
            'CRYSTAL_TOWER_CHARIOT': 'UNIQUE_MOUNT_TOWER_CHARIOT_CRYSTAL',

            'SILVER_BATTLE_EAGLE': 'UNIQUE_MOUNT_ARMORED_EAGLE_SILVER',
            'GOLD_BATTLE_EAGLE': 'UNIQUE_MOUNT_ARMORED_EAGLE_GOLD',
            'CRYSTAL_BATTLE_EAGLE': 'UNIQUE_MOUNT_ARMORED_EAGLE_CRYSTAL',

            'SILVER_COLOSSUS_BEETLE': 'UNIQUE_MOUNT_BEETLE_SILVER',
            'GOLD_COLOSSUS_BEETLE': 'UNIQUE_MOUNT_BEETLE_GOLD',
            'CRYSTAL_COLOSSUS_BEETLE': 'UNIQUE_MOUNT_BEETLE_CRYSTAL',

            'SILVER_BEHEMOTH': 'UNIQUE_MOUNT_BEHEMOTH_SILVER',
            'GOLD_BEHEMOTH': 'UNIQUE_MOUNT_BEHEMOTH_GOLD',
            'CRYSTAL_BEHEMOTH': 'UNIQUE_MOUNT_BEHEMOTH_CRYSTAL',

            'SILVER_ANCIENT_ENT': 'UNIQUE_MOUNT_ENT_SILVER',
            'GOLD_ANCIENT_ENT': 'UNIQUE_MOUNT_ENT_GOLD',
            'CRYSTAL_ANCIENT_ENT': 'UNIQUE_MOUNT_ENT_CRYSTAL',

            'SILVER_GOLIATH_HORSEEATER': 'UNIQUE_MOUNT_BATTLESPIDER_SILVER',
            'GOLD_GOLIATH_HORSEEATER': 'UNIQUE_MOUNT_BATTLESPIDER_GOLD',
            'CRYSTAL_GOLIATH_HORSEEATER': 'UNIQUE_MOUNT_BATTLESPIDER_CRYSTAL',

            'SILVER_ROVING_BASTION': 'UNIQUE_MOUNT_BASTION_SILVER',
            'GOLD_ROVING_BASTION': 'UNIQUE_MOUNT_BASTION_GOLD',
            'CRYSTAL_ROVING_BASTION': 'UNIQUE_MOUNT_BASTION_CRYSTAL',

            'SILVER_JUGGERNAUT': 'UNIQUE_MOUNT_JUGGERNAUT_SILVER',
            'GOLD_JUGGERNAUT': 'UNIQUE_MOUNT_JUGGERNAUT_GOLD',
            'CRYSTAL_JUGGERNAUT': 'UNIQUE_MOUNT_JUGGERNAUT_CRYSTAL',

            'SILVER_PHALANX_BEETLE': 'UNIQUE_MOUNT_PHALANX_BEETLE_SILVER',
            'GOLD_PHALANX_BEETLE': 'UNIQUE_MOUNT_PHALANX_BEETLE_GOLD',
            'CRYSTAL_PHALANX_BEETLE': 'UNIQUE_MOUNT_PHALANX_BEETLE_CRYSTAL',
            //issue with the battle mounts fix later


            //consumables
            //Food
            //soups
            'CARROT_SOUP': 'MEAL_SOUP',
            'WHEAT_SOUP': 'MEAL_SOUP',
            'CABBAGE_SOUP': 'MEAL_SOUP',

            //salads
            'BEAN_SALAD': 'MEAL_SALAD',
            'TURNIP_SALAD': 'MEAL_SALAD',
            'POTATO_SALAD': 'MEAL_SALAD',

            //pies
            'CHICKEN_PIE': 'MEAL_PIE', //t3
            'PORK_PIE': 'MEAL_PIE',  //t7
            'GOOSE_PIE': 'MEAL_PIE', //t5

            //roasts
            'ROAST_CHICKEN': 'MEAL_ROAST',   // T3
            'ROAST_GOOSE': 'MEAL_ROAST',   // T5
            'ROAST_PORK': 'MEAL_ROAST',   // T7

            //omelettes
            'CHICKEN_OMELETTE': 'MEAL_OMELETTE',           // T3
            'GOOSE_OMELETTE': 'MEAL_OMELETTE',             // T5
            'PORK_OMELETTE': 'MEAL_OMELETTE',              // T7

            // Omelettes - Avalonian
            'AVALONIAN_CHICKEN_OMELETTE': 'MEAL_OMELETTE_AVALON',  // T3
            'AVALONIAN_GOOSE_OMELETTE': 'MEAL_OMELETTE_AVALON',    // T5
            'AVALONIAN_PORK_OMELETTE': 'MEAL_OMELETTE_AVALON',     // T7

            //stews
            'GOAT_STEW': 'MEAL_STEW',              // T4
            'MUTTON_STEW': 'MEAL_STEW',            // T6
            'BEEF_STEW': 'MEAL_STEW',              // T8

            // Stews - Avalonian
            'AVALONIAN_GOAT_STEW': 'MEAL_STEW_AVALON',     // T4
            'AVALONIAN_MUTTON_STEW': 'MEAL_STEW_AVALON',   // T6
            'AVALONIAN_BEEF_STEW': 'MEAL_STEW_AVALON',     // T8

            // Sandwiches
            'GOAT_SANDWICH': 'MEAL_SANDWICH',                    // T4
            'MUTTON_SANDWICH': 'MEAL_SANDWICH',                  // T6
            'BEEF_SANDWICH': 'MEAL_SANDWICH',                    // T8

            // Sandwiches - Avalonian
            'AVALONIAN_GOAT_SANDWICH': 'MEAL_SANDWICH_AVALON',        // T4
            'AVALONIAN_MUTTON_SANDWICH': 'MEAL_SANDWICH_AVALON',      // T6
            'AVALONIAN_BEEF_SANDWICH': 'MEAL_SANDWICH_AVALON',        // T8

            //grilled fish
            'GRILLED_FISH': 'MEAL_GRILLEDFISH',

            //potions
            // Healing Potions
            'MINOR_HEALING_POTION': 'POTION_HEAL',     // T2
            'HEALING_POTION': 'POTION_HEAL',           // T4
            'MAJOR_HEALING_POTION': 'POTION_HEAL',     // T6

            //Ernergy Potions
            // Gigantify Potions
            'MINOR_GIGANTIFY_POTION': 'POTION_REVIVE',     // T3
            'MINOR_POTION': 'POTION_REVIVE',     // T3
            'GIGANTIFY_POTION': 'POTION_REVIVE',           // T5
            'MAJOR_GIGANTIFY_POTION': 'POTION_REVIVE',     // T7

            //resistance potions
            'MINOR_RESISTANCE_POTION': 'POTION_STONESKIN',     // T3
            'RESISTANCE_POTION': 'POTION_STONESKIN',           // T5
            'MAJOR_RESISTANCE_POTION': 'POTION_STONESKIN',     // T7

            // Sticky Potions
            'MINOR_STICKY_POTION': 'POTION_SLOWFIELD',     // T3
            'STICKY_POTION': 'POTION_SLOWFIELD',           // T5
            'MAJOR_STICKY_POTION': 'POTION_SLOWFIELD',     // T7

            // Poison Potions
            'MINOR_POISON_POTION': 'POTION_COOLDOWN',     // T4
            'POISON_POTION': 'POTION_COOLDOWN',           // T6
            'MAJOR_POISON_POTION': 'POTION_COOLDOWN',     // T8

            // Invisibility Potion
            'INVISIBILITY_POTION': 'POTION_CLEANSE',      // T8 only invisibility potion

            // Calming Potions
            'MINOR_CALMING_POTION': 'POTION_MOB_RESET',   // T3
            'CALMING_POTION': 'POTION_MOB_RESET',
            'CALMING_POTION': 'POTION_MOB_RESET',         // T5
            'MAJOR_CALMING_POTION': 'POTION_MOB_RESET',   // T7

            //cleansing potions
            'MINOR_CLEANSING_POTION': 'POTION_CLEANSE2',     // T3
            'CLEANSING_POTION': 'POTION_CLEANSE2',           // T5
            'MAJOR_CLEANSING_POTION': 'POTION_CLEANSE2',     // T7

            // Acid Potions
            'MINOR_ACID_POTION': 'POTION_ACID',     // T3
            'ACID_POTION': 'POTION_ACID',           // T5
            'MAJOR_ACID_POTION': 'POTION_ACID',     // T7

            // Berserk Potions
            'MINOR_BERSERK_POTION': 'POTION_BERSERK',     // T4
            'BERSERK_POTION': 'POTION_BERSERK',           // T6
            'MAJOR_BERSERK_POTION': 'POTION_BERSERK',     // T8

            // Hellfire Potions
            'MINOR_HELLFIRE_POTION': 'POTION_LAVA',       // T4
            'HELLFIRE_POTION': 'POTION_LAVA',             // T6
            'MAJOR_HELLFIRE_POTION': 'POTION_LAVA',       // T8

            // Gathering Potions
            'MINOR_GATHERING_POTION': 'POTION_GATHER',     // T4
            'GATHERING_POTION': 'POTION_GATHER',           // T6
            'MAJOR_GATHERING_POTION': 'POTION_GATHER',     // T8

            // Tornado Potions (Tornado in a Bottle)
            'MINOR_TORNADO_IN_A_BOTTLE': 'POTION_TORNADO',     // T4
            'TORNADO_IN_A_BOTTLE': 'POTION_TORNADO',           // T6
            'MAJOR_TORNADO_IN_A_BOTTLE': 'POTION_TORNADO',     // T8

            // Tomes of Insight
            'BEGINNERS_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',     // T1 - 1,000 Fame
            'NOVICES_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',       // T2 - 2,000 Fame
            'JOURNEYMANS_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',   // T3 - 5,000 Fame
            'ADEPTS_TOME_OF_INSIGHT_TRADABLE': 'SKILLBOOK_STANDARD',  // T4 - 10,000 Fame (tradable)
            'ADEPTS_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',        // T4 - 10,000 Fame (non-tradable)
            'EXPERTS_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',       // T5 - 20,000 Fame
            'MASTERS_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',       // T6 - 50,000 Fame
            'GRANDMASTERS_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',  // T7 - 100,000 Fame
            'ELDERS_TOME_OF_INSIGHT': 'SKILLBOOK_NONTRADABLE',        // T8 - 200,000 Fame

            // Fiber Harvester Tomes
            'ADEPT_FIBER_HARVESTER_TOME': 'SKILLBOOK_GATHER_FIBER',            // T4 - 1,000 Fame
            'EXPERT_FIBER_HARVESTER_TOME': 'SKILLBOOK_GATHER_FIBER_NONTRADABLE',     // T5 - 1,500 Fame
            'MASTER_FIBER_HARVESTER_TOME': 'SKILLBOOK_GATHER_FIBER_NONTRADABLE',     // T6 - 2,500 Fame
            'GRANDMASTER_FIBER_HARVESTER_TOME': 'SKILLBOOK_GATHER_FIBER_NONTRADABLE', // T7 - 5,000 Fame
            'ELDER_FIBER_HARVESTER_TOME': 'SKILLBOOK_GATHER_FIBER_NONTRADABLE',      // T8 - 10,000 Fame

            // Hide Harvester (Animal Skinner) Tomes
            'ADEPT_ANIMAL_SKINNER_TOME': 'SKILLBOOK_GATHER_HIDE',            // T4 - 1,000 Fame
            'EXPERT_ANIMAL_SKINNER_TOME': 'SKILLBOOK_GATHER_HIDE_NONTRADABLE',     // T5 - 1,500 Fame
            'MASTER_ANIMAL_SKINNER_TOME': 'SKILLBOOK_GATHER_HIDE_NONTRADABLE',     // T6 - 2,500 Fame
            'GRANDMASTER_ANIMAL_SKINNER_TOME': 'SKILLBOOK_GATHER_HIDE_NONTRADABLE', // T7 - 5,000 Fame
            'ELDER_ANIMAL_SKINNER_TOME': 'SKILLBOOK_GATHER_HIDE_NONTRADABLE',      // T8 - 10,000 Fame

            // Ore Miner Tomes
            'ADEPT_ORE_MINER_TOME': 'SKILLBOOK_GATHER_ORE',            // T4 - 1,000 Fame
            'EXPERT_ORE_MINER_TOME': 'SKILLBOOK_GATHER_ORE_NONTRADABLE',     // T5 - 1,500 Fame
            'MASTER_ORE_MINER_TOME': 'SKILLBOOK_GATHER_ORE_NONTRADABLE',     // T6 - 2,500 Fame
            'GRANDMASTER_ORE_MINER_TOME': 'SKILLBOOK_GATHER_ORE_NONTRADABLE', // T7 - 5,000 Fame
            'ELDER_ORE_MINER_TOME': 'SKILLBOOK_GATHER_ORE_NONTRADABLE',      // T8 - 10,000 Fame

            // Stone Quarrier Tomes
            'ADEPT_QUARRIER_TOME': 'SKILLBOOK_GATHER_ROCK',            // T4 - 1,000 Fame
            'EXPERT_QUARRIER_TOME': 'SKILLBOOK_GATHER_ROCK_NONTRADABLE',     // T5 - 1,500 Fame
            'MASTER_QUARRIER_TOME': 'SKILLBOOK_GATHER_ROCK_NONTRADABLE',     // T6 - 2,500 Fame
            'GRANDMASTER_QUARRIER_TOME': 'SKILLBOOK_GATHER_ROCK_NONTRADABLE', // T7 - 5,000 Fame
            'ELDER_QUARRIER_TOME': 'SKILLBOOK_GATHER_ROCK_NONTRADABLE',      // T8 - 10,000 Fame

            // Wood Lumberjack Tomes
            'ADEPT_LUMBERJACK_TOME': 'SKILLBOOK_GATHER_WOOD',            // T4 - 1,000 Fame
            'EXPERT_LUMBERJACK_TOME': 'SKILLBOOK_GATHER_WOOD_NONTRADABLE',     // T5 - 1,500 Fame
            'MASTER_LUMBERJACK_TOME': 'SKILLBOOK_GATHER_WOOD_NONTRADABLE',     // T6 - 2,500 Fame
            'GRANDMASTER_LUMBERJACK_TOME': 'SKILLBOOK_GATHER_WOOD_NONTRADABLE', // T7 - 5,000 Fame
            'ELDER_LUMBERJACK_TOME': 'SKILLBOOK_GATHER_WOOD_NONTRADABLE',      // T8 - 10,000 Fame

            // Scroll of Repair
            'SCROLL_OF_REPAIR': 'UNIQUE_REPAIRPOWDER_ADC_GENERAL_01',

            //gathering equipment 
            //fishing
            // Regular Fishing Rods
            'FISHING_ROD': '2H_TOOL_FISHINGROD', // aplies to all tiers
            'JOURNEYMAN_FISHING_ROD': '2H_TOOL_FISHINGROD',        // T3
            'ADEPT_FISHING_ROD': '2H_TOOL_FISHINGROD',             // T4
            'EXPERT_FISHING_ROD': '2H_TOOL_FISHINGROD',            // T5
            'MASTER_FISHING_ROD': '2H_TOOL_FISHINGROD',            // T6
            'GRANDMASTER_FISHING_ROD': '2H_TOOL_FISHINGROD',       // T7
            'ELDER_FISHING_ROD': '2H_TOOL_FISHINGROD',             // T8

            // Avalonian Fishing Rods
            'AVA_FISHING_ROD': '2H_TOOL_FISHINGROD_AVALON',
            'AVALONIAN_FISHING_ROD': '2H_TOOL_FISHINGROD_AVALON',
            'EXPERT_AVALONIAN_FISHING_ROD': '2H_TOOL_FISHINGROD_AVALON',      // T5
            'MASTER_AVALONIAN_FISHING_ROD': '2H_TOOL_FISHINGROD_AVALON',      // T6
            'GRANDMASTER_AVALONIAN_FISHING_ROD': '2H_TOOL_FISHINGROD_AVALON', // T7
            'ELDER_AVALONIAN_FISHING_ROD': '2H_TOOL_FISHINGROD_AVALON',       // T8

            // Fisherman Garbs - T4-T8
            'FISHERMAN_GARB': 'ARMOR_GATHERER_FISH', // applies to all tiers

            //Fisherman caps - T4-T8
            'FISHERMAN_CAP': 'HEAD_GATHERER_FISH',

            // Fisherman Workboots - T4-T8
            'FISHERMAN_WORKBOOTS': 'SHOES_GATHERER_FISH',

            // Fisherman Backpack (Fish) - T4-T8
            'FISHERMAN_BACKPACK': 'BACKPACK_GATHERER_FISH',

            // Fishing Bait
            'SIMPLE_FISH_BAIT': 'FISHINGBAIT',    // T1 - 50% bite speed increase (10 charges)
            'FANCY_FISH_BAIT': 'FISHINGBAIT',     // T3 - 125% bite speed increase (10 charges)
            'SPECIAL_FISH_BAIT': 'FISHINGBAIT',   // T5 - 250% bite speed increase (10 charges)

            //fiber
            // Regular Sickles - T1-T8
            'SICKLE': '2H_TOOL_SICKLE',

            // Avalonian Sickles - T4-T8
            'AVALONIAN_SICKLE': '2H_TOOL_SICKLE_AVALON',

            // Fiber Harvester Garbs - T4-T8
            'HARVESTER_GARB': 'ARMOR_GATHERER_FIBER',

            // Fiber Harvester Caps - T4-T8
            'HARVESTER_CAP': 'HEAD_GATHERER_FIBER',

            //workboots - fiber T4-T8
            'HARVESTER_WORKBOOTS': 'SHOES_GATHERER_FIBER',

            // Harvester Backpack (Fiber) - T4-T8
            'HARVESTER_BACKPACK': 'BACKPACK_GATHERER_FIBER',

            //hide
            // Regular Skinning Knives - T1-T8
            'SKINNING_KNIFE': '2H_TOOL_KNIFE',

            // Avalonian Skinning Knives - T4-T8
            'AVALONIAN_SKINNING_KNIFE': '2H_TOOL_KNIFE_AVALON',

            //skinner garbs - T4-T8
            'SKINNER_GARB': 'ARMOR_GATHERER_HIDE',

            //skinner caps - T4-T8
            'SKINNER_CAP': 'HEAD_GATHERER_HIDE',

            //skinner workboots - T4-T8
            'SKINNER_WORKBOOTS': 'SHOES_GATHERER_HIDE',

            //backpack - hide T4-T8
            'SKINNER_BACKPACK': 'BACKPACK_GATHERER_HIDE',

            //ore
            // Regular Pickaxes - T1–T8
            'PICKAXE': '2H_TOOL_PICK',

            // Avalonian Sickle - T8
            'AVALONIAN_SICKLE': '2H_TOOL_SICKLE_AVALON',
            'AVA_PICKAXE': '2H_TOOL_PICK_AVALON',

            // Ore Miner Garbs - T4-T8
            'MINER_GARB': 'ARMOR_GATHERER_ORE',

            //caps - ore T4-T8
            'MINER_CAP': 'HEAD_GATHERER_ORE',

            // Miner Workboots (Ore) - T4-T8
            'MINER_WORKBOOTS': 'SHOES_GATHERER_ORE',

            // Miner Backpack - T4-T8
            'MINER_BACKPACK': 'BACKPACK_GATHERER_ORE',

            //stone 
            // Regular Hammers - T1–T8
            'HAMMER': '2H_TOOL_HAMMER',

            // Avalonian Hammer - T8
            'AVALONIAN_HAMMER': '2H_TOOL_HAMMER_AVALON',

            // Garb and Cap - T4-T8
            'QUARRIER_CAP': 'HEAD_GATHERER_ROCK',
            'QUARRIER_GARB': 'ARMOR_GATHERER_ROCK',

            // Quarrier Workboots - T4-T8
            'QUARRIER_WORKBOOTS': 'SHOES_GATHERER_ROCK',

            // Quarrier Backpack - T4-T8
            'QUARRIER_BACKPACK': 'BACKPACK_GATHERER_ROCK',

            //wood
            'AXE': '2H_TOOL_AXE',

            // Avalonian Axe - T8
            'AVALONIAN_AXE': '2H_TOOL_AXE_AVALON',
            'AVA_AXE': '2H_TOOL_AXE_AVALON',

            // Lumberjack garp / cap  - T4-T8
            'LUMBERJACK_CAP': 'HEAD_GATHERER_WOOD',
            'LUMBERJACK_GARB': 'ARMOR_GATHERER_WOOD',

            // Lumberjack Workboots (Wood) - T4-T8
            'LUMBERJACK_WORKBOOTS': 'SHOES_GATHERER_WOOD',

            // Lumberjack Backpack (Wood) - T4-T8
            'LUMBERJACK_BACKPACK': 'BACKPACK_GATHERER_WOOD',

            //  Tracking Toolkits
            'TRACKING_TOOLKIT': '2H_TOOL_TRACKING',

            'ARENA_SIGIL': 'QUESTITEM_TOKEN_ARENA_UNRANKED',

            //ENERGY
            'AVALONIAN_ENERGY': 'QUESTITEM_TOKEN_AVALON',
            'SIPHONED_ENERGY': 'UNIQUE_GVGTOKEN_GENERIC',


            //hearts
            'TREE_HEART': 'FACTION_FOREST_TOKEN_1',
            'ROCK_HEART': 'FACTION_HIGHLAND_TOKEN_1',
            'VINE_HEART': 'FACTION_SWAMP_TOKEN_1',
            'BEAST_HEART': 'FACTION_STEPPE_TOKEN_1',
            'SHADOW_HEART': 'FACTION_CAERLEON_TOKEN_1',

            //fish
            //freshwater fish
            'COMMON_RUDD': 'FISH_FRESHWATER_ALL_COMMON',
            'STRIPED_CARP': 'FISH_FRESHWATER_ALL_COMMON',
            'ALBION_PERCH': 'FISH_FRESHWATER_ALL_COMMON',
            'BLUESCALE_PIKE': 'FISH_FRESHWATER_ALL_COMMON',
            'SPOTTED_TROUT': 'FISH_FRESHWATER_ALL_COMMON',
            'BRIGHTSCALE_ZANDER': 'FISH_FRESHWATER_ALL_COMMON',
            'DANGLEMOUTH_CATFISH': 'FISH_FRESHWATER_ALL_COMMON',
            'RIVER_STURGEON': 'FISH_FRESHWATER_ALL_COMMON',

            //saltwater fish
            'COMMON_HERRING': 'FISH_SALTWATER_ALL_COMMON',
            'STRIPED_MACKEREL': 'FISH_SALTWATER_ALL_COMMON',
            'FLATSHORE_PLAICE': 'FISH_SALTWATER_ALL_COMMON',
            'BLUESCALE_COD': 'FISH_SALTWATER_ALL_COMMON',
            'SPOTTED_WOLFFISH': 'FISH_SALTWATER_ALL_COMMON',
            'STRONGFIN_SALMON': 'FISH_SALTWATER_ALL_COMMON',
            'BLUEFIN_TUNA': 'FISH_SALTWATER_ALL_COMMON',
            'STEELSCALE_SWORDFISH': 'FISH_SALTWATER_ALL_COMMON',

            //rare fish 
            'GREENRIVER_EEL': 'FISH_FRESHWATER_FOREST_RARE',
            'REDSPRING_EEL': 'FISH_FRESHWATER_FOREST_RARE',
            'DEADWATER_EEL': 'FISH_FRESHWATER_FOREST_RARE',
            'STONESTREAM_LURCHER': 'FISH_FRESHWATER_HIGHLANDS_RARE',
            'RUSHWATER_LURCHER': 'FISH_FRESHWATER_HIGHLANDS_RARE',
            'THUNDERFALL_LURCHER': 'FISH_FRESHWATER_HIGHLANDS_RARE',
            'FROSTPEAK_DEADEYE': 'FISH_FRESHWATER_MOUNTAIN_RARE',
            'ICEGILL_DEADEYE': 'FISH_FRESHWATER_MOUNTAIN_RARE',
            'GLACIERFIN_DEADEYE': 'FISH_FRESHWATER_MOUNTAIN_RARE',
            'LOWRIVER_CRAB': 'FISH_FRESHWATER_ALL_RARE',
            'DRYBROOK_CRAB': 'FISH_FRESHWATER_ALL_RARE',
            'DUSTHOLE_CRAB': 'FISH_FRESHWATER_ALL_RARE',
            'GREENMOOR_CLAM': 'FISH_FRESHWATER_SWAMP_RARE',
            'MURKWATER_CLAM': 'FISH_FRESHWATER_SWAMP_RARE',
            'BLACKBOG_CLAM': 'FISH_FRESHWATER_SWAMP_RARE',
            'WHITEFOG_SNAPPER': 'FISH_FRESHWATER_AVALON_RARE',
            'CLEARHAZE_SNAPPER': 'FISH_FRESHWATER_AVALON_RARE',
            'PUREMIST_SNAPPER': 'FISH_FRESHWATER_AVALON_RARE',

            'SHALLOWSHORE_SQUID': 'FISH_SALTWATER_ALL_RARE',
            'MIDWATER_OCTOPUS': 'FISH_SALTWATER_ALL_RARE',
            'DEEPWATER_KRAKEN': 'FISH_SALTWATER_ALL_RARE',

            //other
            'CHOPPED_FISH': 'FISHCHOPS',

            //alchemy
            //shadow claws
            'RUGGED_SHADOW_CLAWS': 'ALCHEMY_RARE_PANTHER',
            'FINE_SHADOW_CLAWS': 'ALCHEMY_RARE_PANTHER',
            'EXCELLENT_SHADOW_CLAWS': 'ALCHEMY_RARE_PANTHER',

            //sylvian root
            'RUGGED_SYLVIAN_ROOT': 'ALCHEMY_RARE_ENT',
            'FINE_SYLVIAN_ROOT': 'ALCHEMY_RARE_ENT',
            'EXCELLENT_SYLVIAN_ROOT': 'ALCHEMY_RARE_ENT',

            // Spirit Paws 
            'RUGGED_SPIRIT_PAWS': 'ALCHEMY_RARE_DIREBEAR',
            'FINE_SPIRIT_PAWS': 'ALCHEMY_RARE_DIREBEAR',
            'EXCELLENT_SPIRIT_PAWS': 'ALCHEMY_RARE_DIREBEAR',

            // Werewolf Fangs 
            'RUGGED_WEREWOLF_FANGS': 'ALCHEMY_RARE_WEREWOLF',
            'FINE_WEREWOLF_FANGS': 'ALCHEMY_RARE_WEREWOLF',
            'EXCELLENT_WEREWOLF_FANGS': 'ALCHEMY_RARE_WEREWOLF',

            // Imp Horns
            'RUGGED_IMPS_HORN': 'ALCHEMY_RARE_IMP',
            'FINE_IMPS_HORN': 'ALCHEMY_RARE_IMP',
            'EXCELLENT_IMPS_HORN': 'ALCHEMY_RARE_IMP',

            // Runestone Teeth
            'RUGGED_RUNESTONE_TOOTH': 'ALCHEMY_RARE_ELEMENTAL',
            'FINE_RUNESTONE_TOOTH': 'ALCHEMY_RARE_ELEMENTAL',
            'EXCELLENT_RUNESTONE_TOOTH': 'ALCHEMY_RARE_ELEMENTAL',
            //dawnfeather
            'RUGGED_DAWNFEATHER': 'ALCHEMY_RARE_EAGLE',
            'FINE_DAWNFEATHER': 'ALCHEMY_RARE_EAGLE',
            'EXCELLENT_DAWNFEATHER': 'ALCHEMY_RARE_EAGLE',

            //remains
            'RARE_ANIMAL_REMAINS': 'ALCHEMY_COMMON',

            //arcane extract 
            'BASIC_ARCANE_EXTRACT': 'ALCHEMY_EXTRACT_LEVEL1',

            //artifacts
            //bows tested
            'CARVED_BONE': 'ARTEFACT_2H_BOW_KEEPER',
            'DEMONIC_ARROWHEADS': 'ARTEFACT_2H_BOW_HELL',
            'GHASTLY_ARROWS': 'ARTEFACT_2H_LONGBOW_UNDEAD',
            'IMMACULATELY_CRAFTED_RISER': 'ARTEFACT_2H_BOW_AVALON',
            'WINDBORNE_CRYSTAL': 'ARTEFACT_2H_BOW_CRYSTAL',

            // Crossbow Artifacts tested
            'ALLURING_BOLTS': 'ARTEFACT_2H_CROSSBOWLARGE_MORGANA',
            'HELLISH_BOLTS': 'ARTEFACT_2H_DUALCROSSBOW_HELL',
            'LOST_CROSSBOW_MECHANISM': 'ARTEFACT_2H_REPEATINGCROSSBOW_UNDEAD',
            'HUMMING_AVALONIAN_WHIRLIGIG': 'ARTEFACT_2H_CROSSBOW_CANNON_AVALON',
            'ARCLIGHT_CRYSTAL': 'ARTEFACT_2H_DUALCROSSBOW_CRYSTAL',

            // Axe Artifacts
            'KEEPER_AXEHEADS': 'ARTEFACT_2H_DUALAXE_KEEPER',
            'MORGANA_HALBERD_HEAD': 'ARTEFACT_2H_HALBERD_MORGANA',
            'HELLISH_SICKLEHEAD': 'ARTEFACT_2H_SCYTHE_HELL',
            'AVALONIAN_BATTLE_MEMOIR': 'ARTEFACT_2H_AXE_AVALON',
            'EDGE_CRYSTAL': 'ARTEFACT_2H_SCYTHE_CRYSTAL',


            // Dagger Artifacts tested
            'GHASTLY_BLADES': 'ARTEFACT_2H_DUALSICKLE_UNDEAD',
            'BLOODSTAINED_ANTIQUITIES': 'ARTEFACT_2H_DAGGER_KATAR_AVALON',
            'BROKEN_DEMONIC_FANG': 'ARTEFACT_MAIN_DAGGER_HELL',
            'HARDENED_DEBOLE': 'ARTEFACT_MAIN_RAPIER_MORGANA',
            'DEATH_TOUCHED_CRYSTAL': 'ARTEFACT_2H_DAGGERPAIR_CRYSTAL',

            // Hammer Artifacts
            'ANCIENT_HAMMER_HEAD': 'ARTEFACT_2H_HAMMER_UNDEAD',
            'HELLISH_HAMMER_HEADS': 'ARTEFACT_2H_DUALHAMMER_HELL',
            'ENGRAVED_LOG': 'ARTEFACT_2H_RAM_KEEPER',
            'MASSIVE_METALLIC_HAND': 'ARTEFACT_2H_HAMMER_AVALON',
            'CRACKLING_CRYSTAL': 'ARTEFACT_2H_HAMMER_CRYSTAL',

            // War Gloves Artifacts
            'URSINE_MAULER': 'ARTEFACT_2H_WARGLoves_BEAR',
            'HELLFIRE_HAND': 'ARTEFACT_2H_WARGLoves_HELLFIRE',
            'RAVENSTRIKE_CESTUS': 'ARTEFACT_2H_WARGLoves_RAVEN',
            'FISTS_OF_AVALON': 'ARTEFACT_2H_WARGLoves_AVALON',

            // Mace Artifacts
            'HEAVY_MACE_HEAD': 'ARTEFACT_1H_MACE_HEAVY',
            'MORNING_STAR_SPIKES': 'ARTEFACT_1H_MACE_MORNINGSTAR',
            'INCUBUS_MACE_RELIC': 'ARTEFACT_1H_MACE_INCUBUS',
            'CAMLANN_MACE_BLADE': 'ARTEFACT_1H_MACE_CAMLANN',
            'OATHKEEPER_HAMMER': 'ARTEFACT_1H_MACE_OATHKEEPER',


            // Quarterstaff Artifacts
            'PRESERVED_ROCKS': 'ARTEFACT_2H_ROCKSTAFF_KEEPER',
            'HELLISH_SICKLEHEAD_PAIR': 'ARTEFACT_2H_TWINSCYTHE_HELL',
            'REINFORCED_MORGANA_POLE': 'ARTEFACT_2H_COMBATSTAFF_MORGANA',
            'TIMED_WALKING_STAFF': 'ARTEFACT_2H_QUARTERSTAFF_AVALON',
            'MIRAGE_CRYSTAL': 'ARTEFACT_2H_DOUBLEBLADEDSTAFF_CRYSTAL',

            //spear staff artifacts
            'KEEPER_SPEARHEAD': 'ARTEFACT_MAIN_SPEAR_KEEPER',
            'INFERNAL_HARPOON_TIP': 'ARTEFACT_2H_HARPOON_HELL',
            'CURSED_BARBS': 'ARTEFACT_2H_TRIDENT_UNDEAD',
            'RUINED_ANCESTRAL_VAMPLATE': 'ARTEFACT_MAIN_SPEAR_LANCE_AVALON',
            'RIFT_CRYSTAL': 'ARTEFACT_2H_GLAIVE_CRYSTAL',

            // sword artifacts
            'BLOODFORGED_BLADE': 'ARTEFACT_MAIN_SCIMITAR_MORGANA',
            'DEMONIC_BLADE': 'ARTEFACT_2H_CLEAVER_HELL',
            'CURSED_BLADES': 'ARTEFACT_2H_DUALSCIMITAR_UNDEAD',
            'REMNANTS_OF_THE_OLD_KING': 'ARTEFACT_2H_CLAYMORE_AVALON',
            'INFINITE_CRYSTAL': 'ARTEFACT_MAIN_SWORD_CRYSTAL',

            // arcane staff artifacts
            'POSSESSED_CATALYST': 'ARTEFACT_2H_ENIGMATICORB_MORGANA',
            'OCCULT_ORB': 'ARTEFACT_2H_ARCANESTAFF_HELL',
            'LOST_ARCANE_CRYSTAL': 'ARTEFACT_MAIN_ARCANESTAFF_UNDEAD',
            'HYPNOTIC_HARMONIC_RING': 'ARTEFACT_2H_ARCANE_RINGPAIR_AVALON',
            'STARTOUCHED_CRYSTAL': 'ARTEFACT_2H_ARCANESTAFF_CRYSTAL',

            //cursed staff artifacts
            'BLOODFORGED_CATALYST': 'ARTEFACT_2H_CURSEDSTAFF_MORGANA',
            'CURSED_JAWBONE': 'ARTEFACT_2H_SKULLORB_HELL',
            'LOST_CURSED_CRYSTAL': 'ARTEFACT_MAIN_CURSEDSTAFF_UNDEAD',
            'FRACTURED_OPAQUE_ORB': 'ARTEFACT_MAIN_CURSEDSTAFF_AVALON',
            'ROTTEN_CRYSTAL': 'ARTEFACT_MAIN_CURSEDSTAFF_CRYSTAL',

            //FIRE STAFF ARTIFACTS
            'WILDFIRE_ORB': 'ARTEFACT_MAIN_FIRESTAFF_KEEPER',
            'BURNING_ORB': 'ARTEFACT_2H_FIRESTAFF_HELL',
            'UNHOLY_SCROLL': 'ARTEFACT_2H_INFERNOSTAFF_MORGANA',
            'GLOWING_HARMONIC_RING': 'ARTEFACT_2H_FIRE_RINGPAIR_AVALON',
            'PYREHEART_CRYSTAL': 'ARTEFACT_MAIN_FIRESTAFF_CRYSTAL',

            //FROST STAFF ARTIFACTS
            'HOARFROST_ORB': 'ARTEFACT_MAIN_FROSTSTAFF_KEEPER',
            'ICICLE_ORB': 'ARTEFACT_2H_ICEGAUNTLETS_HELL',
            'CURSED_FROZEN_CRYSTAL': 'ARTEFACT_2H_ICECRYSTAL_UNDEAD',
            'CHILLED_Crystalline Shard': 'ARTEFACT_MAIN_FROSTSTAFF_AVALON',
            'ICY_CRYSTAL': 'ARTEFACT_2H_FROSTSTAFF_CRYSTAL',

            //HOLY STAFF ARTIFACTS
            'POSSESSED_SCROLL': 'ARTEFACT_2H_ENIGMATICORB_MORGANA',
            'INFERNAL_SCROLL': 'ARTEFACT_2H_HOLYSTAFF_HELL',
            'GHASTLY_SCROLL': 'ARTEFACT_2H_HOLYSTAFF_UNDEAD',
            'MESSIANIC_CURIO': 'ARTEFACT_MAIN_HOLYSTAFF_AVALON',
            'EXALTED_CRYSTAL': 'ARTEFACT_2H_HOLYSTAFF_CRYSTAL',

            //NATURE STAFF ARTIFACTS
            'DRUIDIC_INSCRIPTIONS': 'ARTEFACT_MAIN_NATURESTAFF_KEEPER',
            'SYMBOL_OF_BLIGHT': 'ARTEFACT_2H_NATURESTAFF_HELL',
            'PRESERVED_LOG': 'ARTEFACT_2H_NATURESTAFF_KEEPER',
            'UPROOTED_PERENNIAL_SAPLING': 'ARTEFACT_MAIN_NATURESTAFF_AVALON',
            'FORGED_CRYSTAL': 'ARTEFACT_MAIN_NATURESTAFF_CRYSTAL',

            //SHAPESHIFTER STAFF ARTIFACTS
            'RUNESTONE_GOLEM_REMNANT': 'ARTEFACT_2H_SHAPESHIFTER_KEEPER',
            'HELLFIRE_IMP_REMNANT': 'ARTEFACT_2H_SHAPESHIFTER_HELL',
            'WEREWOLF_REMNANT': 'ARTEFACT_2H_SHAPESHIFTER_MORGANA',
            'DAWNBIRD_REMNANT': 'ARTEFACT_2H_SHAPESHIFTER_AVALON',
            'SERPENT_CRYSTAL': 'ARTEFACT_2H_SHAPESHIFTER_CRYSTAL',

            //chest armor artifacts
            //cloth
            'DRUIDIC_FEATHERS': 'ARTEFACT_ARMOR_CLOTH_KEEPER',
            'INFERNAL_CLOTH_FOLDS': 'ARTEFACT_ARMOR_CLOTH_HELL',
            'ALLURING_AMULET': 'ARTEFACT_ARMOR_CLOTH_MORGANA',
            'FEY_DORSAL_WINGS': 'ARTEFACT_ARMOR_CLOTH_FEY',
            'SANCTIFIED_BELT': 'ARTEFACT_ARMOR_CLOTH_AVALON',

            //leather
            'IMBUED_LEATHER_FOLDS': 'ARTEFACT_ARMOR_LEATHER_MORGANA',
            'DEMONHIDE_LEATHER': 'ARTEFACT_ARMOR_LEATHER_HELL',
            'GHASTLY_LEATHER': 'ARTEFACT_ARMOR_LEATHER_UNDEAD',
            'UNTARNISHED_GRIFFIN_FEATHERS': 'ARTEFACT_ARMOR_LEATHER_FEY',
            'AUGURED_SASH': 'ARTEFACT_ARMOR_LEATHER_AVALON',

            //plate
            'PRESERVED_ANIMAL_FUR': 'ARTEFACT_ARMOR_PLATE_KEEPER',
            'DEMONIC_PLATES': 'ARTEFACT_ARMOR_PLATE_HELL',
            'ANCIENT_CHAIN_RINGS': 'ARTEFACT_ARMOR_PLATE_UNDEAD',
            'VEILWEAVER_CARAPACE': 'ARTEFACT_ARMOR_PLATE_FEY',
            'EXALTED_PLATING': 'ARTEFACT_ARMOR_PLATE_AVALON',

            //head armor artifacts
            //cloth
            'DRUIDIC_PRESERVED_BEAK': 'ARTEFACT_HEAD_CLOTH_KEEPER',
            'INFERNAL_CLOTH_VISOR': 'ARTEFACT_HEAD_CLOTH_HELL',
            'ALLURING_PADDING': 'ARTEFACT_HEAD_CLOTH_MORGANA',
            'INTACT_FEY_FIBULA': 'ARTEFACT_HEAD_CLOTH_FEY',
            'SANCTIFIED_MASK': 'ARTEFACT_HEAD_CLOTH_AVALON',

            //leather
            'IMBUED_VISOR': 'ARTEFACT_HEAD_LEATHER_MORGANA',
            'DEMONHIDE_PADDING': 'ARTEFACT_HEAD_LEATHER_HELL',
            'GHASTLY_VISOR': 'ARTEFACT_HEAD_LEATHER_UNDEAD',
            'FLAWLESS_GRYPHON_BEAK': 'ARTEFACT_HEAD_LEATHER_FEY',
            'AUGURED_PADDING': 'ARTEFACT_HEAD_LEATHER_AVALON',

            //plate
            'CARVED_SKULL_PADDING': 'ARTEFACT_HEAD_PLATE_KEEPER',
            'DEMONIC_SCRAPS': 'ARTEFACT_HEAD_PLATE_HELL',
            'ANCIENT_PADDING': 'ARTEFACT_HEAD_PLATE_UNDEAD',
            'VEILWEAVER_MANDIBLES': 'ARTEFACT_HEAD_PLATE_FEY',
            'EXALTED_VISOR': 'ARTEFACT_HEAD_PLATE_AVALON',

            //shoes armor artifacts
            //cloth
            'DRUIDIC_BINDINGS': 'ARTEFACT_SHOES_CLOTH_KEEPER',
            'INFERNAL_CLOTH_BINDINGS': 'ARTEFACT_SHOES_CLOTH_HELL',
            'ALLURING_BINDINGS': 'ARTEFACT_SHOES_CLOTH_MORGANA',
            'FEY_DRAGONSCALES': 'ARTEFACT_SHOES_CLOTH_FEY',
            'SANCTIFIED_BINDINGS': 'ARTEFACT_SHOES_CLOTH_AVALON',

            //leather
            'IMBUED_SOLES': 'ARTEFACT_SHOES_LEATHER_MORGANA',
            'DEMONHIDE_BINDINGS': 'ARTEFACT_SHOES_LEATHER_HELL',
            'GHASTLY_BINDINGS': 'ARTEFACT_SHOES_LEATHER_UNDEAD',
            'GRIFFIN_UNDERFUR': 'ARTEFACT_SHOES_LEATHER_FEY',
            'AUGURED_FASTENERS': 'ARTEFACT_SHOES_LEATHER_AVALON',

            //plate
            'INSCRIBED_BINDINGS': 'ARTEFACT_SHOES_PLATE_KEEPER',
            'DEMONIC_FILLING': 'ARTEFACT_SHOES_PLATE_HELL',
            'ANCIENT_BINDINGS': 'ARTEFACT_SHOES_PLATE_UNDEAD',
            'VEILWEAVER_CLAWS': 'ARTEFACT_SHOES_PLATE_FEY',
            'EXALTED_GREAVE': 'ARTEFACT_SHOES_PLATE_AVALON',

            //Off-hand artifacts
            //mage
            'INSCRIBED_STONE': 'ARTEFACT_OFF_TOTEM_KEEPER',
            'DEMONIC_JAWBONE': 'ARTEFACT_OFF_DEMONSKULL_HELL',
            'ALLURING_CRYSTAL': 'ARTEFACT_OFF_ORB_MORGANA',
            'SEVERED_CELESTIAL_KEEPSAKE': 'ARTEFACT_OFF_CENSER_AVALON',
            'TIMELOCKED_CRYSTAL': 'ARTEFACT_OFF_TOME_CRYSTAL',

            //hunter
            'RUNED_HORN': 'ARTEFACT_OFF_HORN_KEEPER',
            'HELLISH_HANDLE': 'ARTEFACT_OFF_JESTERCANE_HELL',
            'GHASTLY_CANDLE': 'ARTEFACT_OFF_LAMP_UNDEAD',
            'SHATTERED_AVALONIAN_MEMENTO': 'ARTEFACT_OFF_TALISMAN_AVALON',
            'BLUEFLAME_CRYSTAL': 'ARTEFACT_OFF_TORCH_CRYSTAL',

            //warrior
            'BLOODFORGED_SPIKES': 'ARTEFACT_OFF_SPIKEDSHIELD_MORGANA',
            'INFERNAL_SHIELD_CORE': 'ARTEFACT_OFF_SHIELD_HELL',
            'ANCIENT_SHIELD_CORE': 'ARTEFACT_OFF_TOWERSHIELD_UNDEAD',
            'CRUSHED_AVALONIAN_HEIRLOOM': 'ARTEFACT_OFF_SHIELD_AVALON',
            'UNBREAKABLE_CRYSTAL': 'ARTEFACT_OFF_SHIELD_CRYSTAL',

            //artifact fragments
            //runes
             'RUNE': 'RUNE',
            //souls
              'SOUL': 'SOUL',
            //relics
              'RELIC': 'RELIC',
            //ava Shards
              'AVALONIAN_SHARD': 'SHARD_AVALONIAN',
            //CRYSTALS
              'CRYSTAL_SHARD': 'SHARD_CRYSTAL',
              //cape crests
              'BRIDGEWATCH_CREST': 'CAPEITEM_FW_BRIDGEWATCH_BP',
              'FORT_STERLING_CREST': 'CAPEITEM_FW_FORTSTERLING_BP',
              'LYMHURST_CREST': 'CAPEITEM_FW_LYMHURST_BP',
              'MARTLOCK_CREST': 'CAPEITEM_FW_MARTLOCK_BP',
              'THETFORD_CREST': 'CAPEITEM_FW_THETFORD_BP',
              'CAERLEON_CREST': 'CAPEITEM_FW_CAERLEON_BP',
              'BRECILIEN_CREST': 'CAPEITEM_BRECILIEN_BP',
              'HERETIC_CREST': 'CAPEITEM_HERETIC_BP',
              'UNDEAD_CREST': 'CAPEITEM_UNDEAD_BP',
              'KEEPER_CREST': 'CAPEITEM_KEEPER_BP',
              'MORGANA_CREST': 'CAPEITEM_MORGANA_BP',
              'DEMON_CREST': 'CAPEITEM_DEMON_BP',
              'AVALONIAN_CREST': 'CAPEITEM_AVALON_BP',
              'SMUGGLER_CREST': 'CAPEITEM_SMUGGLER_BP',
              

              //crystalized artifacts
            'CRYSTALLIZED_SPIRIT': 'CRYSTALLIZED_ARTIFACT_SPIRIT',

            //farming
            'CARROT_SEEDS': 'FARM_CARROT_SEED',
            'BEAN_SEEDS': 'FARM_BEAN_SEED',
            'WHEAT_SEEDS': 'FARM_WHEAT_SEED',
            'TURNIP_SEEDS': 'FARM_TURNIP_SEED',
            'CABBAGE_SEEDS': 'FARM_CABBAGE_SEED',
            'POTATO_SEEDS': 'FARM_POTATO_SEED',
            'CORN_SEEDS': 'FARM_CORN_SEED',
            'PUMPKIN_SEEDS': 'FARM_PUMPKIN_SEED',

            //plants
            'CARROTS': 'CARROT',
            'BEANS': 'BEAN',
            'WHEAT': 'WHEAT',
            'SHEAF_OF_WHEAT': 'WHEAT',
            'TURNIPS': 'TURNIP',
            'CABBAGE': 'CABBAGE',
            'POTATOES': 'POTATO',
            'CORN': 'CORN',
            'BUNDLE_OF_CORN': 'CORN',
            'PUMPKIN': 'PUMPKIN',

            //HERBS
            //SEEDS
            'ARCANE_AGARIC_SEEDS': 'FARM_AGARIC_SEED',
            'BRIGHTLEAF_COMFREY_SEEDS': 'FARM_COMFREY_SEED',
            'CRENELLATED_BURDOCK_SEEDS': 'FARM_BURDOCK_SEED',
            'DRAGON_TEASEL_SEEDS': 'FARM_TEASEL_SEED',
            'ELUSIVE_FOXGLOVE_SEEDS': 'FARM_FOXGLOVE_SEED',
            'FIRETOUCHED_MULLEIN_SEEDS': 'FARM_MULLEIN_SEED',
            'GHOUL_YARROW_SEEDS': 'FARM_YARROW_SEED',

            //HERB
            'ARCANE_AGARIC': 'AGARIC',
            'BRIGHTLEAF_COMFREY': 'COMFREY',
            'CRENELLATED_BURDOCK': 'BURDOCK',
            'DRAGON_TEASEL': 'TEASEL',
            'ELUSIVE_FOXGLOVE': 'FOXGLOVE',
            'FIRETOUCHED_MULLEIN': 'MULLEIN',
            'GHOUL_YARROW': 'YARROW',

            //PASTURE
            //BABY ANIMALS
            'BABY_CHICKENS': 'FARM_CHICKEN_BABY',
            'KID': 'FARM_GOAT_BABY',
            'GOSLING': 'FARM_GOOSE_BABY',
            'LAMB': 'FARM_SHEEP_BABY',
            'PIGLET': 'FARM_PIG_BABY',
            'CALF': 'FARM_COW_BABY',
            'FOAL': 'FARM_HORSE_BABY',
            'OX_CALF': 'FARM_OX_BABY',
            'MOOSE_CALF': 'FARM_GIANTSTAG_MOOSE_BABY',
            'FAWN': 'FARM_GIANTSTAG_BABY',
            //ADULT ANIMALS
            'CHICKEN': 'FARM_CHICKEN_GROWN',
            'GOAT': 'FARM_GOAT_GROWN',
            'GOOSE': 'FARM_GOOSE_GROWN',
            'SHEEP': 'FARM_SHEEP_GROWN',
            'PIG': 'FARM_PIG_GROWN',
            'COW': 'FARM_COW_GROWN',
            'HORSE': 'FARM_HORSE_GROWN',
            'OX': 'FARM_OX_GROWN',
            'TAME_MOOSE': 'FARM_GIANTSTAG_MOOSE_GROWN',
            'TAME_GIANTSTAG': 'FARM_GIANTSTAG_GROWN',
            'TAME_GIANTS_TAG': 'FARM_GIANTSTAG_GROWN',
            //EGGS
            'HEN_EGGS': 'EGG',
            'GOOSE_EGGS': 'GOOSE_EGG',
            //MILK
            'GOAT_MILK': 'GOAT_MILK',
            'GOATS_MILK': 'GOAT_MILK',
            'SHEEP_MILK': 'SHEEP_MILK',
            'SHEEPS_MILK': 'SHEEP_MILK',
            'COW_MILK': 'COW_MILK',
            'COWS_MILK': 'COW_MILK',

            //KENNEL
            //BABY ANIMALS
            'SWIFTCLAW_CUB': 'FARM_COUGAR_BABY',
            'CAERLEON_GREYWOLF_PUP': 'FARM_GREYWOLF_FW_CAERLEON_BABY',
            'DIREWOLF_PUP': 'FARM_DIREWOLF_BABY',
            'WILD_BOARLET': 'FARM_DIREBOAR_FW_LYMHURST_BABY',
            'DIREBOAR_PIGLET': 'FARM_DIREBOAR_BABY',
            'ELITE_WILD_BOARLET': 'FARM_DIREBOAR_FW_LYMHURST_BABY',
            'WINTER_BEAR_CUB': 'FARM_DIREBEAR_FW_FORTSTERLING_BABY',
            'ELITE_WINTER_BEAR_CUB': 'FARM_DIREBEAR_FW_FORTSTERLING_BABY',
            'MAMMOTH_CALF': 'FARM_MAMMOTH_BABY',
            'BABY_SWAMP_SALAMANDER': 'FARM_SWAMPDRAGON_FW_THETFORD_BABY',
            'SWAMP_DRAGON_PUP': 'FARM_SWAMPDRAGON_BABY',
            'BABY_ELITE_SWAMP_SALAMANDER': 'FARM_SWAMPDRAGON_FW_THETFORD_BABY',
            'BABY_MOABIRD': 'FARM_MOABIRD_FW_BRIDGEWATCH_BABY',
            'BABY_ELITE_TERRORBIRD': 'FARM_MOABIRD_FW_BRIDGEWATCH_BABY',
            'MYSTIC_OWLET': 'FARM_OWL_FW_BRECILIEN_BABY',
            'VIBRANT_SPRING_COTTONTAIL_EGG': 'FARM_RABBIT_EASTER_BABY',
            'EERIE_COTTONTAIL_EGG': 'FARM_RABBIT_EASTER_BABY_DARK',
            'BIGHORN_RAM_LAMB': 'FARM_RAM_FW_MARTLOCK_BABY',
            'ELITE_BIGHORN_RAM_LAMB': 'FARM_RAM_FW_MARTLOCK_BABY',
            'HELLSPINNER_BABY': 'FARM_SPIDER_HELL_BABY',
            'SOULSPINNER_BABY': 'FARM_SPIDER_HELL_BABY',
            //ADULT ANIMALS
             'TAME_SWIFTCLAW': 'FARM_COUGAR_GROWN',
             'TAME_GREYWOLF': 'FARM_GREYWOLF_FW_CAERLEON_GROWN',
             'TAME_DIREWOLF': 'FARM_DIREWOLF_GROWN',
             'TAME_WILD_BOAR': 'FARM_DIREBOAR_FW_LYMHURST_GROWN',
             'TAME_DIREBOAR': 'FARM_DIREBOAR_GROWN',
             'TAME_ELITE_WILD_BOAR': 'FARM_DIREBOAR_FW_LYMHURST_GROWN',
             'TAME_WINTER_BEAR': 'FARM_DIREBEAR_FW_FORTSTERLING_GROWN',
             'TAME_MAMMOTH': 'FARM_MAMMOTH_GROWN',
             'TAME_SWAMP_SALAMANDER': 'FARM_SWAMPDRAGON_FW_THETFORD_GROWN',
             'TAME_SWAMP_DRAGON': 'FARM_SWAMPDRAGON_GROWN',
             'TAME_ELITE_SWAMP_SALAMANDER': 'FARM_SWAMPDRAGON_FW_THETFORD_GROWN',
             'TAME_MOABIRD': 'FARM_MOABIRD_FW_BRIDGEWATCH_GROWN',
             'TAME_ELITE_TERRORBIRD': 'FARM_MOABIRD_FW_BRIDGEWATCH_GROWN',
             'TAME_MYSTIC_OWL': 'FARM_OWL_FW_BRECILIEN_GROWN',
             'TAME_ELITE_MYSTIC_OWL': 'FARM_OWL_FW_BRECILIEN_GROWN',
             'TAME_SPRING_COTTONTAIL': 'FARM_RABBIT_EASTER_GROWN',
             'TAME_CAERLEON_COTTONTAIL': 'FARM_RABBIT_EASTER_GROWN_DARK',
              'TAME_BIGHORN_RAM': 'FARM_RAM_FW_MARTLOCK_GROWN',
              'TAME_ELITE_BIGHORN_RAM': 'FARM_RAM_FW_MARTLOCK_GROWN',
              'TAME_HELLSPINNER': 'FARM_SPIDER_HELL_GROWN',
              'TAME_SOULSPINNER': 'FARM_SPIDER_HELL_GROWN',

              //FARMING PRODUCTS
              'CORN_HOOCH': 'ALCOHOL',
              'BREAD': 'BREAD',
              'GOATS_BUTTER': 'GOATS_BUTTER',
              'SHEEPS_BUTTER': 'SHEEPS_BUTTER',
              'COWS_BUTTER': 'COWS_BUTTER',
              'BUTTER': 'BUTTER',
               'FLOUR': 'FLOUR',
               'MEAT': 'MEAT',

               //FURNITURE
               'REPAIR_KIT': 'FURNITUREITEM_REPAIRKIT',
               'CHEST': 'FURNITUREITEM_CHEST',
               'EGG_SHAPED_CHEST': 'UNIQUE_FURNITUREITEM_EASTER_CHEST',
               'PRESENT_BOX': 'UNIQUE_FURNITUREITEM_XMAS_PRESENT',
               'BED': 'FURNITUREITEM_BED',
               'TABLE': 'FURNITUREITEM_TABLE',

               //INDOORS DECORATIONS
                'DARK_FOUNDERS_CERTIFICATE': 'UNIQUE_FURNITUREITEM_DARK_FOUNDER_CERTIFICATE',
                'LIGHT_FOUNDERS_CERTIFICATE': 'UNIQUE_FURNITUREITEM_LIGHT_FOUNDER_CERTIFICATE',
                'DIREBEAR_RUG': 'UNIQUE_FURNITUREITEM_ADC_RUG_DIREBEAR',

                //DECORATIONS
                'SIMPLE_BRAZIER_(DISCIPLES_OF_MORGANA)': 'UNIQUE_FURNITUREITEM_MORGANA_FIREBOWL_C@1',


                //OTHER
                'HIDEOUT_CONSTRUCTION_KIT': 'UNIQUE_HIDEOUT',
                'SIEGE_HAMMER': '2H_TOOL_SIEGEHAMMER',
                'SIEGE_BANNER': 'SIEGE_BANNER',
                'FISHERMAN\'S_JOURNAL_(PARTIALLY_FULL)': 'JOURNAL_FISHING',
                

            // REFINED MATERIALS
            
            'LEATHER': 'LEATHER',
            'METALBAR': 'METALBAR',
            'METAL_BAR': 'METALBAR',
            'METAL_BARS': 'METALBAR',
            'STONEBLOCK': 'STONEBLOCK',
            'STONE_BLOCK': 'STONEBLOCK',
            'PLANKS': 'PLANKS',

            //RESOURCES
            'FIBER': 'FIBER',
            'WOOD': 'WOOD',
            'STONE': 'ROCK',
            'ORE': 'ORE',
            'HIDE': 'HIDE'
          };

          // Apply mappings
;
