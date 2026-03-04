/*
=============================================================================
CLASH OF CLANS DASHBOARD - EVENTS TRACKER
=============================================================================
This module provides event tracking functionality for Phase 2:
- Countdown timers for CoC events (Clan Games, Season Pass, Trader, etc.)
- Event notifications and reminders
- Customizable event preferences
- Integration with dashboard display
*/

class EventsTracker {
    constructor() {
        this.events = new Map();
        this.timers = new Map();
        this.notifications = [];
        this.preferences = this.loadPreferences();
        this.updateInterval = null;
        
        // Initialize with default CoC events
        this.initializeDefaultEvents();
    }

    /*
    =============================================================================
    INITIALIZATION & SETUP
    =============================================================================
    */

    /**
     * Initialize default Clash of Clans events
     */
    initializeDefaultEvents() {
        const now = new Date();
        
        // Calculate next occurrence for recurring events
        const defaultEvents = [
            {
                id: 'clan-games',
                name: 'Clan Games',
                description: 'Monthly clan challenge event with rewards',
                type: 'recurring',
                icon: '🏆',
                color: '#f39c12',
                duration: 7 * 24 * 60 * 60 * 1000, // 7 days
                interval: 'monthly', // First week of each month
                priority: 'high',
                nextOccurrence: this.calculateNextClanGames(now),
                reminderTimes: [24 * 60, 60, 10] // 24h, 1h, 10min before
            },
            {
                id: 'season-pass',
                name: 'Season Pass Reset',
                description: 'Gold Pass season ends, new challenges available',
                type: 'recurring',
                icon: '🎖️',
                color: '#9b59b6',
                duration: 0,
                interval: 'monthly',
                priority: 'high',
                nextOccurrence: this.calculateNextSeasonReset(now),
                reminderTimes: [24 * 60, 60]
            },
            {
                id: 'trader',
                name: 'Trader Refresh',
                description: 'Daily trader offers refresh',
                type: 'recurring',
                icon: '🛒',
                color: '#27ae60',
                duration: 0,
                interval: 'daily',
                priority: 'medium',
                nextOccurrence: this.calculateNextTraderRefresh(now),
                reminderTimes: [60] // 1h before
            },
            {
                id: 'war-league',
                name: 'Clan War League',
                description: 'Monthly competitive clan war tournament',
                type: 'recurring',
                icon: '⚔️',
                color: '#e74c3c',
                duration: 8 * 24 * 60 * 60 * 1000, // 8 days
                interval: 'monthly',
                priority: 'high',
                nextOccurrence: this.calculateNextCWL(now),
                reminderTimes: [24 * 60, 60]
            },
            {
                id: 'star-bonus',
                name: 'Star Bonus Reset',
                description: 'Weekly star bonus rewards reset',
                type: 'recurring',
                icon: '⭐',
                color: '#f1c40f',
                duration: 0,
                interval: 'weekly',
                priority: 'low',
                nextOccurrence: this.calculateNextStarBonusReset(now),
                reminderTimes: [60]
            },
            {
                id: 'league-reset',
                name: 'League Season Reset',
                description: 'Monthly trophy league season reset',
                type: 'recurring',
                icon: '🏅',
                color: '#3498db',
                duration: 0,
                interval: 'monthly',
                priority: 'medium',
                nextOccurrence: this.calculateNextLeagueReset(now),
                reminderTimes: [24 * 60]
            }
        ];

        // Add events to the tracker
        defaultEvents.forEach(event => {
            this.events.set(event.id, event);
        });
    }

    /*
    =============================================================================
    DATE CALCULATION FUNCTIONS
    =============================================================================
    */

    /**
     * Calculate next Clan Games start date (first Monday of each month)
     * @param {Date} now - Current date
     * @returns {Date} Next Clan Games date
     */
    calculateNextClanGames(now) {
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const firstMonday = new Date(nextMonth);
        
        // Find first Monday of the month
        while (firstMonday.getDay() !== 1) {
            firstMonday.setDate(firstMonday.getDate() + 1);
        }
        
        // If current month's Clan Games haven't started yet
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonthFirstMonday = new Date(thisMonth);
        while (thisMonthFirstMonday.getDay() !== 1) {
            thisMonthFirstMonday.setDate(thisMonthFirstMonday.getDate() + 1);
        }
        
        if (now < thisMonthFirstMonday) {
            return thisMonthFirstMonday;
        }
        
        return firstMonday;
    }

    /**
     * Calculate next Season Pass reset (last Monday of each month)
     * @param {Date} now - Current date
     * @returns {Date} Next season reset date
     */
    calculateNextSeasonReset(now) {
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const lastDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);
        const lastMonday = new Date(lastDay);
        
        // Find last Monday of the month
        while (lastMonday.getDay() !== 1) {
            lastMonday.setDate(lastMonday.getDate() - 1);
        }
        
        return lastMonday;
    }

    /**
     * Calculate next trader refresh (daily at 6 AM UTC)
     * @param {Date} now - Current date
     * @returns {Date} Next trader refresh
     */
    calculateNextTraderRefresh(now) {
        const nextRefresh = new Date(now);
        nextRefresh.setUTCHours(6, 0, 0, 0);
        
        if (now.getTime() >= nextRefresh.getTime()) {
            nextRefresh.setDate(nextRefresh.getDate() + 1);
        }
        
        return nextRefresh;
    }

    /**
     * Calculate next Clan War League (first Friday of each month)
     * @param {Date} now - Current date
     * @returns {Date} Next CWL date
     */
    calculateNextCWL(now) {
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const firstFriday = new Date(nextMonth);
        
        while (firstFriday.getDay() !== 5) {
            firstFriday.setDate(firstFriday.getDate() + 1);
        }
        
        return firstFriday;
    }

    /**
     * Calculate next star bonus reset (weekly on Monday 5 AM UTC)
     * @param {Date} now - Current date
     * @returns {Date} Next star bonus reset
     */
    calculateNextStarBonusReset(now) {
        const nextReset = new Date(now);
        const dayOfWeek = now.getDay();
        const daysUntilMonday = (8 - dayOfWeek) % 7;
        
        nextReset.setDate(now.getDate() + daysUntilMonday);
        nextReset.setUTCHours(5, 0, 0, 0);
        
        if (daysUntilMonday === 0 && now.getUTCHours() >= 5) {
            nextReset.setDate(nextReset.getDate() + 7);
        }
        
        return nextReset;
    }

    /**
     * Calculate next league season reset (last Monday of each month)
     * @param {Date} now - Current date
     * @returns {Date} Next league reset
     */
    calculateNextLeagueReset(now) {
        // Same as season pass reset
        return this.calculateNextSeasonReset(now);
    }

    /*
    =============================================================================
    DISPLAY & UI FUNCTIONS
    =============================================================================
    */

    /**
     * Generate HTML for events tracker display
     * @param {Object} options - Display options
     * @returns {string} HTML string
     */
    generateEventsHTML(options = {}) {
        const { showOnlyActive = false, maxEvents = 6, showPriority = 'all' } = options;
        
        // Filter and sort events
        let eventsArray = Array.from(this.events.values());
        
        if (showOnlyActive) {
            eventsArray = eventsArray.filter(event => this.isEventActive(event));
        }
        
        if (showPriority !== 'all') {
            eventsArray = eventsArray.filter(event => event.priority === showPriority);
        }
        
        // Sort by next occurrence time
        eventsArray.sort((a, b) => {
            return new Date(a.nextOccurrence) - new Date(b.nextOccurrence);
        });
        
        // Limit number of events
        eventsArray = eventsArray.slice(0, maxEvents);
        
        if (eventsArray.length === 0) {
            return `
                <div class="events-empty">
                    <div class="empty-icon">📅</div>
                    <div class="empty-message">No upcoming events</div>
                    <div class="empty-description">All events are up to date!</div>
                </div>
            `;
        }
        
        const eventsHTML = eventsArray.map(event => this.generateEventCard(event)).join('');
        
        return `
            <div class="events-grid">
                ${eventsHTML}
            </div>
        `;
    }

    /**
     * Generate HTML for a single event card
     * @param {Object} event - Event object
     * @returns {string} HTML string
     */
    generateEventCard(event) {
        const timeUntil = this.getTimeUntilEvent(event);
        const isActive = this.isEventActive(event);
        const progress = this.getEventProgress(event);
        
        return `
            <div class="event-card ${isActive ? 'active' : 'upcoming'}" data-event-id="${event.id}" style="border-left-color: ${event.color}">
                <div class="event-header">
                    <div class="event-icon">${event.icon}</div>
                    <div class="event-info">
                        <div class="event-name">${event.name}</div>
                        <div class="event-description">${event.description}</div>
                    </div>
                    <div class="event-priority priority-${event.priority}">
                        ${this.getPriorityIcon(event.priority)}
                    </div>
                </div>
                
                <div class="event-countdown">
                    <div class="countdown-display" data-target="${event.nextOccurrence}">
                        ${timeUntil.display}
                    </div>
                    <div class="countdown-label">
                        ${isActive ? 'Time Remaining' : 'Starts In'}
                    </div>
                </div>
                
                ${progress !== null ? `
                    <div class="event-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%; background-color: ${event.color}"></div>
                        </div>
                        <div class="progress-text">${Math.round(progress)}% Complete</div>
                    </div>
                ` : ''}
                
                <div class="event-actions">
                    <button class="event-btn reminder" onclick="eventsTracker.toggleReminder('${event.id}')" title="Toggle Reminder">
                        🔔
                    </button>
                    <button class="event-btn details" onclick="eventsTracker.showEventDetails('${event.id}')" title="Event Details">
                        ℹ️
                    </button>
                    <button class="event-btn calendar" onclick="eventsTracker.addToCalendar('${event.id}')" title="Add to Calendar">
                        📅
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Generate compact events widget for dashboard
     * @returns {string} HTML string
     */
    generateEventsWidget() {
        const upcomingEvents = Array.from(this.events.values())
            .filter(event => !this.isEventActive(event))
            .sort((a, b) => new Date(a.nextOccurrence) - new Date(b.nextOccurrence))
            .slice(0, 3);
            
        const activeEvents = Array.from(this.events.values())
            .filter(event => this.isEventActive(event));
            
        return `
            <div class="events-widget">
                <div class="widget-header">
                    <div class="widget-title">📅 Upcoming Events</div>
                    <button class="widget-expand" onclick="eventsTracker.showFullView()" title="View All Events">
                        ↗️
                    </button>
                </div>
                
                ${activeEvents.length > 0 ? `
                    <div class="active-events">
                        <div class="section-title">🔴 Active Now</div>
                        ${activeEvents.slice(0, 2).map(event => this.generateCompactEventCard(event, true)).join('')}
                    </div>
                ` : ''}
                
                <div class="upcoming-events">
                    <div class="section-title">⏰ Coming Up</div>
                    ${upcomingEvents.length > 0 ? 
                        upcomingEvents.map(event => this.generateCompactEventCard(event, false)).join('') :
                        '<div class="no-events">All caught up! 🎉</div>'
                    }
                </div>
            </div>
        `;
    }

    /**
     * Generate compact event card for widget
     * @param {Object} event - Event object
     * @param {boolean} isActive - Is event currently active
     * @returns {string} HTML string
     */
    generateCompactEventCard(event, isActive) {
        const timeUntil = this.getTimeUntilEvent(event);
        
        return `
            <div class="compact-event-card ${isActive ? 'active' : ''}" onclick="eventsTracker.showEventDetails('${event.id}')">
                <div class="compact-icon" style="background-color: ${event.color}20; color: ${event.color}">
                    ${event.icon}
                </div>
                <div class="compact-info">
                    <div class="compact-name">${event.name}</div>
                    <div class="compact-time">${timeUntil.short}</div>
                </div>
                <div class="compact-arrow">›</div>
            </div>
        `;
    }

    /*
    =============================================================================
    TIME & DATE UTILITIES
    =============================================================================
    */

    /**
     * Get time until event starts or ends
     * @param {Object} event - Event object
     * @returns {Object} Time information
     */
    getTimeUntilEvent(event) {
        const now = new Date();
        const eventTime = new Date(event.nextOccurrence);
        const isActive = this.isEventActive(event);
        
        let targetTime;
        if (isActive && event.duration > 0) {
            targetTime = new Date(eventTime.getTime() + event.duration);
        } else {
            targetTime = eventTime;
        }
        
        const timeDiff = targetTime.getTime() - now.getTime();
        
        if (timeDiff <= 0) {
            return {
                display: isActive ? 'Event Ended' : 'Starting Soon',
                short: '0m',
                totalSeconds: 0
            };
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        let display = '';
        let short = '';
        
        if (days > 0) {
            display = `${days}d ${hours}h ${minutes}m`;
            short = `${days}d ${hours}h`;
        } else if (hours > 0) {
            display = `${hours}h ${minutes}m ${seconds}s`;
            short = `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            display = `${minutes}m ${seconds}s`;
            short = `${minutes}m`;
        } else {
            display = `${seconds}s`;
            short = `${seconds}s`;
        }
        
        return {
            display,
            short,
            totalSeconds: Math.floor(timeDiff / 1000)
        };
    }

    /**
     * Check if event is currently active
     * @param {Object} event - Event object
     * @returns {boolean} Is event active
     */
    isEventActive(event) {
        if (event.duration === 0) return false;
        
        const now = new Date();
        const eventStart = new Date(event.nextOccurrence);
        const eventEnd = new Date(eventStart.getTime() + event.duration);
        
        return now >= eventStart && now <= eventEnd;
    }

    /**
     * Get event progress percentage
     * @param {Object} event - Event object
     * @returns {number|null} Progress percentage or null if not applicable
     */
    getEventProgress(event) {
        if (!this.isEventActive(event) || event.duration === 0) {
            return null;
        }
        
        const now = new Date();
        const eventStart = new Date(event.nextOccurrence);
        const elapsed = now.getTime() - eventStart.getTime();
        const progress = (elapsed / event.duration) * 100;
        
        return Math.max(0, Math.min(100, progress));
    }

    /**
     * Get priority icon
     * @param {string} priority - Priority level
     * @returns {string} Priority icon
     */
    getPriorityIcon(priority) {
        switch (priority) {
            case 'high': return '🔴';
            case 'medium': return '🟡';
            case 'low': return '🟢';
            default: return '⚪';
        }
    }

    /*
    =============================================================================
    REAL-TIME UPDATES
    =============================================================================
    */

    /**
     * Start real-time countdown updates
     */
    startCountdownUpdates() {
        // Update every second
        this.updateInterval = setInterval(() => {
            this.updateCountdowns();
            this.checkReminders();
        }, 1000);
        
        console.log('Events tracker countdown updates started');
    }

    /**
     * Stop real-time updates
     */
    stopCountdownUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        console.log('Events tracker countdown updates stopped');
    }

    /**
     * Update all countdown displays
     */
    updateCountdowns() {
        document.querySelectorAll('.countdown-display').forEach(element => {
            const targetTime = element.getAttribute('data-target');
            if (!targetTime) return;
            
            const eventId = element.closest('.event-card')?.getAttribute('data-event-id');
            if (!eventId) return;
            
            const event = this.events.get(eventId);
            if (!event) return;
            
            const timeInfo = this.getTimeUntilEvent(event);
            element.textContent = timeInfo.display;
            
            // Update compact cards too
            const compactCard = document.querySelector(`.compact-event-card[onclick*="${eventId}"] .compact-time`);
            if (compactCard) {
                compactCard.textContent = timeInfo.short;
            }
        });
    }

    /**
     * Check and trigger reminders
     */
    checkReminders() {
        const now = new Date();
        
        this.events.forEach(event => {
            if (!event.reminderTimes || !this.preferences.reminders[event.id]) {
                return;
            }
            
            const eventTime = new Date(event.nextOccurrence);
            const timeUntil = Math.floor((eventTime.getTime() - now.getTime()) / (1000 * 60));
            
            event.reminderTimes.forEach(reminderMinutes => {
                const reminderKey = `${event.id}_${reminderMinutes}`;
                
                if (timeUntil <= reminderMinutes && timeUntil > reminderMinutes - 1) {
                    if (!this.notifications.includes(reminderKey)) {
                        this.showNotification(event, reminderMinutes);
                        this.notifications.push(reminderKey);
                    }
                }
            });
        });
    }

    /*
    =============================================================================
    USER INTERACTION FUNCTIONS
    =============================================================================
    */

    /**
     * Toggle reminder for an event
     * @param {string} eventId - Event ID
     */
    toggleReminder(eventId) {
        const event = this.events.get(eventId);
        if (!event) return;
        
        const isEnabled = this.preferences.reminders[eventId];
        this.preferences.reminders[eventId] = !isEnabled;
        this.savePreferences();
        
        const button = document.querySelector(`[onclick*="toggleReminder('${eventId}')"]`);
        if (button) {
            button.style.opacity = this.preferences.reminders[eventId] ? '1' : '0.5';
        }
        
        const message = this.preferences.reminders[eventId] ? 
            `Reminders enabled for ${event.name}` : 
            `Reminders disabled for ${event.name}`;
            
        this.showToast(message);
    }

    /**
     * Show detailed event information
     * @param {string} eventId - Event ID
     */
    showEventDetails(eventId) {
        const event = this.events.get(eventId);
        if (!event) return;
        
        const timeInfo = this.getTimeUntilEvent(event);
        const isActive = this.isEventActive(event);
        
        const details = `
Event: ${event.name}
${event.description}

Status: ${isActive ? 'Active' : 'Upcoming'}
${isActive ? 'Time Remaining: ' : 'Starts In: '}${timeInfo.display}
Next Occurrence: ${new Date(event.nextOccurrence).toLocaleString()}
Priority: ${event.priority.toUpperCase()}
Reminders: ${this.preferences.reminders[eventId] ? 'Enabled' : 'Disabled'}
        `;
        
        alert(details);
    }

    /**
     * Add event to calendar
     * @param {string} eventId - Event ID
     */
    addToCalendar(eventId) {
        const event = this.events.get(eventId);
        if (!event) return;
        
        const startTime = new Date(event.nextOccurrence);
        const endTime = event.duration > 0 ? 
            new Date(startTime.getTime() + event.duration) : 
            new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour default
            
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${this.formatDateForCalendar(startTime)}/${this.formatDateForCalendar(endTime)}&details=${encodeURIComponent(event.description)}`;
        
        window.open(googleCalendarUrl, '_blank');
    }

    /**
     * Format date for Google Calendar
     * @param {Date} date - Date object
     * @returns {string} Formatted date string
     */
    formatDateForCalendar(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    /**
     * Show full events view
     */
    showFullView() {
        // Open dedicated events page
        window.open('/coc/events.html', '_blank');
    }

    /*
    =============================================================================
    NOTIFICATIONS & PREFERENCES
    =============================================================================
    */

    /**
     * Show notification for an event reminder
     * @param {Object} event - Event object
     * @param {number} minutesUntil - Minutes until event
     */
    showNotification(event, minutesUntil) {
        const message = `${event.icon} ${event.name} ${minutesUntil > 60 ? 
            `in ${Math.floor(minutesUntil / 60)}h ${minutesUntil % 60}m` : 
            `in ${minutesUntil}m`}`;
            
        // Try to use browser notification if available
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Clash of Clans Event Reminder', {
                body: message,
                icon: event.icon
            });
        } else {
            // Fallback to toast notification
            this.showToast(message, 'info');
        }
        
        console.log('Event reminder:', message);
    }

    /**
     * Show toast notification
     * @param {string} message - Message to show
     * @param {string} type - Notification type
     */
    showToast(message, type = 'success') {
        // Use existing global notification system if available
        if (typeof showGlobalNotification === 'function') {
            showGlobalNotification(message, type);
        } else {
            // Simple fallback
            console.log(`Toast (${type}):`, message);
        }
    }

    /**
     * Request notification permission
     */
    async requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return Notification.permission === 'granted';
    }

    /**
     * Load user preferences
     * @returns {Object} User preferences
     */
    loadPreferences() {
        const defaultPreferences = {
            reminders: {},
            notificationsEnabled: true,
            soundEnabled: true,
            showWidget: true,
            theme: 'auto'
        };
        
        // Initialize reminders for all events
        this.events.forEach((event, eventId) => {
            defaultPreferences.reminders[eventId] = event.priority === 'high';
        });
        
        const saved = localStorage.getItem('cocEventsPreferences');
        if (saved) {
            try {
                return { ...defaultPreferences, ...JSON.parse(saved) };
            } catch (error) {
                console.warn('Failed to load events preferences:', error);
            }
        }
        
        return defaultPreferences;
    }

    /**
     * Save user preferences
     */
    savePreferences() {
        try {
            localStorage.setItem('cocEventsPreferences', JSON.stringify(this.preferences));
        } catch (error) {
            console.warn('Failed to save events preferences:', error);
        }
    }

    /*
    =============================================================================
    LIFECYCLE MANAGEMENT
    =============================================================================
    */

    /**
     * Initialize the events tracker
     */
    async initialize() {
        console.log('Initializing Events Tracker...');
        
        // Request notification permission
        await this.requestNotificationPermission();
        
        // Load preferences after events are initialized
        this.preferences = this.loadPreferences();
        
        // Start countdown updates
        this.startCountdownUpdates();
        
        console.log('Events Tracker initialized with', this.events.size, 'events');
    }

    /**
     * Clean up resources
     */
    cleanup() {
        this.stopCountdownUpdates();
        this.events.clear();
        this.timers.clear();
        this.notifications = [];
        console.log('Events Tracker cleaned up');
    }
}

// Create global instance
const eventsTracker = new EventsTracker();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => eventsTracker.initialize());
} else {
    eventsTracker.initialize();
}

// Export for use in other modules
window.EventsTracker = EventsTracker;
window.eventsTracker = eventsTracker;