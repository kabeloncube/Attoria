/*
=============================================================================
CLASH OF CLANS DASHBOARD - CLAN ANALYTICS SYSTEM
=============================================================================
Phase 4: Comprehensive clan management and analytics system including:
- Clan member tracking and performance analytics
- Donation statistics and activity monitoring  
- Member management and role assignments
- Clan performance metrics and insights
- Activity tracking and engagement analytics
*/

/**
 * Clan Analytics Management System
 * Handles clan member data, performance tracking, and analytics display
 */
class ClanAnalytics {
    constructor() {
        this.clanData = null;
        this.members = new Map();
        this.analytics = {};
        this.updateInterval = null;
        this.filters = {
            role: 'all',
            activity: 'all',
            minTrophies: 0,
            sortBy: 'trophies',
            sortOrder: 'desc'
        };
        
        // Initialize with sample data
        this.initializeSampleData();
        this.calculateAnalytics();
    }

    /**
     * Initialize the clan analytics system
     */
    init() {
        console.log('🏰 Initializing Clan Analytics System...');
        
        // Start analytics calculations
        this.calculateAnalytics();
        
        // Set up real-time updates
        this.startPeriodicUpdates();
        
        console.log('🏰 Clan Analytics System initialized successfully');
        return this;
    }

    /**
     * Initialize sample clan data for demonstration
     */
    initializeSampleData() {
        // Sample clan information
        this.clanData = {
            name: 'Ættoria Elite',
            tag: '#J8J280YC',
            description: 'Elite competitive clan with focus on war and CWL performance',
            type: 'invite only',
            location: 'International',
            badgeUrls: {
                small: 'https://api-assets.clashofclans.com/badges/70/abc123.png',
                large: 'https://api-assets.clashofclans.com/badges/200/abc123.png'
            },
            clanLevel: 18,
            clanPoints: 52847,
            clanVersusPoints: 31205,
            requiredTrophies: 3000,
            warFrequency: 'always',
            warWinStreak: 7,
            warWins: 342,
            warTies: 12,
            warLosses: 89,
            isWarLogPublic: true,
            warLeague: { name: 'Champion League III', id: 48000012 },
            members: 47,
            memberList: []
        };

        // Sample member data with detailed analytics
        const sampleMembers = [
            {
                tag: '#P2JLR8Q2Y',
                name: 'WarChief',
                role: 'leader',
                expLevel: 187,
                league: { name: 'Legend League', id: 29000022 },
                trophies: 5234,
                versusTrophies: 3456,
                clanRank: 1,
                previousClanRank: 2,
                donations: 2847,
                donationsReceived: 1234,
                townHallLevel: 16,
                warPreference: 'in',
                lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
                warStats: {
                    attacks: 234,
                    wins: 198,
                    stars: 645,
                    destructionPercentage: 78.5,
                    avgStars: 2.76
                },
                activity: {
                    dailyActivity: 8.5, // hours per day average
                    weeklyDonations: 145,
                    warParticipation: 0.95,
                    clanGamesContribution: 4000
                }
            },
            {
                tag: '#ABC123DEF',
                name: 'DragonMaster',
                role: 'co-leader',
                expLevel: 162,
                league: { name: 'Titan League I', id: 29000021 },
                trophies: 4876,
                versusTrophies: 3021,
                clanRank: 2,
                previousClanRank: 1,
                donations: 1987,
                donationsReceived: 876,
                townHallLevel: 15,
                warPreference: 'in',
                lastSeen: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
                joinDate: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000), // 280 days ago
                warStats: {
                    attacks: 187,
                    wins: 154,
                    stars: 512,
                    destructionPercentage: 75.2,
                    avgStars: 2.74
                },
                activity: {
                    dailyActivity: 6.8,
                    weeklyDonations: 98,
                    warParticipation: 0.89,
                    clanGamesContribution: 3500
                }
            },
            {
                tag: '#XYZ789GHI',
                name: 'Lightning⚡',
                role: 'elder',
                expLevel: 145,
                league: { name: 'Titan League II', id: 29000020 },
                trophies: 4523,
                versusTrophies: 2876,
                clanRank: 3,
                previousClanRank: 4,
                donations: 1654,
                donationsReceived: 1023,
                townHallLevel: 15,
                warPreference: 'in',
                lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
                joinDate: new Date(Date.now() - 156 * 24 * 60 * 60 * 1000), // 156 days ago
                warStats: {
                    attacks: 156,
                    wins: 118,
                    stars: 423,
                    destructionPercentage: 72.1,
                    avgStars: 2.71
                },
                activity: {
                    dailyActivity: 5.2,
                    weeklyDonations: 87,
                    warParticipation: 0.85,
                    clanGamesContribution: 3000
                }
            },
            {
                tag: '#DEF456JKL',
                name: 'IceCold',
                role: 'member',
                expLevel: 128,
                league: { name: 'Champion League I', id: 29000019 },
                trophies: 4234,
                versusTrophies: 2543,
                clanRank: 4,
                previousClanRank: 5,
                donations: 987,
                donationsReceived: 765,
                townHallLevel: 14,
                warPreference: 'in',
                lastSeen: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                joinDate: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000), // 89 days ago
                warStats: {
                    attacks: 89,
                    wins: 64,
                    stars: 234,
                    destructionPercentage: 68.9,
                    avgStars: 2.63
                },
                activity: {
                    dailyActivity: 4.1,
                    weeklyDonations: 52,
                    warParticipation: 0.78,
                    clanGamesContribution: 2500
                }
            },
            {
                tag: '#GHI789MNO',
                name: 'FireStorm',
                role: 'member',
                expLevel: 112,
                league: { name: 'Champion League II', id: 29000018 },
                trophies: 3987,
                versusTrophies: 2198,
                clanRank: 5,
                previousClanRank: 6,
                donations: 654,
                donationsReceived: 432,
                townHallLevel: 13,
                warPreference: 'in',
                lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
                warStats: {
                    attacks: 45,
                    wins: 32,
                    stars: 118,
                    destructionPercentage: 65.4,
                    avgStars: 2.62
                },
                activity: {
                    dailyActivity: 3.5,
                    weeklyDonations: 34,
                    warParticipation: 0.72,
                    clanGamesContribution: 2000
                }
            }
        ];

        // Add members to the clan data and members map
        this.clanData.memberList = sampleMembers;
        sampleMembers.forEach(member => {
            this.members.set(member.tag, member);
        });

        console.log(`🏰 Loaded clan "${this.clanData.name}" with ${this.members.size} members`);
    }

    /**
     * Calculate comprehensive clan analytics
     */
    calculateAnalytics() {
        const members = Array.from(this.members.values());
        
        this.analytics = {
            overview: {
                totalMembers: members.length,
                averageTrophies: Math.round(members.reduce((sum, m) => sum + m.trophies, 0) / members.length),
                totalDonations: members.reduce((sum, m) => sum + m.donations, 0),
                totalDonationsReceived: members.reduce((sum, m) => sum + m.donationsReceived, 0),
                activeMembers: members.filter(m => this.isRecentlyActive(m)).length,
                warParticipants: members.filter(m => m.warPreference === 'in').length
            },
            performance: {
                averageWarStars: this.calculateAverageWarStars(members),
                averageDestruction: this.calculateAverageDestruction(members),
                topPerformers: this.getTopPerformers(members, 5),
                warWinRate: this.clanData.warWins / (this.clanData.warWins + this.clanData.warLosses),
                participationRate: members.filter(m => m.warPreference === 'in').length / members.length
            },
            activity: {
                dailyActiveMembers: members.filter(m => this.isActiveToday(m)).length,
                weeklyActiveMembers: members.filter(m => this.isActiveThisWeek(m)).length,
                averageDailyActivity: this.calculateAverageDailyActivity(members),
                donationLeaders: this.getDonationLeaders(members, 5),
                inactiveMembers: this.getInactiveMembers(members)
            },
            distribution: {
                roleDistribution: this.calculateRoleDistribution(members),
                townHallDistribution: this.calculateTownHallDistribution(members),
                leagueDistribution: this.calculateLeagueDistribution(members),
                activityDistribution: this.calculateActivityDistribution(members)
            }
        };

        console.log('📊 Clan analytics calculated successfully');
    }

    /**
     * Helper methods for analytics calculations
     */
    isRecentlyActive(member) {
        const hoursAgo = (Date.now() - member.lastSeen.getTime()) / (1000 * 60 * 60);
        return hoursAgo < 24;
    }

    isActiveToday(member) {
        const hoursAgo = (Date.now() - member.lastSeen.getTime()) / (1000 * 60 * 60);
        return hoursAgo < 24;
    }

    isActiveThisWeek(member) {
        const daysAgo = (Date.now() - member.lastSeen.getTime()) / (1000 * 60 * 60 * 24);
        return daysAgo < 7;
    }

    calculateAverageWarStars(members) {
        const totalStars = members.reduce((sum, m) => sum + (m.warStats?.stars || 0), 0);
        const totalAttacks = members.reduce((sum, m) => sum + (m.warStats?.attacks || 0), 0);
        return totalAttacks > 0 ? (totalStars / totalAttacks).toFixed(2) : 0;
    }

    calculateAverageDestruction(members) {
        const totalDestruction = members.reduce((sum, m) => sum + (m.warStats?.destructionPercentage || 0), 0);
        return (totalDestruction / members.length).toFixed(1);
    }

    calculateAverageDailyActivity(members) {
        const totalActivity = members.reduce((sum, m) => sum + (m.activity?.dailyActivity || 0), 0);
        return (totalActivity / members.length).toFixed(1);
    }

    getTopPerformers(members, count) {
        return members
            .sort((a, b) => (b.warStats?.avgStars || 0) - (a.warStats?.avgStars || 0))
            .slice(0, count)
            .map(m => ({ name: m.name, avgStars: m.warStats?.avgStars || 0, trophies: m.trophies }));
    }

    getDonationLeaders(members, count) {
        return members
            .sort((a, b) => b.donations - a.donations)
            .slice(0, count)
            .map(m => ({ name: m.name, donations: m.donations, received: m.donationsReceived }));
    }

    getInactiveMembers(members) {
        return members.filter(m => {
            const daysInactive = (Date.now() - m.lastSeen.getTime()) / (1000 * 60 * 60 * 24);
            return daysInactive > 7;
        }).map(m => ({
            name: m.name,
            daysInactive: Math.floor((Date.now() - m.lastSeen.getTime()) / (1000 * 60 * 60 * 24)),
            trophies: m.trophies
        }));
    }

    calculateRoleDistribution(members) {
        const distribution = {};
        members.forEach(m => {
            distribution[m.role] = (distribution[m.role] || 0) + 1;
        });
        return distribution;
    }

    calculateTownHallDistribution(members) {
        const distribution = {};
        members.forEach(m => {
            const th = `TH${m.townHallLevel}`;
            distribution[th] = (distribution[th] || 0) + 1;
        });
        return distribution;
    }

    calculateLeagueDistribution(members) {
        const distribution = {};
        members.forEach(m => {
            const league = m.league?.name || 'Unranked';
            distribution[league] = (distribution[league] || 0) + 1;
        });
        return distribution;
    }

    calculateActivityDistribution(members) {
        const distribution = { active: 0, inactive: 0, very_inactive: 0 };
        members.forEach(m => {
            const daysInactive = (Date.now() - m.lastSeen.getTime()) / (1000 * 60 * 60 * 24);
            if (daysInactive < 1) distribution.active++;
            else if (daysInactive < 7) distribution.inactive++;
            else distribution.very_inactive++;
        });
        return distribution;
    }

    /**
     * Generate the clan widget for dashboard
     */
    generateClanWidget() {
        if (!this.clanData || !this.analytics.overview) {
            return '<div class="coc-loading"><div class="spinner"></div><div class="loading-text">Loading clan data...</div></div>';
        }

        const { overview, activity } = this.analytics;

        return `
            <div class="clan-widget">
                <div class="widget-header">
                    <h3 class="widget-title">
                        <i class="fas fa-users"></i> ${this.clanData.name}
                    </h3>
                    <button class="widget-expand" title="View Full Clan Analytics">
                        <i class="fas fa-expand-alt"></i>
                    </button>
                </div>
                
                <div class="clan-widget-content">
                    <div class="clan-overview">
                        <div class="clan-badge">
                            <img src="${this.clanData.badgeUrls.small}" alt="Clan Badge">
                            <div class="clan-level">Lvl ${this.clanData.clanLevel}</div>
                        </div>
                        
                        <div class="clan-stats">
                            <div class="stat-item">
                                <span class="stat-value">${overview.totalMembers}/50</span>
                                <span class="stat-label">Members</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${this.formatNumber(overview.averageTrophies)}</span>
                                <span class="stat-label">Avg Trophies</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${activity.dailyActiveMembers}</span>
                                <span class="stat-label">Active Today</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="clan-activity">
                        <div class="activity-bar">
                            <div class="activity-fill" style="width: ${(activity.dailyActiveMembers / overview.totalMembers * 100)}%"></div>
                        </div>
                        <div class="activity-text">
                            ${activity.dailyActiveMembers}/${overview.totalMembers} members active today
                        </div>
                    </div>
                    
                    <div class="widget-actions">
                        <button class="widget-btn" onclick="ClanAnalytics.viewClanDetails()">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                        <button class="widget-btn" onclick="ClanAnalytics.viewMembers()">
                            <i class="fas fa-users"></i> Members
                        </button>
                        <button class="widget-btn" onclick="ClanAnalytics.refreshClan()">
                            <i class="fas fa-sync-alt"></i> Refresh
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate current clan display for full page
     */
    generateCurrentClan() {
        if (!this.clanData) return '<div class="no-clan-data">No clan data available</div>';

        const { overview, performance } = this.analytics;

        return `
            <div class="current-clan-card">
                <div class="clan-header">
                    <div class="clan-info">
                        <img src="${this.clanData.badgeUrls.large}" alt="Clan Badge" class="clan-badge-large">
                        <div class="clan-details">
                            <h2 class="clan-name">${this.clanData.name}</h2>
                            <p class="clan-tag">${this.clanData.tag}</p>
                            <p class="clan-description">${this.clanData.description}</p>
                            <div class="clan-meta">
                                <span class="clan-level">Level ${this.clanData.clanLevel}</span>
                                <span class="clan-type">${this.clanData.type}</span>
                                <span class="clan-location">${this.clanData.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="clan-war-info">
                        <div class="war-league">
                            <i class="fas fa-trophy"></i>
                            ${this.clanData.warLeague.name}
                        </div>
                        <div class="war-record">
                            <div class="war-stat">
                                <span class="number">${this.clanData.warWins}</span>
                                <span class="label">Wins</span>
                            </div>
                            <div class="war-stat">
                                <span class="number">${this.clanData.warLosses}</span>
                                <span class="label">Losses</span>
                            </div>
                            <div class="war-stat">
                                <span class="number">${this.clanData.warWinStreak}</span>
                                <span class="label">Streak</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="clan-stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                        <div class="stat-content">
                            <div class="stat-number">${overview.totalMembers}/50</div>
                            <div class="stat-label">Total Members</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-trophy"></i></div>
                        <div class="stat-content">
                            <div class="stat-number">${this.formatNumber(overview.averageTrophies)}</div>
                            <div class="stat-label">Average Trophies</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-gift"></i></div>
                        <div class="stat-content">
                            <div class="stat-number">${this.formatNumber(overview.totalDonations)}</div>
                            <div class="stat-label">Total Donations</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-star"></i></div>
                        <div class="stat-content">
                            <div class="stat-number">${performance.averageWarStars}</div>
                            <div class="stat-label">Avg War Stars</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate members list display
     */
    generateMembersList() {
        const filteredMembers = this.getFilteredMembers();
        
        return `
            <div class="members-header">
                <div class="members-count">
                    <span class="count">${filteredMembers.length}</span> members
                    ${filteredMembers.length !== this.members.size ? `(filtered from ${this.members.size})` : ''}
                </div>
                <div class="members-filters">
                    <select id="roleFilter" onchange="ClanAnalytics.updateFilter('role', this.value)">
                        <option value="all">All Roles</option>
                        <option value="leader">Leader</option>
                        <option value="co-leader">Co-Leader</option>
                        <option value="elder">Elder</option>
                        <option value="member">Member</option>
                    </select>
                    <select id="sortFilter" onchange="ClanAnalytics.updateSort(this.value)">
                        <option value="trophies">Sort by Trophies</option>
                        <option value="donations">Sort by Donations</option>
                        <option value="warStars">Sort by War Stars</option>
                        <option value="activity">Sort by Activity</option>
                        <option value="joinDate">Sort by Join Date</option>
                    </select>
                </div>
            </div>
            
            <div class="members-list">
                ${filteredMembers.map(member => this.generateMemberCard(member)).join('')}
            </div>
        `;
    }

    /**
     * Generate individual member card
     */
    generateMemberCard(member) {
        const daysInactive = Math.floor((Date.now() - member.lastSeen.getTime()) / (1000 * 60 * 60 * 24));
        const donationRatio = member.donationsReceived > 0 ? (member.donations / member.donationsReceived).toFixed(1) : 'N/A';
        
        return `
            <div class="member-card ${this.getMemberActivityClass(member)}" data-member="${member.tag}">
                <div class="member-header">
                    <div class="member-basic">
                        <div class="member-name">${member.name}</div>
                        <div class="member-role ${member.role}">${this.capitalizeFirst(member.role)}</div>
                    </div>
                    <div class="member-rank">
                        <span class="rank-number">#${member.clanRank}</span>
                        ${member.clanRank !== member.previousClanRank ? 
                            `<span class="rank-change ${member.clanRank < member.previousClanRank ? 'up' : 'down'}">
                                <i class="fas fa-arrow-${member.clanRank < member.previousClanRank ? 'up' : 'down'}"></i>
                            </span>` : ''
                        }
                    </div>
                </div>
                
                <div class="member-stats">
                    <div class="stat-group">
                        <div class="stat-item">
                            <i class="fas fa-trophy"></i>
                            <span>${this.formatFullNumber(member.trophies)}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-home"></i>
                            <span>TH${member.townHallLevel}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <span>Lvl ${member.expLevel}</span>
                        </div>
                    </div>
                    
                    <div class="donation-stats">
                        <div class="donation-item">
                            <span class="donation-given">${this.formatFullNumber(member.donations)}</span>
                            <span class="donation-label">Given</span>
                        </div>
                        <div class="donation-item">
                            <span class="donation-received">${this.formatFullNumber(member.donationsReceived)}</span>
                            <span class="donation-label">Received</span>
                        </div>
                        <div class="donation-ratio">
                            Ratio: ${donationRatio}
                        </div>
                    </div>
                </div>
                
                <div class="member-activity">
                    <div class="activity-indicator ${this.getActivityStatus(member)}"></div>
                    <div class="activity-text">
                        ${daysInactive === 0 ? 'Active today' : 
                          daysInactive === 1 ? '1 day ago' : 
                          `${daysInactive} days ago`}
                    </div>
                    ${member.warStats ? `
                        <div class="war-performance">
                            <span class="war-stars">${member.warStats.avgStars}★ avg</span>
                            <span class="war-destruction">${member.warStats.destructionPercentage}%</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="member-actions">
                    <button class="member-btn" onclick="showMemberDetails('${member.tag}')">
                        <i class="fas fa-info"></i>
                    </button>
                    <button class="member-btn" onclick="showMemberHistory('${member.tag}')">
                        <i class="fas fa-history"></i>
                    </button>
                    <button class="member-btn" onclick="showSendMessage('${member.tag}')">
                        <i class="fas fa-comment"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Generate clan analytics overview
     */
    generateAnalyticsOverview() {
        const { overview, performance, activity, distribution } = this.analytics;
        
        return `
            <div class="analytics-grid">
                <div class="analytics-card performance-card">
                    <h3><i class="fas fa-chart-line"></i> Performance Metrics</h3>
                    <div class="metrics-list">
                        <div class="metric-item">
                            <span class="metric-label">Average War Stars</span>
                            <span class="metric-value">${performance.averageWarStars}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Average Destruction</span>
                            <span class="metric-value">${performance.averageDestruction}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">War Win Rate</span>
                            <span class="metric-value">${(performance.warWinRate * 100).toFixed(1)}%</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">War Participation</span>
                            <span class="metric-value">${(performance.participationRate * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-card activity-card">
                    <h3><i class="fas fa-activity"></i> Activity Analytics</h3>
                    <div class="activity-metrics">
                        <div class="activity-circle">
                            <div class="circle-progress" style="--progress: ${(activity.dailyActiveMembers/overview.totalMembers)*100}%">
                                <span class="circle-text">${activity.dailyActiveMembers}/${overview.totalMembers}</span>
                                <span class="circle-label">Active Today</span>
                            </div>
                        </div>
                        <div class="activity-stats">
                            <div class="activity-stat">
                                <span class="stat-number">${activity.weeklyActiveMembers}</span>
                                <span class="stat-label">Active This Week</span>
                            </div>
                            <div class="activity-stat">
                                <span class="stat-number">${activity.averageDailyActivity}h</span>
                                <span class="stat-label">Avg Daily Activity</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-card distribution-card">
                    <h3><i class="fas fa-chart-pie"></i> Member Distribution</h3>
                    <div class="distribution-charts">
                        <div class="chart-section">
                            <h4>By Role</h4>
                            <div class="distribution-bars">
                                ${Object.entries(distribution.roleDistribution).map(([role, count]) => `
                                    <div class="distribution-bar">
                                        <span class="bar-label">${this.capitalizeFirst(role)}</span>
                                        <div class="bar-track">
                                            <div class="bar-fill" style="width: ${(count/overview.totalMembers)*100}%"></div>
                                        </div>
                                        <span class="bar-count">${count}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="chart-section">
                            <h4>By Town Hall</h4>
                            <div class="distribution-bars">
                                ${Object.entries(distribution.townHallDistribution).map(([th, count]) => `
                                    <div class="distribution-bar">
                                        <span class="bar-label">${th}</span>
                                        <div class="bar-track">
                                            <div class="bar-fill th-bar" style="width: ${(count/overview.totalMembers)*100}%"></div>
                                        </div>
                                        <span class="bar-count">${count}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="analytics-card leaders-card">
                    <h3><i class="fas fa-crown"></i> Top Contributors</h3>
                    <div class="leaders-sections">
                        <div class="leaders-section">
                            <h4>Top Performers</h4>
                            <div class="leaders-list">
                                ${performance.topPerformers.map((performer, index) => `
                                    <div class="leader-item">
                                        <span class="leader-rank">#${index + 1}</span>
                                        <span class="leader-name">${performer.name}</span>
                                        <span class="leader-stat">${performer.avgStars}★</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="leaders-section">
                            <h4>Donation Leaders</h4>
                            <div class="leaders-list">
                                ${activity.donationLeaders.map((leader, index) => `
                                    <div class="leader-item">
                                        <span class="leader-rank">#${index + 1}</span>
                                        <span class="leader-name">${leader.name}</span>
                                        <span class="leader-stat">${this.formatNumber(leader.donations)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Utility methods
     */
    getFilteredMembers() {
        let filtered = Array.from(this.members.values());
        
        // Apply filters
        if (this.filters.role !== 'all') {
            filtered = filtered.filter(m => m.role === this.filters.role);
        }
        
        if (this.filters.minTrophies > 0) {
            filtered = filtered.filter(m => m.trophies >= this.filters.minTrophies);
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            let aVal, bVal;
            switch (this.filters.sortBy) {
                case 'donations':
                    aVal = a.donations;
                    bVal = b.donations;
                    break;
                case 'warStars':
                    aVal = a.warStats?.avgStars || 0;
                    bVal = b.warStats?.avgStars || 0;
                    break;
                case 'activity':
                    aVal = a.activity?.dailyActivity || 0;
                    bVal = b.activity?.dailyActivity || 0;
                    break;
                case 'joinDate':
                    aVal = a.joinDate.getTime();
                    bVal = b.joinDate.getTime();
                    break;
                default: // trophies
                    aVal = a.trophies;
                    bVal = b.trophies;
            }
            
            return this.filters.sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
        });
        
        return filtered;
    }

    getMemberActivityClass(member) {
        const daysInactive = (Date.now() - member.lastSeen.getTime()) / (1000 * 60 * 60 * 24);
        if (daysInactive < 1) return 'active';
        if (daysInactive < 3) return 'recently-active';
        if (daysInactive < 7) return 'inactive';
        return 'very-inactive';
    }

    getActivityStatus(member) {
        const daysInactive = (Date.now() - member.lastSeen.getTime()) / (1000 * 60 * 60 * 24);
        if (daysInactive < 1) return 'online';
        if (daysInactive < 3) return 'recent';
        if (daysInactive < 7) return 'away';
        return 'offline';
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
    
    // Format full number with commas (for showing exact values)
    formatFullNumber(num) {
        return num ? num.toLocaleString() : '0';
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
    }

    /**
     * User interaction methods (to be called from HTML)
     */
    static viewClanDetails() {
        console.log('Opening clan details...');
    }

    static viewMembers() {
        window.location.href = '/coc/clan.html';
    }

    static refreshClan() {
        console.log('Refreshing clan data...');
        if (window.clanAnalytics) {
            window.clanAnalytics.calculateAnalytics();
        }
    }

    static viewMemberDetails(memberTag) {
        console.log('Viewing member details for:', memberTag);
    }

    static viewMemberHistory(memberTag) {
        console.log('Viewing member history for:', memberTag);
    }

    static sendMessage(memberTag) {
        console.log('Sending message to member:', memberTag);
    }

    static updateFilter(filterType, value) {
        if (window.clanAnalytics) {
            window.clanAnalytics.filters[filterType] = value;
            // Refresh the members display
            const membersContent = document.getElementById('membersContent');
            if (membersContent) {
                membersContent.innerHTML = window.clanAnalytics.generateMembersList();
            }
        }
    }

    static updateSort(sortBy) {
        if (window.clanAnalytics) {
            window.clanAnalytics.filters.sortBy = sortBy;
            // Refresh the members display
            const membersContent = document.getElementById('membersContent');
            if (membersContent) {
                membersContent.innerHTML = window.clanAnalytics.generateMembersList();
            }
        }
    }

    /**
     * Start periodic updates for real-time data
     */
    startPeriodicUpdates() {
        // Update analytics every 5 minutes
        this.updateInterval = setInterval(() => {
            this.calculateAnalytics();
            console.log('🔄 Clan analytics updated');
        }, 5 * 60 * 1000);
    }

    /**
     * Clean up intervals when needed
     */
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Create global instance
const ClanManager = new ClanAnalytics();

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ClanManager.init();
    });
} else {
    ClanManager.init();
}

console.log('🏰 Clan Analytics System loaded successfully');