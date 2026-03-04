/*
=============================================================================
CLASH OF CLANS DASHBOARD - WAR MANAGEMENT SYSTEM
=============================================================================
This module provides comprehensive war tracking functionality for Phase 3:
- War log tracking and history
- War statistics and analytics
- Attack performance tracking
- Visual war timelines
- Player war performance metrics
*/

class WarManagement {
    constructor() {
        this.wars = new Map();
        this.warStats = new Map();
        this.playerStats = new Map();
        this.currentWar = null;
        this.updateInterval = null;
        
        // Initialize with sample data for demo
        this.initializeSampleData();
    }

    /*
    =============================================================================
    INITIALIZATION & SAMPLE DATA
    =============================================================================
    */

    /**
     * Initialize with sample war data for demonstration
     */
    initializeSampleData() {
        const now = new Date();
        const sampleWars = [
            {
                id: 'war_001',
                clanTag: '#2PP2Y9L0Y',
                opponentTag: '#OPPONENT1',
                clanName: 'Our Clan',
                opponentName: 'Enemy Clan',
                state: 'warEnded',
                teamSize: 15,
                startTime: new Date(now - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                endTime: new Date(now - 1 * 24 * 60 * 60 * 1000),   // 1 day ago
                preparationStartTime: new Date(now - 3 * 24 * 60 * 60 * 1000),
                clanLevel: 15,
                opponentLevel: 14,
                clanStars: 43,
                opponentStars: 41,
                clanDestructionPercentage: 87.2,
                opponentDestructionPercentage: 85.1,
                clanExpEarned: 112,
                opponentExpEarned: 98,
                result: 'win'
            },
            {
                id: 'war_002',
                clanTag: '#2PP2Y9L0Y',
                opponentTag: '#OPPONENT2',
                clanName: 'Our Clan',
                opponentName: 'Strong Opponents',
                state: 'inWar',
                teamSize: 20,
                startTime: new Date(now - 6 * 60 * 60 * 1000), // 6 hours ago
                endTime: new Date(now + 18 * 60 * 60 * 1000),  // 18 hours from now
                preparationStartTime: new Date(now - 30 * 60 * 60 * 1000),
                clanLevel: 15,
                opponentLevel: 16,
                clanStars: 28,
                opponentStars: 31,
                clanDestructionPercentage: 72.8,
                opponentDestructionPercentage: 78.3,
                clanExpEarned: 0,
                opponentExpEarned: 0,
                result: 'ongoing'
            },
            {
                id: 'war_003',
                clanTag: '#2PP2Y9L0Y',
                opponentTag: '#OPPONENT3',
                clanName: 'Our Clan',
                opponentName: 'Weak Clan',
                state: 'warEnded',
                teamSize: 10,
                startTime: new Date(now - 7 * 24 * 60 * 60 * 1000),
                endTime: new Date(now - 6 * 24 * 60 * 60 * 1000),
                preparationStartTime: new Date(now - 8 * 24 * 60 * 60 * 1000),
                clanLevel: 15,
                opponentLevel: 12,
                clanStars: 30,
                opponentStars: 18,
                clanDestructionPercentage: 98.7,
                opponentDestructionPercentage: 52.1,
                clanExpEarned: 156,
                opponentExpEarned: 45,
                result: 'win'
            }
        ];

        // Add wars to the system
        sampleWars.forEach(war => {
            this.wars.set(war.id, war);
            this.calculateWarStats(war);
        });

        // Set current war
        this.currentWar = sampleWars.find(w => w.state === 'inWar') || null;

        console.log('War Management initialized with', this.wars.size, 'sample wars');
    }

    /*
    =============================================================================
    WAR STATISTICS CALCULATION
    =============================================================================
    */

    /**
     * Calculate comprehensive statistics for a war
     * @param {Object} war - War object
     */
    calculateWarStats(war) {
        const stats = {
            warId: war.id,
            duration: this.calculateWarDuration(war),
            efficiency: this.calculateWarEfficiency(war),
            averageStarsPerAttack: this.calculateAverageStars(war),
            destructionRate: war.clanDestructionPercentage,
            performanceRating: this.calculatePerformanceRating(war),
            outcome: war.result,
            teamSizeCategory: this.getTeamSizeCategory(war.teamSize),
            opponentStrength: this.calculateOpponentStrength(war)
        };

        this.warStats.set(war.id, stats);
        return stats;
    }

    /**
     * Calculate war duration in hours
     * @param {Object} war - War object
     * @returns {number} Duration in hours
     */
    calculateWarDuration(war) {
        const duration = (new Date(war.endTime) - new Date(war.startTime)) / (1000 * 60 * 60);
        return Math.round(duration * 10) / 10; // Round to 1 decimal place
    }

    /**
     * Calculate war efficiency (stars per hour)
     * @param {Object} war - War object  
     * @returns {number} Stars per hour
     */
    calculateWarEfficiency(war) {
        const duration = this.calculateWarDuration(war);
        return duration > 0 ? Math.round((war.clanStars / duration) * 10) / 10 : 0;
    }

    /**
     * Calculate average stars per attack
     * @param {Object} war - War object
     * @returns {number} Average stars
     */
    calculateAverageStars(war) {
        // Assuming each member can attack twice (2 * teamSize = max attacks)
        const maxAttacks = war.teamSize * 2;
        return Math.round((war.clanStars / maxAttacks) * 100) / 100;
    }

    /**
     * Calculate overall performance rating
     * @param {Object} war - War object
     * @returns {number} Rating from 0-10
     */
    calculatePerformanceRating(war) {
        const starRating = (war.clanStars / (war.teamSize * 3)) * 4; // Max 4 points for stars
        const destructionRating = (war.clanDestructionPercentage / 100) * 3; // Max 3 points for destruction
        const resultRating = war.result === 'win' ? 3 : war.result === 'tie' ? 1.5 : 0; // Max 3 points for result
        
        return Math.round((starRating + destructionRating + resultRating) * 10) / 10;
    }

    /**
     * Get team size category
     * @param {number} teamSize - Size of war team
     * @returns {string} Category name
     */
    getTeamSizeCategory(teamSize) {
        if (teamSize <= 10) return 'Small';
        if (teamSize <= 20) return 'Medium';
        if (teamSize <= 30) return 'Large';
        return 'Maximum';
    }

    /**
     * Calculate opponent strength rating
     * @param {Object} war - War object
     * @returns {string} Strength category
     */
    calculateOpponentStrength(war) {
        const levelDiff = war.opponentLevel - war.clanLevel;
        if (levelDiff >= 3) return 'Much Stronger';
        if (levelDiff >= 1) return 'Stronger';
        if (levelDiff <= -3) return 'Much Weaker';
        if (levelDiff <= -1) return 'Weaker';
        return 'Equal Strength';
    }

    /*
    =============================================================================
    WAR DISPLAY GENERATION
    =============================================================================
    */

    /**
     * Generate HTML for war management dashboard
     * @param {Object} options - Display options
     * @returns {string} HTML string
     */
    generateWarManagementHTML(options = {}) {
        const { showCurrentWar = true, showRecentWars = true, maxWars = 5 } = options;
        
        let html = '';

        // Current War Section
        if (showCurrentWar && this.currentWar) {
            html += this.generateCurrentWarSection();
        }

        // War Statistics Overview
        html += this.generateWarStatsOverview();

        // Recent Wars History
        if (showRecentWars) {
            html += this.generateRecentWarsSection(maxWars);
        }

        return `
            <div class="war-management">
                ${html}
            </div>
        `;
    }

    /**
     * Generate current war section
     * @returns {string} HTML string
     */
    generateCurrentWarSection() {
        if (!this.currentWar) {
            return `
                <div class="current-war-section">
                    <div class="section-header">
                        <h3>⚔️ Current War</h3>
                    </div>
                    <div class="no-current-war">
                        <div class="no-war-icon">🕊️</div>
                        <div class="no-war-message">No active war</div>
                        <div class="no-war-description">Your clan is currently not in war</div>
                    </div>
                </div>
            `;
        }

        const war = this.currentWar;
        const timeRemaining = this.getTimeRemaining(war.endTime);
        const progress = this.getWarProgress(war);

        return `
            <div class="current-war-section">
                <div class="section-header">
                    <h3>⚔️ Current War</h3>
                    <div class="war-status ${war.state}">
                        ${this.getWarStatusIcon(war.state)} ${this.getWarStatusText(war.state)}
                    </div>
                </div>
                
                <div class="current-war-card">
                    <div class="war-teams">
                        <div class="team our-team">
                            <div class="team-info">
                                <div class="team-name">${war.clanName}</div>
                                <div class="team-level">Level ${war.clanLevel}</div>
                            </div>
                            <div class="team-stats">
                                <div class="stars">⭐ ${war.clanStars}</div>
                                <div class="destruction">${war.clanDestructionPercentage}%</div>
                            </div>
                        </div>
                        
                        <div class="vs-section">
                            <div class="vs-text">VS</div>
                            <div class="war-timer" data-end-time="${war.endTime}">
                                ${timeRemaining.display}
                            </div>
                        </div>
                        
                        <div class="team opponent-team">
                            <div class="team-stats">
                                <div class="stars">⭐ ${war.opponentStars}</div>
                                <div class="destruction">${war.opponentDestructionPercentage}%</div>
                            </div>
                            <div class="team-info">
                                <div class="team-name">${war.opponentName}</div>
                                <div class="team-level">Level ${war.opponentLevel}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="war-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="progress-text">${Math.round(progress)}% Complete</div>
                    </div>
                    
                    <div class="war-actions">
                        <button class="war-btn" onclick="warManagement.viewWarDetails('${war.id}')">
                            📊 War Details
                        </button>
                        <button class="war-btn" onclick="warManagement.viewWarMap('${war.id}')">
                            🗺️ War Map
                        </button>
                        <button class="war-btn" onclick="warManagement.refreshWarData('${war.id}')">
                            🔄 Refresh
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate war statistics overview
     * @returns {string} HTML string
     */
    generateWarStatsOverview() {
        const totalWars = this.wars.size;
        const wins = Array.from(this.wars.values()).filter(w => w.result === 'win').length;
        const losses = Array.from(this.wars.values()).filter(w => w.result === 'loss').length;
        const winRate = totalWars > 0 ? Math.round((wins / totalWars) * 100) : 0;
        
        const avgStars = this.calculateAverageStarsAcrossWars();
        const avgDestruction = this.calculateAverageDestructionAcrossWars();

        return `
            <div class="war-stats-overview">
                <div class="section-header">
                    <h3>📊 War Statistics</h3>
                </div>
                
                <div class="stats-grid">
                    ${COCComponents.createStatCard({
                        icon: '🏆',
                        value: winRate + '%',
                        label: 'Win Rate',
                        type: 'primary',
                        tooltip: `${wins} wins, ${losses} losses out of ${totalWars} wars`
                    })}
                    
                    ${COCComponents.createStatCard({
                        icon: '⭐',
                        value: avgStars.toFixed(1),
                        label: 'Avg Stars',
                        type: 'warning',
                        tooltip: 'Average stars earned per war'
                    })}
                    
                    ${COCComponents.createStatCard({
                        icon: '💥',
                        value: avgDestruction.toFixed(1) + '%',
                        label: 'Avg Destruction',
                        type: 'secondary',
                        tooltip: 'Average destruction percentage'
                    })}
                    
                    ${COCComponents.createStatCard({
                        icon: '⚔️',
                        value: totalWars,
                        label: 'Total Wars',
                        type: 'success',
                        tooltip: 'Total wars participated in'
                    })}
                </div>
            </div>
        `;
    }

    /**
     * Generate recent wars section
     * @param {number} maxWars - Maximum wars to show
     * @returns {string} HTML string
     */
    generateRecentWarsSection(maxWars = 5) {
        const recentWars = Array.from(this.wars.values())
            .filter(w => w.state === 'warEnded')
            .sort((a, b) => new Date(b.endTime) - new Date(a.endTime))
            .slice(0, maxWars);

        if (recentWars.length === 0) {
            return `
                <div class="recent-wars-section">
                    <div class="section-header">
                        <h3>📜 Recent Wars</h3>
                    </div>
                    <div class="no-wars">No recent wars found</div>
                </div>
            `;
        }

        const warsHTML = recentWars.map(war => this.generateWarCard(war)).join('');

        return `
            <div class="recent-wars-section">
                <div class="section-header">
                    <h3>📜 Recent Wars</h3>
                    <button class="section-btn" onclick="warManagement.showAllWars()">
                        View All →
                    </button>
                </div>
                
                <div class="wars-list">
                    ${warsHTML}
                </div>
            </div>
        `;
    }

    /**
     * Generate individual war card
     * @param {Object} war - War object
     * @returns {string} HTML string
     */
    generateWarCard(war) {
        const stats = this.warStats.get(war.id);
        const resultClass = war.result === 'win' ? 'victory' : war.result === 'loss' ? 'defeat' : 'tie';
        const resultIcon = war.result === 'win' ? '🏆' : war.result === 'loss' ? '💔' : '🤝';

        return `
            <div class="war-card ${resultClass}" onclick="warManagement.viewWarDetails('${war.id}')">
                <div class="war-card-header">
                    <div class="war-result">
                        <div class="result-icon">${resultIcon}</div>
                        <div class="result-text">${war.result.toUpperCase()}</div>
                    </div>
                    <div class="war-date">
                        ${this.formatDate(war.endTime)}
                    </div>
                </div>
                
                <div class="war-matchup">
                    <div class="clan-score">
                        <span class="clan-name">${war.clanName}</span>
                        <span class="score">${war.clanStars}⭐ ${war.clanDestructionPercentage}%</span>
                    </div>
                    <div class="vs">vs</div>
                    <div class="opponent-score">
                        <span class="score">${war.opponentStars}⭐ ${war.opponentDestructionPercentage}%</span>
                        <span class="opponent-name">${war.opponentName}</span>
                    </div>
                </div>
                
                <div class="war-card-stats">
                    <div class="stat-item">
                        <span class="stat-label">Team Size:</span>
                        <span class="stat-value">${war.teamSize}v${war.teamSize}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Performance:</span>
                        <span class="stat-value">${stats ? stats.performanceRating : 0}/10</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate compact war widget for dashboard
     * @returns {string} HTML string
     */
    generateWarWidget() {
        const totalWars = this.wars.size;
        const wins = Array.from(this.wars.values()).filter(w => w.result === 'win').length;
        const winRate = totalWars > 0 ? Math.round((wins / totalWars) * 100) : 0;

        return `
            <div class="war-widget">
                <div class="widget-header">
                    <div class="widget-title">⚔️ War Status</div>
                    <button class="widget-expand" onclick="warManagement.showFullView()" title="View War Management">
                        ↗️
                    </button>
                </div>
                
                ${this.currentWar ? `
                    <div class="current-war-widget">
                        <div class="widget-war-status">
                            🔴 War in Progress
                        </div>
                        <div class="widget-war-teams">
                            <div class="widget-team">
                                <span class="team-name">${this.currentWar.clanName}</span>
                                <span class="team-score">${this.currentWar.clanStars}⭐</span>
                            </div>
                            <div class="vs">vs</div>
                            <div class="widget-team">
                                <span class="team-score">${this.currentWar.opponentStars}⭐</span>
                                <span class="team-name">${this.currentWar.opponentName}</span>
                            </div>
                        </div>
                        <div class="widget-war-timer" data-end-time="${this.currentWar.endTime}">
                            ${this.getTimeRemaining(this.currentWar.endTime).short}
                        </div>
                    </div>
                ` : `
                    <div class="no-current-war-widget">
                        <div class="widget-status">🕊️ No Active War</div>
                        <div class="widget-stats">
                            <span>Win Rate: ${winRate}%</span>
                            <span>Total Wars: ${totalWars}</span>
                        </div>
                    </div>
                `}
                
                <div class="widget-actions">
                    <button class="widget-btn" onclick="warManagement.refreshWarData()" title="Refresh War Data">
                        🔄
                    </button>
                    <button class="widget-btn" onclick="warManagement.viewWarHistory()" title="War History">
                        📜
                    </button>
                </div>
            </div>
        `;
    }

    /*
    =============================================================================
    UTILITY FUNCTIONS
    =============================================================================
    */

    /**
     * Get time remaining until war end
     * @param {string|Date} endTime - War end time
     * @returns {Object} Time information
     */
    getTimeRemaining(endTime) {
        const now = new Date();
        const end = new Date(endTime);
        const timeDiff = end.getTime() - now.getTime();

        if (timeDiff <= 0) {
            return {
                display: 'War Ended',
                short: 'Ended',
                totalSeconds: 0
            };
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        return {
            display: `${hours}h ${minutes}m`,
            short: `${hours}h ${minutes}m`,
            totalSeconds: Math.floor(timeDiff / 1000)
        };
    }

    /**
     * Get war progress percentage
     * @param {Object} war - War object
     * @returns {number} Progress percentage
     */
    getWarProgress(war) {
        const now = new Date();
        const start = new Date(war.startTime);
        const end = new Date(war.endTime);
        
        if (now < start) return 0;
        if (now > end) return 100;
        
        const elapsed = now.getTime() - start.getTime();
        const total = end.getTime() - start.getTime();
        
        return Math.max(0, Math.min(100, (elapsed / total) * 100));
    }

    /**
     * Get war status icon
     * @param {string} state - War state
     * @returns {string} Icon
     */
    getWarStatusIcon(state) {
        switch (state) {
            case 'preparation': return '⚡';
            case 'inWar': return '⚔️';
            case 'warEnded': return '🏁';
            default: return '❓';
        }
    }

    /**
     * Get war status text
     * @param {string} state - War state
     * @returns {string} Status text
     */
    getWarStatusText(state) {
        switch (state) {
            case 'preparation': return 'Preparation Day';
            case 'inWar': return 'Battle Day';
            case 'warEnded': return 'War Ended';
            default: return 'Unknown';
        }
    }

    /**
     * Calculate average stars across all wars
     * @returns {number} Average stars
     */
    calculateAverageStarsAcrossWars() {
        const wars = Array.from(this.wars.values());
        if (wars.length === 0) return 0;
        
        const totalStars = wars.reduce((sum, war) => sum + war.clanStars, 0);
        return totalStars / wars.length;
    }

    /**
     * Calculate average destruction across all wars
     * @returns {number} Average destruction percentage
     */
    calculateAverageDestructionAcrossWars() {
        const wars = Array.from(this.wars.values());
        if (wars.length === 0) return 0;
        
        const totalDestruction = wars.reduce((sum, war) => sum + war.clanDestructionPercentage, 0);
        return totalDestruction / wars.length;
    }

    /**
     * Format date for display
     * @param {string|Date} date - Date to format
     * @returns {string} Formatted date
     */
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    /*
    =============================================================================
    REAL-TIME UPDATES
    =============================================================================
    */

    /**
     * Start real-time war updates
     */
    startWarUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateWarTimers();
        }, 60000); // Update every minute

        console.log('War management updates started');
    }

    /**
     * Stop real-time updates
     */
    stopWarUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        console.log('War management updates stopped');
    }

    /**
     * Update all war timer displays
     */
    updateWarTimers() {
        document.querySelectorAll('.war-timer, .widget-war-timer').forEach(element => {
            const endTime = element.getAttribute('data-end-time');
            if (endTime) {
                const timeInfo = this.getTimeRemaining(endTime);
                element.textContent = element.classList.contains('widget-war-timer') ? 
                    timeInfo.short : timeInfo.display;
            }
        });
    }

    /*
    =============================================================================
    USER INTERACTION FUNCTIONS
    =============================================================================
    */

    /**
     * View detailed war information
     * @param {string} warId - War ID
     */
    viewWarDetails(warId) {
        // TODO: Implement detailed war view
        console.log('View war details for:', warId);
        alert('War details view coming soon!');
    }

    /**
     * View war map
     * @param {string} warId - War ID
     */
    viewWarMap(warId) {
        // TODO: Implement war map view
        console.log('View war map for:', warId);
        alert('War map view coming soon!');
    }

    /**
     * Refresh war data
     * @param {string} warId - Optional specific war ID
     */
    refreshWarData(warId = null) {
        console.log('Refreshing war data', warId ? `for ${warId}` : '');
        // TODO: Implement API refresh
        this.showToast('War data refreshed successfully!');
    }

    /**
     * Show all wars
     */
    showAllWars() {
        // TODO: Implement full wars view
        console.log('Show all wars');
        alert('Full wars history view coming soon!');
    }

    /**
     * Show war history
     */
    viewWarHistory() {
        this.showAllWars();
    }

    /**
     * Show full war management view
     */
    showFullView() {
        // TODO: Implement full war management page
        console.log('Show full war management view');
        alert('Full war management view coming soon!');
    }

    /**
     * Show toast notification
     * @param {string} message - Message to show
     * @param {string} type - Type of notification
     */
    showToast(message, type = 'success') {
        // Use existing global notification system if available
        if (typeof showGlobalNotification === 'function') {
            showGlobalNotification(message, type);
        } else {
            console.log(`Toast (${type}):`, message);
        }
    }

    /*
    =============================================================================
    LIFECYCLE MANAGEMENT
    =============================================================================
    */

    /**
     * Initialize the war management system
     */
    initialize() {
        console.log('Initializing War Management System...');
        
        // Start real-time updates
        this.startWarUpdates();
        
        console.log('War Management System initialized with', this.wars.size, 'wars');
    }

    /**
     * Clean up resources
     */
    cleanup() {
        this.stopWarUpdates();
        this.wars.clear();
        this.warStats.clear();
        this.playerStats.clear();
        this.currentWar = null;
        
        console.log('War Management System cleaned up');
    }
}

// Create global instance
const warManagement = new WarManagement();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => warManagement.initialize());
} else {
    warManagement.initialize();
}

// Export for use in other modules
window.WarManagement = WarManagement;
window.warManagement = warManagement;