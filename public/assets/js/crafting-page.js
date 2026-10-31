// Crafting page behavior and gear catalog. Recipe data is in craftingRecipes.js.

const GEAR = {"Off-Hands":{"Shields":[{"id":"T4_OFF_SHIELD","name":"Adept's Shield","tier":"T4"},{"id":"T5_OFF_SHIELD","name":"Expert's Shield","tier":"T5"},{"id":"T6_OFF_SHIELD","name":"Master's Shield","tier":"T6"},{"id":"T7_OFF_SHIELD","name":"Grandmaster's Shield","tier":"T7"},{"id":"T8_OFF_SHIELD","name":"Elder's Shield","tier":"T8"},{"id":"T4_OFF_TOWERSHIELD_UNDEAD","name":"Adept's Sarcophagus","tier":"T4"},{"id":"T5_OFF_TOWERSHIELD_UNDEAD","name":"Expert's Sarcophagus","tier":"T5"},{"id":"T6_OFF_TOWERSHIELD_UNDEAD","name":"Master's Sarcophagus","tier":"T6"},{"id":"T7_OFF_TOWERSHIELD_UNDEAD","name":"Grandmaster's Sarcophagus","tier":"T7"},{"id":"T8_OFF_TOWERSHIELD_UNDEAD","name":"Elder's Sarcophagus","tier":"T8"},{"id":"T4_OFF_SHIELD_HELL","name":"Adept's Caitiff Shield","tier":"T4"},{"id":"T5_OFF_SHIELD_HELL","name":"Expert's Caitiff Shield","tier":"T5"},{"id":"T6_OFF_SHIELD_HELL","name":"Master's Caitiff Shield","tier":"T6"},{"id":"T7_OFF_SHIELD_HELL","name":"Grandmaster's Caitiff Shield","tier":"T7"},{"id":"T8_OFF_SHIELD_HELL","name":"Elder's Caitiff Shield","tier":"T8"},{"id":"T4_OFF_SPIKEDSHIELD_MORGANA","name":"Adept's Facebreaker","tier":"T4"},{"id":"T5_OFF_SPIKEDSHIELD_MORGANA","name":"Expert's Facebreaker","tier":"T5"},{"id":"T6_OFF_SPIKEDSHIELD_MORGANA","name":"Master's Facebreaker","tier":"T6"},{"id":"T7_OFF_SPIKEDSHIELD_MORGANA","name":"Grandmaster's Facebreaker","tier":"T7"},{"id":"T8_OFF_SPIKEDSHIELD_MORGANA","name":"Elder's Facebreaker","tier":"T8"},{"id":"T4_OFF_SHIELD_AVALON","name":"Adept's Astral Aegis","tier":"T4"},{"id":"T5_OFF_SHIELD_AVALON","name":"Expert's Astral Aegis","tier":"T5"},{"id":"T6_OFF_SHIELD_AVALON","name":"Master's Astral Aegis","tier":"T6"},{"id":"T7_OFF_SHIELD_AVALON","name":"Grandmaster's Astral Aegis","tier":"T7"},{"id":"T8_OFF_SHIELD_AVALON","name":"Elder's Astral Aegis","tier":"T8"},{"id":"T4_OFF_SHIELD_CRYSTAL","name":"Adept's Unbreakable Ward","tier":"T4"},{"id":"T5_OFF_SHIELD_CRYSTAL","name":"Expert's Unbreakable Ward","tier":"T5"},{"id":"T6_OFF_SHIELD_CRYSTAL","name":"Master's Unbreakable Ward","tier":"T6"},{"id":"T7_OFF_SHIELD_CRYSTAL","name":"Grandmaster's Unbreakable Ward","tier":"T7"},{"id":"T8_OFF_SHIELD_CRYSTAL","name":"Elder's Unbreakable Ward","tier":"T8"}],"Tomes":[{"id":"T4_OFF_BOOK","name":"Adept's Tome of Spells","tier":"T4"},{"id":"T5_OFF_BOOK","name":"Expert's Tome of Spells","tier":"T5"},{"id":"T6_OFF_BOOK","name":"Master's Tome of Spells","tier":"T6"},{"id":"T7_OFF_BOOK","name":"Grandmaster's Tome of Spells","tier":"T7"},{"id":"T8_OFF_BOOK","name":"Rosalia's Diary","tier":"T8"},{"id":"T4_OFF_ORB_MORGANA","name":"Adept's Eye of Secrets","tier":"T4"},{"id":"T5_OFF_ORB_MORGANA","name":"Expert's Eye of Secrets","tier":"T5"},{"id":"T6_OFF_ORB_MORGANA","name":"Master's Eye of Secrets","tier":"T6"},{"id":"T7_OFF_ORB_MORGANA","name":"Grandmaster's Eye of Secrets","tier":"T7"},{"id":"T8_OFF_ORB_MORGANA","name":"Elder's Eye of Secrets","tier":"T8"},{"id":"T4_OFF_TOTEM_KEEPER","name":"Adept's Taproot","tier":"T4"},{"id":"T5_OFF_TOTEM_KEEPER","name":"Expert's Taproot","tier":"T5"},{"id":"T6_OFF_TOTEM_KEEPER","name":"Master's Taproot","tier":"T6"},{"id":"T7_OFF_TOTEM_KEEPER","name":"Grandmaster's Taproot","tier":"T7"},{"id":"T8_OFF_TOTEM_KEEPER","name":"Elder's Taproot","tier":"T8"},{"id":"T4_OFF_DEMONSKULL_HELL","name":"Adept's Muisak","tier":"T4"},{"id":"T5_OFF_DEMONSKULL_HELL","name":"Expert's Muisak","tier":"T5"},{"id":"T6_OFF_DEMONSKULL_HELL","name":"Master's Muisak","tier":"T6"},{"id":"T7_OFF_DEMONSKULL_HELL","name":"Grandmaster's Muisak","tier":"T7"},{"id":"T8_OFF_DEMONSKULL_HELL","name":"Elder's Muisak","tier":"T8"},{"id":"T4_OFF_CENSER_AVALON","name":"Adept's Celestial Censer","tier":"T4"},{"id":"T5_OFF_CENSER_AVALON","name":"Expert's Celestial Censer","tier":"T5"},{"id":"T6_OFF_CENSER_AVALON","name":"Master's Celestial Censer","tier":"T6"},{"id":"T7_OFF_CENSER_AVALON","name":"Grandmaster's Celestial Censer","tier":"T7"},{"id":"T8_OFF_CENSER_AVALON","name":"Elder's Celestial Censer","tier":"T8"},{"id":"T4_OFF_BOOK_CRYSTAL","name":"Adept's Timelocked Grimoire","tier":"T4"},{"id":"T5_OFF_BOOK_CRYSTAL","name":"Expert's Timelocked Grimoire","tier":"T5"},{"id":"T6_OFF_BOOK_CRYSTAL","name":"Master's Timelocked Grimoire","tier":"T6"},{"id":"T7_OFF_BOOK_CRYSTAL","name":"Grandmaster's Timelocked Grimoire","tier":"T7"},{"id":"T8_OFF_BOOK_CRYSTAL","name":"Elder's Timelocked Grimoire","tier":"T8"}],"Torches":[{"id":"T4_OFF_TORCH","name":"Adept's Torch","tier":"T4"},{"id":"T5_OFF_TORCH","name":"Expert's Torch","tier":"T5"},{"id":"T6_OFF_TORCH","name":"Master's Torch","tier":"T6"},{"id":"T7_OFF_TORCH","name":"Grandmaster's Torch","tier":"T7"},{"id":"T8_OFF_TORCH","name":"Elder's Torch","tier":"T8"},{"id":"T4_OFF_HORN_KEEPER","name":"Adept's Mistcaller","tier":"T4"},{"id":"T5_OFF_HORN_KEEPER","name":"Expert's Mistcaller","tier":"T5"},{"id":"T6_OFF_HORN_KEEPER","name":"Master's Mistcaller","tier":"T6"},{"id":"T7_OFF_HORN_KEEPER","name":"Grandmaster's Mistcaller","tier":"T7"},{"id":"T8_OFF_HORN_KEEPER","name":"Elder's Mistcaller","tier":"T8"},{"id":"T4_OFF_LAMP_UNDEAD","name":"Adept's Cryptcandle","tier":"T4"},{"id":"T5_OFF_LAMP_UNDEAD","name":"Expert's Cryptcandle","tier":"T5"},{"id":"T6_OFF_LAMP_UNDEAD","name":"Master's Cryptcandle","tier":"T6"},{"id":"T7_OFF_LAMP_UNDEAD","name":"Grandmaster's Cryptcandle","tier":"T7"},{"id":"T8_OFF_LAMP_UNDEAD","name":"Elder's Cryptcandle","tier":"T8"},{"id":"T4_OFF_JESTERCANE_HELL","name":"Adept's Leering Cane","tier":"T4"},{"id":"T5_OFF_JESTERCANE_HELL","name":"Expert's Leering Cane","tier":"T5"},{"id":"T6_OFF_JESTERCANE_HELL","name":"Master's Leering Cane","tier":"T6"},{"id":"T7_OFF_JESTERCANE_HELL","name":"Grandmaster's Leering Cane","tier":"T7"},{"id":"T8_OFF_JESTERCANE_HELL","name":"Elder's Leering Cane","tier":"T8"},{"id":"T4_OFF_TALISMAN_AVALON","name":"Adept's Sacred Scepter","tier":"T4"},{"id":"T5_OFF_TALISMAN_AVALON","name":"Expert's Sacred Scepter","tier":"T5"},{"id":"T6_OFF_TALISMAN_AVALON","name":"Master's Sacred Scepter","tier":"T6"},{"id":"T7_OFF_TALISMAN_AVALON","name":"Grandmaster's Sacred Scepter","tier":"T7"},{"id":"T8_OFF_TALISMAN_AVALON","name":"Elder's Sacred Scepter","tier":"T8"},{"id":"T4_OFF_TORCH_CRYSTAL","name":"Adept's Blueflame Torch","tier":"T4"},{"id":"T5_OFF_TORCH_CRYSTAL","name":"Expert's Blueflame Torch","tier":"T5"},{"id":"T6_OFF_TORCH_CRYSTAL","name":"Master's Blueflame Torch","tier":"T6"},{"id":"T7_OFF_TORCH_CRYSTAL","name":"Grandmaster's Blueflame Torch","tier":"T7"},{"id":"T8_OFF_TORCH_CRYSTAL","name":"Elder's Blueflame Torch","tier":"T8"}]},"Capes":{"Cape":[{"id":"T4_CAPE","name":"Adept's Cape","tier":"T4"},{"id":"T5_CAPE","name":"Expert's Cape","tier":"T5"},{"id":"T6_CAPE","name":"Master's Cape","tier":"T6"},{"id":"T7_CAPE","name":"Grandmaster's Cape","tier":"T7"},{"id":"T8_CAPE","name":"Elder's Cape","tier":"T8"}],"Bridgewatch":[{"id":"T4_CAPEITEM_FW_BRIDGEWATCH","name":"Adept's Bridgewatch Cape","tier":"T4"},{"id":"T5_CAPEITEM_FW_BRIDGEWATCH","name":"Expert's Bridgewatch Cape","tier":"T5"},{"id":"T6_CAPEITEM_FW_BRIDGEWATCH","name":"Master's Bridgewatch Cape","tier":"T6"},{"id":"T7_CAPEITEM_FW_BRIDGEWATCH","name":"Grandmaster's Bridgewatch Cape","tier":"T7"},{"id":"T8_CAPEITEM_FW_BRIDGEWATCH","name":"Elder's Bridgewatch Cape","tier":"T8"}],"Fort Sterling":[{"id":"T4_CAPEITEM_FW_FORTSTERLING","name":"Adept's Fort Sterling Cape","tier":"T4"},{"id":"T5_CAPEITEM_FW_FORTSTERLING","name":"Expert's Fort Sterling Cape","tier":"T5"},{"id":"T6_CAPEITEM_FW_FORTSTERLING","name":"Master's Fort Sterling Cape","tier":"T6"},{"id":"T7_CAPEITEM_FW_FORTSTERLING","name":"Grandmaster's Fort Sterling Cape","tier":"T7"},{"id":"T8_CAPEITEM_FW_FORTSTERLING","name":"Elder's Fort Sterling Cape","tier":"T8"}],"Lymhurst":[{"id":"T4_CAPEITEM_FW_LYMHURST","name":"Adept's Lymhurst Cape","tier":"T4"},{"id":"T5_CAPEITEM_FW_LYMHURST","name":"Expert's Lymhurst Cape","tier":"T5"},{"id":"T6_CAPEITEM_FW_LYMHURST","name":"Master's Lymhurst Cape","tier":"T6"},{"id":"T7_CAPEITEM_FW_LYMHURST","name":"Grandmaster's Lymhurst Cape","tier":"T7"},{"id":"T8_CAPEITEM_FW_LYMHURST","name":"Elder's Lymhurst Cape","tier":"T8"}],"Martlock":[{"id":"T4_CAPEITEM_FW_MARTLOCK","name":"Adept's Martlock Cape","tier":"T4"},{"id":"T5_CAPEITEM_FW_MARTLOCK","name":"Expert's Martlock Cape","tier":"T5"},{"id":"T6_CAPEITEM_FW_MARTLOCK","name":"Master's Martlock Cape","tier":"T6"},{"id":"T7_CAPEITEM_FW_MARTLOCK","name":"Grandmaster's Martlock Cape","tier":"T7"},{"id":"T8_CAPEITEM_FW_MARTLOCK","name":"Elder's Martlock Cape","tier":"T8"}],"Thetford":[{"id":"T4_CAPEITEM_FW_THETFORD","name":"Adept's Thetford Cape","tier":"T4"},{"id":"T5_CAPEITEM_FW_THETFORD","name":"Expert's Thetford Cape","tier":"T5"},{"id":"T6_CAPEITEM_FW_THETFORD","name":"Master's Thetford Cape","tier":"T6"},{"id":"T7_CAPEITEM_FW_THETFORD","name":"Grandmaster's Thetford Cape","tier":"T7"},{"id":"T8_CAPEITEM_FW_THETFORD","name":"Elder's Thetford Cape","tier":"T8"}],"Caerleon":[{"id":"T4_CAPEITEM_FW_CAERLEON","name":"Adept's Caerleon Cape","tier":"T4"},{"id":"T5_CAPEITEM_FW_CAERLEON","name":"Expert's Caerleon Cape","tier":"T5"},{"id":"T6_CAPEITEM_FW_CAERLEON","name":"Master's Caerleon Cape","tier":"T6"},{"id":"T7_CAPEITEM_FW_CAERLEON","name":"Grandmaster's Caerleon Cape","tier":"T7"},{"id":"T8_CAPEITEM_FW_CAERLEON","name":"Elder's Caerleon Cape","tier":"T8"}],"Brecilien":[{"id":"T4CAPEITEM_FW_BRECILIEN","name":"Adept's Brecilien Cape","tier":"T4"},{"id":"T5CAPEITEM_FW_BRECILIEN","name":"Expert's Brecilien Cape","tier":"T5"},{"id":"T6CAPEITEM_FW_BRECILIEN","name":"Master's Brecilien Cape","tier":"T6"},{"id":"T7CAPEITEM_FW_BRECILIEN","name":"Grandmaster's Brecilien Cape","tier":"T7"},{"id":"T8CAPEITEM_FW_BRECILIEN","name":"Elder's Brecilien Cape","tier":"T8"}],"Heretic":[{"id":"T4_CAPEITEM_HERETIC","name":"Adept's Heretic Cape","tier":"T4"},{"id":"T5_CAPEITEM_HERETIC","name":"Expert's Heretic Cape","tier":"T5"},{"id":"T6_CAPEITEM_HERETIC","name":"Master's Heretic Cape","tier":"T6"},{"id":"T7_CAPEITEM_HERETIC","name":"Grandmaster's Heretic Cape","tier":"T7"},{"id":"T8_CAPEITEM_HERETIC","name":"Elder's Heretic Cape","tier":"T8"}],"Undead":[{"id":"T4_CAPEITEM_UNDEAD","name":"Adept's Undead Cape","tier":"T4"},{"id":"T5_CAPEITEM_UNDEAD","name":"Expert's Undead Cape","tier":"T5"},{"id":"T6_CAPEITEM_UNDEAD","name":"Master's Undead Cape","tier":"T6"},{"id":"T7_CAPEITEM_UNDEAD","name":"Grandmaster's Undead Cape","tier":"T7"},{"id":"T8_CAPEITEM_UNDEAD","name":"Elder's Undead Cape","tier":"T8"}],"Keeper":[{"id":"T4_CAPEITEM_KEEPER","name":"Adept's Keeper Cape","tier":"T4"},{"id":"T5_CAPEITEM_KEEPER","name":"Expert's Keeper Cape","tier":"T5"},{"id":"T6_CAPEITEM_KEEPER","name":"Master's Keeper Cape","tier":"T6"},{"id":"T7_CAPEITEM_KEEPER","name":"Grandmaster's Keeper Cape","tier":"T7"},{"id":"T8_CAPEITEM_KEEPER","name":"Elder's Keeper Cape","tier":"T8"}],"Morgana":[{"id":"T4_CAPEITEM_MORGANA","name":"Adept's Morgana Cape","tier":"T4"},{"id":"T5_CAPEITEM_MORGANA","name":"Expert's Morgana Cape","tier":"T5"},{"id":"T6_CAPEITEM_MORGANA","name":"Master's Morgana Cape","tier":"T6"},{"id":"T7_CAPEITEM_MORGANA","name":"Grandmaster's Morgana Cape","tier":"T7"},{"id":"T8_CAPEITEM_MORGANA","name":"Elder's Morgana Cape","tier":"T8"}],"Avalonian":[{"id":"T4CAPEITEM_AVALON","name":"Adept's Avalonian Cape","tier":"T4"},{"id":"T5CAPEITEM_AVALON","name":"Expert's Avalonian Cape","tier":"T5"},{"id":"T6CAPEITEM_AVALON","name":"Master's Avalonian Cape","tier":"T6"},{"id":"T7CAPEITEM_AVALON","name":"Grandmaster's Avalonian Cape","tier":"T7"},{"id":"T8CAPEITEM_AVALON","name":"Elder's Avalonian Cape","tier":"T8"}],"Demon":[{"id":"T4_CAPEITEM_DEMON","name":"Adept's Demon Cape","tier":"T4"},{"id":"T5_CAPEITEM_DEMON","name":"Expert's Demon Cape","tier":"T5"},{"id":"T6_CAPEITEM_DEMON","name":"Master's Demon Cape","tier":"T6"},{"id":"T7_CAPEITEM_DEMON","name":"Grandmaster's Demon Cape","tier":"T7"},{"id":"T8_CAPEITEM_DEMON","name":"Elder's Demon Cape","tier":"T8"}],"Smuggler":[{"id":"T4CAPEITEM_SMUGGLER","name":"Adept's Smuggler Cape","tier":"T4"},{"id":"T5CAPEITEM_SMUGGLER","name":"Expert's Smuggler Cape","tier":"T5"},{"id":"T6CAPEITEM_SMUGGLER","name":"Master's Smuggler Cape","tier":"T6"},{"id":"T7CAPEITEM_SMUGGLER","name":"Grandmaster's Smuggler Cape","tier":"T7"},{"id":"T8CAPEITEM_SMUGGLER","name":"Elder's Smuggler Cape","tier":"T8"}]},"Bags":{"Bags":[{"id":"T4_BAG","name":"Adept's Bag","tier":"T4"},{"id":"T5_BAG","name":"Expert's Bag","tier":"T5"},{"id":"T6_BAG","name":"Master's Bag","tier":"T6"},{"id":"T7_BAG","name":"Grandmaster's Bag","tier":"T7"},{"id":"T8_BAG","name":"Elder's Bag","tier":"T8"}],"Satchels of Insight":[{"id":"T4_BAG_INSIGHT","name":"Adept's Satchel of Insight","tier":"T4"},{"id":"T5_BAG_INSIGHT","name":"Expert's Satchel of Insight","tier":"T5"},{"id":"T6_BAG_INSIGHT","name":"Master's Satchel of Insight","tier":"T6"},{"id":"T7_BAG_INSIGHT","name":"Grandmaster's Satchel of Insight","tier":"T7"},{"id":"T8_BAG_INSIGHT","name":"Elder's Satchel of Insight","tier":"T8"}]},"Mount":{"Base Mounts":{"Horses":[{"id":"T3_MOUNT_HORSE","name":"Journeyman's Riding Horse","tier":"T3"},{"id":"T4_MOUNT_HORSE","name":"Adept's Riding Horse","tier":"T4"},{"id":"T5_MOUNT_HORSE","name":"Expert's Riding Horse","tier":"T5"},{"id":"T5_MOUNT_ARMORED_HORSE_SKIN_01","name":"Expert's Warhorse","tier":"T5"},{"id":"T6_MOUNT_HORSE","name":"Master's Riding Horse","tier":"T6"},{"id":"T6_MOUNT_ARMORED_HORSE_SKIN_01","name":"Master's Warhorse","tier":"T6"},{"id":"T7_MOUNT_HORSE","name":"Grandmaster's Riding Horse","tier":"T7"},{"id":"T7_MOUNT_ARMORED_HORSE_SKIN_01","name":"Grandmaster's Warhorse","tier":"T7"},{"id":"T8_MOUNT_HORSE","name":"Elder's Riding Horse","tier":"T8"},{"id":"T8_MOUNT_ARMORED_HORSE_SKIN_01","name":"Elder's Warhorse","tier":"T8"}],"Armored Horse":[{"id":"T5_MOUNT_ARMORED_HORSE","name":"Expert's Armored Horse","tier":"T5"},{"id":"T6_MOUNT_ARMORED_HORSE","name":"Master's Armored Horse","tier":"T6"},{"id":"T7_MOUNT_ARMORED_HORSE","name":"Grandmaster's Armored Horse","tier":"T7"},{"id":"T8_MOUNT_ARMORED_HORSE","name":"Elder's Armored Horse","tier":"T8"}],"Ox":[{"id":"T3_MOUNT_OX","name":"Journeyman's Transport Ox","tier":"T3"},{"id":"T4_MOUNT_OX","name":"Adept's Transport Ox","tier":"T4"},{"id":"T5_MOUNT_OX","name":"Expert's Transport Ox","tier":"T5"},{"id":"T6_MOUNT_OX","name":"Master's Transport Ox","tier":"T6"},{"id":"T7_MOUNT_OX","name":"Grandmaster's Transport Ox","tier":"T7"},{"id":"T8_MOUNT_OX","name":"Elder's Transport Ox","tier":"T8"}],"Rams":[{"id":"T5_MOUNT_RAM_FW_MARTLOCK","name":"Saddled Bighorn Ram","tier":"T5"}],"Direwolf":[{"id":"T5_MOUNT_GREYWOLF_FW_CAERLEON","name":"Saddled Greywolf","tier":"T5"},{"id":"T6_MOUNT_DIREWOLF","name":"Direwolf","tier":"T6"}],"Giant Stag":[{"id":"T4_MOUNT_GIANTSTAG","name":"Adept's Giant Stag","tier":"T4"},{"id":"T6_MOUNT_GIANTSTAG_MOOSE","name":"Moose","tier":"T6"}],"Swiftclaw":[{"id":"T5_MOUNT_COUGAR_KEEPER","name":"Swiftclaw","tier":"T5"}],"Direbear":[{"id":"T8_MOUNT_DIREBEAR","name":"Saddled Direbear","tier":"T8"},{"id":"T5_MOUNT_DIREBEAR_FW_FORTSTERLING","name":"Saddled Winter Bear","tier":"T5"}],"Direboar":[{"id":"T5_MOUNT_DIREBOAR_FW_LYMHURST","name":"Saddled Wild Boar","tier":"T5"},{"id":"T7_MOUNT_DIREBOAR","name":"Saddled Direboar","tier":"T7"}],"Swamp Dragon":[{"id":"T5_MOUNT_SWAMPDRAGON_FW_THETFORD","name":"Saddled Swamp Salamander","tier":"T5"},{"id":"T7_MOUNT_SWAMPDRAGON","name":"Saddled Swamp Dragon","tier":"T7"}],"Mammoth":[{"id":"T8_MOUNT_MAMMOTH_TRANSPORT","name":"Elder's Transport Mammoth","tier":"T8"}],"Terrorbird":[{"id":"T5_MOUNT_MOABIRD_FW_BRIDGEWATCH","name":"Saddled Moabird","tier":"T5"}]},"Rare Mounts":[{"id":"T6_MOUNT_FROSTRAM_ADC","name":"Frost Ram","tier":"T6"},{"id":"T7_MOUNT_SWAMPDRAGON_AVALON_BASILISK","name":"Avalonian Basilisk","tier":"T7"},{"id":"T7_MOUNT_TERRORBIRD_ADC","name":"Saddled Terrorbird","tier":"T7"},{"id":"T8_MOUNT_RAM_FW_MARTLOCK_ELITE","name":"Elite Bighorn Ram","tier":"T8"},{"id":"T8_MOUNT_GREYWOLF_FW_CAERLEON_ELITE","name":"Elite Greywolf","tier":"T8"},{"id":"T8_MOUNT_SWAMPDRAGON_FW_THETFORD_ELITE","name":"Elite Swamp Salamander","tier":"T8"},{"id":"T8_MOUNT_MOABIRD_FW_BRIDGEWATCH_ELITE","name":"Elite Terrorbird","tier":"T8"},{"id":"T8_MOUNT_DIREBOAR_FW_LYMHURST_ELITE","name":"Elite Wild Boar","tier":"T8"},{"id":"T8_MOUNT_DIREBEAR_FW_FORTSTERLING_ELITE","name":"Elite Winter Bear","tier":"T8"},{"id":"T8_MOUNT_RABBIT_EASTER","name":"Spring Cottontail","tier":"T8"},{"id":"T5_MOUNT_MYSTIC_OWL","name":"Mystic Owl","tier":"T5"},{"id":"T5_MOUNT_HELLSPINNER","name":"Hellspinner","tier":"T5"}],"Battle Mounts":[{"id":"T6_MOUNT_SIEGE_BALLISTA","name":"Siege Ballista","tier":"T6"},{"id":"T7_MOUNT_SWAMPDRAGON_BATTLE","name":"Flame Basilisk","tier":"T7"},{"id":"T7_MOUNT_ARMORED_SWAMPDRAGON_BATTLE","name":"Venom Basilisk","tier":"T7"}]},"Head Armor":{"Cloth Cowls":[{"id":"T4_HEAD_CLOTH_SET1","name":"Adept's Scholar Cowl","tier":"T4"},{"id":"T5_HEAD_CLOTH_SET1","name":"Expert's Scholar Cowl","tier":"T5"},{"id":"T6_HEAD_CLOTH_SET1","name":"Master's Scholar Cowl","tier":"T6"},{"id":"T7_HEAD_CLOTH_SET1","name":"Grandmaster's Scholar Cowl","tier":"T7"},{"id":"T8_HEAD_CLOTH_SET1","name":"Elder's Scholar Cowl","tier":"T8"},{"id":"T4_HEAD_CLOTH_SET2","name":"Adept's Cleric Cowl","tier":"T4"},{"id":"T5_HEAD_CLOTH_SET2","name":"Expert's Cleric Cowl","tier":"T5"},{"id":"T6_HEAD_CLOTH_SET2","name":"Master's Cleric Cowl","tier":"T6"},{"id":"T7_HEAD_CLOTH_SET2","name":"Grandmaster's Cleric Cowl","tier":"T7"},{"id":"T8_HEAD_CLOTH_SET2","name":"Elder's Cleric Cowl","tier":"T8"},{"id":"T4_HEAD_CLOTH_SET3","name":"Adept's Mage Cowl","tier":"T4"},{"id":"T5_HEAD_CLOTH_SET3","name":"Expert's Mage Cowl","tier":"T5"},{"id":"T6_HEAD_CLOTH_SET3","name":"Master's Mage Cowl","tier":"T6"},{"id":"T7_HEAD_CLOTH_SET3","name":"Grandmaster's Mage Cowl","tier":"T7"},{"id":"T8_HEAD_CLOTH_SET3","name":"Elder's Mage Cowl","tier":"T8"},{"id":"T4_HEAD_CLOTH_KEEPER","name":"Adept's Druid Cowl","tier":"T4"},{"id":"T5_HEAD_CLOTH_KEEPER","name":"Expert's Druid Cowl","tier":"T5"},{"id":"T6_HEAD_CLOTH_KEEPER","name":"Master's Druid Cowl","tier":"T6"},{"id":"T7_HEAD_CLOTH_KEEPER","name":"Grandmaster's Druid Cowl","tier":"T7"},{"id":"T8_HEAD_CLOTH_KEEPER","name":"Elder's Druid Cowl","tier":"T8"},{"id":"T4_HEAD_CLOTH_HELL","name":"Adept's Fiend Cowl","tier":"T4"},{"id":"T5_HEAD_CLOTH_HELL","name":"Expert's Fiend Cowl","tier":"T5"},{"id":"T6_HEAD_CLOTH_HELL","name":"Master's Fiend Cowl","tier":"T6"},{"id":"T7_HEAD_CLOTH_HELL","name":"Grandmaster's Fiend Cowl","tier":"T7"},{"id":"T8_HEAD_CLOTH_HELL","name":"Elder's Fiend Cowl","tier":"T8"},{"id":"T4_HEAD_CLOTH_MORGANA","name":"Adept's Cultist Cowl","tier":"T4"},{"id":"T5_HEAD_CLOTH_MORGANA","name":"Expert's Cultist Cowl","tier":"T5"},{"id":"T6_HEAD_CLOTH_MORGANA","name":"Master's Cultist Cowl","tier":"T6"},{"id":"T7_HEAD_CLOTH_MORGANA","name":"Grandmaster's Cultist Cowl","tier":"T7"},{"id":"T8_HEAD_CLOTH_MORGANA","name":"Elder's Cultist Cowl","tier":"T8"},{"id":"T4_HEAD_CLOTH_FEY","name":"Adept's Feyscale Hat","tier":"T4"},{"id":"T5_HEAD_CLOTH_FEY","name":"Expert's Feyscale Hat","tier":"T5"},{"id":"T6_HEAD_CLOTH_FEY","name":"Master's Feyscale Hat","tier":"T6"},{"id":"T7_HEAD_CLOTH_FEY","name":"Grandmaster's Feyscale Hat","tier":"T7"},{"id":"T8_HEAD_CLOTH_FEY","name":"Elder's Feyscale Hat","tier":"T8"},{"id":"T4_HEAD_CLOTH_AVALON","name":"Adept's Cowl of Purity","tier":"T4"},{"id":"T5_HEAD_CLOTH_AVALON","name":"Expert's Cowl of Purity","tier":"T5"},{"id":"T6_HEAD_CLOTH_AVALON","name":"Master's Cowl of Purity","tier":"T6"},{"id":"T7_HEAD_CLOTH_AVALON","name":"Grandmaster's Cowl of Purity","tier":"T7"},{"id":"T8_HEAD_CLOTH_AVALON","name":"Elder's Cowl of Purity","tier":"T8"},{"id":"T4_HEAD_CLOTH_ROYAL","name":"Adept's Royal Cowl","tier":"T4"},{"id":"T5_HEAD_CLOTH_ROYAL","name":"Expert's Royal Cowl","tier":"T5"},{"id":"T6_HEAD_CLOTH_ROYAL","name":"Master's Royal Cowl","tier":"T6"},{"id":"T7_HEAD_CLOTH_ROYAL","name":"Grandmaster's Royal Cowl","tier":"T7"},{"id":"T8_HEAD_CLOTH_ROYAL","name":"Elder's Royal Cowl","tier":"T8"}],"Leather Helmets":[{"id":"T4_HEAD_LEATHER_SET1","name":"Adept's Mercenary Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_SET1","name":"Expert's Mercenary Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_SET1","name":"Master's Mercenary Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_SET1","name":"Grandmaster's Mercenary Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_SET1","name":"Elder's Mercenary Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_SET2","name":"Adept's Hunter Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_SET2","name":"Expert's Hunter Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_SET2","name":"Master's Hunter Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_SET2","name":"Grandmaster's Hunter Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_SET2","name":"Elder's Hunter Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_SET3","name":"Adept's Assassin Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_SET3","name":"Expert's Assassin Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_SET3","name":"Master's Assassin Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_SET3","name":"Grandmaster's Assassin Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_SET3","name":"Elder's Assassin Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_MORGANA","name":"Adept's Stalker Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_MORGANA","name":"Expert's Stalker Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_MORGANA","name":"Master's Stalker Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_MORGANA","name":"Grandmaster's Stalker Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_MORGANA","name":"Elder's Stalker Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_HELL","name":"Adept's Hellion Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_HELL","name":"Expert's Hellion Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_HELL","name":"Master's Hellion Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_HELL","name":"Grandmaster's Hellion Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_HELL","name":"Elder's Hellion Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_UNDEAD","name":"Adept's Specter Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_UNDEAD","name":"Expert's Specter Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_UNDEAD","name":"Master's Specter Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_UNDEAD","name":"Grandmaster's Specter Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_UNDEAD","name":"Elder's Specter Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_FEY","name":"Adept's Mistwalker Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_FEY","name":"Expert's Mistwalker Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_FEY","name":"Master's Mistwalker Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_FEY","name":"Grandmaster's Mistwalker Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_FEY","name":"Elder's Mistwalker Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_AVALON","name":"Adept's Hood of Tenacity","tier":"T4"},{"id":"T5_HEAD_LEATHER_AVALON","name":"Expert's Hood of Tenacity","tier":"T5"},{"id":"T6_HEAD_LEATHER_AVALON","name":"Master's Hood of Tenacity","tier":"T6"},{"id":"T7_HEAD_LEATHER_AVALON","name":"Grandmaster's Hood of Tenacity","tier":"T7"},{"id":"T8_HEAD_LEATHER_AVALON","name":"Elder's Hood of Tenacity","tier":"T8"},{"id":"T4_HEAD_LEATHER_ROYAL","name":"Adept's Royal Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_ROYAL","name":"Expert's Royal Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_ROYAL","name":"Master's Royal Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_ROYAL","name":"Grandmaster's Royal Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_ROYAL","name":"Elder's Royal Hood","tier":"T8"},{"id":"T4_HEAD_LEATHER_DRAGON","name":"Adept's Dragonslayer Hood","tier":"T4"},{"id":"T5_HEAD_LEATHER_DRAGON","name":"Expert's Dragonslayer Hood","tier":"T5"},{"id":"T6_HEAD_LEATHER_DRAGON","name":"Master's Dragonslayer Hood","tier":"T6"},{"id":"T7_HEAD_LEATHER_DRAGON","name":"Grandmaster's Dragonslayer Hood","tier":"T7"},{"id":"T8_HEAD_LEATHER_DRAGON","name":"Elder's Dragonslayer Hood","tier":"T8"}],"Plate Helmets":[{"id":"T4_HEAD_PLATE_SET1","name":"Adept's Soldier Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_SET1","name":"Expert's Soldier Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_SET1","name":"Master's Soldier Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_SET1","name":"Grandmaster's Soldier Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_SET1","name":"Elder's Soldier Helmet","tier":"T8"},{"id":"T4_HEAD_PLATE_SET2","name":"Adept's Knight Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_SET2","name":"Expert's Knight Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_SET2","name":"Master's Knight Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_SET2","name":"Grandmaster's Knight Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_SET2","name":"Elder's Knight Helmet","tier":"T8"},{"id":"T4_HEAD_PLATE_SET3","name":"Adept's Guardian Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_SET3","name":"Expert's Guardian Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_SET3","name":"Master's Guardian Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_SET3","name":"Grandmaster's Guardian Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_SET3","name":"Elder's Guardian Helmet","tier":"T8"},{"id":"T4_HEAD_PLATE_UNDEAD","name":"Adept's Graveguard Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_UNDEAD","name":"Expert's Graveguard Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_UNDEAD","name":"Master's Graveguard Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_UNDEAD","name":"Grandmaster's Graveguard Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_UNDEAD","name":"Elder's Graveguard Helmet","tier":"T8"},{"id":"T4_HEAD_PLATE_HELL","name":"Adept's Demon Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_HELL","name":"Expert's Demon Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_HELL","name":"Master's Demon Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_HELL","name":"Grandmaster's Demon Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_HELL","name":"Elder's Demon Helmet","tier":"T8"},{"id":"T4_HEAD_PLATE_KEEPER","name":"Adept's Judicator Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_KEEPER","name":"Expert's Judicator Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_KEEPER","name":"Master's Judicator Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_KEEPER","name":"Grandmaster's Judicator Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_KEEPER","name":"Elder's Judicator Helmet","tier":"T8"},{"id":"T4_HEAD_PLATE_FEY","name":"Adept's Duskweaver Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_FEY","name":"Expert's Duskweaver Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_FEY","name":"Master's Duskweaver Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_FEY","name":"Grandmaster's Duskweaver Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_FEY","name":"Elder's Duskweaver Helmet","tier":"T8"},{"id":"T4_HEAD_PLATE_AVALON","name":"Adept's Helmet of Valor","tier":"T4"},{"id":"T5_HEAD_PLATE_AVALON","name":"Expert's Helmet of Valor","tier":"T5"},{"id":"T6_HEAD_PLATE_AVALON","name":"Master's Helmet of Valor","tier":"T6"},{"id":"T7_HEAD_PLATE_AVALON","name":"Grandmaster's Helmet of Valor","tier":"T7"},{"id":"T8_HEAD_PLATE_AVALON","name":"Elder's Helmet of Valor","tier":"T8"},{"id":"T4_HEAD_PLATE_ROYAL","name":"Adept's Royal Helmet","tier":"T4"},{"id":"T5_HEAD_PLATE_ROYAL","name":"Expert's Royal Helmet","tier":"T5"},{"id":"T6_HEAD_PLATE_ROYAL","name":"Master's Royal Helmet","tier":"T6"},{"id":"T7_HEAD_PLATE_ROYAL","name":"Grandmaster's Royal Helmet","tier":"T7"},{"id":"T8_HEAD_PLATE_ROYAL","name":"Elder's Royal Helmet","tier":"T8"}]},"Chest Armor":{"Cloth Robes":[{"id":"T4_ARMOR_CLOTH_SET1","name":"Adept's Scholar Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_SET1","name":"Expert's Scholar Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_SET1","name":"Master's Scholar Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_SET1","name":"Grandmaster's Scholar Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_SET1","name":"Elder's Scholar Robe","tier":"T8"},{"id":"T4_ARMOR_CLOTH_SET2","name":"Adept's Cleric Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_SET2","name":"Expert's Cleric Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_SET2","name":"Master's Cleric Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_SET2","name":"Grandmaster's Cleric Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_SET2","name":"Elder's Cleric Robe","tier":"T8"},{"id":"T4_ARMOR_CLOTH_SET3","name":"Adept's Mage Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_SET3","name":"Expert's Mage Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_SET3","name":"Master's Mage Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_SET3","name":"Grandmaster's Mage Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_SET3","name":"Elder's Mage Robe","tier":"T8"},{"id":"T4_ARMOR_CLOTH_KEEPER","name":"Adept's Druid Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_KEEPER","name":"Expert's Druid Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_KEEPER","name":"Master's Druid Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_KEEPER","name":"Grandmaster's Druid Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_KEEPER","name":"Elder's Druid Robe","tier":"T8"},{"id":"T4_ARMOR_CLOTH_HELL","name":"Adept's Fiend Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_HELL","name":"Expert's Fiend Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_HELL","name":"Master's Fiend Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_HELL","name":"Grandmaster's Fiend Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_HELL","name":"Elder's Fiend Robe","tier":"T8"},{"id":"T4_ARMOR_CLOTH_MORGANA","name":"Adept's Cultist Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_MORGANA","name":"Expert's Cultist Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_MORGANA","name":"Master's Cultist Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_MORGANA","name":"Grandmaster's Cultist Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_MORGANA","name":"Elder's Cultist Robe","tier":"T8"},{"id":"T4_ARMOR_CLOTH_FEY","name":"Adept's Feyscale Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_FEY","name":"Expert's Feyscale Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_FEY","name":"Master's Feyscale Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_FEY","name":"Grandmaster's Feyscale Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_FEY","name":"Elder's Feyscale Robe","tier":"T8"},{"id":"T4_ARMOR_CLOTH_AVALON","name":"Adept's Robe of Purity","tier":"T4"},{"id":"T5_ARMOR_CLOTH_AVALON","name":"Expert's Robe of Purity","tier":"T5"},{"id":"T6_ARMOR_CLOTH_AVALON","name":"Master's Robe of Purity","tier":"T6"},{"id":"T7_ARMOR_CLOTH_AVALON","name":"Grandmaster's Robe of Purity","tier":"T7"},{"id":"T8_ARMOR_CLOTH_AVALON","name":"Elder's Robe of Purity","tier":"T8"},{"id":"T4_ARMOR_CLOTH_ROYAL","name":"Adept's Royal Robe","tier":"T4"},{"id":"T5_ARMOR_CLOTH_ROYAL","name":"Expert's Royal Robe","tier":"T5"},{"id":"T6_ARMOR_CLOTH_ROYAL","name":"Master's Royal Robe","tier":"T6"},{"id":"T7_ARMOR_CLOTH_ROYAL","name":"Grandmaster's Royal Robe","tier":"T7"},{"id":"T8_ARMOR_CLOTH_ROYAL","name":"Elder's Royal Robe","tier":"T8"}],"Leather Jackets":[{"id":"T4_ARMOR_LEATHER_SET1","name":"Adept's Mercenary Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_SET1","name":"Expert's Mercenary Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_SET1","name":"Master's Mercenary Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_SET1","name":"Grandmaster's Mercenary Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_SET1","name":"Elder's Mercenary Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_SET2","name":"Adept's Hunter Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_SET2","name":"Expert's Hunter Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_SET2","name":"Master's Hunter Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_SET2","name":"Grandmaster's Hunter Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_SET2","name":"Elder's Hunter Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_SET3","name":"Adept's Assassin Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_SET3","name":"Expert's Assassin Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_SET3","name":"Master's Assassin Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_SET3","name":"Grandmaster's Assassin Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_SET3","name":"Elder's Assassin Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_MORGANA","name":"Adept's Stalker Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_MORGANA","name":"Expert's Stalker Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_MORGANA","name":"Master's Stalker Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_MORGANA","name":"Grandmaster's Stalker Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_MORGANA","name":"Elder's Stalker Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_HELL","name":"Adept's Hellion Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_HELL","name":"Expert's Hellion Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_HELL","name":"Master's Hellion Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_HELL","name":"Grandmaster's Hellion Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_HELL","name":"Elder's Hellion Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_UNDEAD","name":"Adept's Specter Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_UNDEAD","name":"Expert's Specter Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_UNDEAD","name":"Master's Specter Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_UNDEAD","name":"Grandmaster's Specter Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_UNDEAD","name":"Elder's Specter Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_FEY","name":"Adept's Mistwalker Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_FEY","name":"Expert's Mistwalker Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_FEY","name":"Master's Mistwalker Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_FEY","name":"Grandmaster's Mistwalker Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_FEY","name":"Elder's Mistwalker Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_AVALON","name":"Adept's Jacket of Tenacity","tier":"T4"},{"id":"T5_ARMOR_LEATHER_AVALON","name":"Expert's Jacket of Tenacity","tier":"T5"},{"id":"T6_ARMOR_LEATHER_AVALON","name":"Master's Jacket of Tenacity","tier":"T6"},{"id":"T7_ARMOR_LEATHER_AVALON","name":"Grandmaster's Jacket of Tenacity","tier":"T7"},{"id":"T8_ARMOR_LEATHER_AVALON","name":"Elder's Jacket of Tenacity","tier":"T8"},{"id":"T4_ARMOR_LEATHER_ROYAL","name":"Adept's Royal Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_ROYAL","name":"Expert's Royal Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_ROYAL","name":"Master's Royal Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_ROYAL","name":"Grandmaster's Royal Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_ROYAL","name":"Elder's Royal Jacket","tier":"T8"},{"id":"T4_ARMOR_LEATHER_DRAGON","name":"Adept's Dragonslayer Jacket","tier":"T4"},{"id":"T5_ARMOR_LEATHER_DRAGON","name":"Expert's Dragonslayer Jacket","tier":"T5"},{"id":"T6_ARMOR_LEATHER_DRAGON","name":"Master's Dragonslayer Jacket","tier":"T6"},{"id":"T7_ARMOR_LEATHER_DRAGON","name":"Grandmaster's Dragonslayer Jacket","tier":"T7"},{"id":"T8_ARMOR_LEATHER_DRAGON","name":"Elder's Dragonslayer Jacket","tier":"T8"}],"Plate Armor":[{"id":"T4_ARMOR_PLATE_SET1","name":"Adept's Soldier Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_SET1","name":"Expert's Soldier Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_SET1","name":"Master's Soldier Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_SET1","name":"Grandmaster's Soldier Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_SET1","name":"Elder's Soldier Armor","tier":"T8"},{"id":"T4_ARMOR_PLATE_SET2","name":"Adept's Knight Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_SET2","name":"Expert's Knight Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_SET2","name":"Master's Knight Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_SET2","name":"Grandmaster's Knight Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_SET2","name":"Elder's Knight Armor","tier":"T8"},{"id":"T4_ARMOR_PLATE_SET3","name":"Adept's Guardian Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_SET3","name":"Expert's Guardian Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_SET3","name":"Master's Guardian Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_SET3","name":"Grandmaster's Guardian Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_SET3","name":"Elder's Guardian Armor","tier":"T8"},{"id":"T4_ARMOR_PLATE_UNDEAD","name":"Adept's Graveguard Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_UNDEAD","name":"Expert's Graveguard Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_UNDEAD","name":"Master's Graveguard Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_UNDEAD","name":"Grandmaster's Graveguard Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_UNDEAD","name":"Elder's Graveguard Armor","tier":"T8"},{"id":"T4_ARMOR_PLATE_HELL","name":"Adept's Demon Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_HELL","name":"Expert's Demon Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_HELL","name":"Master's Demon Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_HELL","name":"Grandmaster's Demon Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_HELL","name":"Elder's Demon Armor","tier":"T8"},{"id":"T4_ARMOR_PLATE_KEEPER","name":"Adept's Judicator Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_KEEPER","name":"Expert's Judicator Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_KEEPER","name":"Master's Judicator Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_KEEPER","name":"Grandmaster's Judicator Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_KEEPER","name":"Elder's Judicator Armor","tier":"T8"},{"id":"T4_ARMOR_PLATE_FEY","name":"Adept's Duskweaver Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_FEY","name":"Expert's Duskweaver Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_FEY","name":"Master's Duskweaver Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_FEY","name":"Grandmaster's Duskweaver Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_FEY","name":"Elder's Duskweaver Armor","tier":"T8"},{"id":"T4_ARMOR_PLATE_AVALON","name":"Adept's Armor of Valor","tier":"T4"},{"id":"T5_ARMOR_PLATE_AVALON","name":"Expert's Armor of Valor","tier":"T5"},{"id":"T6_ARMOR_PLATE_AVALON","name":"Master's Armor of Valor","tier":"T6"},{"id":"T7_ARMOR_PLATE_AVALON","name":"Grandmaster's Armor of Valor","tier":"T7"},{"id":"T8_ARMOR_PLATE_AVALON","name":"Elder's Armor of Valor","tier":"T8"},{"id":"T4_ARMOR_PLATE_ROYAL","name":"Adept's Royal Armor","tier":"T4"},{"id":"T5_ARMOR_PLATE_ROYAL","name":"Expert's Royal Armor","tier":"T5"},{"id":"T6_ARMOR_PLATE_ROYAL","name":"Master's Royal Armor","tier":"T6"},{"id":"T7_ARMOR_PLATE_ROYAL","name":"Grandmaster's Royal Armor","tier":"T7"},{"id":"T8_ARMOR_PLATE_ROYAL","name":"Elder's Royal Armor","tier":"T8"}]},"Foot Armor":{"Cloth Sandals":[{"id":"T4_SHOES_CLOTH_SET1","name":"Adept's Scholar Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_SET1","name":"Expert's Scholar Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_SET1","name":"Master's Scholar Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_SET1","name":"Grandmaster's Scholar Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_SET1","name":"Elder's Scholar Sandals","tier":"T8"},{"id":"T4_SHOES_CLOTH_SET2","name":"Adept's Cleric Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_SET2","name":"Expert's Cleric Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_SET2","name":"Master's Cleric Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_SET2","name":"Grandmaster's Cleric Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_SET2","name":"Elder's Cleric Sandals","tier":"T8"},{"id":"T4_SHOES_CLOTH_SET3","name":"Adept's Mage Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_SET3","name":"Expert's Mage Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_SET3","name":"Master's Mage Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_SET3","name":"Grandmaster's Mage Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_SET3","name":"Elder's Mage Sandals","tier":"T8"},{"id":"T4_SHOES_CLOTH_KEEPER","name":"Adept's Druid Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_KEEPER","name":"Expert's Druid Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_KEEPER","name":"Master's Druid Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_KEEPER","name":"Grandmaster's Druid Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_KEEPER","name":"Elder's Druid Sandals","tier":"T8"},{"id":"T4_SHOES_CLOTH_HELL","name":"Adept's Fiend Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_HELL","name":"Expert's Fiend Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_HELL","name":"Master's Fiend Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_HELL","name":"Grandmaster's Fiend Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_HELL","name":"Elder's Fiend Sandals","tier":"T8"},{"id":"T4_SHOES_CLOTH_MORGANA","name":"Adept's Cultist Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_MORGANA","name":"Expert's Cultist Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_MORGANA","name":"Master's Cultist Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_MORGANA","name":"Grandmaster's Cultist Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_MORGANA","name":"Elder's Cultist Sandals","tier":"T8"},{"id":"T4_SHOES_CLOTH_FEY","name":"Adept's Feyscale Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_FEY","name":"Expert's Feyscale Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_FEY","name":"Master's Feyscale Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_FEY","name":"Grandmaster's Feyscale Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_FEY","name":"Elder's Feyscale Sandals","tier":"T8"},{"id":"T4_SHOES_CLOTH_AVALON","name":"Adept's Sandals of Purity","tier":"T4"},{"id":"T5_SHOES_CLOTH_AVALON","name":"Expert's Sandals of Purity","tier":"T5"},{"id":"T6_SHOES_CLOTH_AVALON","name":"Master's Sandals of Purity","tier":"T6"},{"id":"T7_SHOES_CLOTH_AVALON","name":"Grandmaster's Sandals of Purity","tier":"T7"},{"id":"T8_SHOES_CLOTH_AVALON","name":"Elder's Sandals of Purity","tier":"T8"},{"id":"T4_SHOES_CLOTH_ROYAL","name":"Adept's Royal Sandals","tier":"T4"},{"id":"T5_SHOES_CLOTH_ROYAL","name":"Expert's Royal Sandals","tier":"T5"},{"id":"T6_SHOES_CLOTH_ROYAL","name":"Master's Royal Sandals","tier":"T6"},{"id":"T7_SHOES_CLOTH_ROYAL","name":"Grandmaster's Royal Sandals","tier":"T7"},{"id":"T8_SHOES_CLOTH_ROYAL","name":"Elder's Royal Sandals","tier":"T8"}],"Leather Shoes":[{"id":"T4_SHOES_LEATHER_SET1","name":"Adept's Mercenary Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_SET1","name":"Expert's Mercenary Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_SET1","name":"Master's Mercenary Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_SET1","name":"Grandmaster's Mercenary Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_SET1","name":"Elder's Mercenary Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_SET2","name":"Adept's Hunter Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_SET2","name":"Expert's Hunter Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_SET2","name":"Master's Hunter Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_SET2","name":"Grandmaster's Hunter Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_SET2","name":"Elder's Hunter Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_SET3","name":"Adept's Assassin Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_SET3","name":"Expert's Assassin Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_SET3","name":"Master's Assassin Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_SET3","name":"Grandmaster's Assassin Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_SET3","name":"Elder's Assassin Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_MORGANA","name":"Adept's Stalker Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_MORGANA","name":"Expert's Stalker Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_MORGANA","name":"Master's Stalker Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_MORGANA","name":"Grandmaster's Stalker Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_MORGANA","name":"Elder's Stalker Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_HELL","name":"Adept's Hellion Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_HELL","name":"Expert's Hellion Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_HELL","name":"Master's Hellion Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_HELL","name":"Grandmaster's Hellion Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_HELL","name":"Elder's Hellion Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_UNDEAD","name":"Adept's Specter Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_UNDEAD","name":"Expert's Specter Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_UNDEAD","name":"Master's Specter Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_UNDEAD","name":"Grandmaster's Specter Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_UNDEAD","name":"Elder's Specter Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_FEY","name":"Adept's Mistwalker Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_FEY","name":"Expert's Mistwalker Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_FEY","name":"Master's Mistwalker Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_FEY","name":"Grandmaster's Mistwalker Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_FEY","name":"Elder's Mistwalker Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_AVALON","name":"Adept's Shoes of Tenacity","tier":"T4"},{"id":"T5_SHOES_LEATHER_AVALON","name":"Expert's Shoes of Tenacity","tier":"T5"},{"id":"T6_SHOES_LEATHER_AVALON","name":"Master's Shoes of Tenacity","tier":"T6"},{"id":"T7_SHOES_LEATHER_AVALON","name":"Grandmaster's Shoes of Tenacity","tier":"T7"},{"id":"T8_SHOES_LEATHER_AVALON","name":"Elder's Shoes of Tenacity","tier":"T8"},{"id":"T4_SHOES_LEATHER_ROYAL","name":"Adept's Royal Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_ROYAL","name":"Expert's Royal Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_ROYAL","name":"Master's Royal Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_ROYAL","name":"Grandmaster's Royal Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_ROYAL","name":"Elder's Royal Shoes","tier":"T8"},{"id":"T4_SHOES_LEATHER_DRAGON","name":"Adept's Dragonslayer Shoes","tier":"T4"},{"id":"T5_SHOES_LEATHER_DRAGON","name":"Expert's Dragonslayer Shoes","tier":"T5"},{"id":"T6_SHOES_LEATHER_DRAGON","name":"Master's Dragonslayer Shoes","tier":"T6"},{"id":"T7_SHOES_LEATHER_DRAGON","name":"Grandmaster's Dragonslayer Shoes","tier":"T7"},{"id":"T8_SHOES_LEATHER_DRAGON","name":"Elder's Dragonslayer Shoes","tier":"T8"}],"Plate Boots":[{"id":"T4_SHOES_PLATE_SET1","name":"Adept's Soldier Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_SET1","name":"Expert's Soldier Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_SET1","name":"Master's Soldier Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_SET1","name":"Grandmaster's Soldier Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_SET1","name":"Elder's Soldier Boots","tier":"T8"},{"id":"T4_SHOES_PLATE_SET2","name":"Adept's Knight Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_SET2","name":"Expert's Knight Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_SET2","name":"Master's Knight Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_SET2","name":"Grandmaster's Knight Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_SET2","name":"Elder's Knight Boots","tier":"T8"},{"id":"T4_SHOES_PLATE_SET3","name":"Adept's Guardian Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_SET3","name":"Expert's Guardian Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_SET3","name":"Master's Guardian Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_SET3","name":"Grandmaster's Guardian Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_SET3","name":"Elder's Guardian Boots","tier":"T8"},{"id":"T4_SHOES_PLATE_UNDEAD","name":"Adept's Graveguard Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_UNDEAD","name":"Expert's Graveguard Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_UNDEAD","name":"Master's Graveguard Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_UNDEAD","name":"Grandmaster's Graveguard Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_UNDEAD","name":"Elder's Graveguard Boots","tier":"T8"},{"id":"T4_SHOES_PLATE_HELL","name":"Adept's Demon Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_HELL","name":"Expert's Demon Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_HELL","name":"Master's Demon Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_HELL","name":"Grandmaster's Demon Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_HELL","name":"Elder's Demon Boots","tier":"T8"},{"id":"T4_SHOES_PLATE_KEEPER","name":"Adept's Judicator Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_KEEPER","name":"Expert's Judicator Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_KEEPER","name":"Master's Judicator Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_KEEPER","name":"Grandmaster's Judicator Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_KEEPER","name":"Elder's Judicator Boots","tier":"T8"},{"id":"T4_SHOES_PLATE_FEY","name":"Adept's Duskweaver Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_FEY","name":"Expert's Duskweaver Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_FEY","name":"Master's Duskweaver Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_FEY","name":"Grandmaster's Duskweaver Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_FEY","name":"Elder's Duskweaver Boots","tier":"T8"},{"id":"T4_SHOES_PLATE_AVALON","name":"Adept's Boots of Valor","tier":"T4"},{"id":"T5_SHOES_PLATE_AVALON","name":"Expert's Boots of Valor","tier":"T5"},{"id":"T6_SHOES_PLATE_AVALON","name":"Master's Boots of Valor","tier":"T6"},{"id":"T7_SHOES_PLATE_AVALON","name":"Grandmaster's Boots of Valor","tier":"T7"},{"id":"T8_SHOES_PLATE_AVALON","name":"Elder's Boots of Valor","tier":"T8"},{"id":"T4_SHOES_PLATE_ROYAL","name":"Adept's Royal Boots","tier":"T4"},{"id":"T5_SHOES_PLATE_ROYAL","name":"Expert's Royal Boots","tier":"T5"},{"id":"T6_SHOES_PLATE_ROYAL","name":"Master's Royal Boots","tier":"T6"},{"id":"T7_SHOES_PLATE_ROYAL","name":"Grandmaster's Royal Boots","tier":"T7"},{"id":"T8_SHOES_PLATE_ROYAL","name":"Elder's Royal Boots","tier":"T8"}]},"Gathering Equipment":{"Tools":{"Fishing Rods":[{"id":"T4_2H_FISHINGROD","name":"Adept's Fishing Rod","tier":"T4"},{"id":"T5_2H_FISHINGROD","name":"Expert's Fishing Rod","tier":"T5"},{"id":"T6_2H_FISHINGROD","name":"Master's Fishing Rod","tier":"T6"},{"id":"T7_2H_FISHINGROD","name":"Grandmaster's Fishing Rod","tier":"T7"},{"id":"T8_2H_FISHINGROD","name":"Elder's Fishing Rod","tier":"T8"}],"Axes":[{"id":"T4_2H_TOOL_AXE","name":"Adept's Axe","tier":"T4"},{"id":"T5_2H_TOOL_AXE","name":"Expert's Axe","tier":"T5"},{"id":"T6_2H_TOOL_AXE","name":"Master's Axe","tier":"T6"},{"id":"T7_2H_TOOL_AXE","name":"Grandmaster's Axe","tier":"T7"},{"id":"T8_2H_TOOL_AXE","name":"Elder's Axe","tier":"T8"}],"Stone Hammers":[{"id":"T4_2H_TOOL_HAMMER","name":"Adept's Stone Hammer","tier":"T4"},{"id":"T5_2H_TOOL_HAMMER","name":"Expert's Stone Hammer","tier":"T5"},{"id":"T6_2H_TOOL_HAMMER","name":"Master's Stone Hammer","tier":"T6"},{"id":"T7_2H_TOOL_HAMMER","name":"Grandmaster's Stone Hammer","tier":"T7"},{"id":"T8_2H_TOOL_HAMMER","name":"Elder's Stone Hammer","tier":"T8"}],"Pickaxes":[{"id":"T4_2H_TOOL_PICK","name":"Adept's Pickaxe","tier":"T4"},{"id":"T5_2H_TOOL_PICK","name":"Expert's Pickaxe","tier":"T5"},{"id":"T6_2H_TOOL_PICK","name":"Master's Pickaxe","tier":"T6"},{"id":"T7_2H_TOOL_PICK","name":"Grandmaster's Pickaxe","tier":"T7"},{"id":"T8_2H_TOOL_PICK","name":"Elder's Pickaxe","tier":"T8"}],"Skinning Knives":[{"id":"T4_2H_TOOL_KNIFE","name":"Adept's Skinning Knife","tier":"T4"},{"id":"T5_2H_TOOL_KNIFE","name":"Expert's Skinning Knife","tier":"T5"},{"id":"T6_2H_TOOL_KNIFE","name":"Master's Skinning Knife","tier":"T6"},{"id":"T7_2H_TOOL_KNIFE","name":"Grandmaster's Skinning Knife","tier":"T7"},{"id":"T8_2H_TOOL_KNIFE","name":"Elder's Skinning Knife","tier":"T8"}],"Sickles":[{"id":"T4_2H_TOOL_SICKLE","name":"Adept's Sickle","tier":"T4"},{"id":"T5_2H_TOOL_SICKLE","name":"Expert's Sickle","tier":"T5"},{"id":"T6_2H_TOOL_SICKLE","name":"Master's Sickle","tier":"T6"},{"id":"T7_2H_TOOL_SICKLE","name":"Grandmaster's Sickle","tier":"T7"},{"id":"T8_2H_TOOL_SICKLE","name":"Elder's Sickle","tier":"T8"}]},"Garbs":{"Fisherman":[{"id":"T4_ARMOR_GATHERER_FISH","name":"Adept's Fisherman Garb","tier":"T4"},{"id":"T5_ARMOR_GATHERER_FISH","name":"Expert's Fisherman Garb","tier":"T5"},{"id":"T6_ARMOR_GATHERER_FISH","name":"Master's Fisherman Garb","tier":"T6"},{"id":"T7_ARMOR_GATHERER_FISH","name":"Grandmaster's Fisherman Garb","tier":"T7"},{"id":"T8_ARMOR_GATHERER_FISH","name":"Elder's Fisherman Garb","tier":"T8"}],"Lumberjack":[{"id":"T4_ARMOR_GATHERER_WOOD","name":"Adept's Lumberjack Garb","tier":"T4"},{"id":"T5_ARMOR_GATHERER_WOOD","name":"Expert's Lumberjack Garb","tier":"T5"},{"id":"T6_ARMOR_GATHERER_WOOD","name":"Master's Lumberjack Garb","tier":"T6"},{"id":"T7_ARMOR_GATHERER_WOOD","name":"Grandmaster's Lumberjack Garb","tier":"T7"},{"id":"T8_ARMOR_GATHERER_WOOD","name":"Elder's Lumberjack Garb","tier":"T8"}],"Quarrier":[{"id":"T4_ARMOR_GATHERER_ROCK","name":"Adept's Quarrier Garb","tier":"T4"},{"id":"T5_ARMOR_GATHERER_ROCK","name":"Expert's Quarrier Garb","tier":"T5"},{"id":"T6_ARMOR_GATHERER_ROCK","name":"Master's Quarrier Garb","tier":"T6"},{"id":"T7_ARMOR_GATHERER_ROCK","name":"Grandmaster's Quarrier Garb","tier":"T7"},{"id":"T8_ARMOR_GATHERER_ROCK","name":"Elder's Quarrier Garb","tier":"T8"}],"Miner":[{"id":"T4_ARMOR_GATHERER_ORE","name":"Adept's Miner Garb","tier":"T4"},{"id":"T5_ARMOR_GATHERER_ORE","name":"Expert's Miner Garb","tier":"T5"},{"id":"T6_ARMOR_GATHERER_ORE","name":"Master's Miner Garb","tier":"T6"},{"id":"T7_ARMOR_GATHERER_ORE","name":"Grandmaster's Miner Garb","tier":"T7"},{"id":"T8_ARMOR_GATHERER_ORE","name":"Elder's Miner Garb","tier":"T8"}],"Skinner":[{"id":"T4_ARMOR_GATHERER_HIDE","name":"Adept's Skinner Garb","tier":"T4"},{"id":"T5_ARMOR_GATHERER_HIDE","name":"Expert's Skinner Garb","tier":"T5"},{"id":"T6_ARMOR_GATHERER_HIDE","name":"Master's Skinner Garb","tier":"T6"},{"id":"T7_ARMOR_GATHERER_HIDE","name":"Grandmaster's Skinner Garb","tier":"T7"},{"id":"T8_ARMOR_GATHERER_HIDE","name":"Elder's Skinner Garb","tier":"T8"}],"Harvester":[{"id":"T4_ARMOR_GATHERER_FIBER","name":"Adept's Harvester Garb","tier":"T4"},{"id":"T5_ARMOR_GATHERER_FIBER","name":"Expert's Harvester Garb","tier":"T5"},{"id":"T6_ARMOR_GATHERER_FIBER","name":"Master's Harvester Garb","tier":"T6"},{"id":"T7_ARMOR_GATHERER_FIBER","name":"Grandmaster's Harvester Garb","tier":"T7"},{"id":"T8_ARMOR_GATHERER_FIBER","name":"Elder's Harvester Garb","tier":"T8"}]},"Caps":{"Fisherman":[{"id":"T4_HEAD_GATHERER_FISH","name":"Adept's Fisherman Cap","tier":"T4"},{"id":"T5_HEAD_GATHERER_FISH","name":"Expert's Fisherman Cap","tier":"T5"},{"id":"T6_HEAD_GATHERER_FISH","name":"Master's Fisherman Cap","tier":"T6"},{"id":"T7_HEAD_GATHERER_FISH","name":"Grandmaster's Fisherman Cap","tier":"T7"},{"id":"T8_HEAD_GATHERER_FISH","name":"Elder's Fisherman Cap","tier":"T8"}],"Lumberjack":[{"id":"T4_HEAD_GATHERER_WOOD","name":"Adept's Lumberjack Cap","tier":"T4"},{"id":"T5_HEAD_GATHERER_WOOD","name":"Expert's Lumberjack Cap","tier":"T5"},{"id":"T6_HEAD_GATHERER_WOOD","name":"Master's Lumberjack Cap","tier":"T6"},{"id":"T7_HEAD_GATHERER_WOOD","name":"Grandmaster's Lumberjack Cap","tier":"T7"},{"id":"T8_HEAD_GATHERER_WOOD","name":"Elder's Lumberjack Cap","tier":"T8"}],"Quarrier":[{"id":"T4_HEAD_GATHERER_ROCK","name":"Adept's Quarrier Cap","tier":"T4"},{"id":"T5_HEAD_GATHERER_ROCK","name":"Expert's Quarrier Cap","tier":"T5"},{"id":"T6_HEAD_GATHERER_ROCK","name":"Master's Quarrier Cap","tier":"T6"},{"id":"T7_HEAD_GATHERER_ROCK","name":"Grandmaster's Quarrier Cap","tier":"T7"},{"id":"T8_HEAD_GATHERER_ROCK","name":"Elder's Quarrier Cap","tier":"T8"}],"Miner":[{"id":"T4_HEAD_GATHERER_ORE","name":"Adept's Miner Cap","tier":"T4"},{"id":"T5_HEAD_GATHERER_ORE","name":"Expert's Miner Cap","tier":"T5"},{"id":"T6_HEAD_GATHERER_ORE","name":"Master's Miner Cap","tier":"T6"},{"id":"T7_HEAD_GATHERER_ORE","name":"Grandmaster's Miner Cap","tier":"T7"},{"id":"T8_HEAD_GATHERER_ORE","name":"Elder's Miner Cap","tier":"T8"}],"Skinner":[{"id":"T4_HEAD_GATHERER_HIDE","name":"Adept's Skinner Cap","tier":"T4"},{"id":"T5_HEAD_GATHERER_HIDE","name":"Expert's Skinner Cap","tier":"T5"},{"id":"T6_HEAD_GATHERER_HIDE","name":"Master's Skinner Cap","tier":"T6"},{"id":"T7_HEAD_GATHERER_HIDE","name":"Grandmaster's Skinner Cap","tier":"T7"},{"id":"T8_HEAD_GATHERER_HIDE","name":"Elder's Skinner Cap","tier":"T8"}],"Harvester":[{"id":"T4_HEAD_GATHERER_FIBER","name":"Adept's Harvester Cap","tier":"T4"},{"id":"T5_HEAD_GATHERER_FIBER","name":"Expert's Harvester Cap","tier":"T5"},{"id":"T6_HEAD_GATHERER_FIBER","name":"Master's Harvester Cap","tier":"T6"},{"id":"T7_HEAD_GATHERER_FIBER","name":"Grandmaster's Harvester Cap","tier":"T7"},{"id":"T8_HEAD_GATHERER_FIBER","name":"Elder's Harvester Cap","tier":"T8"}]},"Workboots":{"Fisherman":[{"id":"T4_SHOES_GATHERER_FISH","name":"Adept's Fisherman Workboots","tier":"T4"},{"id":"T5_SHOES_GATHERER_FISH","name":"Expert's Fisherman Workboots","tier":"T5"},{"id":"T6_SHOES_GATHERER_FISH","name":"Master's Fisherman Workboots","tier":"T6"},{"id":"T7_SHOES_GATHERER_FISH","name":"Grandmaster's Fisherman Workboots","tier":"T7"},{"id":"T8_SHOES_GATHERER_FISH","name":"Elder's Fisherman Workboots","tier":"T8"}],"Lumberjack":[{"id":"T4_SHOES_GATHERER_WOOD","name":"Adept's Lumberjack Workboots","tier":"T4"},{"id":"T5_SHOES_GATHERER_WOOD","name":"Expert's Lumberjack Workboots","tier":"T5"},{"id":"T6_SHOES_GATHERER_WOOD","name":"Master's Lumberjack Workboots","tier":"T6"},{"id":"T7_SHOES_GATHERER_WOOD","name":"Grandmaster's Lumberjack Workboots","tier":"T7"},{"id":"T8_SHOES_GATHERER_WOOD","name":"Elder's Lumberjack Workboots","tier":"T8"}],"Quarrier":[{"id":"T4_SHOES_GATHERER_ROCK","name":"Adept's Quarrier Workboots","tier":"T4"},{"id":"T5_SHOES_GATHERER_ROCK","name":"Expert's Quarrier Workboots","tier":"T5"},{"id":"T6_SHOES_GATHERER_ROCK","name":"Master's Quarrier Workboots","tier":"T6"},{"id":"T7_SHOES_GATHERER_ROCK","name":"Grandmaster's Quarrier Workboots","tier":"T7"},{"id":"T8_SHOES_GATHERER_ROCK","name":"Elder's Quarrier Workboots","tier":"T8"}],"Miner":[{"id":"T4_SHOES_GATHERER_ORE","name":"Adept's Miner Workboots","tier":"T4"},{"id":"T5_SHOES_GATHERER_ORE","name":"Expert's Miner Workboots","tier":"T5"},{"id":"T6_SHOES_GATHERER_ORE","name":"Master's Miner Workboots","tier":"T6"},{"id":"T7_SHOES_GATHERER_ORE","name":"Grandmaster's Miner Workboots","tier":"T7"},{"id":"T8_SHOES_GATHERER_ORE","name":"Elder's Miner Workboots","tier":"T8"}],"Skinner":[{"id":"T4_SHOES_GATHERER_HIDE","name":"Adept's Skinner Workboots","tier":"T4"},{"id":"T5_SHOES_GATHERER_HIDE","name":"Expert's Skinner Workboots","tier":"T5"},{"id":"T6_SHOES_GATHERER_HIDE","name":"Master's Skinner Workboots","tier":"T6"},{"id":"T7_SHOES_GATHERER_HIDE","name":"Grandmaster's Skinner Workboots","tier":"T7"},{"id":"T8_SHOES_GATHERER_HIDE","name":"Elder's Skinner Workboots","tier":"T8"}],"Harvester":[{"id":"T4_SHOES_GATHERER_FIBER","name":"Adept's Harvester Workboots","tier":"T4"},{"id":"T5_SHOES_GATHERER_FIBER","name":"Expert's Harvester Workboots","tier":"T5"},{"id":"T6_SHOES_GATHERER_FIBER","name":"Master's Harvester Workboots","tier":"T6"},{"id":"T7_SHOES_GATHERER_FIBER","name":"Grandmaster's Harvester Workboots","tier":"T7"},{"id":"T8_SHOES_GATHERER_FIBER","name":"Elder's Harvester Workboots","tier":"T8"}]},"Backpacks":{"Fisherman":[{"id":"T4_BACKPACK_GATHERER_FISH","name":"Adept's Fisherman Backpack","tier":"T4"},{"id":"T5_BACKPACK_GATHERER_FISH","name":"Expert's Fisherman Backpack","tier":"T5"},{"id":"T6_BACKPACK_GATHERER_FISH","name":"Master's Fisherman Backpack","tier":"T6"},{"id":"T7_BACKPACK_GATHERER_FISH","name":"Grandmaster's Fisherman Backpack","tier":"T7"},{"id":"T8_BACKPACK_GATHERER_FISH","name":"Elder's Fisherman Backpack","tier":"T8"}],"Lumberjack":[{"id":"T4_BACKPACK_GATHERER_WOOD","name":"Adept's Lumberjack Backpack","tier":"T4"},{"id":"T5_BACKPACK_GATHERER_WOOD","name":"Expert's Lumberjack Backpack","tier":"T5"},{"id":"T6_BACKPACK_GATHERER_WOOD","name":"Master's Lumberjack Backpack","tier":"T6"},{"id":"T7_BACKPACK_GATHERER_WOOD","name":"Grandmaster's Lumberjack Backpack","tier":"T7"},{"id":"T8_BACKPACK_GATHERER_WOOD","name":"Elder's Lumberjack Backpack","tier":"T8"}],"Quarrier":[{"id":"T4_BACKPACK_GATHERER_ROCK","name":"Adept's Quarrier Backpack","tier":"T4"},{"id":"T5_BACKPACK_GATHERER_ROCK","name":"Expert's Quarrier Backpack","tier":"T5"},{"id":"T6_BACKPACK_GATHERER_ROCK","name":"Master's Quarrier Backpack","tier":"T6"},{"id":"T7_BACKPACK_GATHERER_ROCK","name":"Grandmaster's Quarrier Backpack","tier":"T7"},{"id":"T8_BACKPACK_GATHERER_ROCK","name":"Elder's Quarrier Backpack","tier":"T8"}],"Miner":[{"id":"T4_BACKPACK_GATHERER_ORE","name":"Adept's Miner Backpack","tier":"T4"},{"id":"T5_BACKPACK_GATHERER_ORE","name":"Expert's Miner Backpack","tier":"T5"},{"id":"T6_BACKPACK_GATHERER_ORE","name":"Master's Miner Backpack","tier":"T6"},{"id":"T7_BACKPACK_GATHERER_ORE","name":"Grandmaster's Miner Backpack","tier":"T7"},{"id":"T8_BACKPACK_GATHERER_ORE","name":"Elder's Miner Backpack","tier":"T8"}],"Skinner":[{"id":"T4_BACKPACK_GATHERER_HIDE","name":"Adept's Skinner Backpack","tier":"T4"},{"id":"T5_BACKPACK_GATHERER_HIDE","name":"Expert's Skinner Backpack","tier":"T5"},{"id":"T6_BACKPACK_GATHERER_HIDE","name":"Master's Skinner Backpack","tier":"T6"},{"id":"T7_BACKPACK_GATHERER_HIDE","name":"Grandmaster's Skinner Backpack","tier":"T7"},{"id":"T8_BACKPACK_GATHERER_HIDE","name":"Elder's Skinner Backpack","tier":"T8"}],"Harvester":[{"id":"T4_BACKPACK_GATHERER_FIBER","name":"Adept's Harvester Backpack","tier":"T4"},{"id":"T5_BACKPACK_GATHERER_FIBER","name":"Expert's Harvester Backpack","tier":"T5"},{"id":"T6_BACKPACK_GATHERER_FIBER","name":"Master's Harvester Backpack","tier":"T6"},{"id":"T7_BACKPACK_GATHERER_FIBER","name":"Grandmaster's Harvester Backpack","tier":"T7"},{"id":"T8_BACKPACK_GATHERER_FIBER","name":"Elder's Harvester Backpack","tier":"T8"}]},"Tracking Toolkit":[{"id":"T4_2H_TOOL_TRACKING","name":"Adept's Tracking Toolkit","tier":"T4"},{"id":"T5_2H_TOOL_TRACKING","name":"Expert's Tracking Toolkit","tier":"T5"},{"id":"T6_2H_TOOL_TRACKING","name":"Master's Tracking Toolkit","tier":"T6"},{"id":"T7_2H_TOOL_TRACKING","name":"Grandmaster's Tracking Toolkit","tier":"T7"},{"id":"T8_2H_TOOL_TRACKING","name":"Elder's Tracking Toolkit","tier":"T8"}]},"Weapons":{"Bows":[{"id":"T4_2H_BOW","name":"Adept's Bow","tier":"T4"},{"id":"T5_2H_BOW","name":"Expert's Bow","tier":"T5"},{"id":"T6_2H_BOW","name":"Master's Bow","tier":"T6"},{"id":"T7_2H_BOW","name":"Grandmaster's Bow","tier":"T7"},{"id":"T8_2H_BOW","name":"Elder's Bow","tier":"T8"},{"id":"T4_2H_WARBOW","name":"Adept's Warbow","tier":"T4"},{"id":"T5_2H_WARBOW","name":"Expert's Warbow","tier":"T5"},{"id":"T6_2H_WARBOW","name":"Master's Warbow","tier":"T6"},{"id":"T7_2H_WARBOW","name":"Grandmaster's Warbow","tier":"T7"},{"id":"T8_2H_WARBOW","name":"Elder's Warbow","tier":"T8"},{"id":"T4_2H_LONGBOW","name":"Adept's Longbow","tier":"T4"},{"id":"T5_2H_LONGBOW","name":"Expert's Longbow","tier":"T5"},{"id":"T6_2H_LONGBOW","name":"Master's Longbow","tier":"T6"},{"id":"T7_2H_LONGBOW","name":"Grandmaster's Longbow","tier":"T7"},{"id":"T8_2H_LONGBOW","name":"Elder's Longbow","tier":"T8"},{"id":"T4_2H_LONGBOW_UNDEAD","name":"Adept's Whispering Bow","tier":"T4"},{"id":"T5_2H_LONGBOW_UNDEAD","name":"Expert's Whispering Bow","tier":"T5"},{"id":"T6_2H_LONGBOW_UNDEAD","name":"Master's Whispering Bow","tier":"T6"},{"id":"T7_2H_LONGBOW_UNDEAD","name":"Grandmaster's Whispering Bow","tier":"T7"},{"id":"T8_2H_LONGBOW_UNDEAD","name":"Elder's Whispering Bow","tier":"T8"},{"id":"T4_2H_BOW_HELL","name":"Adept's Wailing Bow","tier":"T4"},{"id":"T5_2H_BOW_HELL","name":"Expert's Wailing Bow","tier":"T5"},{"id":"T6_2H_BOW_HELL","name":"Master's Wailing Bow","tier":"T6"},{"id":"T7_2H_BOW_HELL","name":"Grandmaster's Wailing Bow","tier":"T7"},{"id":"T8_2H_BOW_HELL","name":"Elder's Wailing Bow","tier":"T8"},{"id":"T4_2H_BOW_KEEPER","name":"Adept's Bow of Badon","tier":"T4"},{"id":"T5_2H_BOW_KEEPER","name":"Expert's Bow of Badon","tier":"T5"},{"id":"T6_2H_BOW_KEEPER","name":"Master's Bow of Badon","tier":"T6"},{"id":"T7_2H_BOW_KEEPER","name":"Grandmaster's Bow of Badon","tier":"T7"},{"id":"T8_2H_BOW_KEEPER","name":"Elder's Bow of Badon","tier":"T8"},{"id":"T4_2H_BOW_AVALON","name":"Adept's Mistpiercer","tier":"T4"},{"id":"T5_2H_BOW_AVALON","name":"Expert's Mistpiercer","tier":"T5"},{"id":"T6_2H_BOW_AVALON","name":"Master's Mistpiercer","tier":"T6"},{"id":"T7_2H_BOW_AVALON","name":"Grandmaster's Mistpiercer","tier":"T7"},{"id":"T8_2H_BOW_AVALON","name":"Elder's Mistpiercer","tier":"T8"},{"id":"T4_2H_BOW_CRYSTAL","name":"Adept's Skystrider Bow","tier":"T4"},{"id":"T5_2H_BOW_CRYSTAL","name":"Expert's Skystrider Bow","tier":"T5"},{"id":"T6_2H_BOW_CRYSTAL","name":"Master's Skystrider Bow","tier":"T6"},{"id":"T7_2H_BOW_CRYSTAL","name":"Grandmaster's Skystrider Bow","tier":"T7"},{"id":"T8_2H_BOW_CRYSTAL","name":"Elder's Skystrider Bow","tier":"T8"}],"Crossbows":[{"id":"T4_2H_CROSSBOW","name":"Adept's Crossbow","tier":"T4"},{"id":"T5_2H_CROSSBOW","name":"Expert's Crossbow","tier":"T5"},{"id":"T6_2H_CROSSBOW","name":"Master's Crossbow","tier":"T6"},{"id":"T7_2H_CROSSBOW","name":"Grandmaster's Crossbow","tier":"T7"},{"id":"T8_2H_CROSSBOW","name":"Elder's Crossbow","tier":"T8"},{"id":"T4_2H_CROSSBOWLARGE","name":"Adept's Heavy Crossbow","tier":"T4"},{"id":"T5_2H_CROSSBOWLARGE","name":"Expert's Heavy Crossbow","tier":"T5"},{"id":"T6_2H_CROSSBOWLARGE","name":"Master's Heavy Crossbow","tier":"T6"},{"id":"T7_2H_CROSSBOWLARGE","name":"Grandmaster's Heavy Crossbow","tier":"T7"},{"id":"T8_2H_CROSSBOWLARGE","name":"Elder's Heavy Crossbow","tier":"T8"},{"id":"T4_2H_REPEATINGCROSSBOW_UNDEAD","name":"Adept's Weeping Repeater","tier":"T4"},{"id":"T5_2H_REPEATINGCROSSBOW_UNDEAD","name":"Expert's Weeping Repeater","tier":"T5"},{"id":"T6_2H_REPEATINGCROSSBOW_UNDEAD","name":"Master's Weeping Repeater","tier":"T6"},{"id":"T7_2H_REPEATINGCROSSBOW_UNDEAD","name":"Grandmaster's Weeping Repeater","tier":"T7"},{"id":"T8_2H_REPEATINGCROSSBOW_UNDEAD","name":"Elder's Weeping Repeater","tier":"T8"},{"id":"T4_2H_DUALCROSSBOW_HELL","name":"Adept's Boltcasters","tier":"T4"},{"id":"T5_2H_DUALCROSSBOW_HELL","name":"Expert's Boltcasters","tier":"T5"},{"id":"T6_2H_DUALCROSSBOW_HELL","name":"Master's Boltcasters","tier":"T6"},{"id":"T7_2H_DUALCROSSBOW_HELL","name":"Grandmaster's Boltcasters","tier":"T7"},{"id":"T8_2H_DUALCROSSBOW_HELL","name":"Elder's Boltcasters","tier":"T8"},{"id":"T4_2H_CROSSBOWLARGE_MORGANA","name":"Adept's Siegebow","tier":"T4"},{"id":"T5_2H_CROSSBOWLARGE_MORGANA","name":"Expert's Siegebow","tier":"T5"},{"id":"T6_2H_CROSSBOWLARGE_MORGANA","name":"Master's Siegebow","tier":"T6"},{"id":"T7_2H_CROSSBOWLARGE_MORGANA","name":"Grandmaster's Siegebow","tier":"T7"},{"id":"T8_2H_CROSSBOWLARGE_MORGANA","name":"Elder's Siegebow","tier":"T8"},{"id":"T4_2H_CROSSBOW_CANNON_AVALON","name":"Adept's Energy Shaper","tier":"T4"},{"id":"T5_2H_CROSSBOW_CANNON_AVALON","name":"Expert's Energy Shaper","tier":"T5"},{"id":"T6_2H_CROSSBOW_CANNON_AVALON","name":"Master's Energy Shaper","tier":"T6"},{"id":"T7_2H_CROSSBOW_CANNON_AVALON","name":"Grandmaster's Energy Shaper","tier":"T7"},{"id":"T8_2H_CROSSBOW_CANNON_AVALON","name":"Elder's Energy Shaper","tier":"T8"},{"id":"T4_MAIN_1HCROSSBOW","name":"Adept's Light Crossbow","tier":"T4"},{"id":"T5_MAIN_1HCROSSBOW","name":"Expert's Light Crossbow","tier":"T5"},{"id":"T6_MAIN_1HCROSSBOW","name":"Master's Light Crossbow","tier":"T6"},{"id":"T7_MAIN_1HCROSSBOW","name":"Grandmaster's Light Crossbow","tier":"T7"},{"id":"T8_MAIN_1HCROSSBOW","name":"Elder's Light Crossbow","tier":"T8"},{"id":"T4_2H_DUALCROSSBOW_CRYSTAL","name":"Adept's Arclight Blasters","tier":"T4"},{"id":"T5_2H_DUALCROSSBOW_CRYSTAL","name":"Expert's Arclight Blasters","tier":"T5"},{"id":"T6_2H_DUALCROSSBOW_CRYSTAL","name":"Master's Arclight Blasters","tier":"T6"},{"id":"T7_2H_DUALCROSSBOW_CRYSTAL","name":"Grandmaster's Arclight Blasters","tier":"T7"},{"id":"T8_2H_DUALCROSSBOW_CRYSTAL","name":"Elder's Arclight Blasters","tier":"T8"}],"Axes":[{"id":"T4_MAIN_AXE","name":"Adept's Battleaxe","tier":"T4"},{"id":"T5_MAIN_AXE","name":"Expert's Battleaxe","tier":"T5"},{"id":"T6_MAIN_AXE","name":"Master's Battleaxe","tier":"T6"},{"id":"T7_MAIN_AXE","name":"Grandmaster's Battleaxe","tier":"T7"},{"id":"T8_MAIN_AXE","name":"Elder's Battleaxe","tier":"T8"},{"id":"T4_2H_AXE","name":"Adept's Greataxe","tier":"T4"},{"id":"T5_2H_AXE","name":"Expert's Greataxe","tier":"T5"},{"id":"T6_2H_AXE","name":"Master's Greataxe","tier":"T6"},{"id":"T7_2H_AXE","name":"Grandmaster's Greataxe","tier":"T7"},{"id":"T8_2H_AXE","name":"The Hand of Khor","tier":"T8"},{"id":"T4_2H_HALBERD","name":"Adept's Halberd","tier":"T4"},{"id":"T5_2H_HALBERD","name":"Expert's Halberd","tier":"T5"},{"id":"T6_2H_HALBERD","name":"Master's Halberd","tier":"T6"},{"id":"T7_2H_HALBERD","name":"Grandmaster's Halberd","tier":"T7"},{"id":"T8_2H_HALBERD","name":"Elder's Halberd","tier":"T8"},{"id":"T4_2H_HALBERD_MORGANA","name":"Adept's Carrioncaller","tier":"T4"},{"id":"T5_2H_HALBERD_MORGANA","name":"Expert's Carrioncaller","tier":"T5"},{"id":"T6_2H_HALBERD_MORGANA","name":"Master's Carrioncaller","tier":"T6"},{"id":"T7_2H_HALBERD_MORGANA","name":"Grandmaster's Carrioncaller","tier":"T7"},{"id":"T8_2H_HALBERD_MORGANA","name":"Elder's Carrioncaller","tier":"T8"},{"id":"T4_2H_SCYTHE_HELL","name":"Adept's Infernal Scythe","tier":"T4"},{"id":"T5_2H_SCYTHE_HELL","name":"Expert's Infernal Scythe","tier":"T5"},{"id":"T6_2H_SCYTHE_HELL","name":"Master's Infernal Scythe","tier":"T6"},{"id":"T7_2H_SCYTHE_HELL","name":"Grandmaster's Infernal Scythe","tier":"T7"},{"id":"T8_2H_SCYTHE_HELL","name":"Elder's Infernal Scythe","tier":"T8"},{"id":"T4_2H_DUALAXE_KEEPER","name":"Adept's Bear Paws","tier":"T4"},{"id":"T5_2H_DUALAXE_KEEPER","name":"Expert's Bear Paws","tier":"T5"},{"id":"T6_2H_DUALAXE_KEEPER","name":"Master's Bear Paws","tier":"T6"},{"id":"T7_2H_DUALAXE_KEEPER","name":"Grandmaster's Bear Paws","tier":"T7"},{"id":"T8_2H_DUALAXE_KEEPER","name":"Elder's Bear Paws","tier":"T8"},{"id":"T4_2H_AXE_AVALON","name":"Adept's Realmbreaker","tier":"T4"},{"id":"T5_2H_AXE_AVALON","name":"Expert's Realmbreaker","tier":"T5"},{"id":"T6_2H_AXE_AVALON","name":"Master's Realmbreaker","tier":"T6"},{"id":"T7_2H_AXE_AVALON","name":"Grandmaster's Realmbreaker","tier":"T7"},{"id":"T8_2H_AXE_AVALON","name":"Elder's Realmbreaker","tier":"T8"}],"Daggers":[{"id":"T4_MAIN_DAGGER","name":"Adept's Dagger","tier":"T4"},{"id":"T5_MAIN_DAGGER","name":"Expert's Dagger","tier":"T5"},{"id":"T6_MAIN_DAGGER","name":"Master's Dagger","tier":"T6"},{"id":"T7_MAIN_DAGGER","name":"Grandmaster's Dagger","tier":"T7"},{"id":"T8_MAIN_DAGGER","name":"Elder's Dagger","tier":"T8"},{"id":"T4_2H_DAGGERPAIR","name":"Adept's Dagger Pair","tier":"T4"},{"id":"T5_2H_DAGGERPAIR","name":"Expert's Dagger Pair","tier":"T5"},{"id":"T6_2H_DAGGERPAIR","name":"Master's Dagger Pair","tier":"T6"},{"id":"T7_2H_DAGGERPAIR","name":"Grandmaster's Dagger Pair","tier":"T7"},{"id":"T8_2H_DAGGERPAIR","name":"Elder's Dagger Pair","tier":"T8"},{"id":"T4_2H_CLAWPAIR","name":"Adept's Claws","tier":"T4"},{"id":"T5_2H_CLAWPAIR","name":"Expert's Claws","tier":"T5"},{"id":"T6_2H_CLAWPAIR","name":"Master's Claws","tier":"T6"},{"id":"T7_2H_CLAWPAIR","name":"Grandmaster's Claws","tier":"T7"},{"id":"T8_2H_CLAWPAIR","name":"Elder's Claws","tier":"T8"},{"id":"T4_MAIN_RAPIER_MORGANA","name":"Adept's Bloodletter","tier":"T4"},{"id":"T5_MAIN_RAPIER_MORGANA","name":"Expert's Bloodletter","tier":"T5"},{"id":"T6_MAIN_RAPIER_MORGANA","name":"Master's Bloodletter","tier":"T6"},{"id":"T7_MAIN_RAPIER_MORGANA","name":"Grandmaster's Bloodletter","tier":"T7"},{"id":"T8_MAIN_RAPIER_MORGANA","name":"Elder's Bloodletter","tier":"T8"},{"id":"T4_MAIN_DAGGER_HELL","name":"Adept's Demonfang","tier":"T4"},{"id":"T5_MAIN_DAGGER_HELL","name":"Expert's Demonfang","tier":"T5"},{"id":"T6_MAIN_DAGGER_HELL","name":"Master's Demonfang","tier":"T6"},{"id":"T7_MAIN_DAGGER_HELL","name":"Grandmaster's Demonfang","tier":"T7"},{"id":"T8_MAIN_DAGGER_HELL","name":"Elder's Demonfang","tier":"T8"},{"id":"T4_2H_DAGGER_KATAR_AVALON","name":"Adept's Bridled Fury","tier":"T4"},{"id":"T5_2H_DAGGER_KATAR_AVALON","name":"Expert's Bridled Fury","tier":"T5"},{"id":"T6_2H_DAGGER_KATAR_AVALON","name":"Master's Bridled Fury","tier":"T6"},{"id":"T7_2H_DAGGER_KATAR_AVALON","name":"Grandmaster's Bridled Fury","tier":"T7"},{"id":"T8_2H_DAGGER_KATAR_AVALON","name":"Elder's Bridled Fury","tier":"T8"},{"id":"T4_2H_DUALSICKLE_UNDEAD","name":"Adept's Deathgivers","tier":"T4"},{"id":"T5_2H_DUALSICKLE_UNDEAD","name":"Expert's Deathgivers","tier":"T5"},{"id":"T6_2H_DUALSICKLE_UNDEAD","name":"Master's Deathgivers","tier":"T6"},{"id":"T7_2H_DUALSICKLE_UNDEAD","name":"Grandmaster's Deathgivers","tier":"T7"},{"id":"T8_2H_DUALSICKLE_UNDEAD","name":"Elder's Deathgivers","tier":"T8"},{"id":"T4_2H_DAGGERPAIR_CRYSTAL","name":"Adept's Twin Slayers","tier":"T4"},{"id":"T5_2H_DAGGERPAIR_CRYSTAL","name":"Expert's Twin Slayers","tier":"T5"},{"id":"T6_2H_DAGGERPAIR_CRYSTAL","name":"Master's Twin Slayers","tier":"T6"},{"id":"T7_2H_DAGGERPAIR_CRYSTAL","name":"Grandmaster's Twin Slayers","tier":"T7"},{"id":"T8_2H_DAGGERPAIR_CRYSTAL","name":"Elder's Twin Slayers","tier":"T8"}],"Hammers":[{"id":"T4_MAIN_HAMMER","name":"Adept's Hammer","tier":"T4"},{"id":"T5_MAIN_HAMMER","name":"Expert's Hammer","tier":"T5"},{"id":"T6_MAIN_HAMMER","name":"Master's Hammer","tier":"T6"},{"id":"T7_MAIN_HAMMER","name":"Grandmaster's Hammer","tier":"T7"},{"id":"T8_MAIN_HAMMER","name":"Elder's Hammer","tier":"T8"},{"id":"T4_2H_POLEHAMMER","name":"Adept's Polehammer","tier":"T4"},{"id":"T5_2H_POLEHAMMER","name":"Expert's Polehammer","tier":"T5"},{"id":"T6_2H_POLEHAMMER","name":"Master's Polehammer","tier":"T6"},{"id":"T7_2H_POLEHAMMER","name":"Grandmaster's Polehammer","tier":"T7"},{"id":"T8_2H_POLEHAMMER","name":"Elder's Polehammer","tier":"T8"},{"id":"T4_2H_HAMMER","name":"Adept's Great Hammer","tier":"T4"},{"id":"T5_2H_HAMMER","name":"Expert's Great Hammer","tier":"T5"},{"id":"T6_2H_HAMMER","name":"Master's Great Hammer","tier":"T6"},{"id":"T7_2H_HAMMER","name":"Grandmaster's Great Hammer","tier":"T7"},{"id":"T8_2H_HAMMER","name":"Elder's Great Hammer","tier":"T8"},{"id":"T4_2H_HAMMER_UNDEAD","name":"Adept's Tombhammer","tier":"T4"},{"id":"T5_2H_HAMMER_UNDEAD","name":"Expert's Tombhammer","tier":"T5"},{"id":"T6_2H_HAMMER_UNDEAD","name":"Master's Tombhammer","tier":"T6"},{"id":"T7_2H_HAMMER_UNDEAD","name":"Grandmaster's Tombhammer","tier":"T7"},{"id":"T8_2H_HAMMER_UNDEAD","name":"Elder's Tombhammer","tier":"T8"},{"id":"T4_2H_DUALHAMMER_HELL","name":"Adept's Forge Hammers","tier":"T4"},{"id":"T5_2H_DUALHAMMER_HELL","name":"Expert's Forge Hammers","tier":"T5"},{"id":"T6_2H_DUALHAMMER_HELL","name":"Master's Forge Hammers","tier":"T6"},{"id":"T7_2H_DUALHAMMER_HELL","name":"Grandmaster's Forge Hammers","tier":"T7"},{"id":"T8_2H_DUALHAMMER_HELL","name":"Elder's Forge Hammers","tier":"T8"},{"id":"T4_2H_HAMMER_AVALON","name":"Adept's Hand of Justice","tier":"T4"},{"id":"T5_2H_HAMMER_AVALON","name":"Expert's Hand of Justice","tier":"T5"},{"id":"T6_2H_HAMMER_AVALON","name":"Master's Hand of Justice","tier":"T6"},{"id":"T7_2H_HAMMER_AVALON","name":"Grandmaster's Hand of Justice","tier":"T7"},{"id":"T8_2H_HAMMER_AVALON","name":"Elder's Hand of Justice","tier":"T8"},{"id":"T4_2H_RAM_KEEPER","name":"Adept's Grovekeeper","tier":"T4"},{"id":"T5_2H_RAM_KEEPER","name":"Expert's Grovekeeper","tier":"T5"},{"id":"T6_2H_RAM_KEEPER","name":"Master's Grovekeeper","tier":"T6"},{"id":"T7_2H_RAM_KEEPER","name":"Grandmaster's Grovekeeper","tier":"T7"},{"id":"T8_2H_RAM_KEEPER","name":"Elder's Grovekeeper","tier":"T8"},{"id":"T4_2H_HAMMER_CRYSTAL","name":"Adept's Truebolt Hammer","tier":"T4"},{"id":"T5_2H_HAMMER_CRYSTAL","name":"Expert's Truebolt Hammer","tier":"T5"},{"id":"T6_2H_HAMMER_CRYSTAL","name":"Master's Truebolt Hammer","tier":"T6"},{"id":"T7_2H_HAMMER_CRYSTAL","name":"Grandmaster's Truebolt Hammer","tier":"T7"},{"id":"T8_2H_HAMMER_CRYSTAL","name":"Elder's Truebolt Hammer","tier":"T8"}],"War Gloves":[{"id":"T4_2H_KNUCKLES_SET1","name":"Adept's Brawler Gloves","tier":"T4"},{"id":"T5_2H_KNUCKLES_SET1","name":"Expert's Brawler Gloves","tier":"T5"},{"id":"T6_2H_KNUCKLES_SET1","name":"Master's Brawler Gloves","tier":"T6"},{"id":"T7_2H_KNUCKLES_SET1","name":"Grandmaster's Brawler Gloves","tier":"T7"},{"id":"T8_2H_KNUCKLES_SET1","name":"Elder's Brawler Gloves","tier":"T8"},{"id":"T4_2H_KNUCKLES_SET2","name":"Adept's Battle Bracers","tier":"T4"},{"id":"T5_2H_KNUCKLES_SET2","name":"Expert's Battle Bracers","tier":"T5"},{"id":"T6_2H_KNUCKLES_SET2","name":"Master's Battle Bracers","tier":"T6"},{"id":"T7_2H_KNUCKLES_SET2","name":"Grandmaster's Battle Bracers","tier":"T7"},{"id":"T8_2H_KNUCKLES_SET2","name":"Elder's Battle Bracers","tier":"T8"},{"id":"T4_2H_KNUCKLES_SET3","name":"Adept's Spiked Gauntlets","tier":"T4"},{"id":"T5_2H_KNUCKLES_SET3","name":"Expert's Spiked Gauntlets","tier":"T5"},{"id":"T6_2H_KNUCKLES_SET3","name":"Master's Spiked Gauntlets","tier":"T6"},{"id":"T7_2H_KNUCKLES_SET3","name":"Grandmaster's Spiked Gauntlets","tier":"T7"},{"id":"T8_2H_KNUCKLES_SET3","name":"Elder's Spiked Gauntlets","tier":"T8"},{"id":"T4_2H_KNUCKLES_KEEPER","name":"Adept's Ursine Maulers","tier":"T4"},{"id":"T5_2H_KNUCKLES_KEEPER","name":"Expert's Ursine Maulers","tier":"T5"},{"id":"T6_2H_KNUCKLES_KEEPER","name":"Master's Ursine Maulers","tier":"T6"},{"id":"T7_2H_KNUCKLES_KEEPER","name":"Grandmaster's Ursine Maulers","tier":"T7"},{"id":"T8_2H_KNUCKLES_KEEPER","name":"Elder's Ursine Maulers","tier":"T8"},{"id":"T4_2H_KNUCKLES_HELL","name":"Adept's Hellfire Hands","tier":"T4"},{"id":"T5_2H_KNUCKLES_HELL","name":"Expert's Hellfire Hands","tier":"T5"},{"id":"T6_2H_KNUCKLES_HELL","name":"Master's Hellfire Hands","tier":"T6"},{"id":"T7_2H_KNUCKLES_HELL","name":"Grandmaster's Hellfire Hands","tier":"T7"},{"id":"T8_2H_KNUCKLES_HELL","name":"Elder's Hellfire Hands","tier":"T8"},{"id":"T4_2H_KNUCKLES_MORGANA","name":"Adept's Ravenstrike Cestus","tier":"T4"},{"id":"T5_2H_KNUCKLES_MORGANA","name":"Expert's Ravenstrike Cestus","tier":"T5"},{"id":"T6_2H_KNUCKLES_MORGANA","name":"Master's Ravenstrike Cestus","tier":"T6"},{"id":"T7_2H_KNUCKLES_MORGANA","name":"Grandmaster's Ravenstrike Cestus","tier":"T7"},{"id":"T8_2H_KNUCKLES_MORGANA","name":"Elder's Ravenstrike Cestus","tier":"T8"},{"id":"T4_2H_KNUCKLES_AVALON","name":"Adept's Fists of Avalon","tier":"T4"},{"id":"T5_2H_KNUCKLES_AVALON","name":"Expert's Fists of Avalon","tier":"T5"},{"id":"T6_2H_KNUCKLES_AVALON","name":"Master's Fists of Avalon","tier":"T6"},{"id":"T7_2H_KNUCKLES_AVALON","name":"Grandmaster's Fists of Avalon","tier":"T7"},{"id":"T8_2H_KNUCKLES_AVALON","name":"Elder's Fists of Avalon","tier":"T8"},{"id":"T4_2H_KNUCKLES_CRYSTAL","name":"Adept's Forcepulse Bracers","tier":"T4"},{"id":"T5_2H_KNUCKLES_CRYSTAL","name":"Expert's Forcepulse Bracers","tier":"T5"},{"id":"T6_2H_KNUCKLES_CRYSTAL","name":"Master's Forcepulse Bracers","tier":"T6"},{"id":"T7_2H_KNUCKLES_CRYSTAL","name":"Grandmaster's Forcepulse Bracers","tier":"T7"},{"id":"T8_2H_KNUCKLES_CRYSTAL","name":"Elder's Forcepulse Bracers","tier":"T8"}],"Maces":[{"id":"T4_MAIN_MACE","name":"Adept's Mace","tier":"T4"},{"id":"T5_MAIN_MACE","name":"Expert's Mace","tier":"T5"},{"id":"T6_MAIN_MACE","name":"Master's Mace","tier":"T6"},{"id":"T7_MAIN_MACE","name":"Grandmaster's Mace","tier":"T7"},{"id":"T8_MAIN_MACE","name":"Elder's Mace","tier":"T8"},{"id":"T4_2H_MACE","name":"Adept's Heavy Mace","tier":"T4"},{"id":"T5_2H_MACE","name":"Expert's Heavy Mace","tier":"T5"},{"id":"T6_2H_MACE","name":"Master's Heavy Mace","tier":"T6"},{"id":"T7_2H_MACE","name":"Grandmaster's Heavy Mace","tier":"T7"},{"id":"T8_2H_MACE","name":"Elder's Heavy Mace","tier":"T8"},{"id":"T4_2H_FLAIL","name":"Adept's Morning Star","tier":"T4"},{"id":"T5_2H_FLAIL","name":"Expert's Morning Star","tier":"T5"},{"id":"T6_2H_FLAIL","name":"Master's Morning Star","tier":"T6"},{"id":"T7_2H_FLAIL","name":"Grandmaster's Morning Star","tier":"T7"},{"id":"T8_2H_FLAIL","name":"Elder's Morning Star","tier":"T8"},{"id":"T4_MAIN_MACE_HELL","name":"Adept's Incubus Mace","tier":"T4"},{"id":"T5_MAIN_MACE_HELL","name":"Expert's Incubus Mace","tier":"T5"},{"id":"T6_MAIN_MACE_HELL","name":"Master's Incubus Mace","tier":"T6"},{"id":"T7_MAIN_MACE_HELL","name":"Grandmaster's Incubus Mace","tier":"T7"},{"id":"T8_MAIN_MACE_HELL","name":"Elder's Incubus Mace","tier":"T8"},{"id":"T4_2H_MACE_MORGANA","name":"Adept's Camlann Mace","tier":"T4"},{"id":"T5_2H_MACE_MORGANA","name":"Expert's Camlann Mace","tier":"T5"},{"id":"T6_2H_MACE_MORGANA","name":"Master's Camlann Mace","tier":"T6"},{"id":"T7_2H_MACE_MORGANA","name":"Grandmaster's Camlann Mace","tier":"T7"},{"id":"T8_2H_MACE_MORGANA","name":"Elder's Camlann Mace","tier":"T8"},{"id":"T4_MAIN_ROCKMACE_KEEPER","name":"Adept's Bedrock Mace","tier":"T4"},{"id":"T5_MAIN_ROCKMACE_KEEPER","name":"Expert's Bedrock Mace","tier":"T5"},{"id":"T6_MAIN_ROCKMACE_KEEPER","name":"Master's Bedrock Mace","tier":"T6"},{"id":"T7_MAIN_ROCKMACE_KEEPER","name":"Grandmaster's Bedrock Mace","tier":"T7"},{"id":"T8_MAIN_ROCKMACE_KEEPER","name":"Elder's Bedrock Mace","tier":"T8"},{"id":"T4_2H_DUALMACE_AVALON","name":"Adept's Oathkeepers","tier":"T4"},{"id":"T5_2H_DUALMACE_AVALON","name":"Expert's Oathkeepers","tier":"T5"},{"id":"T6_2H_DUALMACE_AVALON","name":"Master's Oathkeepers","tier":"T6"},{"id":"T7_2H_DUALMACE_AVALON","name":"Grandmaster's Oathkeepers","tier":"T7"},{"id":"T8_2H_DUALMACE_AVALON","name":"Elder's Oathkeepers","tier":"T8"},{"id":"T4_MAIN_MACE_CRYSTAL","name":"Adept's Dreadstorm Monarch","tier":"T4"},{"id":"T5_MAIN_MACE_CRYSTAL","name":"Expert's Dreadstorm Monarch","tier":"T5"},{"id":"T6_MAIN_MACE_CRYSTAL","name":"Master's Dreadstorm Monarch","tier":"T6"},{"id":"T7_MAIN_MACE_CRYSTAL","name":"Grandmaster's Dreadstorm Monarch","tier":"T7"},{"id":"T8_MAIN_MACE_CRYSTAL","name":"Elder's Dreadstorm Monarch","tier":"T8"}],"Quarterstaffs":[{"id":"T4_2H_QUARTERSTAFF","name":"Adept's Quarterstaff","tier":"T4"},{"id":"T5_2H_QUARTERSTAFF","name":"Expert's Quarterstaff","tier":"T5"},{"id":"T6_2H_QUARTERSTAFF","name":"Master's Quarterstaff","tier":"T6"},{"id":"T7_2H_QUARTERSTAFF","name":"Grandmaster's Quarterstaff","tier":"T7"},{"id":"T8_2H_QUARTERSTAFF","name":"Elder's Quarterstaff","tier":"T8"},{"id":"T4_2H_IRONCLADEDSTAFF","name":"Adept's Iron-clad Staff","tier":"T4"},{"id":"T5_2H_IRONCLADEDSTAFF","name":"Expert's Iron-clad Staff","tier":"T5"},{"id":"T6_2H_IRONCLADEDSTAFF","name":"Master's Iron-clad Staff","tier":"T6"},{"id":"T7_2H_IRONCLADEDSTAFF","name":"Grandmaster's Iron-clad Staff","tier":"T7"},{"id":"T8_2H_IRONCLADEDSTAFF","name":"Elder's Iron-clad Staff","tier":"T8"},{"id":"T4_2H_DOUBLEBLADEDSTAFF","name":"Adept's Double Bladed Staff","tier":"T4"},{"id":"T5_2H_DOUBLEBLADEDSTAFF","name":"Expert's Double Bladed Staff","tier":"T5"},{"id":"T6_2H_DOUBLEBLADEDSTAFF","name":"Master's Double Bladed Staff","tier":"T6"},{"id":"T7_2H_DOUBLEBLADEDSTAFF","name":"Grandmaster's Double Bladed Staff","tier":"T7"},{"id":"T8_2H_DOUBLEBLADEDSTAFF","name":"Elder's Double Bladed Staff","tier":"T8"},{"id":"T4_2H_QUARTERSTAFF_AVALON","name":"Adept's Grailseeker","tier":"T4"},{"id":"T5_2H_QUARTERSTAFF_AVALON","name":"Expert's Grailseeker","tier":"T5"},{"id":"T6_2H_QUARTERSTAFF_AVALON","name":"Master's Grailseeker","tier":"T6"},{"id":"T7_2H_QUARTERSTAFF_AVALON","name":"Grandmaster's Grailseeker","tier":"T7"},{"id":"T8_2H_QUARTERSTAFF_AVALON","name":"Elder's Grailseeker","tier":"T8"},{"id":"T4_2H_COMBATSTAFF_MORGANA","name":"Adept's Black Monk Staff","tier":"T4"},{"id":"T5_2H_COMBATSTAFF_MORGANA","name":"Expert's Black Monk Staff","tier":"T5"},{"id":"T6_2H_COMBATSTAFF_MORGANA","name":"Master's Black Monk Staff","tier":"T6"},{"id":"T7_2H_COMBATSTAFF_MORGANA","name":"Grandmaster's Black Monk Staff","tier":"T7"},{"id":"T8_2H_COMBATSTAFF_MORGANA","name":"Elder's Black Monk Staff","tier":"T8"},{"id":"T4_2H_TWINSCYTHE_HELL","name":"Adept's Soulscythe","tier":"T4"},{"id":"T5_2H_TWINSCYTHE_HELL","name":"Expert's Soulscythe","tier":"T5"},{"id":"T6_2H_TWINSCYTHE_HELL","name":"Master's Soulscythe","tier":"T6"},{"id":"T7_2H_TWINSCYTHE_HELL","name":"Grandmaster's Soulscythe","tier":"T7"},{"id":"T8_2H_TWINSCYTHE_HELL","name":"Elder's Soulscythe","tier":"T8"},{"id":"T4_2H_ROCKSTAFF_KEEPER","name":"Adept's Staff of Balance","tier":"T4"},{"id":"T5_2H_ROCKSTAFF_KEEPER","name":"Expert's Staff of Balance","tier":"T5"},{"id":"T6_2H_ROCKSTAFF_KEEPER","name":"Master's Staff of Balance","tier":"T6"},{"id":"T7_2H_ROCKSTAFF_KEEPER","name":"Grandmaster's Staff of Balance","tier":"T7"},{"id":"T8_2H_ROCKSTAFF_KEEPER","name":"Elder's Staff of Balance","tier":"T8"},{"id":"T4_2H_DOUBLEBLADEDSTAFF_CRYSTAL","name":"Adept's Phantom Twinblade","tier":"T4"},{"id":"T5_2H_DOUBLEBLADEDSTAFF_CRYSTAL","name":"Expert's Phantom Twinblade","tier":"T5"},{"id":"T6_2H_DOUBLEBLADEDSTAFF_CRYSTAL","name":"Master's Phantom Twinblade","tier":"T6"},{"id":"T7_2H_DOUBLEBLADEDSTAFF_CRYSTAL","name":"Grandmaster's Phantom Twinblade","tier":"T7"},{"id":"T8_2H_DOUBLEBLADEDSTAFF_CRYSTAL","name":"Elder's Phantom Twinblade","tier":"T8"}],"Spears":[{"id":"T4_MAIN_SPEAR","name":"Adept's Spear","tier":"T4"},{"id":"T5_MAIN_SPEAR","name":"Expert's Spear","tier":"T5"},{"id":"T6_MAIN_SPEAR","name":"Master's Spear","tier":"T6"},{"id":"T7_MAIN_SPEAR","name":"Grandmaster's Spear","tier":"T7"},{"id":"T8_MAIN_SPEAR","name":"Elder's Spear","tier":"T8"},{"id":"T4_2H_SPEAR","name":"Adept's Pike","tier":"T4"},{"id":"T5_2H_SPEAR","name":"Expert's Pike","tier":"T5"},{"id":"T6_2H_SPEAR","name":"Master's Pike","tier":"T6"},{"id":"T7_2H_SPEAR","name":"Grandmaster's Pike","tier":"T7"},{"id":"T8_2H_SPEAR","name":"Elder's Pike","tier":"T8"},{"id":"T4_2H_GLAIVE","name":"Adept's Glaive","tier":"T4"},{"id":"T5_2H_GLAIVE","name":"Expert's Glaive","tier":"T5"},{"id":"T6_2H_GLAIVE","name":"Master's Glaive","tier":"T6"},{"id":"T7_2H_GLAIVE","name":"Grandmaster's Glaive","tier":"T7"},{"id":"T8_2H_GLAIVE","name":"Elder's Glaive","tier":"T8"},{"id":"T4_MAIN_SPEAR_KEEPER","name":"Adept's Heron Spear","tier":"T4"},{"id":"T5_MAIN_SPEAR_KEEPER","name":"Expert's Heron Spear","tier":"T5"},{"id":"T6_MAIN_SPEAR_KEEPER","name":"Master's Heron Spear","tier":"T6"},{"id":"T7_MAIN_SPEAR_KEEPER","name":"Grandmaster's Heron Spear","tier":"T7"},{"id":"T8_MAIN_SPEAR_KEEPER","name":"Elder's Heron Spear","tier":"T8"},{"id":"T4_MAIN_SPEAR_LANCE_AVALON","name":"Adept's Daybreaker","tier":"T4"},{"id":"T5_MAIN_SPEAR_LANCE_AVALON","name":"Expert's Daybreaker","tier":"T5"},{"id":"T6_MAIN_SPEAR_LANCE_AVALON","name":"Master's Daybreaker","tier":"T6"},{"id":"T7_MAIN_SPEAR_LANCE_AVALON","name":"Grandmaster's Daybreaker","tier":"T7"},{"id":"T8_MAIN_SPEAR_LANCE_AVALON","name":"Elder's Daybreaker","tier":"T8"},{"id":"T4_2H_HARPOON_HELL","name":"Adept's Spirithunter","tier":"T4"},{"id":"T5_2H_HARPOON_HELL","name":"Expert's Spirithunter","tier":"T5"},{"id":"T6_2H_HARPOON_HELL","name":"Master's Spirithunter","tier":"T6"},{"id":"T7_2H_HARPOON_HELL","name":"Grandmaster's Spirithunter","tier":"T7"},{"id":"T8_2H_HARPOON_HELL","name":"Elder's Spirithunter","tier":"T8"},{"id":"T4_2H_TRIDENT_UNDEAD","name":"Adept's Trinity Spear","tier":"T4"},{"id":"T5_2H_TRIDENT_UNDEAD","name":"Expert's Trinity Spear","tier":"T5"},{"id":"T6_2H_TRIDENT_UNDEAD","name":"Master's Trinity Spear","tier":"T6"},{"id":"T7_2H_TRIDENT_UNDEAD","name":"Grandmaster's Trinity Spear","tier":"T7"},{"id":"T8_2H_TRIDENT_UNDEAD","name":"Elder's Trinity Spear","tier":"T8"},{"id":"T4_2H_GLAIVE_CRYSTAL","name":"Adept's Rift Glaive","tier":"T4"},{"id":"T5_2H_GLAIVE_CRYSTAL","name":"Expert's Rift Glaive","tier":"T5"},{"id":"T6_2H_GLAIVE_CRYSTAL","name":"Master's Rift Glaive","tier":"T6"},{"id":"T7_2H_GLAIVE_CRYSTAL","name":"Grandmaster's Rift Glaive","tier":"T7"},{"id":"T8_2H_GLAIVE_CRYSTAL","name":"Elder's Rift Glaive","tier":"T8"}],"Swords":[{"id":"T4_MAIN_SWORD","name":"Adept's Broadsword","tier":"T4"},{"id":"T5_MAIN_SWORD","name":"Expert's Broadsword","tier":"T5"},{"id":"T6_MAIN_SWORD","name":"Master's Broadsword","tier":"T6"},{"id":"T7_MAIN_SWORD","name":"Grandmaster's Broadsword","tier":"T7"},{"id":"T8_MAIN_SWORD","name":"Elder's Broadsword","tier":"T8"},{"id":"T4_2H_CLAYMORE","name":"Adept's Claymore","tier":"T4"},{"id":"T5_2H_CLAYMORE","name":"Expert's Claymore","tier":"T5"},{"id":"T6_2H_CLAYMORE","name":"Master's Claymore","tier":"T6"},{"id":"T7_2H_CLAYMORE","name":"Grandmaster's Claymore","tier":"T7"},{"id":"T8_2H_CLAYMORE","name":"Elder's Claymore","tier":"T8"},{"id":"T4_2H_DUALSWORD","name":"Adept's Dual Swords","tier":"T4"},{"id":"T5_2H_DUALSWORD","name":"Expert's Dual Swords","tier":"T5"},{"id":"T6_2H_DUALSWORD","name":"Master's Dual Swords","tier":"T6"},{"id":"T7_2H_DUALSWORD","name":"Grandmaster's Dual Swords","tier":"T7"},{"id":"T8_2H_DUALSWORD","name":"Elder's Dual Swords","tier":"T8"},{"id":"T4_2H_CLAYMORE_AVALON","name":"Adept's Kingmaker","tier":"T4"},{"id":"T5_2H_CLAYMORE_AVALON","name":"Expert's Kingmaker","tier":"T5"},{"id":"T6_2H_CLAYMORE_AVALON","name":"Master's Kingmaker","tier":"T6"},{"id":"T7_2H_CLAYMORE_AVALON","name":"Grandmaster's Kingmaker","tier":"T7"},{"id":"T8_2H_CLAYMORE_AVALON","name":"Elder's Kingmaker","tier":"T8"},{"id":"T4_MAIN_SWORD_KEEPER","name":"Adept's Clarent Blade","tier":"T4"},{"id":"T5_MAIN_SWORD_KEEPER","name":"Expert's Clarent Blade","tier":"T5"},{"id":"T6_MAIN_SWORD_KEEPER","name":"Master's Clarent Blade","tier":"T6"},{"id":"T7_MAIN_SWORD_KEEPER","name":"Grandmaster's Clarent Blade","tier":"T7"},{"id":"T8_MAIN_SWORD_KEEPER","name":"Elder's Clarent Blade","tier":"T8"},{"id":"T4_2H_SWORD_HELL","name":"Adept's Carving Sword","tier":"T4"},{"id":"T5_2H_SWORD_HELL","name":"Expert's Carving Sword","tier":"T5"},{"id":"T6_2H_SWORD_HELL","name":"Master's Carving Sword","tier":"T6"},{"id":"T7_2H_SWORD_HELL","name":"Grandmaster's Carving Sword","tier":"T7"},{"id":"T8_2H_SWORD_HELL","name":"Elder's Carving Sword","tier":"T8"},{"id":"T4_2H_DUALSWORD_HELL","name":"Adept's Galatine Pair","tier":"T4"},{"id":"T5_2H_DUALSWORD_HELL","name":"Expert's Galatine Pair","tier":"T5"},{"id":"T6_2H_DUALSWORD_HELL","name":"Master's Galatine Pair","tier":"T6"},{"id":"T7_2H_DUALSWORD_HELL","name":"Grandmaster's Galatine Pair","tier":"T7"},{"id":"T8_2H_DUALSWORD_HELL","name":"Elder's Galatine Pair","tier":"T8"},{"id":"T4_MAIN_SWORD_CRYSTAL","name":"Adept's Infinity Blade","tier":"T4"},{"id":"T5_MAIN_SWORD_CRYSTAL","name":"Expert's Infinity Blade","tier":"T5"},{"id":"T6_MAIN_SWORD_CRYSTAL","name":"Master's Infinity Blade","tier":"T6"},{"id":"T7_MAIN_SWORD_CRYSTAL","name":"Grandmaster's Infinity Blade","tier":"T7"},{"id":"T8_MAIN_SWORD_CRYSTAL","name":"Elder's Infinity Blade","tier":"T8"}],"Arcane Staffs":[{"id":"T4_MAIN_ARCANESTAFF","name":"Adept's Arcane Staff","tier":"T4"},{"id":"T5_MAIN_ARCANESTAFF","name":"Expert's Arcane Staff","tier":"T5"},{"id":"T6_MAIN_ARCANESTAFF","name":"Master's Arcane Staff","tier":"T6"},{"id":"T7_MAIN_ARCANESTAFF","name":"Grandmaster's Arcane Staff","tier":"T7"},{"id":"T8_MAIN_ARCANESTAFF","name":"Elder's Arcane Staff","tier":"T8"},{"id":"T4_2H_ARCANESTAFF","name":"Adept's Great Arcane Staff","tier":"T4"},{"id":"T5_2H_ARCANESTAFF","name":"Expert's Great Arcane Staff","tier":"T5"},{"id":"T6_2H_ARCANESTAFF","name":"Master's Great Arcane Staff","tier":"T6"},{"id":"T7_2H_ARCANESTAFF","name":"Grandmaster's Great Arcane Staff","tier":"T7"},{"id":"T8_2H_ARCANESTAFF","name":"Elder's Great Arcane Staff","tier":"T8"},{"id":"T4_MAIN_ARCANESTAFF_UNDEAD","name":"Adept's Witchwork Staff","tier":"T4"},{"id":"T5_MAIN_ARCANESTAFF_UNDEAD","name":"Expert's Witchwork Staff","tier":"T5"},{"id":"T6_MAIN_ARCANESTAFF_UNDEAD","name":"Master's Witchwork Staff","tier":"T6"},{"id":"T7_MAIN_ARCANESTAFF_UNDEAD","name":"Grandmaster's Witchwork Staff","tier":"T7"},{"id":"T8_MAIN_ARCANESTAFF_UNDEAD","name":"Elder's Witchwork Staff","tier":"T8"},{"id":"T4_2H_ARCANESTAFF_HELL","name":"Adept's Occult Staff","tier":"T4"},{"id":"T5_2H_ARCANESTAFF_HELL","name":"Expert's Occult Staff","tier":"T5"},{"id":"T6_2H_ARCANESTAFF_HELL","name":"Master's Occult Staff","tier":"T6"},{"id":"T7_2H_ARCANESTAFF_HELL","name":"Grandmaster's Occult Staff","tier":"T7"},{"id":"T8_2H_ARCANESTAFF_HELL","name":"Elder's Occult Staff","tier":"T8"},{"id":"T42H_ENIGMATICSTAFF","name":"Adept's Enigmatic Staff","tier":"T4"},{"id":"T52H_ENIGMATICSTAFF","name":"Expert's Enigmatic Staff","tier":"T5"},{"id":"T62H_ENIGMATICSTAFF","name":"Master's Enigmatic Staff","tier":"T6"},{"id":"T72H_ENIGMATICSTAFF","name":"Grandmaster's Enigmatic Staff","tier":"T7"},{"id":"T82H_ENIGMATICSTAFF","name":"Elder's Enigmatic Staff","tier":"T8"},{"id":"T42H_ENIGMATICORB_MORGANA","name":"Adept's Malevolent Locus","tier":"T4"},{"id":"T52H_ENIGMATICORB_MORGANA","name":"Expert's Malevolent Locus","tier":"T5"},{"id":"T62H_ENIGMATICORB_MORGANA","name":"Master's Malevolent Locus","tier":"T6"},{"id":"T72H_ENIGMATICORB_MORGANA","name":"Grandmaster's Malevolent Locus","tier":"T7"},{"id":"T82H_ENIGMATICORB_MORGANA","name":"Elder's Malevolent Locus","tier":"T8"},{"id":"T42H_ARCANE_RINGPAIR_AVALON","name":"Adept's Evensong","tier":"T4"},{"id":"T52H_ARCANE_RINGPAIR_AVALON","name":"Expert's Evensong","tier":"T5"},{"id":"T62H_ARCANE_RINGPAIR_AVALON","name":"Master's Evensong","tier":"T6"},{"id":"T72H_ARCANE_RINGPAIR_AVALON","name":"Grandmaster's Evensong","tier":"T7"},{"id":"T82H_ARCANE_RINGPAIR_AVALON","name":"Elder's Evensong","tier":"T8"},{"id":"T42H_ARCANESTAFF_CRYSTAL","name":"Adept's Astral Staff","tier":"T4"},{"id":"T52H_ARCANESTAFF_CRYSTAL","name":"Expert's Astral Staff","tier":"T5"},{"id":"T62H_ARCANESTAFF_CRYSTAL","name":"Master's Astral Staff","tier":"T6"},{"id":"T72H_ARCANESTAFF_CRYSTAL","name":"Grandmaster's Astral Staff","tier":"T7"},{"id":"T82H_ARCANESTAFF_CRYSTAL","name":"Elder's Astral Staff","tier":"T8"}],"Cursed Staffs":[{"id":"T4_MAIN_CURSEDSTAFF","name":"Adept's Cursed Staff","tier":"T4"},{"id":"T5_MAIN_CURSEDSTAFF","name":"Expert's Cursed Staff","tier":"T5"},{"id":"T6_MAIN_CURSEDSTAFF","name":"Master's Cursed Staff","tier":"T6"},{"id":"T7_MAIN_CURSEDSTAFF","name":"Grandmaster's Cursed Staff","tier":"T7"},{"id":"T8_MAIN_CURSEDSTAFF","name":"Elder's Cursed Staff","tier":"T8"},{"id":"T4_2H_CURSEDSTAFF","name":"Adept's Great Cursed Staff","tier":"T4"},{"id":"T5_2H_CURSEDSTAFF","name":"Expert's Great Cursed Staff","tier":"T5"},{"id":"T6_2H_CURSEDSTAFF","name":"Master's Great Cursed Staff","tier":"T6"},{"id":"T7_2H_CURSEDSTAFF","name":"Grandmaster's Great Cursed Staff","tier":"T7"},{"id":"T8_2H_CURSEDSTAFF","name":"Elder's Great Cursed Staff","tier":"T8"},{"id":"T4_MAIN_CURSEDSTAFF_UNDEAD","name":"Adept's Lifecurse Staff","tier":"T4"},{"id":"T5_MAIN_CURSEDSTAFF_UNDEAD","name":"Expert's Lifecurse Staff","tier":"T5"},{"id":"T6_MAIN_CURSEDSTAFF_UNDEAD","name":"Master's Lifecurse Staff","tier":"T6"},{"id":"T7_MAIN_CURSEDSTAFF_UNDEAD","name":"Grandmaster's Lifecurse Staff","tier":"T7"},{"id":"T8_MAIN_CURSEDSTAFF_UNDEAD","name":"Elder's Lifecurse Staff","tier":"T8"},{"id":"T4_2H_SKULLORB_HELL","name":"Adept's Cursed Skull","tier":"T4"},{"id":"T5_2H_SKULLORB_HELL","name":"Expert's Cursed Skull","tier":"T5"},{"id":"T6_2H_SKULLORB_HELL","name":"Master's Cursed Skull","tier":"T6"},{"id":"T7_2H_SKULLORB_HELL","name":"Grandmaster's Cursed Skull","tier":"T7"},{"id":"T8_2H_SKULLORB_HELL","name":"Elder's Cursed Skull","tier":"T8"},{"id":"T4_2H_CURSEDSTAFF_MORGANA","name":"Adept's Damnation Staff","tier":"T4"},{"id":"T5_2H_CURSEDSTAFF_MORGANA","name":"Expert's Damnation Staff","tier":"T5"},{"id":"T6_2H_CURSEDSTAFF_MORGANA","name":"Master's Damnation Staff","tier":"T6"},{"id":"T7_2H_CURSEDSTAFF_MORGANA","name":"Grandmaster's Damnation Staff","tier":"T7"},{"id":"T8_2H_CURSEDSTAFF_MORGANA","name":"Elder's Damnation Staff","tier":"T8"},{"id":"T4_MAIN_CURSEDSTAFF_AVALON","name":"Adept's Shadowcaller","tier":"T4"},{"id":"T5_MAIN_CURSEDSTAFF_AVALON","name":"Expert's Shadowcaller","tier":"T5"},{"id":"T6_MAIN_CURSEDSTAFF_AVALON","name":"Master's Shadowcaller","tier":"T6"},{"id":"T7_MAIN_CURSEDSTAFF_AVALON","name":"Grandmaster's Shadowcaller","tier":"T7"},{"id":"T8_MAIN_CURSEDSTAFF_AVALON","name":"Elder's Shadowcaller","tier":"T8"},{"id":"T42H_DEMONICSTAFF","name":"Adept's Demonic Staff","tier":"T4"},{"id":"T52H_DEMONICSTAFF","name":"Expert's Demonic Staff","tier":"T5"},{"id":"T62H_DEMONICSTAFF","name":"Master's Demonic Staff","tier":"T6"},{"id":"T72H_DEMONICSTAFF","name":"Grandmaster's Demonic Staff","tier":"T7"},{"id":"T82H_DEMONICSTAFF","name":"Elder's Demonic Staff","tier":"T8"},{"id":"T42H_CURSEDSTAFF_CRYSTAL","name":"Adept's Rotcaller Staff","tier":"T4"},{"id":"T52H_CURSEDSTAFF_CRYSTAL","name":"Expert's Rotcaller Staff","tier":"T5"},{"id":"T62H_CURSEDSTAFF_CRYSTAL","name":"Master's Rotcaller Staff","tier":"T6"},{"id":"T72H_CURSEDSTAFF_CRYSTAL","name":"Grandmaster's Rotcaller Staff","tier":"T7"},{"id":"T82H_CURSEDSTAFF_CRYSTAL","name":"Elder's Rotcaller Staff","tier":"T8"}],"Fire Staffs":[{"id":"T4_MAIN_FIRESTAFF","name":"Adept's Fire Staff","tier":"T4"},{"id":"T5_MAIN_FIRESTAFF","name":"Expert's Fire Staff","tier":"T5"},{"id":"T6_MAIN_FIRESTAFF","name":"Master's Fire Staff","tier":"T6"},{"id":"T7_MAIN_FIRESTAFF","name":"Grandmaster's Fire Staff","tier":"T7"},{"id":"T8_MAIN_FIRESTAFF","name":"Elder's Fire Staff","tier":"T8"},{"id":"T4_2H_FIRESTAFF","name":"Adept's Great Fire Staff","tier":"T4"},{"id":"T5_2H_FIRESTAFF","name":"Expert's Great Fire Staff","tier":"T5"},{"id":"T6_2H_FIRESTAFF","name":"Master's Great Fire Staff","tier":"T6"},{"id":"T7_2H_FIRESTAFF","name":"Grandmaster's Great Fire Staff","tier":"T7"},{"id":"T8_2H_FIRESTAFF","name":"Vendetta's Wrath","tier":"T8"},{"id":"T4_2H_INFERNOSTAFF","name":"Adept's Infernal Staff","tier":"T4"},{"id":"T5_2H_INFERNOSTAFF","name":"Expert's Infernal Staff","tier":"T5"},{"id":"T6_2H_INFERNOSTAFF","name":"Master's Infernal Staff","tier":"T6"},{"id":"T7_2H_INFERNOSTAFF","name":"Grandmaster's Infernal Staff","tier":"T7"},{"id":"T8_2H_INFERNOSTAFF","name":"Elder's Infernal Staff","tier":"T8"},{"id":"T4_MAIN_FIRESTAFF_KEEPER","name":"Adept's Wildfire Staff","tier":"T4"},{"id":"T5_MAIN_FIRESTAFF_KEEPER","name":"Expert's Wildfire Staff","tier":"T5"},{"id":"T6_MAIN_FIRESTAFF_KEEPER","name":"Master's Wildfire Staff","tier":"T6"},{"id":"T7_MAIN_FIRESTAFF_KEEPER","name":"Grandmaster's Wildfire Staff","tier":"T7"},{"id":"T8_MAIN_FIRESTAFF_KEEPER","name":"Elder's Wildfire Staff","tier":"T8"},{"id":"T4_2H_FIRESTAFF_HELL","name":"Adept's Brimstone Staff","tier":"T4"},{"id":"T5_2H_FIRESTAFF_HELL","name":"Expert's Brimstone Staff","tier":"T5"},{"id":"T6_2H_FIRESTAFF_HELL","name":"Master's Brimstone Staff","tier":"T6"},{"id":"T7_2H_FIRESTAFF_HELL","name":"Grandmaster's Brimstone Staff","tier":"T7"},{"id":"T8_2H_FIRESTAFF_HELL","name":"Elder's Brimstone Staff","tier":"T8"},{"id":"T4_2H_INFERNOSTAFF_MORGANA","name":"Adept's Blazing Staff","tier":"T4"},{"id":"T5_2H_INFERNOSTAFF_MORGANA","name":"Expert's Blazing Staff","tier":"T5"},{"id":"T6_2H_INFERNOSTAFF_MORGANA","name":"Master's Blazing Staff","tier":"T6"},{"id":"T7_2H_INFERNOSTAFF_MORGANA","name":"Grandmaster's Blazing Staff","tier":"T7"},{"id":"T8_2H_INFERNOSTAFF_MORGANA","name":"Elder's Blazing Staff","tier":"T8"},{"id":"T42H_FIRE_RINGPAIR_AVALON","name":"Adept's Dawnsong","tier":"T4"},{"id":"T52H_FIRE_RINGPAIR_AVALON","name":"Expert's Dawnsong","tier":"T5"},{"id":"T62H_FIRE_RINGPAIR_AVALON","name":"Master's Dawnsong","tier":"T6"},{"id":"T72H_FIRE_RINGPAIR_AVALON","name":"Grandmaster's Dawnsong","tier":"T7"},{"id":"T82H_FIRE_RINGPAIR_AVALON","name":"Elder's Dawnsong","tier":"T8"},{"id":"T4MAIN_FIRESTAFF_CRYSTAL","name":"Adept's Flamewalker Staff","tier":"T4"},{"id":"T5MAIN_FIRESTAFF_CRYSTAL","name":"Expert's Flamewalker Staff","tier":"T5"},{"id":"T6MAIN_FIRESTAFF_CRYSTAL","name":"Master's Flamewalker Staff","tier":"T6"},{"id":"T7MAIN_FIRESTAFF_CRYSTAL","name":"Grandmaster's Flamewalker Staff","tier":"T7"},{"id":"T8MAIN_FIRESTAFF_CRYSTAL","name":"Elder's Flamewalker Staff","tier":"T8"}],"Frost Staffs":[{"id":"T4_MAIN_FROSTSTAFF","name":"Adept's Frost Staff","tier":"T4"},{"id":"T5_MAIN_FROSTSTAFF","name":"Expert's Frost Staff","tier":"T5"},{"id":"T6_MAIN_FROSTSTAFF","name":"Master's Frost Staff","tier":"T6"},{"id":"T7_MAIN_FROSTSTAFF","name":"Grandmaster's Frost Staff","tier":"T7"},{"id":"T8_MAIN_FROSTSTAFF","name":"Elder's Frost Staff","tier":"T8"},{"id":"T4_2H_FROSTSTAFF","name":"Adept's Great Frost Staff","tier":"T4"},{"id":"T5_2H_FROSTSTAFF","name":"Expert's Great Frost Staff","tier":"T5"},{"id":"T6_2H_FROSTSTAFF","name":"Master's Great Frost Staff","tier":"T6"},{"id":"T7_2H_FROSTSTAFF","name":"Grandmaster's Great Frost Staff","tier":"T7"},{"id":"T8_2H_FROSTSTAFF","name":"Elder's Great Frost Staff","tier":"T8"},{"id":"T4_MAIN_FROSTSTAFF_KEEPER","name":"Adept's Hoarfrost Staff","tier":"T4"},{"id":"T5_MAIN_FROSTSTAFF_KEEPER","name":"Expert's Hoarfrost Staff","tier":"T5"},{"id":"T6_MAIN_FROSTSTAFF_KEEPER","name":"Master's Hoarfrost Staff","tier":"T6"},{"id":"T7_MAIN_FROSTSTAFF_KEEPER","name":"Grandmaster's Hoarfrost Staff","tier":"T7"},{"id":"T8_MAIN_FROSTSTAFF_KEEPER","name":"Elder's Hoarfrost Staff","tier":"T8"},{"id":"T4_MAIN_FROSTSTAFF_AVALON","name":"Adept's Chillhowl","tier":"T4"},{"id":"T5_MAIN_FROSTSTAFF_AVALON","name":"Expert's Chillhowl","tier":"T5"},{"id":"T6_MAIN_FROSTSTAFF_AVALON","name":"Master's Chillhowl","tier":"T6"},{"id":"T7_MAIN_FROSTSTAFF_AVALON","name":"Grandmaster's Chillhowl","tier":"T7"},{"id":"T8_MAIN_FROSTSTAFF_AVALON","name":"Elder's Chillhowl","tier":"T8"},{"id":"T42H_ARCTICSTAFF","name":"Adept's Arctic Staff","tier":"T4"},{"id":"T52H_ARCTICSTAFF","name":"Expert's Arctic Staff","tier":"T5"},{"id":"T62H_ARCTICSTAFF","name":"Master's Arctic Staff","tier":"T6"},{"id":"T72H_ARCTICSTAFF","name":"Grandmaster's Arctic Staff","tier":"T7"},{"id":"T82H_ARCTICSTAFF","name":"Elder's Arctic Staff","tier":"T8"},{"id":"T42H_GLACIALSTAFF","name":"Adept's Glacial Staff","tier":"T4"},{"id":"T52H_GLACIALSTAFF","name":"Expert's Glacial Staff","tier":"T5"},{"id":"T62H_GLACIALSTAFF","name":"Master's Glacial Staff","tier":"T6"},{"id":"T72H_GLACIALSTAFF","name":"Grandmaster's Glacial Staff","tier":"T7"},{"id":"T82H_GLACIALSTAFF","name":"Elder's Glacial Staff","tier":"T8"},{"id":"T42H_ICEGAUNTLETS_HELL","name":"Adept's Icicle Staff","tier":"T4"},{"id":"T52H_ICEGAUNTLETS_HELL","name":"Expert's Icicle Staff","tier":"T5"},{"id":"T62H_ICEGAUNTLETS_HELL","name":"Master's Icicle Staff","tier":"T6"},{"id":"T72H_ICEGAUNTLETS_HELL","name":"Grandmaster's Icicle Staff","tier":"T7"},{"id":"T82H_ICEGAUNTLETS_HELL","name":"Elder's Icicle Staff","tier":"T8"},{"id":"T42H_ICECRYSTAL_UNDEAD","name":"Adept's Permafrost Prism","tier":"T4"},{"id":"T52H_ICECRYSTAL_UNDEAD","name":"Expert's Permafrost Prism","tier":"T5"},{"id":"T62H_ICECRYSTAL_UNDEAD","name":"Master's Permafrost Prism","tier":"T6"},{"id":"T72H_ICECRYSTAL_UNDEAD","name":"Grandmaster's Permafrost Prism","tier":"T7"},{"id":"T82H_ICECRYSTAL_UNDEAD","name":"Elder's Permafrost Prism","tier":"T8"}],"Holy Staffs":[{"id":"T4_MAIN_HOLYSTAFF","name":"Adept's Holy Staff","tier":"T4"},{"id":"T5_MAIN_HOLYSTAFF","name":"Expert's Holy Staff","tier":"T5"},{"id":"T6_MAIN_HOLYSTAFF","name":"Master's Holy Staff","tier":"T6"},{"id":"T7_MAIN_HOLYSTAFF","name":"Grandmaster's Holy Staff","tier":"T7"},{"id":"T8_MAIN_HOLYSTAFF","name":"Elder's Holy Staff","tier":"T8"},{"id":"T4_2H_HOLYSTAFF","name":"Adept's Great Holy Staff","tier":"T4"},{"id":"T5_2H_HOLYSTAFF","name":"Expert's Great Holy Staff","tier":"T5"},{"id":"T6_2H_HOLYSTAFF","name":"Master's Great Holy Staff","tier":"T6"},{"id":"T7_2H_HOLYSTAFF","name":"Grandmaster's Great Holy Staff","tier":"T7"},{"id":"T8_2H_HOLYSTAFF","name":"Elder's Great Holy Staff","tier":"T8"},{"id":"T4_MAIN_HOLYSTAFF_MORGANA","name":"Adept's Lifetouch Staff","tier":"T4"},{"id":"T5_MAIN_HOLYSTAFF_MORGANA","name":"Expert's Lifetouch Staff","tier":"T5"},{"id":"T6_MAIN_HOLYSTAFF_MORGANA","name":"Master's Lifetouch Staff","tier":"T6"},{"id":"T7_MAIN_HOLYSTAFF_MORGANA","name":"Grandmaster's Lifetouch Staff","tier":"T7"},{"id":"T8_MAIN_HOLYSTAFF_MORGANA","name":"Elder's Lifetouch Staff","tier":"T8"},{"id":"T4_2H_HOLYSTAFF_HELL","name":"Adept's Fallen Staff","tier":"T4"},{"id":"T5_2H_HOLYSTAFF_HELL","name":"Expert's Fallen Staff","tier":"T5"},{"id":"T6_2H_HOLYSTAFF_HELL","name":"Master's Fallen Staff","tier":"T6"},{"id":"T7_2H_HOLYSTAFF_HELL","name":"Grandmaster's Fallen Staff","tier":"T7"},{"id":"T8_2H_HOLYSTAFF_HELL","name":"Elder's Fallen Staff","tier":"T8"},{"id":"T4_2H_HOLYSTAFF_UNDEAD","name":"Adept's Redemption Staff","tier":"T4"},{"id":"T5_2H_HOLYSTAFF_UNDEAD","name":"Expert's Redemption Staff","tier":"T5"},{"id":"T6_2H_HOLYSTAFF_UNDEAD","name":"Master's Redemption Staff","tier":"T6"},{"id":"T7_2H_HOLYSTAFF_UNDEAD","name":"Grandmaster's Redemption Staff","tier":"T7"},{"id":"T8_2H_HOLYSTAFF_UNDEAD","name":"Elder's Redemption Staff","tier":"T8"},{"id":"T4_MAIN_HOLYSTAFF_AVALON","name":"Adept's Hallowfall","tier":"T4"},{"id":"T5_MAIN_HOLYSTAFF_AVALON","name":"Expert's Hallowfall","tier":"T5"},{"id":"T6_MAIN_HOLYSTAFF_AVALON","name":"Master's Hallowfall","tier":"T6"},{"id":"T7_MAIN_HOLYSTAFF_AVALON","name":"Grandmaster's Hallowfall","tier":"T7"},{"id":"T8_MAIN_HOLYSTAFF_AVALON","name":"Elder's Hallowfall","tier":"T8"},{"id":"T42H_DIVINESTAFF","name":"Adept's Divine Staff","tier":"T4"},{"id":"T52H_DIVINESTAFF","name":"Expert's Divine Staff","tier":"T5"},{"id":"T62H_DIVINESTAFF","name":"Master's Divine Staff","tier":"T6"},{"id":"T72H_DIVINESTAFF","name":"Grandmaster's Divine Staff","tier":"T7"},{"id":"T82H_DIVINESTAFF","name":"Elder's Divine Staff","tier":"T8"},{"id":"T42H_HOLYSTAFF_CRYSTAL","name":"Adept's Exalted Staff","tier":"T4"},{"id":"T52H_HOLYSTAFF_CRYSTAL","name":"Expert's Exalted Staff","tier":"T5"},{"id":"T62H_HOLYSTAFF_CRYSTAL","name":"Master's Exalted Staff","tier":"T6"},{"id":"T72H_HOLYSTAFF_CRYSTAL","name":"Grandmaster's Exalted Staff","tier":"T7"},{"id":"T82H_HOLYSTAFF_CRYSTAL","name":"Elder's Exalted Staff","tier":"T8"}],"Nature Staffs":[{"id":"T4_MAIN_NATURESTAFF","name":"Adept's Nature Staff","tier":"T4"},{"id":"T5_MAIN_NATURESTAFF","name":"Expert's Nature Staff","tier":"T5"},{"id":"T6_MAIN_NATURESTAFF","name":"Master's Nature Staff","tier":"T6"},{"id":"T7_MAIN_NATURESTAFF","name":"Grandmaster's Nature Staff","tier":"T7"},{"id":"T8_MAIN_NATURESTAFF","name":"Elder's Nature Staff","tier":"T8"},{"id":"T4_2H_NATURESTAFF","name":"Adept's Great Nature Staff","tier":"T4"},{"id":"T5_2H_NATURESTAFF","name":"Expert's Great Nature Staff","tier":"T5"},{"id":"T6_2H_NATURESTAFF","name":"Master's Great Nature Staff","tier":"T6"},{"id":"T7_2H_NATURESTAFF","name":"Grandmaster's Great Nature Staff","tier":"T7"},{"id":"T8_2H_NATURESTAFF","name":"Elder's Great Nature Staff","tier":"T8"},{"id":"T4_2H_WILDSTAFF","name":"Adept's Wild Staff","tier":"T4"},{"id":"T5_2H_WILDSTAFF","name":"Expert's Wild Staff","tier":"T5"},{"id":"T6_2H_WILDSTAFF","name":"Master's Wild Staff","tier":"T6"},{"id":"T7_2H_WILDSTAFF","name":"Grandmaster's Wild Staff","tier":"T7"},{"id":"T8_2H_WILDSTAFF","name":"Elder's Wild Staff","tier":"T8"},{"id":"T4_MAIN_NATURESTAFF_KEEPER","name":"Adept's Druidic Staff","tier":"T4"},{"id":"T5_MAIN_NATURESTAFF_KEEPER","name":"Expert's Druidic Staff","tier":"T5"},{"id":"T6_MAIN_NATURESTAFF_KEEPER","name":"Master's Druidic Staff","tier":"T6"},{"id":"T7_MAIN_NATURESTAFF_KEEPER","name":"Grandmaster's Druidic Staff","tier":"T7"},{"id":"T8_MAIN_NATURESTAFF_KEEPER","name":"Elder's Druidic Staff","tier":"T8"},{"id":"T4_2H_NATURESTAFF_HELL","name":"Adept's Blight Staff","tier":"T4"},{"id":"T5_2H_NATURESTAFF_HELL","name":"Expert's Blight Staff","tier":"T5"},{"id":"T6_2H_NATURESTAFF_HELL","name":"Master's Blight Staff","tier":"T6"},{"id":"T7_2H_NATURESTAFF_HELL","name":"Grandmaster's Blight Staff","tier":"T7"},{"id":"T8_2H_NATURESTAFF_HELL","name":"Elder's Blight Staff","tier":"T8"},{"id":"T4_2H_NATURESTAFF_KEEPER","name":"Adept's Rampant Staff","tier":"T4"},{"id":"T5_2H_NATURESTAFF_KEEPER","name":"Expert's Rampant Staff","tier":"T5"},{"id":"T6_2H_NATURESTAFF_KEEPER","name":"Master's Rampant Staff","tier":"T6"},{"id":"T7_2H_NATURESTAFF_KEEPER","name":"Grandmaster's Rampant Staff","tier":"T7"},{"id":"T8_2H_NATURESTAFF_KEEPER","name":"Elder's Rampant Staff","tier":"T8"},{"id":"T4_MAIN_NATURESTAFF_AVALON","name":"Adept's Ironroot Staff","tier":"T4"},{"id":"T5_MAIN_NATURESTAFF_AVALON","name":"Expert's Ironroot Staff","tier":"T5"},{"id":"T6_MAIN_NATURESTAFF_AVALON","name":"Master's Ironroot Staff","tier":"T6"},{"id":"T7_MAIN_NATURESTAFF_AVALON","name":"Grandmaster's Ironroot Staff","tier":"T7"},{"id":"T8_MAIN_NATURESTAFF_AVALON","name":"Elder's Ironroot Staff","tier":"T8"},{"id":"T4_MAIN_NATURESTAFF_CRYSTAL","name":"Adept's Forgebark Staff","tier":"T4"},{"id":"T5_MAIN_NATURESTAFF_CRYSTAL","name":"Expert's Forgebark Staff","tier":"T5"},{"id":"T6_MAIN_NATURESTAFF_CRYSTAL","name":"Master's Forgebark Staff","tier":"T6"},{"id":"T7_MAIN_NATURESTAFF_CRYSTAL","name":"Grandmaster's Forgebark Staff","tier":"T7"},{"id":"T8_MAIN_NATURESTAFF_CRYSTAL","name":"Elder's Forgebark Staff","tier":"T8"}],"Shapeshifters":[{"id":"T4_2H_SHAPESHIFTER_SET1","name":"Adept's Prowling Staff","tier":"T4"},{"id":"T4_2H_SHAPESHIFTER_SET2","name":"Adept's Rootbound Staff","tier":"T4"},{"id":"T4_2H_SHAPESHIFTER_SET3","name":"Adept's Primal Staff","tier":"T4"},{"id":"T4_2H_SHAPESHIFTER_MORGANA","name":"Adept's Bloodmoon Staff","tier":"T4"},{"id":"T4_2H_SHAPESHIFTER_HELL","name":"Adept's Hellspawn Staff","tier":"T4"},{"id":"T4_2H_SHAPESHIFTER_KEEPER","name":"Adept's Earthrune Staff","tier":"T4"},{"id":"T4_2H_SHAPESHIFTER_AVALON","name":"Adept's Lightcaller","tier":"T4"},{"id":"T4_2H_SHAPESHIFTER_CRYSTAL","name":"Adept's Stillgaze Staff","tier":"T4"},{"id":"T5_2H_SHAPESHIFTER_SET1","name":"Expert's Prowling Staff","tier":"T5"},{"id":"T5_2H_SHAPESHIFTER_SET2","name":"Expert's Rootbound Staff","tier":"T5"},{"id":"T5_2H_SHAPESHIFTER_SET3","name":"Expert's Primal Staff","tier":"T5"},{"id":"T5_2H_SHAPESHIFTER_MORGANA","name":"Expert's Bloodmoon Staff","tier":"T5"},{"id":"T5_2H_SHAPESHIFTER_HELL","name":"Expert's Hellspawn Staff","tier":"T5"},{"id":"T5_2H_SHAPESHIFTER_KEEPER","name":"Expert's Earthrune Staff","tier":"T5"},{"id":"T5_2H_SHAPESHIFTER_AVALON","name":"Expert's Lightcaller","tier":"T5"},{"id":"T5_2H_SHAPESHIFTER_CRYSTAL","name":"Expert's Stillgaze Staff","tier":"T5"},{"id":"T6_2H_SHAPESHIFTER_SET1","name":"Master's Prowling Staff","tier":"T6"},{"id":"T6_2H_SHAPESHIFTER_SET2","name":"Master's Rootbound Staff","tier":"T6"},{"id":"T6_2H_SHAPESHIFTER_SET3","name":"Master's Primal Staff","tier":"T6"},{"id":"T6_2H_SHAPESHIFTER_MORGANA","name":"Master's Bloodmoon Staff","tier":"T6"},{"id":"T6_2H_SHAPESHIFTER_HELL","name":"Master's Hellspawn Staff","tier":"T6"},{"id":"T6_2H_SHAPESHIFTER_KEEPER","name":"Master's Earthrune Staff","tier":"T6"},{"id":"T6_2H_SHAPESHIFTER_AVALON","name":"Master's Lightcaller","tier":"T6"},{"id":"T6_2H_SHAPESHIFTER_CRYSTAL","name":"Master's Stillgaze Staff","tier":"T6"},{"id":"T7_2H_SHAPESHIFTER_SET1","name":"Grandmaster's Prowling Staff","tier":"T7"},{"id":"T7_2H_SHAPESHIFTER_SET2","name":"Grandmaster's Rootbound Staff","tier":"T7"},{"id":"T7_2H_SHAPESHIFTER_SET3","name":"Grandmaster's Primal Staff","tier":"T7"},{"id":"T7_2H_SHAPESHIFTER_MORGANA","name":"Grandmaster's Bloodmoon Staff","tier":"T7"},{"id":"T7_2H_SHAPESHIFTER_HELL","name":"Grandmaster's Hellspawn Staff","tier":"T7"},{"id":"T7_2H_SHAPESHIFTER_KEEPER","name":"Grandmaster's Earthrune Staff","tier":"T7"},{"id":"T7_2H_SHAPESHIFTER_AVALON","name":"Grandmaster's Lightcaller","tier":"T7"},{"id":"T7_2H_SHAPESHIFTER_CRYSTAL","name":"Grandmaster's Stillgaze Staff","tier":"T7"},{"id":"T8_2H_SHAPESHIFTER_SET1","name":"Elder's Prowling Staff","tier":"T8"},{"id":"T8_2H_SHAPESHIFTER_SET2","name":"Elder's Rootbound Staff","tier":"T8"},{"id":"T8_2H_SHAPESHIFTER_SET3","name":"Elder's Primal Staff","tier":"T8"},{"id":"T8_2H_SHAPESHIFTER_MORGANA","name":"Elder's Bloodmoon Staff","tier":"T8"},{"id":"T8_2H_SHAPESHIFTER_HELL","name":"Elder's Hellspawn Staff","tier":"T8"},{"id":"T8_2H_SHAPESHIFTER_KEEPER","name":"Elder's Earthrune Staff","tier":"T8"},{"id":"T8_2H_SHAPESHIFTER_AVALON","name":"Elder's Lightcaller","tier":"T8"},{"id":"T8_2H_SHAPESHIFTER_CRYSTAL","name":"Elder's Stillgaze Staff","tier":"T8"}]}};
const CAT_ORDER = ["Weapons", "Chest Armor", "Head Armor", "Foot Armor", "Off-Hands", "Capes", "Bags", "Mount", "Gathering Equipment"];
const TIER_LABELS = {T4:"Adept",T5:"Expert",T6:"Master",T7:"Grandmaster",T8:"Elder"};

function getRecipe(itemId) {
  if (RECIPES[itemId]) return RECIPES[itemId];
  const base = itemId.replace(/^T\d+_/, '');
  return RECIPES[base] || null;
}

let selectedItems = [];
let craftData = {};  // itemId -> { ing_0: price, ing_1: price, ..., sellPrice }
let settings = {runs:1, rrr:15.2, fee:300, focus:false, premium:false, saleMethod:"order"};

function escH(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function fmt(n){ return Math.round(n).toLocaleString(); }
function fmtSigned(n){ return (n>=0?"+":"")+Math.round(n).toLocaleString(); }
function safeId(s){ return s.replace(/[^a-zA-Z0-9]/g,"_"); }

function getLeafGroups(node, prefix=""){
  const groups=[];
  Object.entries(node||{}).forEach(([name,value])=>{
    const path=prefix ? prefix+" > "+name : name;
    if(Array.isArray(value)) groups.push({path,items:value});
    else if(value && typeof value==="object") groups.push(...getLeafGroups(value,path));
  });
  return groups;
}

function getNodeAtPath(cat,path){
  return path.split(" > ").reduce((node,key)=>node&&node[key],GEAR[cat]||{});
}

function buildDropdown(){
  const dd=document.getElementById("catDropdown");
  const ordered=CAT_ORDER.filter(c=>GEAR[c]).concat(Object.keys(GEAR).filter(c=>!CAT_ORDER.includes(c)));
  const rows=[];
  const nodesByCat={};
  rows.push('<div class="dp-clear" id="dp-clear-btn">x &nbsp; Clear Selection</div>');
  function countItems(node){
    if(Array.isArray(node)) return node.length;
    return Object.values(node||{}).reduce((n,child)=>n+countItems(child),0);
  }
  function renderNode(cat,name,node,prefix,depth){
    const path=prefix ? prefix+" > "+name : name;
    const key=safeId(cat+"__"+path);
    const leaves=getLeafGroups(node,prefix ? prefix+" > "+name : name);
    const ids=new Set(leaves.flatMap(group=>group.items.map(item=>item.id)));
    const selected=selectedItems.filter(item=>item.cat===cat&&ids.has(item.id)).length;
    rows.push('<div class="dp-sub-item" data-depth="'+depth+'" id="dpsubitem_'+key+'">'+escH(name)+' ('+selected+'/'+countItems(node)+') &rsaquo;</div>');
    rows.push('<div id="dpitems_'+key+'" class="dp-items">');
    nodesByCat[cat].push({path,node,key});
    if(Array.isArray(node)){
      rows.push('<div class="dp-item-actions"><a id="selsub_'+key+'">All</a><a id="deselsub_'+key+'">None</a></div>');
      const sorted=node.slice().sort((a,b)=>(TIER_ORDER[a.tier]||9)-(TIER_ORDER[b.tier]||9)||a.name.localeCompare(b.name));
      sorted.forEach(item=>{
        const checked=selectedItems.some(i=>i.id===item.id)?"checked":"";
        rows.push('<div class="dp-item" data-id="'+item.id+'" data-name="'+escH(item.name)+'" data-tier="'+item.tier+'" data-cat="'+escH(cat)+'" data-sub="'+escH(path)+'"><input type="checkbox" '+checked+'><span class="dp-item-name">'+escH(item.name)+'</span><span class="dp-item-tier">'+(TIER_LABELS[item.tier]||item.tier)+'</span></div>');
      });
    }else{
      Object.entries(node||{}).forEach(([child,items])=>renderNode(cat,child,items,path,depth+1));
    }
    rows.push('</div>');
  }
  ordered.forEach(cat=>{
    const subs=GEAR[cat];
    nodesByCat[cat]=[];
    const total=countItems(subs);
    const selected=selectedItems.filter(i=>i.cat===cat).length;
    const cid="dpcat_"+safeId(cat),sid="dpsub_"+safeId(cat);
    rows.push('<div class="dp-cat" id="'+cid+'">'+escH(cat)+' ('+selected+'/'+total+') &rsaquo;</div>');
    rows.push('<div class="dp-sub" id="'+sid+'">');
    rows.push('<div class="dp-sub-actions"><a id="selcat_'+safeId(cat)+'">Select All in '+escH(cat)+'</a><a id="deselcat_'+safeId(cat)+'">Remove All</a></div>');
    Object.entries(subs).forEach(([sub,node])=>renderNode(cat,sub,node,"",0));
    rows.push('</div>');
  });
  dd.innerHTML=rows.join('');
  document.getElementById("dp-clear-btn").onclick=function(){clearSelection();};
  ordered.forEach(cat=>{
    const cid="dpcat_"+safeId(cat),sid="dpsub_"+safeId(cat);
    document.getElementById(cid).onclick=function(e){
      e.stopPropagation();const el=document.getElementById(sid);const open=!el.classList.contains("is-open");el.classList.toggle("is-open",open);document.getElementById(cid).classList.toggle("open",open);
    };
    const selcat=document.getElementById("selcat_"+safeId(cat));
    if(selcat)selcat.onclick=function(e){e.stopPropagation();selectAllCat(cat);};
    const deselcat=document.getElementById("deselcat_"+safeId(cat));
    if(deselcat)deselcat.onclick=function(e){e.stopPropagation();deselectAllCat(cat);};
    nodesByCat[cat].forEach(({path,node,key})=>{
      const header=document.getElementById("dpsubitem_"+key),body=document.getElementById("dpitems_"+key);
      if(header)header.onclick=function(e){e.stopPropagation();body.classList.toggle("is-open");};
      if(Array.isArray(node)){
        const all=document.getElementById("selsub_"+key),none=document.getElementById("deselsub_"+key);
        if(all)all.onclick=function(e){e.stopPropagation();selectAllSub(cat,path);};
        if(none)none.onclick=function(e){e.stopPropagation();deselectAllSub(cat,path);};
        node.forEach(item=>{
          const el=document.querySelector('.dp-item[data-id="'+item.id+'"]');
          if(el)el.onclick=function(e){if(e.target.type==="checkbox")return;toggleItem(item.id,item.name,item.tier,cat,path);};
        });
      }
    });
  });
}

function toggleItem(id,name,tier,cat,sub){
  const idx = selectedItems.findIndex(i=>i.id===id);
  if(idx>=0) selectedItems.splice(idx,1);
  else selectedItems.push({id,name,tier,cat,sub});
  refreshAll();
}

function removeSelectedItem(id){
  selectedItems=selectedItems.filter(item=>item.id!==id);
  refreshAll();
}

function selectAllCat(cat){
  getLeafGroups(GEAR[cat]||{}).forEach(group=>group.items.forEach(item=>{
    if(!selectedItems.some(i=>i.id===item.id))selectedItems.push({id:item.id,name:item.name,tier:item.tier,cat,sub:group.path});
  }));
  refreshAll();
}

function deselectAllCat(cat){
  selectedItems=selectedItems.filter(i=>i.cat!==cat);
  refreshAll();
}

function selectAllSub(cat,sub){
  const items=getNodeAtPath(cat,sub)||[];
  if(Array.isArray(items))items.forEach(item=>{
    if(!selectedItems.some(i=>i.id===item.id))selectedItems.push({id:item.id,name:item.name,tier:item.tier,cat,sub});
  });
  refreshAll();
}

function deselectAllSub(cat,sub){
  selectedItems=selectedItems.filter(i=>!(i.cat===cat&&i.sub===sub));
  refreshAll();
}

function clearSelection(){
  selectedItems = [];
  document.getElementById("catDropdown").classList.remove("open");
  refreshAll();
}

const TIER_ORDER = {T4:1,T5:2,T6:3,T7:4,T8:5};

function getVisible(){
  const tier = document.getElementById("tierFilter").value;
  const q = document.getElementById("itemSearch").value.toLowerCase();
  return selectedItems.filter(i=>{
    if(tier && i.tier!==tier) return false;
    if(q && !i.name.toLowerCase().includes(q)) return false;
    return true;
  }).sort((a,b)=>{
    const td = (TIER_ORDER[a.tier]||9) - (TIER_ORDER[b.tier]||9);
    if(td !== 0) return td;
    const cd = CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat);
    if(cd !== 0) return cd;
    return a.name.localeCompare(b.name);
  });
}

function getMarketFeeRate(){
  const salesTax=settings.premium?4:8;
  const setupFee=settings.saleMethod==="order"?2.5:0;
  return salesTax+setupFee;
}

function getEffectiveRrr(){
  const baseRrr=Math.max(0,Math.min(settings.rrr/100,0.999999));
  const baseBonus=100*baseRrr/(1-baseRrr);
  const totalBonus=baseBonus+(settings.focus?59:0);
  return totalBonus/(100+totalBonus);
}

function isReturnableMaterial(name){
  return /^T[3-8] (?:Planks?|Cloth|Leather|Steel Bars?)$/i.test(name.trim());
}

function calcItemCost(item) {
  const recipe = getRecipe(item.id);
  const d = craftData[item.id] || {};
  const rr = getEffectiveRrr();
  let returnableCost = 0, otherCost = 0;
  if (recipe) {
    recipe.ingredients.forEach((ing, i) => {
      const ingredientCost=ing.qty*(d['ing_'+i]||0);
      if(isReturnableMaterial(ing.name))returnableCost+=ingredientCost;
      else otherCost+=ingredientCost;
    });
  } else {
    // Unknown ingredients are not given a return unless their recipe marks them.
    otherCost = (d.matPrice || 0) * (d.qty || 1);
  }
  return returnableCost*(1-rr)+otherCost+(settings.fee||0);
}

function calcTotals(items) {
  let expenses = 0, income = 0, missing = 0;
  const runs = settings.runs || 1;
  items.forEach(item => {
    const recipe = getRecipe(item.id);
    const d = craftData[item.id] || {};
    const sell = d.sellPrice || 0;
    const cost = calcItemCost(item);
    // check if any ingredient price is missing
    const allPriced = recipe
      ? recipe.ingredients.every((_, i) => d['ing_' + i] > 0)
      : (d.matPrice || 0) > 0;
    if (!allPriced || !sell) missing++;
    expenses += cost * runs;
    income   += sell * runs * (1 - getMarketFeeRate() / 100);
  });
  const profit = income - expenses;
  const roi = expenses > 0 ? (profit / expenses) * 100 : 0;
  const breakEven = runs > 0 ? (expenses / items.length / runs) / (1 - getMarketFeeRate() / 100) : 0;
  return {expenses, income, profit, roi, missing, breakEven};
}

function updSetting(key,val){
  if(key==="focus"||key==="premium")settings[key]=val;
  else if(key==="saleMethod")settings.saleMethod=val;
  else settings[key]=parseFloat(val)||0;
  if(key==="focus"){
    const rrrInput=document.getElementById("s-rrr");
    if(rrrInput)rrrInput.value=settings.focus?(getEffectiveRrr()*100).toFixed(1):settings.rrr;
  }
  refreshCalculatedValues();
}

function updCraft(id, field, val) {
  if (!craftData[id]) craftData[id] = {};
  craftData[id][field] = parseFloat(val) || 0;
  refreshCalculatedValues();
}

function refreshCalculatedValues(){
  const visible=getVisible();
  if(!visible.length)return;
  const runs=settings.runs||1;
  const totals=calcTotals(visible);
  const marketFee=document.getElementById("marketFeeRate");
  if(marketFee)marketFee.textContent=getMarketFeeRate().toFixed(1)+"%";
  const rrrInput=document.getElementById("s-rrr");
  const rrrLabel=document.getElementById("rrrLabel");
  if(rrrLabel)rrrLabel.textContent=settings.focus?"Effective Return Rate (%)":"Base Return Rate (%)";
  if(rrrInput){
    rrrInput.readOnly=settings.focus;
    if(settings.focus)rrrInput.value=(getEffectiveRrr()*100).toFixed(1);
  }
  const profCls=totals.profit>=0?"pos":"neg";
  const setText=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
  setText("r-expenses",fmt(totals.expenses));
  setText("r-income",fmt(totals.income));
  setText("r-profit",fmtSigned(totals.profit));
  setText("r-roi",totals.roi.toFixed(2)+"%");
  setText("r-breakeven",fmt(totals.breakEven));
  const profitEl=document.getElementById("r-profit");
  const roiEl=document.getElementById("r-roi");
  if(profitEl)profitEl.className="res-card-val "+profCls;
  if(roiEl)roiEl.className="res-card-val "+profCls;
  const warning=document.querySelector("#main .warning");
  if(totals.missing>0){
    const message="Missing prices: "+totals.missing+" item"+(totals.missing>1?"s are":" is")+" incomplete";
    if(warning)warning.textContent=message;
    else {const bar=document.querySelector("#main .results-bar");if(bar)bar.insertAdjacentHTML("afterend",'<div class="warning">'+message+'</div>');}
  }else if(warning)warning.remove();

  visible.forEach(item=>{
    const d=craftData[item.id]||{};
    const recipe=getRecipe(item.id);
    const sell=d.sellPrice||0;
    const cost=calcItemCost(item);
    const income=Math.round(sell*runs*(1-getMarketFeeRate()/100));
    const breakEven=(1-getMarketFeeRate()/100)>0?Math.round(cost/(1-getMarketFeeRate()/100)):0;
    const allPriced=recipe?recipe.ingredients.every((_,i)=>d['ing_'+i]>0):(d.matPrice||0)>0;
    const known=!!sell&&allPriced;
    const profitPerItem=Math.round(sell*(1-getMarketFeeRate()/100)-cost);
    setText("cost-"+item.id,fmt(cost*runs));
    setText("income-"+item.id,fmt(income));
    setText("breakeven-"+item.id,fmt(breakEven));
    const card=document.getElementById("output-card-"+item.id);
    const status=document.getElementById("profit-status-"+item.id);
    const amount=document.getElementById("profit-amount-"+item.id);
    if(card){
      card.classList.toggle("profit-card",known&&profitPerItem>=0);
      card.classList.toggle("loss-card",known&&profitPerItem<0);
      card.classList.toggle("unpriced-card",!known);
    }
    if(status&&amount){
      status.className="item-profit-status "+(!known?"neutral":profitPerItem>=0?"pos":"neg");
      status.firstChild.textContent=!known?(sell?"Enter all prices":"Enter sell price"):(profitPerItem>=0?"Profit per item: ":"Loss per item: ");
      amount.textContent=known?fmtSigned(profitPerItem):"";
    }
  });
}

function refreshAll(){
  buildDropdown();
  document.getElementById("catCount").textContent = selectedItems.length > 0 ? selectedItems.length : "All";
  renderMain();
}

function renderMain(){
  const main = document.getElementById("main");
  const visible = getVisible();
  if(!visible.length){
    main.innerHTML = '<div class="placeholder"><div class="placeholder-circle">i</div><p>Select an item above to start calculating craft profitability.</p></div>';
    return;
  }
  const t = calcTotals(visible);
  const profCls = t.profit>=0?"pos":"neg";

  let h = '<div class="section"><div class="section-title">Craft Settings</div><div class="settings-grid">';
  h += '<div class="sf"><label>Number of Items</label><input type="number" id="s-runs" value="'+settings.runs+'" min="1"></div>';
  h += '<div class="sf"><label id="rrrLabel">'+(settings.focus?'Effective Return Rate (%)':'Base Return Rate (%)')+'</label><input type="number" id="s-rrr" value="'+(settings.focus?(getEffectiveRrr()*100).toFixed(1):settings.rrr)+'" min="0" max="100" step="0.1"'+(settings.focus?' readonly':'')+'></div>';
  h += '<div class="sf"><label>Crafting Station Fee</label><input type="number" id="s-fee" value="'+settings.fee+'" min="0"></div>';
  h += '<div class="sf"><label>Selling Method</label><select id="s-sale-method"><option value="order"'+(settings.saleMethod==="order"?" selected":"")+'>Sell Order</option><option value="instant"'+(settings.saleMethod==="instant"?" selected":"")+'>Instant Sale</option></select></div>';
  h += '<div class="sf"><label>Total Selling Fees</label><div class="fee-rate" id="marketFeeRate">'+getMarketFeeRate().toFixed(1)+'%</div></div>';
  h += '<div class="sf"><label class="setting-label-spacer" aria-hidden="true">Options</label>';
  h += '<label class="checkbox-label"><input type="checkbox" id="s-premium"'+(settings.premium?" checked":"")+'>Premium Status</label>';
  h += '<label class="checkbox-label"><input type="checkbox" id="s-focus"'+(settings.focus?" checked":"")+'>Use Focus</label>';
  h += '</div></div></div>';

  h += '<div class="section"><div class="section-title">Results Summary</div><div class="results-bar">';
  h += '<div class="res-card"><div class="res-card-label">Total Expenses</div><div class="res-card-val neg" id="r-expenses">'+fmt(t.expenses)+'</div></div>';
  h += '<div class="res-card"><div class="res-card-label">Total Income</div><div class="res-card-val pos" id="r-income">'+fmt(t.income)+'</div></div>';
  h += '<div class="res-card highlight"><div class="res-card-label">Profit</div><div class="res-card-val '+profCls+'" id="r-profit">'+fmtSigned(t.profit)+'</div></div>';
  h += '<div class="res-card"><div class="res-card-label">ROI (Profit / Expenses)</div><div class="res-card-val '+profCls+'" id="r-roi">'+t.roi.toFixed(2)+'%</div></div>';
  h += '<div class="res-card"><div class="res-card-label">Break-even Sell Price<br><span class="break-even-note">Min price per item after tax</span></div><div class="res-card-val" id="r-breakeven">'+fmt(t.breakEven)+'</div></div>';
  h += '</div>';
  if(t.missing>0) h += '<div class="warning">Missing prices: '+t.missing+' item'+(t.missing>1?"s are":" is")+' incomplete</div>';
  h += '</div>';

  // Combined recipe cards
  h += '<div class="section"><div class="section-title">Input Materials ('+visible.length+')</div><div class="items-grid">';
  visible.forEach(item => {
    const recipe = getRecipe(item.id);
    const d = craftData[item.id] || {};
    const runs = settings.runs || 1;
    const cost = Math.round(calcItemCost(item) * runs);
    h += '<div class="item-card">';
    h += '<div class="item-card-head"><div><div class="item-card-name">'+escH(item.name)+'</div>';
    h += '<div class="item-card-sub">'+(TIER_LABELS[item.tier]||item.tier)+' &middot; '+escH(item.sub)+'</div></div>';
    h += '<button type="button" class="remove-item-btn" data-remove-item="'+escH(item.id)+'" aria-label="Remove '+escH(item.name)+'">Remove</button></div>';
    if (recipe) {
      // per-ingredient rows
      recipe.ingredients.forEach((ing, i) => {
        const price = d['ing_'+i] || '';
        h += '<div class="item-field">';
        h += '<label>'+escH(ing.name)+' &times;'+ing.qty+'</label>';
        h += '<input type="number" id="ing-'+item.id+'-'+i+'" value="'+(price||'')+'" placeholder="Price per unit">';
        h += '</div>';
      });
    } else {
      // no recipe yet — generic fields
      h += '<div class="item-field recipe-missing"><label>No recipe added yet</label><span></span></div>';
      h += '<div class="item-field"><label>Amount</label><input type="number" id="qty-'+item.id+'" value="'+(d.qty||1)+'" min="1"></div>';
      h += '<div class="item-field"><label>Material price per unit</label><input type="number" id="mat-'+item.id+'" value="'+(d.matPrice||'')+'" placeholder="Market price"></div>';
    }
    h += '<div class="item-total"><span class="item-total-label">Total Cost ('+runs+' run'+(runs>1?'s':'')+')</span><span class="item-total-val" id="cost-'+item.id+'">'+fmt(cost)+'</span></div>';
    h += '</div>';
  });
  h += '</div></div>';

  h += '<div class="section"><div class="section-title">Output Products ('+visible.length+')</div><div class="items-grid">';
  visible.forEach(item => {
    const d = craftData[item.id] || {};
    const sell = d.sellPrice || 0;
    const runs = settings.runs || 1;
    const inc = Math.round(sell * runs * (1 - getMarketFeeRate() / 100));
    const cost = Math.round(calcItemCost(item) * runs);
    const breakEven = (1 - getMarketFeeRate() / 100) > 0 ? Math.round((calcItemCost(item)) / (1 - getMarketFeeRate() / 100)) : 0;
    const profitPerItem = Math.round(sell * (1 - getMarketFeeRate()/100) - calcItemCost(item));
    const recipe=getRecipe(item.id);
    const allPriced=recipe?recipe.ingredients.every((_,i)=>(d['ing_'+i]||0)>0):(d.matPrice||0)>0;
    const known=!!sell&&allPriced;
    const resultClass=!known?"unpriced-card":profitPerItem>=0?"profit-card":"loss-card";
    const resultText=!known?(sell?"Enter all prices":"Enter sell price"):(profitPerItem>=0?"Profit per item: ":"Loss per item: ");
    const resultAmount=known?fmtSigned(profitPerItem):"";
    const resultTone=!known?"neutral":profitPerItem>=0?"pos":"neg";
    h += '<div class="item-card output-card '+resultClass+'" id="output-card-'+item.id+'">';
    h += '<div class="item-card-name">'+escH(item.name)+'</div>';
    h += '<div class="item-card-sub">'+(TIER_LABELS[item.tier]||item.tier)+' &middot; '+runs+' run'+(runs>1?'s':'')+'</div>';
    h += '<div class="item-profit-status '+resultTone+'" id="profit-status-'+item.id+'"><span>'+resultText+'</span> <strong id="profit-amount-'+item.id+'">'+resultAmount+'</strong></div>';
    h += '<div class="item-field"><label>Sell price per item</label><input type="number" id="sell-'+item.id+'" value="'+(sell||'')+'" placeholder="Market price"></div>';
    h += '<div class="break-even-row">';
    h += '<span>Break-even: <strong class="break-even-value" id="breakeven-'+item.id+'">'+fmt(breakEven)+'</strong></span>';
    h += '</div>';
    h += '<div class="item-total"><span class="item-total-label">Total Income:</span><span class="item-total-val" id="income-'+item.id+'">'+fmt(inc)+'</span></div>';
    h += '</div>';
  });
  h += '</div></div>';

  h += '<div class="actions"><button class="btn" id="clearAllBtn">Clear All</button></div>';

  main.innerHTML = h;
  main.querySelectorAll("[data-remove-item]").forEach(button=>{
    button.onclick=function(){removeSelectedItem(this.dataset.removeItem);};
  });

  // Attach settings events
  document.getElementById("s-runs").oninput    = function(){ updSetting("runs",this.value); };
  document.getElementById("s-rrr").oninput     = function(){ updSetting("rrr",this.value); };
  document.getElementById("s-fee").oninput     = function(){ updSetting("fee",this.value); };
  document.getElementById("s-sale-method").onchange=function(){ updSetting("saleMethod",this.value); };
  document.getElementById("s-premium").onchange=function(){ updSetting("premium",this.checked); };
  document.getElementById("s-focus").onchange  = function(){ updSetting("focus",this.checked); };
  document.getElementById("clearAllBtn").onclick = function(){ clearSelection(); };

  // Attach ingredient and sell events
  visible.forEach(item => {
    const recipe = getRecipe(item.id);
    if (recipe) {
      recipe.ingredients.forEach((_, i) => {
        const el = document.getElementById("ing-"+item.id+"-"+i);
        if (el) el.oninput = function(){ updCraft(item.id, "ing_"+i, this.value); };
      });
    } else {
      const qEl = document.getElementById("qty-"+item.id);
      const mEl = document.getElementById("mat-"+item.id);
      if (qEl) qEl.oninput = function(){ updCraft(item.id, "qty", this.value); };
      if (mEl) mEl.oninput = function(){ updCraft(item.id, "matPrice", this.value); };
    }
    const sEl = document.getElementById("sell-"+item.id);
    if (sEl) sEl.oninput = function(){ updCraft(item.id, "sellPrice", this.value); }; 
  });
}

// Attach top-level events
document.getElementById("catBtn").onclick = function(){
  document.getElementById("catDropdown").classList.toggle("open");
};
document.getElementById("clearBtn").onclick = function(){ clearSelection(); };
document.getElementById("tierFilter").onchange = function(){ renderMain(); };
document.getElementById("itemSearch").oninput  = function(){ renderMain(); };
document.addEventListener("click", function(e){
  const wrap = document.getElementById("catDropWrap");
  if(!wrap.contains(e.target)) document.getElementById("catDropdown").classList.remove("open");
});

buildDropdown();

(function () {
  const tabs = Array.from(document.querySelectorAll('.crafting-tab[role="tab"]'));
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

  function activateTab(activeTab, moveFocus) {
    tabs.forEach((tab, index) => {
      const active = tab === activeTab;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[index].hidden = !active;
    });
    if (moveFocus) activeTab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab, false));
    tab.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      }
    });
  });

  const tbody = document.getElementById('profitabilityRows');
  const categoryFilter = document.getElementById('profitCategoryFilter');
  const tierFilter = document.getElementById('profitTierFilter');
  const regionFilter = document.getElementById('profitRegionFilter');
  const sortSelect = document.getElementById('profitSort');
  const searchInput = document.getElementById('profitSearch');
  const sortKeys = { margin: 'margin', profit: 'profit', cost: 'cost' };
  const maxPriceAgeMs = 24 * 60 * 60 * 1000;
  const activeDemandWindowMs = 6 * 60 * 60 * 1000;
  const priceOutlierRatio = 10;
  const minCitiesForOutlierCheck = 3;
  let profitRows = [];
  let requestNumber = 0;

  function silver(value) {
    return `${Math.round(value).toLocaleString()} s`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function parseMarketTimestamp(value) {
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    const text = String(value).trim();
    if (!text || text === '0001-01-01T00:00:00' || text === '0001-01-01T00:00:00Z') return null;
    const normalized = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(text) ? text : `${text}Z`;
    const parsed = Date.parse(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function getRecentBuySummary(records) {
    const now = Date.now();
    const buyEvents = (records || [])
      .map((record) => {
        const buyTimestamp = parseMarketTimestamp(record.buy_price_max_date);
        const buyPrice = Number(record.buy_price_max);
        if (!Number.isFinite(buyTimestamp) || !Number.isFinite(buyPrice) || buyPrice <= 0) return null;
        return { buyTimestamp, buyPrice };
      })
      .filter(Boolean);

    if (!buyEvents.length) {
      return { recentCount: 0, newestBuyAgeHours: null, isActive: false };
    }

    const newestBuyTimestamp = Math.max(...buyEvents.map((entry) => entry.buyTimestamp));
    const newestBuyAgeHours = (now - newestBuyTimestamp) / (60 * 60 * 1000);
    const recentEvents = buyEvents.filter((entry) => now - entry.buyTimestamp <= activeDemandWindowMs);
    const recentCount = recentEvents.length;
    return {
      recentCount,
      newestBuyAgeHours,
      isActive: recentCount >= 2 || newestBuyAgeHours <= 2
    };
  }

  function showProfitMessage(message) {
    tbody.innerHTML = `<tr><td colspan="6">${escapeHtml(message)}</td></tr>`;
  }

  function buildPriceAssessment(payload) {
    const recordsByItem = new Map();
    const addRecords = (itemId, records) => {
      if (!itemId) return;
      if (!recordsByItem.has(itemId)) recordsByItem.set(itemId, new Map());
      const byCityAndQuality = recordsByItem.get(itemId);
      for (const record of records || []) {
        const key = `${record.quality}|${record.city}`;
        const current = byCityAndQuality.get(key);
        if (!current || String(record.sell_price_min_date) > String(current.sell_price_min_date)) {
          byCityAndQuality.set(key, record);
        }
      }
    };

    for (const item of payload.items || []) {
      addRecords(item.marketId, item.records);
      for (const ingredient of item.ingredients || []) {
        for (const option of ingredient.priceOptions || []) addRecords(option.id, option.records);
      }
    }

    const assessments = new Map();
    let staleRecords = 0;
    let suspiciousRecords = 0;
    const now = Date.now();
    for (const [itemId, byCityAndQuality] of recordsByItem) {
      const groups = new Map();
      for (const record of byCityAndQuality.values()) {
        const price = Number(record.sell_price_min);
        if (!Number.isFinite(price) || price <= 0) continue;

        const rawDate = record.sell_price_min_date;
        const hasTimezone = typeof rawDate === 'string' && /(?:Z|[+-]\d{2}:?\d{2})$/i.test(rawDate);
        const timestamp = typeof rawDate === 'string'
          ? Date.parse(hasTimezone ? rawDate : `${rawDate}Z`)
          : NaN;
        const age = now - timestamp;
        const key = `${itemId}|${record.quality}|${record.city}`;
        if (!Number.isFinite(timestamp) || timestamp < Date.UTC(2000, 0, 1) || age < -5 * 60 * 1000 || age > maxPriceAgeMs) {
          assessments.set(key, { status: 'stale' });
          staleRecords += 1;
          continue;
        }

        assessments.set(key, { status: 'fresh', price });
        if (!groups.has(record.quality)) groups.set(record.quality, []);
        groups.get(record.quality).push({ key, city: record.city, price });
      }

      for (const prices of groups.values()) {
        const cityPrices = new Map();
        for (const entry of prices) {
          if (!cityPrices.has(entry.city)) cityPrices.set(entry.city, entry.price);
        }
        if (cityPrices.size < minCitiesForOutlierCheck) continue;

        const sortedPrices = [...cityPrices.values()].sort((a, b) => a - b);
        const middle = Math.floor(sortedPrices.length / 2);
        const median = sortedPrices.length % 2
          ? sortedPrices[middle]
          : (sortedPrices[middle - 1] + sortedPrices[middle]) / 2;
        for (const entry of prices) {
          if (entry.price > median * priceOutlierRatio || entry.price < median / priceOutlierRatio) {
            assessments.set(entry.key, { status: 'suspicious', price: entry.price, median });
            suspiciousRecords += 1;
          }
        }
      }
    }

    return {
      get(itemId, record) {
        return assessments.get(`${itemId}|${record.quality}|${record.city}`);
      },
      staleRecords,
      suspiciousRecords
    };
  }

  function updateProfitabilityRows() {
    const sortKey = sortKeys[sortSelect.value] || 'margin';
    const searchTerm = searchInput.value.trim().toLowerCase();
    const activeOnly = true;
    const rows = profitRows.filter(row => {
      if (searchTerm && !row.label.toLowerCase().includes(searchTerm)) return false;
      if (activeOnly && !row.activeDemand) return false;
      return true;
    });
    rows.sort((a, b) => {
      const difference = a[sortKey] - b[sortKey];
      return sortKey === 'cost' ? difference : -difference;
    });

    tbody.innerHTML = rows.map(row => {
      const mood = row.profit >= 0 ? 'positive' : 'negative';
      const tierClass = `tier-${row.tier.toLowerCase()}`;
      const marginWidth = Math.min(100, Math.abs(row.margin) * 4);
      return `<tr>
        <td><span class="profit-item-name">${escapeHtml(row.name)}<small>${escapeHtml(row.category)} · @${row.enchantment} · ${escapeHtml(row.qualityName)} · ${escapeHtml(row.city)}</small></span></td>
        <td><span class="profit-tier ${tierClass}">${escapeHtml(row.tier)}</span></td>
        <td>${silver(row.cost)}</td><td>${silver(row.sellPrice)}</td>
        <td class="profit-value ${mood}">${row.profit >= 0 ? '+' : ''}${silver(row.profit)}</td>
        <td><span class="profit-margin ${mood}"><span class="profit-margin-bar"><i data-margin-width="${marginWidth}"></i></span>${row.margin.toFixed(1)}%</span></td>
      </tr>`;
    }).join('') || '<tr><td colspan="6"></td></tr>';
    tbody.querySelectorAll('[data-margin-width]').forEach(bar => {
      bar.style.width = `${bar.dataset.marginWidth}%`;
    });
  }

  async function loadProfitabilityCategory() {
    const category = categoryFilter.value;
    if (!category) {
      profitRows = [];
      showProfitMessage('Choose a category to load market prices.');
      return;
    }

    const currentRequest = ++requestNumber;
    const tiers = tierFilter.value === 'all' ? 'T4,T5,T6,T7,T8' : tierFilter.value;
    showProfitMessage(`Loading ${category} prices from ${regionFilter.selectedOptions[0].text}...`);
    try {
      const query = new URLSearchParams({ category, tiers, region: regionFilter.value });
      const response = await fetch(`/api/proxy/albion/profitability/category?${query}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Could not load market prices.');
      if (currentRequest !== requestNumber) return;

      const priceAssessment = buildPriceAssessment(payload);
      const rows = [];
      let incomplete = 0;
      for (const item of payload.items || []) {
        const pricesByIngredient = item.ingredients.map(ingredient => ingredient.priceOptions || []);
        for (const output of item.records || []) {
          const sellPrice = Number(output.sell_price_min) || 0;
          if (!sellPrice) continue;
          const outputStatus = priceAssessment.get(item.marketId, output);
          if (!outputStatus || outputStatus.status !== 'fresh') continue;

          const ingredientRecords = [];
          let complete = true;
          item.ingredients.forEach((ingredient, index) => {
            const options = pricesByIngredient[index].flatMap(option =>
              (option.records || []).filter(record =>
                record.city === output.city && Number(record.quality) === 1 && Number(record.sell_price_min) > 0
              ).map(record => ({ record, status: priceAssessment.get(option.id, record) }))
            );
            const trustedOptions = options.filter(option => option.status?.status === 'fresh');
            const marketRecord = trustedOptions.sort((a, b) => a.status.price - b.status.price)[0];
            if (!marketRecord) complete = false;
            else ingredientRecords.push(marketRecord.status.price * ingredient.quantity);
          });
          if (!complete) { incomplete += 1; continue; }

          const cost = ingredientRecords.reduce((sum, price) => sum + price, 0);
          const profit = sellPrice - cost;
          const quality = Number(output.quality);
          const qualityName = quality === 2 ? 'Good' : quality === 3 ? 'Outstanding' : `Quality ${quality}`;
          const buySummary = getRecentBuySummary(item.records);
          rows.push({
            variantKey: `${item.id}@${item.enchantment}:Q${quality}`,
            tier: item.tier,
            category: item.category,
            name: item.name,
            label: `${item.name} ${item.category} ${qualityName} ${output.city} @${item.enchantment}`.toLowerCase(),
            city: output.city,
            enchantment: item.enchantment,
            qualityName,
            cost,
            sellPrice,
            profit,
            margin: cost ? (profit / cost) * 100 : 0,
            activeDemand: buySummary.isActive,
            recentBuyCount: buySummary.recentCount,
            newestBuyAgeHours: buySummary.newestBuyAgeHours
          });
        }
      }

      // Keep each enchanted item/quality once, using its best available city.
      const bestByVariant = new Map();
      for (const row of rows) {
        const current = bestByVariant.get(row.variantKey);
        if (!current || row.profit > current.profit) bestByVariant.set(row.variantKey, row);
      }
      // Keep the five strongest opportunities for each selected tier.
      profitRows = [...bestByVariant.values()];
      const byTier = new Map();
      for (const row of profitRows) {
        if (!byTier.has(row.tier)) byTier.set(row.tier, []);
        byTier.get(row.tier).push(row);
      }
      profitRows = [...byTier.values()].flatMap(tierRows => tierRows.sort((a, b) => b.profit - a.profit).slice(0, 5));
      if (!profitRows.length) showProfitMessage(`No complete price data was found. ${incomplete ? `${incomplete} price combinations were incomplete.` : ''}`);
      else updateProfitabilityRows();

      const note = document.querySelector('.profitability-note');
      if (note) {
        note.textContent = '';
      }
    } catch (error) {
      if (currentRequest !== requestNumber) return;
      profitRows = [];
      showProfitMessage(error.message);
    }
  }

  categoryFilter.addEventListener('change', loadProfitabilityCategory);
  tierFilter.addEventListener('change', loadProfitabilityCategory);
  regionFilter.addEventListener('change', loadProfitabilityCategory);
  sortSelect.addEventListener('change', updateProfitabilityRows);
  searchInput.addEventListener('input', updateProfitabilityRows);
  loadProfitabilityCategory();
})();

(function () {
  const toggle = document.getElementById('tools-toggle');
  const menu = document.getElementById('tools-dropdown');
  if (!toggle || !menu) return;
  menu.style.display = 'none';
  toggle.addEventListener('click', function (event) {
    event.preventDefault();
    const open = menu.style.display === 'block';
    menu.style.display = open ? 'none' : 'block';
    toggle.setAttribute('aria-expanded', String(!open));
  });
  document.addEventListener('click', function (event) {
    if (!toggle.contains(event.target) && !menu.contains(event.target)) {
      menu.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      menu.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
