/*
=============================================================================
CLASH OF CLANS DASHBOARD - EVENTS PAGE JAVASCRIPT
=============================================================================
JavaScript for the dedicated events page with filtering, settings, and
full event management interface.
*/

// Authentication variables (same as main app)
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// Page state
let currentFilters = {
    event: 'all',
    priority: 'all'
};

/*
=============================================================================
INITIALIZATION
=============================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    initializeEventsPage();
    setupEventListeners();
});

/**
 * Initialize the events page
 */
function initializeEventsPage() {
    // Wait for events tracker to be ready
    const checkEventsTracker = () => {
        if (typeof eventsTracker !== 'undefined' && eventsTracker.events.size > 0) {
            displayEvents();
            console.log('📅 Events page initialized successfully');
        } else {
            setTimeout(checkEventsTracker, 100);
        }
    };
    
    checkEventsTracker();
}

/*
=============================================================================
AUTHENTICATION (SHARED WITH MAIN APP)
=============================================================================
*/

function checkAuthState() {
    if (authToken) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        updateAuthUI();
    }
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const loggedInUser = document.getElementById('loggedInUser');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        loggedInUser.style.display = 'flex';
        welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
    } else {
        authButtons.style.display = 'flex';
        loggedInUser.style.display = 'none';
    }
}

function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    updateAuthUI();
}

/*
=============================================================================
EVENT LISTENERS
=============================================================================
*/

function setupEventListeners() {
    // Auth buttons
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');
    
    if (loginButton) {
        loginButton.addEventListener('click', () => openModal('loginModal'));
    }
    if (registerButton) {
        registerButton.addEventListener('click', () => openModal('registerModal'));
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
    
    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('data-modal');
            if (modalId) closeModal(modalId);
        });
    });
    
    // Filter controls
    const eventFilter = document.getElementById('eventFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    
    if (eventFilter) {
        eventFilter.addEventListener('change', (e) => {
            currentFilters.event = e.target.value;
            displayEvents();
        });
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', (e) => {
            currentFilters.priority = e.target.value;
            displayEvents();
        });
    }
    
    // Control buttons
    const refreshButton = document.getElementById('refreshEventsButton');
    const notificationButton = document.getElementById('notificationSettingsButton');
    
    if (refreshButton) {
        refreshButton.addEventListener('click', refreshEvents);
    }
    
    if (notificationButton) {
        notificationButton.addEventListener('click', () => {
            populateNotificationSettings();
            openModal('notificationModal');
        });
    }
    
    // Notification settings
    const saveSettingsButton = document.getElementById('saveNotificationSettings');
    if (saveSettingsButton) {
        saveSettingsButton.addEventListener('click', saveNotificationSettings);
    }
    
    // Auth forms (basic implementation)
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

/*
=============================================================================
EVENTS DISPLAY
=============================================================================
*/

/**
 * Display events based on current filters
 */
function displayEvents() {
    const container = document.getElementById('eventsContainer');
    if (!container || typeof eventsTracker === 'undefined') return;
    
    const options = {
        showOnlyActive: currentFilters.event === 'active',
        showPriority: currentFilters.priority,
        maxEvents: currentFilters.event === 'active' ? 20 : 12
    };
    
    // Filter for upcoming only if requested
    if (currentFilters.event === 'upcoming') {
        options.showOnlyActive = false;
        // Additional filtering will be handled in the events tracker
    }
    
    const eventsHTML = eventsTracker.generateEventsHTML(options);
    container.innerHTML = eventsHTML;
}

/**
 * Refresh events and recalculate next occurrences
 */
function refreshEvents() {
    const button = document.getElementById('refreshEventsButton');
    if (!button) return;
    
    const originalText = button.textContent;
    button.textContent = '🔄 Refreshing...';
    button.disabled = true;
    
    // Simulate refresh delay
    setTimeout(() => {
        // Recalculate next occurrences for all events
        if (typeof eventsTracker !== 'undefined') {
            eventsTracker.events.forEach(event => {
                const now = new Date();
                switch(event.id) {
                    case 'clan-games':
                        event.nextOccurrence = eventsTracker.calculateNextClanGames(now);
                        break;
                    case 'season-pass':
                        event.nextOccurrence = eventsTracker.calculateNextSeasonReset(now);
                        break;
                    case 'trader':
                        event.nextOccurrence = eventsTracker.calculateNextTraderRefresh(now);
                        break;
                    case 'war-league':
                        event.nextOccurrence = eventsTracker.calculateNextCWL(now);
                        break;
                    case 'star-bonus':
                        event.nextOccurrence = eventsTracker.calculateNextStarBonusReset(now);
                        break;
                    case 'league-reset':
                        event.nextOccurrence = eventsTracker.calculateNextLeagueReset(now);
                        break;
                }
            });
        }
        
        displayEvents();
        button.textContent = originalText;
        button.disabled = false;
        
        showToast('Events refreshed successfully!');
    }, 1000);
}

/*
=============================================================================
NOTIFICATION SETTINGS
=============================================================================
*/

/**
 * Populate notification settings modal
 */
function populateNotificationSettings() {
    const container = document.getElementById('eventReminderSettings');
    if (!container || typeof eventsTracker === 'undefined') return;
    
    let settingsHTML = '';
    
    eventsTracker.events.forEach((event, eventId) => {
        const isEnabled = eventsTracker.preferences.reminders[eventId] || false;
        
        settingsHTML += `
            <div class="event-reminder-setting">
                <label>
                    <input type="checkbox" data-event-id="${eventId}" ${isEnabled ? 'checked' : ''}>
                    <span class="event-icon">${event.icon}</span>
                    ${event.name}
                </label>
                <div class="reminder-priority">
                    <small>Priority: ${event.priority}</small>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = settingsHTML;
    
    // Set global notification settings
    const browserNotifications = document.getElementById('browserNotifications');
    const soundNotifications = document.getElementById('soundNotifications');
    
    if (browserNotifications) {
        browserNotifications.checked = eventsTracker.preferences.notificationsEnabled;
    }
    if (soundNotifications) {
        soundNotifications.checked = eventsTracker.preferences.soundEnabled;
    }
}

/**
 * Save notification settings
 */
function saveNotificationSettings() {
    if (typeof eventsTracker === 'undefined') return;
    
    // Save global settings
    const browserNotifications = document.getElementById('browserNotifications');
    const soundNotifications = document.getElementById('soundNotifications');
    
    if (browserNotifications) {
        eventsTracker.preferences.notificationsEnabled = browserNotifications.checked;
    }
    if (soundNotifications) {
        eventsTracker.preferences.soundEnabled = soundNotifications.checked;
    }
    
    // Save individual event reminders
    const eventCheckboxes = document.querySelectorAll('[data-event-id]');
    eventCheckboxes.forEach(checkbox => {
        const eventId = checkbox.getAttribute('data-event-id');
        eventsTracker.preferences.reminders[eventId] = checkbox.checked;
    });
    
    // Save to localStorage
    eventsTracker.savePreferences();
    
    // Close modal and show success message
    closeModal('notificationModal');
    showToast('Notification settings saved successfully!');
    
    // Update reminder button states in the UI
    setTimeout(() => {
        displayEvents();
    }, 100);
}

/*
=============================================================================
MODAL FUNCTIONS
=============================================================================
*/

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

/*
=============================================================================
AUTH HANDLERS (BASIC IMPLEMENTATION)
=============================================================================
*/

async function handleLogin(e) {
    e.preventDefault();
    // Basic login implementation - in real app this would connect to your auth system
    showToast('Login functionality requires backend integration');
}

async function handleRegister(e) {
    e.preventDefault();
    // Basic register implementation - in real app this would connect to your auth system
    showToast('Registration functionality requires backend integration');
}

/*
=============================================================================
UTILITY FUNCTIONS
=============================================================================
*/

/**
 * Show a toast notification
 * @param {string} message - Message to show
 * @param {string} type - Type of notification
 */
function showToast(message, type = 'success') {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}