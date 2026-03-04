/*
=============================================================================
PROFILE PAGE JAVASCRIPT - Dedicated player profile management
=============================================================================
*/

// API CONFIGURATION
const API_BASE_URL = window.location.origin;

// AUTHENTICATION VARIABLES
let currentUser = null;
let authToken = localStorage.getItem('authToken');

// PROFILE DATA
let currentPlayerProfile = null;
let linkedPlayers = [];

/*
=============================================================================
INITIALIZATION - Page startup
=============================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
    setupEventListeners();
});

/*
=============================================================================
AUTHENTICATION FUNCTIONS
=============================================================================
*/

function checkAuthState() {
    if (authToken) {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        updateAuthUI();
        showProfileContent();
        loadLinkedPlayers();
    } else {
        showAuthRequired();
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

function showAuthRequired() {
    document.getElementById('authCheck').style.display = 'block';
    document.getElementById('profileContent').style.display = 'none';
}

function showProfileContent() {
    document.getElementById('authCheck').style.display = 'none';
    document.getElementById('profileContent').style.display = 'block';
}

function logout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showAuthRequired();
}

/*
=============================================================================
EVENT LISTENERS SETUP
=============================================================================
*/

function setupEventListeners() {
    // Auth buttons
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const logoutButton = document.getElementById('logoutButton');
    const showLoginModal = document.getElementById('showLoginModal');
    const showRegisterModal = document.getElementById('showRegisterModal');
    
    if (loginButton) loginButton.addEventListener('click', () => openModal('loginModal'));
    if (registerButton) registerButton.addEventListener('click', () => openModal('registerModal'));
    if (logoutButton) logoutButton.addEventListener('click', logout);
    if (showLoginModal) showLoginModal.addEventListener('click', () => openModal('loginModal'));
    if (showRegisterModal) showRegisterModal.addEventListener('click', () => openModal('registerModal'));
    
    // Forms
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    
    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('data-modal');
            if (modalId) closeModal(modalId);
        });
    });
    
    // Profile tabs
    const profileTabs = document.querySelectorAll('.profile-tab');
    profileTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            if (!e.target.disabled) {
                const tabName = e.target.getAttribute('data-tab');
                if (tabName) showProfileTab(tabName);
            }
        });
    });
    
    // Security method tabs
    const securityTabs = document.querySelectorAll('.security-tab');
    securityTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Don't allow clicking disabled tabs
            if (e.target.disabled || e.target.classList.contains('disabled')) {
                return;
            }
            
            // Determine which method was clicked
            const method = e.target.getAttribute('data-method') || 
                          (e.target.textContent.includes('API Token') ? 'token' : 
                           e.target.textContent.includes('JSON Import') ? 'import' : 'tag');
            showSecurityMethod(method);
        });
    });
    
    // Profile action buttons
    const tokenButton = document.getElementById('tokenButton');
    const linkButton = document.getElementById('linkButton');
    const importButton = document.getElementById('importButton');
    
    if (tokenButton) tokenButton.addEventListener('click', verifyWithToken);
    if (linkButton) linkButton.addEventListener('click', linkPlayerAccount);
    if (importButton) importButton.addEventListener('click', handleJSONImport);
    
    // Input handlers
    const apiTokenInput = document.getElementById('apiTokenInput');
    const linkPlayerTagInput = document.getElementById('linkPlayerTag');
    
    if (apiTokenInput) {
        apiTokenInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') verifyWithToken();
        });
    }
    
    if (linkPlayerTagInput) {
        linkPlayerTagInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') linkPlayerAccount();
        });
    }
    
    // Modal background clicks
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Password/Token visibility toggles
    const toggleButtons = document.querySelectorAll('.toggle-visibility');
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const showText = e.currentTarget.querySelector('.show-text');
            const hideText = e.currentTarget.querySelector('.hide-text');
            
            if (input.type === 'password') {
                input.type = 'text';
                showText.style.display = 'none';
                hideText.style.display = 'inline';
            } else {
                input.type = 'password';
                showText.style.display = 'inline';
                hideText.style.display = 'none';
            }
        });
    });
}

/*
=============================================================================
MODAL FUNCTIONS
=============================================================================
*/

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

/*
=============================================================================
AUTHENTICATION HANDLERS
=============================================================================
*/

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = { username: data.username };
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            updateAuthUI();
            showProfileContent();
            closeModal('loginModal');
            document.getElementById('loginForm').reset();
            showFormMessage('login', `Welcome back, ${data.username}!`, 'success');
            loadLinkedPlayers();
        } else {
            showFormMessage('login', data.error, 'error');
        }
    } catch (error) {
        showFormMessage('login', 'Login failed - please check your connection', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = { username: data.username };
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            updateAuthUI();
            showProfileContent();
            closeModal('registerModal');
            document.getElementById('registerForm').reset();
            showFormMessage('register', `Account created successfully! Welcome, ${data.username}!`, 'success');
            loadLinkedPlayers();
        } else {
            showFormMessage('register', data.error, 'error');
        }
    } catch (error) {
        showFormMessage('register', 'Registration failed - please check your connection', 'error');
    }
}

/*
=============================================================================
PROFILE TAB MANAGEMENT
=============================================================================
*/

function showProfileTab(tabName) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.profile-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) activeTab.classList.add('active');
    
    // Update content visibility
    const contents = document.querySelectorAll('.profile-content');
    contents.forEach(content => content.style.display = 'none');
    
    const activeContent = document.getElementById(tabName + 'Content');
    if (activeContent) activeContent.style.display = 'block';
}

function showSecurityMethod(method) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.security-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Find the correct active tab based on method
    let activeTab;
    if (method === 'token') {
        activeTab = document.querySelector('.security-tab[data-method="token"]');
    } else if (method === 'import') {
        activeTab = document.querySelector('.security-tab[data-method="import"]');
    } else {
        activeTab = document.querySelector('.security-tab:last-child'); // Coming Soon tab
    }
    
    if (activeTab) activeTab.classList.add('active');
    
    // Update method visibility
    const tokenMethod = document.getElementById('tokenMethod');
    const importMethod = document.getElementById('importMethod');
    const tagMethod = document.getElementById('tagMethod');
    
    // Hide all methods first
    if (tokenMethod) tokenMethod.style.display = 'none';
    if (importMethod) importMethod.style.display = 'none';
    if (tagMethod) tagMethod.style.display = 'none';
    
    // Show the selected method
    if (method === 'token' && tokenMethod) {
        tokenMethod.style.display = 'block';
    } else if (method === 'import' && importMethod) {
        importMethod.style.display = 'block';
    } else if (method === 'tag' && tagMethod) {
        tagMethod.style.display = 'block';
    }
}

/*
=============================================================================
PLAYER ACCOUNT MANAGEMENT
=============================================================================
*/

async function verifyWithToken() {
    const tokenInput = document.getElementById('apiTokenInput');
    const playerTagInput = document.getElementById('playerTagInput');
    const tokenButton = document.getElementById('tokenButton');
    
    if (!tokenInput || !playerTagInput || !authToken) {
        showFormMessage('token', 'Please log in to link player accounts', 'error');
        return;
    }
    
    const playerToken = tokenInput.value.trim();
    const playerTag = playerTagInput.value.trim();
    
    if (!playerToken) {
        showFormMessage('token', 'Please enter your CoC API token', 'error');
        return;
    }
    
    if (!playerTag) {
        showFormMessage('token', 'Please enter your player tag', 'error');
        return;
    }
    
    tokenButton.textContent = '🔄 Verifying Token...';
    tokenButton.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/verify-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ playerToken, playerTag })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showFormMessage('token', `Account verified and linked: ${data.linkedPlayer.playerName}`, 'success');
            showGlobalNotification(`✅ ${data.message} - ${data.linkedPlayer.playerName}`, 'success');
            tokenInput.value = '';
            playerTagInput.value = '';
            loadLinkedPlayers();
        } else {
            showFormMessage('token', data.error || 'Token verification failed', 'error');
        }
    } catch (error) {
        showFormMessage('token', 'Network error during token verification', 'error');
    } finally {
        tokenButton.textContent = '🔒 Verify & Link Account';
        tokenButton.disabled = false;
    }
}

async function linkPlayerAccount() {
    const playerTagInput = document.getElementById('linkPlayerTag');
    const linkButton = document.getElementById('linkButton');
    
    if (!playerTagInput || !authToken) {
        showError('Please log in to link player accounts');
        return;
    }
    
    const playerTag = playerTagInput.value.trim();
    if (!playerTag) {
        showError('Please enter a player tag');
        return;
    }
    
    linkButton.textContent = '🔄 Linking...';
    linkButton.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/link-player`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ playerTag })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess(`Player ${data.linkedPlayer.playerName} linked successfully!`);
            playerTagInput.value = '';
            loadLinkedPlayers();
        } else {
            showError(data.error || 'Failed to link player account');
        }
    } catch (error) {
        showError('Network error while linking player account');
    } finally {
        linkButton.textContent = '🔗 Link Account (Basic)';
        linkButton.disabled = false;
    }
}

async function loadLinkedPlayers() {
    if (!authToken) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/linked-players`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            linkedPlayers = data.linkedPlayers || [];
            
            // Smart caching: Use cached database data, no real-time calls on load
            // The background scheduler and manual refresh buttons handle live updates
            console.log(`📋 Loaded ${linkedPlayers.length} linked players with cached data`);
            
            displayLinkedPlayers();
            enableProfileTabs(linkedPlayers.length > 0);
            
            // Auto-load primary player profile if exists
            const primaryPlayer = linkedPlayers.find(player => player.is_primary);
            if (primaryPlayer) {
                loadPlayerProfile(primaryPlayer.player_tag);
            }
        }
    } catch (error) {
        console.error('Failed to load linked players:', error);
    }
}

// Smart cached data approach - no real-time calls on page load
// Background scheduler and manual refresh buttons handle live updates

// Update player last seen timestamp to improve caching
async function updatePlayerLastSeen(playerId) {
    try {
        await fetch(`${API_BASE_URL}/api/profile/update-last-seen/${playerId}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
    } catch (error) {
        console.warn('Failed to update player last seen:', error);
    }
}

function displayLinkedPlayers() {
    // Use the enhanced display function
    displayLinkedAccounts(linkedPlayers);
    
    // Initialize enhanced overview after displaying linked accounts
    initializeEnhancedOverview();
}

function enableProfileTabs(hasLinkedPlayers) {
    const tabs = ['overviewTab', 'upgradesTab', 'warTab', 'activityTab'];
    tabs.forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (tab) tab.disabled = !hasLinkedPlayers;
    });
}


async function loadPlayerProfile(playerTag) {
    if (!authToken) return;
    
    showLoading();
    
    try {
        const cleanTag = playerTag.replace('#', '');
        const response = await fetch(`${API_BASE_URL}/api/profile/player/${encodeURIComponent('#' + cleanTag)}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentPlayerProfile = data;
            displayPlayerProfile(data);
            showProfileTab('overview');
        } else {
            showError(data.error || 'Failed to load player profile');
        }
    } catch (error) {
        showError('Network error while loading player profile');
    } finally {
        hideLoading();
    }
}

function displayPlayerProfile(profileData) {
    // Implementation similar to main app.js but for profile page
    // This will display the player's overview, upgrades, war status, and activity
    console.log('Profile data loaded:', profileData);
    // TODO: Implement detailed profile display functions
}

/*
=============================================================================
UTILITY FUNCTIONS
=============================================================================
*/

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Global notification system
function showGlobalNotification(message, type = 'error', duration = 5000) {
    const notification = document.getElementById('globalNotification');
    const messageEl = notification.querySelector('.notification-message');
    const closeBtn = notification.querySelector('.notification-close');
    
    // Set message and type
    messageEl.textContent = message;
    notification.className = `global-notification ${type}`;
    notification.style.display = 'block';
    
    // Add body padding to account for notification
    document.body.classList.add('notification-showing');
    
    // Auto-hide after duration
    const hideNotification = () => {
        notification.style.display = 'none';
        document.body.classList.remove('notification-showing');
    };
    
    // Set up close button
    closeBtn.onclick = hideNotification;
    
    // Auto-hide timer
    setTimeout(hideNotification, duration);
}

// Contextual error/success for specific forms
function showFormMessage(formPrefix, message, type = 'error', duration = 5000) {
    const errorEl = document.getElementById(`${formPrefix}Error`);
    const successEl = document.getElementById(`${formPrefix}Success`);
    
    // Hide both first
    if (errorEl) errorEl.style.display = 'none';
    if (successEl) successEl.style.display = 'none';
    
    // Show appropriate message
    const targetEl = type === 'error' ? errorEl : successEl;
    if (targetEl) {
        targetEl.textContent = message;
        targetEl.style.display = 'block';
        
        // Auto-hide after duration
        setTimeout(() => {
            targetEl.style.display = 'none';
        }, duration);
    }
    
    // Also show global notification for important messages
    if (type === 'error') {
        showGlobalNotification(message, 'error', 3000);
    }
}

// Legacy functions for compatibility
function showError(message) {
    showGlobalNotification(message, 'error');
}

function showSuccess(message) {
    showGlobalNotification(message, 'success');
}

/*
=============================================================================
JSON IMPORT FUNCTIONALITY
=============================================================================
*/

async function handleJSONImport() {
    const jsonTextarea = document.getElementById('jsonImportTextarea');
    const importButton = document.getElementById('importButton');
    const importStatus = document.getElementById('importStatus');
    
    if (!jsonTextarea) {
        showFormMessage('import', 'Import elements not found', 'error');
        return;
    }
    
    const jsonText = jsonTextarea.value.trim();
    const importType = 'auto'; // Always auto-detect
    
    // Validate inputs
    if (!jsonText) {
        showFormMessage('import', 'Please paste JSON data to import', 'error');
        return;
    }
    
    // Update button state
    importButton.disabled = true;
    importButton.innerHTML = '🔄 Processing JSON...';
    showImportStatus('Parsing JSON data...', 'loading');
    
    try {
        // Parse JSON
        let jsonData;
        try {
            jsonData = JSON.parse(jsonText);
        } catch (parseError) {
            throw new Error('Invalid JSON format. Please check your data and try again.');
        }
        
        showImportStatus('Validating data structure...', 'loading');
        
        // Auto-detect or validate data type
        const detectedType = detectDataType(jsonData, importType);
        
        if (!detectedType) {
            throw new Error('Could not detect valid player or clan data in the JSON.');
        }
        
        showImportStatus(`Processing ${detectedType.type} data...`, 'loading');
        
        // Extract player information based on detected type
        const playerInfo = extractPlayerInfo(jsonData, detectedType);
        
        if (!playerInfo) {
            throw new Error('No valid player information found in the JSON data.');
        }
        
        showImportStatus('Linking account...', 'loading');
        
        // Link the account (requires authentication)
        if (!authToken) {
            showFormMessage('import', 'Please log in first to link your account', 'error');
            return;
        }
        
        await linkPlayerFromJSON(playerInfo);
        
        showFormMessage('import', `Successfully linked ${playerInfo.name} (${playerInfo.tag})`, 'success');
        showGlobalNotification(`✅ Player account linked: ${playerInfo.name}`, 'success');
        showImportStatus(`✅ Successfully linked ${playerInfo.name} (${playerInfo.tag})!`, 'success');
        
        // Clear the textarea
        jsonTextarea.value = '';
        
        // Reload linked players
        loadLinkedPlayers();
        
    } catch (error) {
        console.error('JSON Import error:', error);
        showFormMessage('import', `Import failed: ${error.message}`, 'error');
        showImportStatus(`❌ Import failed: ${error.message}`, 'error');
    } finally {
        // Reset button state
        importButton.disabled = false;
        importButton.innerHTML = '📝 Parse & Link Account';
        
        // Clear status after 8 seconds
        setTimeout(() => {
            if (importStatus) {
                importStatus.className = '';
                importStatus.style.display = 'none';
            }
        }, 8000);
    }
}

function showImportStatus(message, type) {
    const importStatus = document.getElementById('importStatus');
    if (!importStatus) return;
    
    importStatus.textContent = message;
    importStatus.className = type;
    importStatus.style.display = 'block';
}

function detectDataType(jsonData, userSelectedType) {
    // Auto-detect various formats
    
    // Check if it's a dashboard export file
    if (jsonData.exportInfo && (jsonData.player || jsonData.clan)) {
        return { type: 'export', data: jsonData };
    }
    
    // Check if it's standard CoC API player data
    if (jsonData.tag && jsonData.name && jsonData.townHallLevel !== undefined) {
        return { type: 'player', data: jsonData };
    }
    
    // Check if it's standard CoC API clan data
    if (jsonData.tag && jsonData.name && jsonData.clanLevel !== undefined) {
        return { type: 'clan', data: jsonData };
    }
    
    // Check if it's internal game format (from mobile app exports)
    if (jsonData.tag && jsonData.timestamp && (jsonData.buildings || jsonData.units || jsonData.heroes)) {
        return { type: 'internal', data: jsonData };
    }
    
    // Check if it's a player profile with basic info
    if (jsonData.tag && (jsonData.buildings || jsonData.units || jsonData.heroes || jsonData.spells)) {
        return { type: 'internal', data: jsonData };
    }
    
    // Check for any data with a tag (player identifier)
    if (jsonData.tag && typeof jsonData.tag === 'string' && jsonData.tag.includes('#')) {
        return { type: 'generic', data: jsonData };
    }
    
    return null;
}

function extractPlayerInfo(jsonData, detectedType) {
    let playerData = null;
    
    if (detectedType.type === 'export') {
        // Extract from dashboard export
        if (jsonData.player) {
            playerData = jsonData.player;
        } else if (jsonData.clan && jsonData.clanMembers && jsonData.clanMembers.members) {
            // Try to find the first member as a fallback
            const firstMember = jsonData.clanMembers.members[0];
            if (firstMember) {
                playerData = {
                    tag: firstMember.tag,
                    name: firstMember.name,
                    townHallLevel: firstMember.townHallLevel || firstMember.expLevel,
                    trophies: firstMember.trophies || 0
                };
            }
        }
    } else if (detectedType.type === 'player') {
        // Direct player data
        playerData = jsonData;
    } else if (detectedType.type === 'internal') {
        // Internal game format (from mobile app exports)
        // Extract basic info and derive player name from tag
        const tag = jsonData.tag;
        
        // Try to derive town hall level from buildings
        let townHallLevel = 1;
        if (jsonData.buildings && Array.isArray(jsonData.buildings)) {
            const townHall = jsonData.buildings.find(b => b.data === 1000001); // Town Hall data ID
            if (townHall && townHall.lvl) {
                townHallLevel = townHall.lvl;
            }
        }
        
        playerData = {
            tag: tag,
            name: `Player ${tag}`, // We'll ask user to provide name if needed
            townHallLevel: townHallLevel,
            trophies: 0, // Not available in internal format
            expLevel: 1
        };
    } else if (detectedType.type === 'generic') {
        // Generic format with just tag
        playerData = {
            tag: jsonData.tag,
            name: jsonData.name || `Player ${jsonData.tag}`,
            townHallLevel: jsonData.townHallLevel || jsonData.level || 1,
            trophies: jsonData.trophies || 0,
            expLevel: jsonData.expLevel || jsonData.level || 1
        };
    } else if (detectedType.type === 'clan') {
        // For clan data, we can't directly extract player info
        return null;
    }
    
    if (!playerData || !playerData.tag) {
        return null;
    }
    
    // Clean the tag format
    if (!playerData.tag.startsWith('#')) {
        playerData.tag = '#' + playerData.tag;
    }
    
    return {
        tag: playerData.tag,
        name: playerData.name || `Player ${playerData.tag}`,
        townHallLevel: playerData.townHallLevel || 1,
        trophies: playerData.trophies || 0,
        expLevel: playerData.expLevel || playerData.townHallLevel || 1
    };
}

async function linkPlayerFromJSON(playerInfo) {
    const response = await fetch(`${API_BASE_URL}/api/profile/link-player-json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            playerTag: playerInfo.tag,
            playerName: playerInfo.name,
            townHallLevel: playerInfo.townHallLevel,
            trophies: playerInfo.trophies,
            source: 'json-import'
        })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || 'Failed to link player account from JSON');
    }
    
    return data;
}

/*
=============================================================================
ENHANCED LINKED ACCOUNTS DISPLAY
=============================================================================
*/

function displayLinkedAccounts(linkedPlayers) {
    const linkedAccountsList = document.getElementById('linkedAccountsList');
    const noAccountsMessage = document.getElementById('noAccountsMessage');
    
    if (!linkedAccountsList || !noAccountsMessage) {
        console.warn('Linked accounts display elements not found');
        return;
    }
    
    if (!linkedPlayers || linkedPlayers.length === 0) {
        // Show empty state
        linkedAccountsList.innerHTML = '';
        noAccountsMessage.style.display = 'block';
        return;
    }
    
    // Hide empty state and show accounts
    noAccountsMessage.style.display = 'none';
    
    // Create account cards
    const accountsHTML = linkedPlayers.map(player => createAccountCard(player)).join('');
    linkedAccountsList.innerHTML = accountsHTML;
    
    // Add event listeners for account actions
    setupAccountEventListeners();
}

function createAccountCard(player) {
    const isPrimary = player.is_primary;
    const verificationMethod = player.verification_method || 'json_import';
    
    // Get verification badge info
    const verificationInfo = getVerificationBadge(verificationMethod);
    
    // Use cached database data with live updates from manual refresh
    const displayName = player.player_name || player.cached_name || 'Unknown Player';
    const displayTrophies = player.cached_trophies || player.trophies || 0;
    const displayTownHall = player.cached_town_hall_level || player.town_hall_level || 1;
    const displayLevel = player.cached_exp_level || player.exp_level || 1;
    const displayDonations = player.cached_donations || 0;
    const displayReceived = player.cached_donations_received || 0;
    const clanInfo = player.cached_clan_name ? {
        name: player.cached_clan_name,
        tag: player.cached_clan_tag,
        role: player.cached_clan_role
    } : null;
    
    // Get player initials for avatar
    const playerInitials = getPlayerInitials(displayName);
    
    // Smart data freshness based on last_api_refresh timestamp
    const lastRefresh = player.last_api_refresh ? new Date(player.last_api_refresh) : null;
    const now = new Date();
    const dataAge = lastRefresh ? getDataAge(lastRefresh) : 'Never updated';
    const diffMinutes = lastRefresh ? Math.floor((now - lastRefresh) / (1000 * 60)) : Infinity;
    
    let freshnessIcon, freshnessTitle, dataFreshness;
    if (!lastRefresh) {
        freshnessIcon = '⚪';
        freshnessTitle = 'No live data yet - click 🔄 API to refresh';
        dataFreshness = 'never';
    } else if (diffMinutes < 5) {
        freshnessIcon = '🟢';
        freshnessTitle = 'Fresh data (< 5 minutes old)';
        dataFreshness = 'fresh';
    } else if (diffMinutes < 30) {
        freshnessIcon = '🔵';
        freshnessTitle = 'Recent data (< 30 minutes old)';
        dataFreshness = 'recent';
    } else {
        freshnessIcon = '🟡';
        freshnessTitle = 'Stale data (> 30 minutes old) - refresh recommended';
        dataFreshness = 'stale';
    }
    
    // Get appropriate icons from Clash Wiki
    const townHallIcon = getTownHallIcon(displayTownHall);
    const trophyIcon = getTrophyIcon(displayTrophies);
    
    const isStale = !lastRefresh || diffMinutes > 30;
    
    return `
        <div class="account-card" data-player-id="${player.id}" data-freshness="${dataFreshness}">
            ${isPrimary ? '<div class="primary-badge">⭐ Primary</div>' : ''}
            <div class="data-freshness" title="${freshnessTitle}">${freshnessIcon}</div>
            
            <div class="account-header">
                <div class="player-avatar" title="${displayName}">
                    ${playerInitials}
                </div>
                <div class="player-info">
                    <h5>${displayName} ${clanInfo && clanInfo.role ? `<span class="clan-role">[${clanInfo.role}]</span>` : ''}</h5>
                    <div class="player-tag">${player.player_tag}</div>
                    ${clanInfo ? `<div class="clan-info">🏰 ${clanInfo.name}</div>` : ''}
                    <div class="verification-badge ${verificationInfo.class}">
                        ${verificationInfo.icon} ${verificationInfo.label}
                    </div>
                    
                    <!-- Smart data age indicator -->
                    <div class="data-age-indicator ${isStale ? 'stale' : 'fresh'}" title="Last updated: ${lastRefresh ? lastRefresh.toLocaleString() : 'Never'}">
                        🔄 ${dataAge}
                    </div>
                </div>
            </div>
            
            <div class="account-stats">
                <div class="stat-item">
                    <div class="stat-icon">${townHallIcon}</div>
                    <div class="stat-value">TH${displayTownHall}</div>
                    <div class="stat-label">Town Hall</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">${trophyIcon}</div>
                    <div class="stat-value">${formatFullNumber(displayTrophies)}</div>
                    <div class="stat-label">Trophies</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${displayLevel}</div>
                    <div class="stat-label">Level</div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">🤝</div>
                    <div class="stat-value">${formatFullNumber(displayDonations)}</div>
                    <div class="stat-label">Donated</div>
                </div>
            </div>
            
            <!-- Smart action buttons with API refresh -->
            <div class="account-actions">
                <button class="account-btn api-refresh ${isStale ? 'urgent' : ''}" data-action="refresh-api" data-player-tag="${player.player_tag}" data-player-id="${player.id}" title="${isStale ? 'Data is stale - refresh recommended!' : 'Refresh live data from CoC API'}">
                    🔄 API
                </button>
                ${!isPrimary ? `<button class="account-btn primary" data-action="set-primary" data-player-id="${player.id}">⭐ Primary</button>` : ''}
                <button class="account-btn" data-action="view-details" data-player-tag="${player.player_tag}">👁️ Details</button>
                <button class="account-btn danger" data-action="unlink" data-player-id="${player.id}">🗑️ Unlink</button>
            </div>
        </div>
    `;
}

function getVerificationBadge(method) {
    switch(method) {
        case 'api_token':
            return { class: 'secure', icon: '🔒', label: 'API Token' };
        case 'json_import':
            return { class: 'import', icon: '📋', label: 'JSON Import' };
        case 'player_tag':
            return { class: 'basic', icon: '🏷️', label: 'Player Tag' };
        default:
            return { class: 'import', icon: '📋', label: 'Imported' };
    }
}

// Get Town Hall icon based on level - using local images
function getTownHallIcon(level) {
    // Use local images we have in /assets/images/townhalls/
    const townHallImages = {
        4: 'Building_HV_Town_Hall_level_4.png',
        5: 'Building_HV_Town_Hall_level_5.png',
        6: 'Building_HV_Town_Hall_level_6.png',
        7: 'Building_HV_Town_Hall_level_7.png',
        8: 'Building_HV_Town_Hall_level_8.png',
        9: 'Building_HV_Town_Hall_level_9.png',
        10: 'Building_HV_Town_Hall_level_10.png',
        11: 'Building_HV_Town_Hall_level_11.png',
        12: 'Building_HV_Town_Hall_level_12_1.png',
        13: 'Building_HV_Town_Hall_level_13_1.png',
        14: 'Building_HV_Town_Hall_level_14_1.png',
        15: 'Building_HV_Town_Hall_level_15_3.png',
        16: 'Building_HV_Town_Hall_level_16_1.png',
        17: 'TH17_HV_03 .png'
    };
    
    // Get the appropriate image or fallback
    const imageName = townHallImages[level] || townHallImages[16]; // Default to TH16 if not found
    
    // Create image with local path and fallback
    return `<img src="assets/images/townhalls/${imageName}" 
                 alt="Town Hall ${level}" 
                 class="stat-icon-img" 
                 loading="lazy"
                 onerror="this.style.display='none'; this.parentNode.innerHTML='🏛️';"
                 title="Town Hall Level ${level}">`;
}

// Get Trophy icon based on trophy count (league) - using reliable CoC asset sources
function getTrophyIcon(trophies) {
    const CLASH_WIKI_BASE = 'https://clashofclans.fandom.com/wiki/Special:Redirect/file';
    
    // Helper function to create league image with fallback
    const createLeagueImage = (imageName, leagueName, fallbackEmoji = '🏆') => {
        return `<img src="${CLASH_WIKI_BASE}/${imageName}" 
                     alt="${leagueName}" 
                     class="stat-icon-img" 
                     loading="lazy"
                     onerror="this.style.display='none'; this.parentNode.innerHTML='${fallbackEmoji}';"
                     title="${leagueName} (${trophies} trophies)">`;
    };
    
    // Map trophy ranges to league icons with appropriate fallback emojis
    if (trophies >= 5000) {
        return createLeagueImage('Legend_League.png', 'Legend League', '🎆');
    } else if (trophies >= 4600) {
        return createLeagueImage('Titan_League_I.png', 'Titan League I', '🔥');
    } else if (trophies >= 4200) {
        return createLeagueImage('Titan_League_II.png', 'Titan League II', '🔥');
    } else if (trophies >= 3800) {
        return createLeagueImage('Titan_League_III.png', 'Titan League III', '🔥');
    } else if (trophies >= 3400) {
        return createLeagueImage('Champion_League_I.png', 'Champion League I', '🏅');
    } else if (trophies >= 3000) {
        return createLeagueImage('Champion_League_II.png', 'Champion League II', '🏅');
    } else if (trophies >= 2600) {
        return createLeagueImage('Champion_League_III.png', 'Champion League III', '🏅');
    } else if (trophies >= 2300) {
        return createLeagueImage('Master_League_I.png', 'Master League I', '🥇');
    } else if (trophies >= 2000) {
        return createLeagueImage('Master_League_II.png', 'Master League II', '🥇');
    } else if (trophies >= 1600) {
        return createLeagueImage('Master_League_III.png', 'Master League III', '🥇');
    } else if (trophies >= 1400) {
        return createLeagueImage('Crystal_League_I.png', 'Crystal League I', '💎');
    } else if (trophies >= 1200) {
        return createLeagueImage('Crystal_League_II.png', 'Crystal League II', '💎');
    } else if (trophies >= 1000) {
        return createLeagueImage('Crystal_League_III.png', 'Crystal League III', '💎');
    } else if (trophies >= 800) {
        return createLeagueImage('Gold_League_I.png', 'Gold League I', '🥇');
    } else if (trophies >= 600) {
        return createLeagueImage('Gold_League_II.png', 'Gold League II', '🥇');
    } else if (trophies >= 400) {
        return createLeagueImage('Gold_League_III.png', 'Gold League III', '🥇');
    } else if (trophies >= 200) {
        return createLeagueImage('Silver_League_I.png', 'Silver League I', '🥈');
    } else {
        // For very low trophy counts, use a basic trophy emoji
        return '🏆';
    }
}

function getPlayerInitials(playerName) {
    if (!playerName) return '?';
    return playerName.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// New function for showing full numbers with commas
function formatFullNumber(num) {
    return num ? num.toLocaleString() : '0';
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

// Smart data age calculation
function getDataAge(lastRefreshDate) {
    if (!lastRefreshDate) return 'Never';
    
    const now = new Date();
    const diffMs = now - lastRefreshDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays > 1) return `${diffDays} days ago`;
    
    return 'Just now';
}

function setupAccountEventListeners() {
    console.log('Setting up account event listeners...');
    
    // Set primary account
    const setPrimaryButtons = document.querySelectorAll('[data-action="set-primary"]');
    console.log('Found', setPrimaryButtons.length, 'set-primary buttons');
    setPrimaryButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const playerId = e.target.getAttribute('data-player-id');
            console.log('Set primary clicked for player ID:', playerId);
            await setPrimaryAccount(playerId);
        });
    });
    
    // View account details
    const viewDetailsButtons = document.querySelectorAll('[data-action="view-details"]');
    console.log('Found', viewDetailsButtons.length, 'view-details buttons');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const playerTag = e.target.getAttribute('data-player-tag');
            console.log('View details clicked for player tag:', playerTag);
            viewAccountDetails(playerTag);
        });
    });
    
    // API Refresh button (smart refresh)
    const refreshButtons = document.querySelectorAll('[data-action="refresh-api"]');
    console.log('Found', refreshButtons.length, 'API refresh buttons');
    refreshButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const playerTag = e.target.getAttribute('data-player-tag');
            const playerId = e.target.getAttribute('data-player-id');
            console.log('API refresh clicked for player:', playerTag);
            await refreshPlayerAPI(playerTag, playerId, e.target);
        });
    });
    
    // Unlink account
    const unlinkButtons = document.querySelectorAll('[data-action="unlink"]');
    console.log('Found', unlinkButtons.length, 'unlink buttons');
    unlinkButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const playerId = e.target.getAttribute('data-player-id');
            console.log('Unlink button clicked for player ID:', playerId);
            await unlinkAccount(playerId);
        });
    });
    
    console.log('Account event listeners setup complete');
}

async function setPrimaryAccount(playerId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/set-primary/${playerId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('Primary account updated successfully!');
            loadLinkedPlayers(); // Refresh the display
        } else {
            showError(data.error || 'Failed to set primary account');
        }
    } catch (error) {
        showError('Network error while setting primary account');
    }
}

async function viewAccountDetails(playerTag) {
    // Switch to overview tab and display enhanced overview for this player
    showProfileTab('overview');
    
    // Enable the overview tab if it's disabled
    const overviewTab = document.getElementById('overviewTab');
    if (overviewTab && overviewTab.disabled) {
        overviewTab.disabled = false;
        overviewTab.style.opacity = '1';
    }
    
    // Find the player data from linked players
    const playerData = linkedPlayers.find(p => p.player_tag === playerTag);
    
    if (!playerData) {
        console.error('Player data not found for tag:', playerTag);
        return;
    }
    
    // Display enhanced overview for this player
    try {
        await enhancedOverview.displayPlayerOverview(playerTag, {
            tag: playerData.player_tag,
            name: playerData.cached_name || playerData.player_name,
            townHallLevel: playerData.cached_town_hall_level || playerData.town_hall_level || 1,
            trophies: playerData.cached_trophies || playerData.trophies || 0,
            expLevel: playerData.cached_exp_level || playerData.exp_level || 1,
            clanName: playerData.cached_clan_name,
            clanRole: playerData.cached_clan_role,
            donations: playerData.cached_donations || 0,
            donationsReceived: playerData.cached_donations_received || 0,
            lastUpdate: playerData.last_api_refresh
        });
        
        // Scroll to the enhanced overview section
        const overviewContainer = document.getElementById('enhancedPlayerOverview');
        if (overviewContainer) {
            overviewContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        showGlobalNotification(`📊 Enhanced overview loaded for ${playerData.cached_name || playerData.player_name}`, 'success');
    } catch (error) {
        console.error('Error displaying enhanced overview:', error);
        showGlobalNotification('❌ Failed to load enhanced overview', 'error');
    }
}

// Smart API refresh function
async function refreshPlayerAPI(playerTag, playerId, buttonElement) {
    console.log('Refreshing player API data for:', playerTag);
    
    if (!authToken) {
        showError('Please log in to refresh player data');
        return;
    }
    
    // Update button state to show loading
    const originalText = buttonElement.innerHTML;
    buttonElement.disabled = true;
    buttonElement.innerHTML = '🔄 Refreshing...';
    buttonElement.classList.add('loading');
    
    try {
        const cleanTag = playerTag.replace('#', '');
        console.log(`🔄 Making refresh request for ${cleanTag} with auth token:`, authToken ? 'present' : 'missing');
        
        const response = await fetch(`${API_BASE_URL}/api/refresh-player/${cleanTag}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(`🔄 Response status: ${response.status} ${response.statusText}`);
        
        let data;
        const responseText = await response.text();
        
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error('❌ Failed to parse response as JSON:', parseError);
            console.error('❌ Raw response:', responseText);
            throw new Error(`Server returned invalid JSON response (${response.status}): ${responseText.substring(0, 100)}...`);
        }
        
        if (response.ok) {
            console.log('✅ Player data refreshed:', data);
            
            // Show success with live data info
            showGlobalNotification(
                `✅ ${data.playerName} refreshed! ${data.liveData.trophies} trophies, TH${data.liveData.townHallLevel}`, 
                'success', 
                4000
            );
            
            // Update the card's data age indicator
            const card = buttonElement.closest('.account-card');
            const ageIndicator = card.querySelector('.data-age-indicator');
            if (ageIndicator) {
                ageIndicator.textContent = '🔄 Just now';
                ageIndicator.className = 'data-age-indicator fresh';
                ageIndicator.title = `Last updated: ${new Date().toLocaleString()}`;
            }
            
            // Update the freshness indicator
            const freshnessIndicator = card.querySelector('.data-freshness');
            if (freshnessIndicator) {
                freshnessIndicator.textContent = '🟢';
                freshnessIndicator.title = 'Live data (just refreshed)';
            }
            
            // Reload the entire linked players display to show updated stats
            setTimeout(() => {
                loadLinkedPlayers();
            }, 1000);
            
        } else {
            console.error('❌ Player refresh failed:', data);
            const errorMessage = data.error || `HTTP ${response.status}: ${response.statusText}`;
            
            // Provide specific error messages for common issues
            if (response.status === 403) {
                showGlobalNotification(`❌ Access denied: ${errorMessage}`, 'error');
            } else if (response.status === 404) {
                showGlobalNotification(`❌ Player not found or not linked: ${errorMessage}`, 'error');
            } else if (response.status === 429) {
                showGlobalNotification(`❌ Too many requests: Please wait before refreshing again`, 'error');
            } else {
                showGlobalNotification(`❌ Failed to refresh ${playerTag}: ${errorMessage}`, 'error');
            }
        }
        
    } catch (error) {
        console.error('❌ Network error during player refresh:', error);
        
        // Better error messages for different network issues
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            showGlobalNotification(`❌ Network error: Could not connect to server. Check if server is running.`, 'error');
        } else if (error.message.includes('timeout')) {
            showGlobalNotification(`❌ Request timeout: Server took too long to respond.`, 'error');
        } else {
            showGlobalNotification(`❌ Network error: ${error.message}`, 'error');
        }
    }
        // Reset button state
        buttonElement.disabled = false;
        buttonElement.innerHTML = originalText;
        buttonElement.classList.remove('loading');
    }


async function unlinkAccount(playerId) {
    console.log('unlinkAccount called with playerId:', playerId);
    
    if (!playerId) {
        showError('Invalid player ID for unlinking');
        console.error('Player ID is null or undefined');
        return;
    }
    
    if (!confirm('Are you sure you want to unlink this account? This action cannot be undone.')) {
        console.log('User cancelled unlink operation');
        return;
    }
    
    console.log('Attempting to unlink account with ID:', playerId);
    console.log('Auth token present:', !!authToken);
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/unlink-player/${playerId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        console.log('Unlink response status:', response.status);
        const data = await response.json();
        console.log('Unlink response data:', data);
        
        if (response.ok) {
            showSuccess('Account unlinked successfully!');
            loadLinkedPlayers(); // Refresh the display
        } else {
            showError(data.error || 'Failed to unlink account');
        }
    } catch (error) {
        console.error('Network error while unlinking account:', error);
        showError('Network error while unlinking account');
    }
}

/*
=============================================================================
ENHANCED OVERVIEW INTEGRATION
=============================================================================
*/

/**
 * Load enhanced overview for primary account automatically
 */
function loadPrimaryAccountOverview() {
    const primaryPlayer = linkedPlayers.find(p => p.is_primary);
    if (primaryPlayer) {
        console.log('Loading overview for primary account:', primaryPlayer.cached_name || primaryPlayer.player_name);
        viewAccountDetails(primaryPlayer.player_tag);
    }
}

/**
 * Initialize enhanced overview when player accounts are loaded
 */
function initializeEnhancedOverview() {
    // Enable overview tab if we have linked players
    if (linkedPlayers && linkedPlayers.length > 0) {
        const overviewTab = document.getElementById('overviewTab');
        
        if (overviewTab) {
            overviewTab.disabled = false;
            overviewTab.style.opacity = '1';
            overviewTab.style.cursor = 'pointer';
        }
        
        // Show account selector when overview tab is clicked
        overviewTab?.addEventListener('click', () => {
            if (overviewTab.classList.contains('active')) {
                showAccountSelector();
            }
        });
        
        console.log('Enhanced overview initialized for', linkedPlayers.length, 'linked accounts');
    }
}

/**
 * Show account selector if user clicks overview tab without selecting an account
 */
function showAccountSelector() {
    const container = document.getElementById('enhancedPlayerOverview');
    if (!container || !linkedPlayers || linkedPlayers.length === 0) {
        return;
    }
    
    const accountOptions = linkedPlayers.map(player => {
        const displayName = player.cached_name || player.player_name;
        const isPrimary = player.is_primary ? '⭐ ' : '';
        const thLevel = player.cached_town_hall_level || player.town_hall_level || '?';
        const trophies = player.cached_trophies || player.trophies || 0;
        
        return `
            <button class="account-selector-btn" onclick="viewAccountDetails('${player.player_tag}')">
                <div class="selector-player-info">
                    <div class="selector-name">${isPrimary}${displayName}</div>
                    <div class="selector-stats">
                        <span class="selector-tag">${player.player_tag}</span>
                        <span class="selector-th">TH${thLevel}</span>
                        <span class="selector-trophies">${COCComponents.formatNumber(trophies)} 🏆</span>
                    </div>
                </div>
            </button>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="account-selector">
            <div class="selector-header">
                <h4>📊 Select Account for Enhanced Overview</h4>
                <p>Choose which linked account you want to view detailed analysis for:</p>
            </div>
            <div class="selector-grid">
                ${accountOptions}
            </div>
            <div class="selector-footer">
                <p><small>💡 Click on any account card above to see detailed troop composition, offensive strength metrics, and hero status.</small></p>
            </div>
        </div>
    `;
}
