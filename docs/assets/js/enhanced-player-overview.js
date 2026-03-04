/*
=============================================================================
CLASH OF CLANS DASHBOARD - ENHANCED PLAYER OVERVIEW
=============================================================================
This module provides enhanced player overview functionality for Phase 1:
- Detailed player statistics display
- Troop composition viewer with real troop icons
- Offensive strength calculator
- Hero status display
- Integration with existing profile system
*/

class EnhancedPlayerOverview {
    constructor() {
        this.currentPlayerData = null;
        this.refreshTimer = null;
        this.strengthCalculationCache = new Map();
    }

    /*
    =============================================================================
    MAIN DISPLAY FUNCTIONS
    =============================================================================
    */

    /**
     * Display enhanced overview for a specific player
     * @param {string} playerTag - Player tag
     * @param {Object} existingData - Existing player data from database (optional)
     */
    async displayPlayerOverview(playerTag, existingData = null) {
        const container = document.getElementById('enhancedPlayerOverview');
        if (!container) {
            console.error('Enhanced player overview container not found');
            return;
        }

        // Show loading state
        container.innerHTML = COCComponents.createLoadingSpinner('Loading enhanced player data...');

        try {
            // Get player data (either from existing or fetch fresh)
            let playerData = existingData;
            if (!playerData) {
                playerData = await this.fetchPlayerData(playerTag);
            }

            if (!playerData) {
                container.innerHTML = COCComponents.createErrorDisplay('Player data not found', true);
                return;
            }

            this.currentPlayerData = playerData;

            // Generate the enhanced overview HTML
            const overviewHTML = this.generateOverviewHTML(playerData);
            container.innerHTML = overviewHTML;

            // Setup event listeners for interactive elements
            this.setupEnhancedEventListeners(playerTag);

            // Start auto-refresh timer (every 5 minutes)
            this.startAutoRefresh(playerTag);

        } catch (error) {
            console.error('Error displaying enhanced player overview:', error);
            container.innerHTML = COCComponents.createErrorDisplay(error.message, true);
        }
    }

    /**
     * Generate the complete HTML for enhanced player overview
     * @param {Object} playerData - Player data object
     * @returns {string} HTML string
     */
    generateOverviewHTML(playerData) {
        const basicStats = this.generateBasicStats(playerData);
        const heroStats = this.generateHeroStats(playerData);
        const troopComposition = this.generateTroopComposition(playerData);
        const offensiveStrength = this.generateOffensiveStrength(playerData);

        return `
            <div class="enhanced-player-overview">
                <!-- Basic Player Statistics -->
                <div class="player-overview-section">
                    <div class="section-header">
                        <div class="section-title">
                            🏆 Player Statistics
                        </div>
                        <div class="section-actions">
                            <button class="section-btn" onclick="enhancedOverview.refreshPlayerData('${playerData.tag}')">
                                🔄 Refresh
                            </button>
                        </div>
                    </div>
                    <div class="stats-grid">
                        ${basicStats}
                    </div>
                </div>

                <!-- Hero Information -->
                <div class="player-overview-section">
                    <div class="section-header">
                        <div class="section-title">
                            👑 Heroes & Pets
                        </div>
                        <div class="section-actions">
                            <button class="section-btn" onclick="enhancedOverview.showHeroDetails('${playerData.tag}')">
                                📊 Details
                            </button>
                        </div>
                    </div>
                    <div class="heroes-container">
                        ${heroStats}
                    </div>
                </div>

                <!-- Troop Composition -->
                <div class="player-overview-section">
                    <div class="section-header">
                        <div class="section-title">
                            ⚔️ Army Composition
                        </div>
                        <div class="section-actions">
                            <button class="section-btn" onclick="enhancedOverview.copyArmy('${playerData.tag}')">
                                📋 Copy Army
                            </button>
                        </div>
                    </div>
                    ${troopComposition}
                </div>

                <!-- Offensive Strength -->
                <div class="player-overview-section">
                    <div class="section-header">
                        <div class="section-title">
                            💥 Offensive Strength
                        </div>
                        <div class="section-actions">
                            <button class="section-btn" onclick="enhancedOverview.explainCalculation()">
                                ❓ How it works
                            </button>
                        </div>
                    </div>
                    ${offensiveStrength}
                </div>
            </div>
        `;
    }

    /*
    =============================================================================
    STAT GENERATION FUNCTIONS
    =============================================================================
    */

    /**
     * Generate basic player statistics cards
     * @param {Object} playerData - Player data
     * @returns {string} HTML string
     */
    generateBasicStats(playerData) {
        const stats = [
            {
                icon: this.getTownHallIcon(playerData.townHallLevel || 1),
                value: `TH${playerData.townHallLevel || 1}`,
                label: 'Town Hall',
                type: 'primary',
                tooltip: `Town Hall Level ${playerData.townHallLevel || 1}`
            },
            {
                icon: this.getTrophyIcon(playerData.trophies || 0),
                value: COCComponents.formatNumber(playerData.trophies || 0),
                label: 'Trophies',
                type: 'warning',
                tooltip: `${playerData.trophies || 0} trophies`
            },
            {
                icon: '⭐',
                value: playerData.expLevel || 1,
                label: 'Experience',
                type: 'secondary',
                tooltip: `Experience Level ${playerData.expLevel || 1}`
            },
            {
                icon: '🏰',
                value: playerData.clanName || 'No Clan',
                label: 'Clan',
                type: 'primary',
                tooltip: playerData.clanName ? `Member of ${playerData.clanName}` : 'Not in a clan'
            },
            {
                icon: '🤝',
                value: COCComponents.formatNumber(playerData.donations || 0),
                label: 'Donations',
                type: 'success',
                tooltip: `${playerData.donations || 0} troops donated this season`
            },
            {
                icon: '📥',
                value: COCComponents.formatNumber(playerData.donationsReceived || 0),
                label: 'Received',
                type: 'success',
                tooltip: `${playerData.donationsReceived || 0} troops received this season`
            }
        ];

        return stats.map(stat => 
            COCComponents.createStatCard(stat)
        ).join('');
    }

    /**
     * Generate hero statistics display
     * @param {Object} playerData - Player data
     * @returns {string} HTML string
     */
    generateHeroStats(playerData) {
        // Mock hero data (replace with real API data when available)
        const heroes = this.extractHeroData(playerData);
        
        if (!heroes || heroes.length === 0) {
            return '<div class="coc-error"><div class="error-message">Hero data not available</div></div>';
        }

        return heroes.map(hero => 
            COCComponents.createHeroDisplay(hero)
        ).join('');
    }

    /**
     * Generate troop composition display
     * @param {Object} playerData - Player data
     * @returns {string} HTML string
     */
    generateTroopComposition(playerData) {
        const troopData = this.extractTroopData(playerData);

        if (!troopData || troopData.troops.length === 0) {
            return '<div class="troop-categories"><div class="coc-error"><div class="error-message">Army composition data not available</div></div></div>';
        }

        const elixirTroops = troopData.troops.filter(t => this.isElixirTroop(t.name));
        const darkTroops = troopData.troops.filter(t => this.isDarkTroop(t.name));
        const siegeMachines = troopData.troops.filter(t => this.isSiegeMachine(t.name));
        const spells = troopData.spells || [];

        return `
            <div class="troop-categories">
                ${elixirTroops.length > 0 ? `
                    <div class="troop-category">
                        <div class="category-header">
                            <div class="category-title">⚡ Elixir Troops</div>
                            <div class="category-count">${elixirTroops.length}</div>
                        </div>
                        ${COCComponents.createTroopComposition(elixirTroops, { size: 'medium', maxDisplay: 12 })}
                    </div>
                ` : ''}
                
                ${darkTroops.length > 0 ? `
                    <div class="troop-category">
                        <div class="category-header">
                            <div class="category-title">🌙 Dark Elixir Troops</div>
                            <div class="category-count">${darkTroops.length}</div>
                        </div>
                        ${COCComponents.createTroopComposition(darkTroops, { size: 'medium', maxDisplay: 12 })}
                    </div>
                ` : ''}
                
                ${siegeMachines.length > 0 ? `
                    <div class="troop-category">
                        <div class="category-header">
                            <div class="category-title">🏗️ Siege Machines</div>
                            <div class="category-count">${siegeMachines.length}</div>
                        </div>
                        ${COCComponents.createTroopComposition(siegeMachines, { size: 'medium', maxDisplay: 8 })}
                    </div>
                ` : ''}
                
                ${spells.length > 0 ? `
                    <div class="troop-category">
                        <div class="category-header">
                            <div class="category-title">✨ Spells</div>
                            <div class="category-count">${spells.length}</div>
                        </div>
                        ${this.createSpellComposition(spells)}
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Generate offensive strength analysis
     * @param {Object} playerData - Player data
     * @returns {string} HTML string
     */
    generateOffensiveStrength(playerData) {
        const strength = this.calculateOffensiveStrength(playerData);
        return COCComponents.createOffensiveStrengthMeter(strength);
    }

    /*
    =============================================================================
    DATA EXTRACTION & PROCESSING
    =============================================================================
    */

    /**
     * Fetch fresh player data from API
     * @param {string} playerTag - Player tag
     * @returns {Object} Player data
     */
    async fetchPlayerData(playerTag) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/refresh-player/${encodeURIComponent(playerTag)}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch player data: ${response.status}`);
            }

            const result = await response.json();
            return result.player;
        } catch (error) {
            console.error('Error fetching player data:', error);
            throw error;
        }
    }

    /**
     * Extract hero data from player data
     * @param {Object} playerData - Player data
     * @returns {Array} Hero objects
     */
    extractHeroData(playerData) {
        // Mock hero data - replace with real extraction when API data is available
        const mockHeroes = [
            {
                name: 'Barbarian King',
                level: 75,
                isUpgrading: false,
                isDown: false
            },
            {
                name: 'Archer Queen',
                level: 80,
                isUpgrading: true,
                isDown: true
            },
            {
                name: 'Grand Warden',
                level: 50,
                isUpgrading: false,
                isDown: false
            },
            {
                name: 'Royal Champion',
                level: 25,
                isUpgrading: false,
                isDown: false
            }
        ];

        // TODO: Replace with real hero data extraction
        // if (playerData.heroes) {
        //     return playerData.heroes.map(hero => ({
        //         name: hero.name,
        //         level: hero.level,
        //         isUpgrading: hero.isUpgrading || false,
        //         isDown: !hero.isAwake
        //     }));
        // }

        return mockHeroes;
    }

    /**
     * Extract troop data from player data
     * @param {Object} playerData - Player data
     * @returns {Object} Troop composition data
     */
    extractTroopData(playerData) {
        // Mock troop data - replace with real extraction when API data is available
        const mockTroops = {
            troops: [
                { name: 'Barbarian', count: 20, level: 9 },
                { name: 'Archer', count: 40, level: 9 },
                { name: 'Giant', count: 4, level: 8 },
                { name: 'Wizard', count: 16, level: 8 },
                { name: 'Dragon', count: 2, level: 7 },
                { name: 'Hog Rider', count: 20, level: 9 },
                { name: 'Valkyrie', count: 6, level: 6 },
                { name: 'Golem', count: 1, level: 5 }
            ],
            spells: [
                { name: 'Lightning', count: 2, level: 8 },
                { name: 'Rage', count: 3, level: 6 },
                { name: 'Heal', count: 2, level: 7 },
                { name: 'Poison', count: 1, level: 6 }
            ]
        };

        // TODO: Replace with real troop data extraction
        // if (playerData.troops) {
        //     return {
        //         troops: playerData.troops.map(troop => ({
        //             name: troop.name,
        //             count: troop.count,
        //             level: troop.level
        //         })),
        //         spells: playerData.spells ? playerData.spells.map(spell => ({
        //             name: spell.name,
        //             count: spell.count,
        //             level: spell.level
        //         })) : []
        //     };
        // }

        return mockTroops;
    }

    /**
     * Calculate offensive strength based on player data
     * @param {Object} playerData - Player data
     * @returns {Object} Strength calculation result
     */
    calculateOffensiveStrength(playerData) {
        // Check cache first
        const cacheKey = `${playerData.tag}_${playerData.lastUpdate || Date.now()}`;
        if (this.strengthCalculationCache.has(cacheKey)) {
            return this.strengthCalculationCache.get(cacheKey);
        }

        const troopData = this.extractTroopData(playerData);
        const heroData = this.extractHeroData(playerData);
        
        // Scoring factors
        const scores = {
            troops: this.scoreTroops(troopData.troops),
            spells: this.scoreSpells(troopData.spells || []),
            heroes: this.scoreHeroes(heroData),
            townHall: this.scoreTownHall(playerData.townHallLevel || 1),
            experience: this.scoreExperience(playerData.expLevel || 1)
        };

        // Calculate weighted total
        const weights = {
            troops: 0.35,
            spells: 0.20,
            heroes: 0.30,
            townHall: 0.10,
            experience: 0.05
        };

        let total = 0;
        const breakdown = [];

        Object.keys(scores).forEach(category => {
            const weighted = scores[category] * weights[category];
            total += weighted;
            breakdown.push({
                category: category.charAt(0).toUpperCase() + category.slice(1),
                value: weighted * 10 // Scale to 0-10 range
            });
        });

        const result = {
            total: total * 10, // Scale to 0-10 range
            breakdown: breakdown,
            rating: this.getRating(total * 10)
        };

        // Cache the result
        this.strengthCalculationCache.set(cacheKey, result);
        
        return result;
    }

    /*
    =============================================================================
    HELPER FUNCTIONS
    =============================================================================
    */

    /**
     * Create spell composition display
     * @param {Array} spells - Array of spell objects
     * @returns {string} HTML string
     */
    createSpellComposition(spells) {
        return spells.map(spell => `
            <div class="troop-slot medium" title="${spell.name} (Level ${spell.level})">
                ${COCComponents.getSpellIcon(spell.name, spell.level)}
                ${spell.count > 1 ? `<span class="troop-count">${spell.count}</span>` : ''}
            </div>
        `).join('');
    }

    /**
     * Check if troop is an elixir troop
     * @param {string} troopName - Troop name
     * @returns {boolean}
     */
    isElixirTroop(troopName) {
        const elixirTroops = ['barbarian', 'archer', 'giant', 'goblin', 'wizard', 'balloon', 'wallbreaker', 'healer', 'dragon', 'pekka', 'babydragon', 'miner', 'electrodragon', 'yeti', 'dragonrider'];
        return elixirTroops.includes(troopName.toLowerCase().replace(/\s+/g, ''));
    }

    /**
     * Check if troop is a dark elixir troop
     * @param {string} troopName - Troop name
     * @returns {boolean}
     */
    isDarkTroop(troopName) {
        const darkTroops = ['minion', 'hogrider', 'valkyrie', 'golem', 'witch', 'lavahound', 'bowler', 'icegolem', 'headhunter'];
        return darkTroops.includes(troopName.toLowerCase().replace(/\s+/g, ''));
    }

    /**
     * Check if troop is a siege machine
     * @param {string} troopName - Troop name
     * @returns {boolean}
     */
    isSiegeMachine(troopName) {
        const siegeMachines = ['wallwrecker', 'battleblimp', 'stoneslammer', 'siegebarracks', 'loglauncher', 'flameflinger', 'battledrill'];
        return siegeMachines.includes(troopName.toLowerCase().replace(/\s+/g, ''));
    }

    /**
     * Score troops for offensive strength calculation
     * @param {Array} troops - Array of troop objects
     * @returns {number} Troop score (0-1)
     */
    scoreTroops(troops) {
        if (!troops || troops.length === 0) return 0;
        
        let score = 0;
        troops.forEach(troop => {
            // Base score based on troop tier and level
            const baseScore = this.getTroopBaseScore(troop.name);
            const levelMultiplier = Math.min(troop.level / 10, 1);
            const countMultiplier = Math.min(troop.count / 20, 1);
            
            score += baseScore * levelMultiplier * countMultiplier;
        });
        
        return Math.min(score / troops.length, 1);
    }

    /**
     * Score spells for offensive strength calculation
     * @param {Array} spells - Array of spell objects
     * @returns {number} Spell score (0-1)
     */
    scoreSpells(spells) {
        if (!spells || spells.length === 0) return 0;
        
        let score = 0;
        spells.forEach(spell => {
            const baseScore = this.getSpellBaseScore(spell.name);
            const levelMultiplier = Math.min(spell.level / 8, 1);
            
            score += baseScore * levelMultiplier;
        });
        
        return Math.min(score / 4, 1); // Assume 4 spell slots
    }

    /**
     * Score heroes for offensive strength calculation
     * @param {Array} heroes - Array of hero objects
     * @returns {number} Hero score (0-1)
     */
    scoreHeroes(heroes) {
        if (!heroes || heroes.length === 0) return 0;
        
        let score = 0;
        heroes.forEach(hero => {
            if (!hero.isDown) { // Only count active heroes
                const maxLevel = this.getHeroMaxLevel(hero.name);
                const levelScore = hero.level / maxLevel;
                score += levelScore;
            }
        });
        
        return Math.min(score / heroes.length, 1);
    }

    /**
     * Score town hall level
     * @param {number} thLevel - Town Hall level
     * @returns {number} TH score (0-1)
     */
    scoreTownHall(thLevel) {
        return Math.min(thLevel / 16, 1); // TH16 is current max
    }

    /**
     * Score experience level
     * @param {number} expLevel - Experience level
     * @returns {number} Experience score (0-1)
     */
    scoreExperience(expLevel) {
        return Math.min(expLevel / 500, 1); // Scale based on typical high levels
    }

    /**
     * Get base score for a troop
     * @param {string} troopName - Troop name
     * @returns {number} Base score
     */
    getTroopBaseScore(troopName) {
        const troopScores = {
            'barbarian': 0.3, 'archer': 0.3, 'giant': 0.7, 'wizard': 0.6,
            'dragon': 0.9, 'pekka': 0.9, 'hogrider': 0.8, 'valkyrie': 0.8,
            'golem': 0.7, 'witch': 0.7, 'lavahound': 0.8, 'bowler': 0.8,
            'miner': 0.7, 'electrodragon': 0.9, 'yeti': 0.8
        };
        
        return troopScores[troopName.toLowerCase().replace(/\s+/g, '')] || 0.5;
    }

    /**
     * Get base score for a spell
     * @param {string} spellName - Spell name
     * @returns {number} Base score
     */
    getSpellBaseScore(spellName) {
        const spellScores = {
            'rage': 0.9, 'heal': 0.7, 'jump': 0.8, 'freeze': 0.8,
            'lightning': 0.6, 'poison': 0.7, 'earthquake': 0.6,
            'haste': 0.5, 'clone': 0.9, 'invisibility': 0.8
        };
        
        return spellScores[spellName.toLowerCase().replace(/\s+/g, '')] || 0.6;
    }

    /**
     * Get maximum level for a hero
     * @param {string} heroName - Hero name
     * @returns {number} Max level
     */
    getHeroMaxLevel(heroName) {
        const maxLevels = {
            'Barbarian King': 85,
            'Archer Queen': 85,
            'Grand Warden': 60,
            'Royal Champion': 35
        };
        
        return maxLevels[heroName] || 80;
    }

    /**
     * Get rating text for strength score
     * @param {number} score - Strength score
     * @returns {string} Rating
     */
    getRating(score) {
        if (score >= 8) return 'Devastating';
        if (score >= 6) return 'Strong';
        if (score >= 4) return 'Average';
        return 'Weak';
    }

    /**
     * Get town hall icon
     * @param {number} level - TH level
     * @returns {string} HTML string
     */
    getTownHallIcon(level) {
        // Use the same function from profile.js
        return getTownHallIcon(level);
    }

    /**
     * Get trophy icon
     * @param {number} trophies - Trophy count
     * @returns {string} HTML string
     */
    getTrophyIcon(trophies) {
        // Use the same function from profile.js
        return getTrophyIcon(trophies);
    }

    /*
    =============================================================================
    EVENT HANDLERS & UTILITIES
    =============================================================================
    */

    /**
     * Setup event listeners for interactive elements
     * @param {string} playerTag - Player tag
     */
    setupEnhancedEventListeners(playerTag) {
        // Add click handlers for troop/spell details
        document.querySelectorAll('.troop-slot, .hero-display').forEach(element => {
            element.addEventListener('click', (e) => {
                // Show detailed information popup
                this.showDetailedInfo(e.target);
            });
        });
    }

    /**
     * Refresh player data
     * @param {string} playerTag - Player tag
     */
    async refreshPlayerData(playerTag) {
        await this.displayPlayerOverview(playerTag);
        console.log('Player data refreshed for', playerTag);
    }

    /**
     * Show detailed information popup
     * @param {Element} element - Clicked element
     */
    showDetailedInfo(element) {
        // TODO: Implement detailed info popup
        const title = element.getAttribute('title') || 'Details';
        alert(`Detailed info: ${title}`);
    }

    /**
     * Show hero details
     * @param {string} playerTag - Player tag
     */
    showHeroDetails(playerTag) {
        // TODO: Implement hero details modal
        console.log('Show hero details for', playerTag);
    }

    /**
     * Copy army composition
     * @param {string} playerTag - Player tag
     */
    copyArmy(playerTag) {
        // TODO: Implement copy army functionality
        console.log('Copy army for', playerTag);
        alert('Army composition copied to clipboard! (Feature coming soon)');
    }

    /**
     * Explain strength calculation
     */
    explainCalculation() {
        const explanation = `
Offensive Strength Calculation:

• Troops (35%): Based on troop levels, types, and composition
• Heroes (30%): Hero levels and availability (not upgrading/down)
• Spells (20%): Spell levels and strategic value
• Town Hall (10%): Overall progression indicator
• Experience (5%): Player skill estimation

Ratings:
• 8.0+ = Devastating
• 6.0-7.9 = Strong
• 4.0-5.9 = Average  
• Below 4.0 = Weak

This is an estimation based on visible army composition and player stats.
        `;
        
        alert(explanation);
    }

    /**
     * Start auto-refresh timer
     * @param {string} playerTag - Player tag
     */
    startAutoRefresh(playerTag) {
        // Clear existing timer
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }

        // Set up 5-minute refresh
        this.refreshTimer = setInterval(() => {
            this.refreshPlayerData(playerTag);
        }, 5 * 60 * 1000); // 5 minutes
    }

    /**
     * Stop auto-refresh timer
     */
    stopAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }

    /**
     * Clean up resources
     */
    cleanup() {
        this.stopAutoRefresh();
        this.strengthCalculationCache.clear();
        this.currentPlayerData = null;
    }
}

// Create global instance
const enhancedOverview = new EnhancedPlayerOverview();

// Export for use in other modules
window.EnhancedPlayerOverview = EnhancedPlayerOverview;
window.enhancedOverview = enhancedOverview;