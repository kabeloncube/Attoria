/*
=============================================================================
CLASH OF CLANS DASHBOARD - REUSABLE UI COMPONENTS
=============================================================================
This module provides reusable components for creating game-styled UI elements
that match the Clash of Clans aesthetic and provide enhanced user experience.
*/

// Asset configuration for external CoC resources
const COC_ASSETS = {
    BASE_URLS: {
        clashwiki: 'https://clashofclans.fandom.com/wiki/Special:Redirect/file',
        staticwiki: 'https://static.wikia.nocookie.net/clashofclans/images',
        cocapi: 'https://www.clashapi.xyz/images',
        coclands: 'https://coclands.com/images'
    },
    
    // Map of troop names to image filenames
    TROOPS: {
        // Elixir Troops
        'barbarian': 'Barbarian.png',
        'archer': 'Archer.png',
        'giant': 'Giant.png',
        'goblin': 'Goblin.png',
        'wizard': 'Wizard.png',
        'balloon': 'Balloon.png',
        'wallbreaker': 'Wall_Breaker.png',
        'healer': 'Healer.png',
        'dragon': 'Dragon.png',
        'pekka': 'P.E.K.K.A.png',
        'babydragon': 'Baby_Dragon.png',
        'miner': 'Miner.png',
        'electrodragon': 'Electro_Dragon.png',
        'yeti': 'Yeti.png',
        'dragonrider': 'Dragon_Rider.png',
        'electrodragon': 'Electro_Dragon.png',
        
        // Dark Elixir Troops
        'minion': 'Minion.png',
        'hogrider': 'Hog_Rider.png',
        'valkyrie': 'Valkyrie.png',
        'golem': 'Golem.png',
        'witch': 'Witch.png',
        'lavahound': 'Lava_Hound.png',
        'bowler': 'Bowler.png',
        'icegolem': 'Ice_Golem.png',
        'headhunter': 'Headhunter.png',
        'apprenticewarden': 'Apprentice_Warden.png',
        
        // Siege Machines
        'wallwrecker': 'Wall_Wrecker.png',
        'battleBlimp': 'Battle_Blimp.png',
        'stoneSlammer': 'Stone_Slammer.png',
        'siegeBarracks': 'Siege_Barracks.png',
        'logLauncher': 'Log_Launcher.png',
        'flameFlinger': 'Flame_Flinger.png',
        'battleDrill': 'Battle_Drill.png'
    },
    
    // Map of spell names to image filenames
    SPELLS: {
        'lightning': 'Lightning_Spell.png',
        'heal': 'Healing_Spell.png',
        'rage': 'Rage_Spell.png',
        'jump': 'Jump_Spell.png',
        'freeze': 'Freeze_Spell.png',
        'clone': 'Clone_Spell.png',
        'invisibility': 'Invisibility_Spell.png',
        'recall': 'Recall_Spell.png',
        'poison': 'Poison_Spell.png',
        'earthquake': 'Earthquake_Spell.png',
        'haste': 'Haste_Spell.png',
        'skeleton': 'Skeleton_Spell.png',
        'bat': 'Bat_Spell.png',
        'overgrowth': 'Overgrowth_Spell.png'
    },
    
    // Map of hero names to image filenames
    HEROES: {
        'barbarianking': 'Barbarian_King.png',
        'archerqueen': 'Archer_Queen.png',
        'grandwarden': 'Grand_Warden.png',
        'royalchampion': 'Royal_Champion.png'
    },
    
    // Map of pets to image filenames
    PETS: {
        'lassi': 'L.A.S.S.I.png',
        'electroowl': 'Electro_Owl.png',
        'mightyyak': 'Mighty_Yak.png',
        'unicorn': 'Unicorn.png',
        'frosty': 'Frosty.png',
        'diggy': 'Diggy.png',
        'poisonlizard': 'Poison_Lizard.png',
        'phoenix': 'Phoenix.png',
        'spiritfox': 'Spirit_Fox.png',
        'angryJelly': 'Angry_Jelly.png'
    }
};

/*
=============================================================================
CORE UI COMPONENTS
=============================================================================
*/

class COCComponents {
    
    /**
     * Create a progress bar with CoC styling
     * @param {Object} options - Configuration options
     * @param {number} options.current - Current value
     * @param {number} options.max - Maximum value
     * @param {string} options.type - Type of progress bar ('xp', 'upgrade', 'health', 'resource')
     * @param {boolean} options.showNumbers - Show numeric values
     * @param {string} options.label - Label text
     * @returns {string} HTML string
     */
    static createProgressBar({ current, max, type = 'default', showNumbers = true, label = '' }) {
        const percentage = Math.min((current / max) * 100, 100);
        const progressClass = `progress-bar ${type}`;
        
        return `
            <div class="coc-progress-container">
                ${label ? `<div class="progress-label">${label}</div>` : ''}
                <div class="${progressClass}">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                    ${showNumbers ? `<div class="progress-text">${current}/${max}</div>` : ''}
                </div>
            </div>
        `;
    }
    
    /**
     * Create a stat display card with CoC styling
     * @param {Object} options - Configuration options
     * @param {string} options.icon - Icon HTML or emoji
     * @param {string|number} options.value - Display value
     * @param {string} options.label - Label text
     * @param {string} options.type - Type for styling ('primary', 'secondary', 'warning', 'success')
     * @param {string} options.tooltip - Tooltip text
     * @returns {string} HTML string
     */
    static createStatCard({ icon, value, label, type = 'primary', tooltip = '' }) {
        return `
            <div class="coc-stat-card ${type}" ${tooltip ? `title="${tooltip}"` : ''}>
                <div class="stat-icon">${icon}</div>
                <div class="stat-value">${value}</div>
                <div class="stat-label">${label}</div>
            </div>
        `;
    }
    
    /**
     * Create a troop composition display
     * @param {Array} troops - Array of troop objects with {name, count, level}
     * @param {Object} options - Configuration options
     * @returns {string} HTML string
     */
    static createTroopComposition(troops, options = {}) {
        const { maxDisplay = 8, showCounts = true, size = 'medium' } = options;
        
        if (!troops || troops.length === 0) {
            return '<div class="troop-composition empty">No troops data available</div>';
        }
        
        const troopsToShow = troops.slice(0, maxDisplay);
        const hasMore = troops.length > maxDisplay;
        
        const troopElements = troopsToShow.map(troop => {
            const troopIcon = this.getTroopIcon(troop.name, troop.level);
            return `
                <div class="troop-slot ${size}" title="${troop.name} (Level ${troop.level})">
                    ${troopIcon}
                    ${showCounts && troop.count > 1 ? `<span class="troop-count">${troop.count}</span>` : ''}
                </div>
            `;
        }).join('');
        
        return `
            <div class="troop-composition">
                ${troopElements}
                ${hasMore ? `<div class="troop-slot more">+${troops.length - maxDisplay}</div>` : ''}
            </div>
        `;
    }
    
    /**
     * Create a hero display with status
     * @param {Object} hero - Hero object with {name, level, isUpgrading, isDown}
     * @returns {string} HTML string
     */
    static createHeroDisplay(hero) {
        const heroIcon = this.getHeroIcon(hero.name, hero.level);
        let statusClass = '';
        let statusIcon = '';
        
        if (hero.isUpgrading) {
            statusClass = 'upgrading';
            statusIcon = '🔨';
        } else if (hero.isDown) {
            statusClass = 'down';
            statusIcon = '😴';
        } else {
            statusClass = 'ready';
            statusIcon = '⚡';
        }
        
        return `
            <div class="hero-display ${statusClass}">
                <div class="hero-icon-container">
                    ${heroIcon}
                    <div class="hero-status">${statusIcon}</div>
                </div>
                <div class="hero-level">Lv.${hero.level}</div>
                <div class="hero-name">${hero.name}</div>
            </div>
        `;
    }
    
    /**
     * Create an offensive strength meter
     * @param {Object} strength - Strength calculation object
     * @returns {string} HTML string
     */
    static createOffensiveStrengthMeter(strength) {
        const { total, breakdown, rating } = strength;
        const percentage = Math.min(total / 10, 100); // Scale to 0-100%
        
        let ratingClass = 'low';
        let ratingText = 'Weak';
        let ratingIcon = '🔴';
        
        if (total >= 8) {
            ratingClass = 'very-high';
            ratingText = 'Devastating';
            ratingIcon = '💥';
        } else if (total >= 6) {
            ratingClass = 'high';
            ratingText = 'Strong';
            ratingIcon = '🟠';
        } else if (total >= 4) {
            ratingClass = 'medium';
            ratingText = 'Average';
            ratingIcon = '🟡';
        }
        
        return `
            <div class="offensive-strength-meter">
                <div class="strength-header">
                    <div class="strength-rating ${ratingClass}">
                        ${ratingIcon} ${ratingText}
                    </div>
                    <div class="strength-value">${total.toFixed(1)}/10</div>
                </div>
                <div class="strength-bar">
                    <div class="strength-fill ${ratingClass}" style="width: ${percentage}%"></div>
                </div>
                <div class="strength-breakdown">
                    ${breakdown.map(item => `
                        <div class="breakdown-item">
                            <span>${item.category}:</span>
                            <span>${item.value.toFixed(1)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    /*
    =============================================================================
    ASSET HELPER FUNCTIONS
    =============================================================================
    */
    
    /**
     * Get troop icon with fallback
     * @param {string} troopName - Name of the troop
     * @param {number} level - Level of the troop (optional)
     * @returns {string} HTML image element
     */
    static getTroopIcon(troopName, level = 1) {
        const normalizedName = troopName.toLowerCase().replace(/\s+/g, '');
        const filename = COC_ASSETS.TROOPS[normalizedName];
        
        if (!filename) {
            return `<div class="troop-icon-fallback" title="${troopName}">⚔️</div>`;
        }
        
        const primaryUrl = `${COC_ASSETS.BASE_URLS.clashwiki}/${filename}`;
        const fallbackUrl = `${COC_ASSETS.BASE_URLS.staticwiki}/${filename}`;
        
        return `
            <img src="${primaryUrl}" 
                 alt="${troopName}" 
                 class="troop-icon" 
                 loading="lazy"
                 title="${troopName} (Level ${level})"
                 onerror="this.onerror=null; this.src='${fallbackUrl}'; this.onerror=function(){this.style.display='none'; this.parentNode.innerHTML='⚔️';};">
        `;
    }
    
    /**
     * Get spell icon with fallback
     * @param {string} spellName - Name of the spell
     * @param {number} level - Level of the spell (optional)
     * @returns {string} HTML image element
     */
    static getSpellIcon(spellName, level = 1) {
        const normalizedName = spellName.toLowerCase().replace(/\s+/g, '');
        const filename = COC_ASSETS.SPELLS[normalizedName];
        
        if (!filename) {
            return `<div class="spell-icon-fallback" title="${spellName}">✨</div>`;
        }
        
        const primaryUrl = `${COC_ASSETS.BASE_URLS.clashwiki}/${filename}`;
        
        return `
            <img src="${primaryUrl}" 
                 alt="${spellName}" 
                 class="spell-icon" 
                 loading="lazy"
                 title="${spellName} (Level ${level})"
                 onerror="this.style.display='none'; this.parentNode.innerHTML='✨';">
        `;
    }
    
    /**
     * Get hero icon with fallback
     * @param {string} heroName - Name of the hero
     * @param {number} level - Level of the hero (optional)
     * @returns {string} HTML image element
     */
    static getHeroIcon(heroName, level = 1) {
        const normalizedName = heroName.toLowerCase().replace(/\s+/g, '');
        const filename = COC_ASSETS.HEROES[normalizedName];
        
        if (!filename) {
            return `<div class="hero-icon-fallback" title="${heroName}">👑</div>`;
        }
        
        const primaryUrl = `${COC_ASSETS.BASE_URLS.clashwiki}/${filename}`;
        
        return `
            <img src="${primaryUrl}" 
                 alt="${heroName}" 
                 class="hero-icon" 
                 loading="lazy"
                 title="${heroName} (Level ${level})"
                 onerror="this.style.display='none'; this.parentNode.innerHTML='👑';">
        `;
    }
    
    /**
     * Get pet icon with fallback
     * @param {string} petName - Name of the pet
     * @param {number} level - Level of the pet (optional)
     * @returns {string} HTML image element
     */
    static getPetIcon(petName, level = 1) {
        const normalizedName = petName.toLowerCase().replace(/\s+/g, '');
        const filename = COC_ASSETS.PETS[normalizedName];
        
        if (!filename) {
            return `<div class="pet-icon-fallback" title="${petName}">🐾</div>`;
        }
        
        const primaryUrl = `${COC_ASSETS.BASE_URLS.clashwiki}/${filename}`;
        
        return `
            <img src="${primaryUrl}" 
                 alt="${petName}" 
                 class="pet-icon" 
                 loading="lazy"
                 title="${petName} (Level ${level})"
                 onerror="this.style.display='none'; this.parentNode.innerHTML='🐾';">
        `;
    }
    
    /*
    =============================================================================
    UTILITY FUNCTIONS
    =============================================================================
    */
    
    /**
     * Format large numbers with abbreviations
     * @param {number} num - Number to format
     * @returns {string} Formatted number string
     */
    static formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    /**
     * Get time ago string
     * @param {Date} date - Date to compare
     * @returns {string} Time ago string
     */
    static getTimeAgo(date) {
        if (!date) return 'Never';
        
        const now = new Date();
        const diffMs = now - date;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return '1 day ago';
        return `${diffDays} days ago`;
    }
    
    /**
     * Create a loading spinner
     * @param {string} message - Loading message
     * @returns {string} HTML string
     */
    static createLoadingSpinner(message = 'Loading...') {
        return `
            <div class="coc-loading">
                <div class="spinner"></div>
                <div class="loading-text">${message}</div>
            </div>
        `;
    }
    
    /**
     * Create an error message display
     * @param {string} error - Error message
     * @param {boolean} showRetry - Show retry button
     * @returns {string} HTML string
     */
    static createErrorDisplay(error, showRetry = false) {
        return `
            <div class="coc-error">
                <div class="error-icon">⚠️</div>
                <div class="error-message">${error}</div>
                ${showRetry ? '<button class="retry-btn" onclick="location.reload()">Try Again</button>' : ''}
            </div>
        `;
    }
}

// Export for use in other modules
window.COCComponents = COCComponents;