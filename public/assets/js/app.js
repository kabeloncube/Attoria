/*
=============================================================================
FRONTEND JAVASCRIPT - This file handles all the interactive functionality
of the website that runs in the user's browser
=============================================================================
*/

// DOM ELEMENTS - Getting references to HTML elements we need to control
// Think of this as "finding" elements on the webpage so we can use them later
const searchForm = document.getElementById('searchForm');           // The search form where users enter clan/player info
const loginForm = document.getElementById('loginForm');             // The login form in the modal popup
const registerForm = document.getElementById('registerForm');       // The registration form in the modal popup
const loadingDiv = document.getElementById('loading');              // The loading spinner that shows when fetching data
const errorDiv = document.getElementById('error');                  // The red error message area
const resultsDiv = document.getElementById('results');              // The main area where search results are displayed
const locationSelect = document.getElementById('locationSelect');   // The dropdown for selecting locations in leaderboard

// API CONFIGURATION - Where to send requests to our backend server
const API_BASE_URL = window.location.origin;  // This gets the current website URL (like http://localhost:3000)

// AUTHENTICATION VARIABLES - Keep track of who's logged in
let currentUser = null;                                    // Stores info about the logged-in user (null = no one logged in)
let authToken = localStorage.getItem('authToken');         // Gets saved login token from browser storage

/*
=============================================================================
APP INITIALIZATION - This runs when the webpage finishes loading
=============================================================================
*/

// MAIN STARTUP FUNCTION - Runs automatically when the page loads
document.addEventListener('DOMContentLoaded', () => {  // Wait for HTML to fully load
    checkAuthState();        // Check if user is already logged in
    loadLocations();         // Load country/location options for leaderboard
    loadEvents();            // Load news and events from database
    setupEventListeners();   // Set up click handlers for buttons, forms, etc.
});

/*
=============================================================================
AUTHENTICATION FUNCTIONS - Handle user login/logout
=============================================================================
*/

// CHECK IF USER IS ALREADY LOGGED IN (from previous session)
function checkAuthState() {
    if (authToken) {  // If we have a saved login token
        // Get user info from browser storage and update the UI
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
        updateAuthUI();
    }
}

// UPDATE THE USER INTERFACE based on login status
function updateAuthUI() {
    // Get the HTML elements for auth buttons and user info
    const authButtons = document.getElementById('authButtons');        // Login/Register buttons
    const loggedInUser = document.getElementById('loggedInUser');      // Welcome message area
    const welcomeMessage = document.getElementById('welcomeMessage');  // The actual welcome text
    const profileSection = document.getElementById('playerProfileSection');
    
    if (currentUser) {
        // User is logged in - show welcome message, hide login buttons
        authButtons.style.display = 'none';
        loggedInUser.style.display = 'flex';
        welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
        
        // Show the profile section as an option (but don't auto-open)
        if (profileSection) {
            // Profile section exists but stays hidden until user clicks "My Profile"
        }
    } else {
        // User is not logged in - show login buttons, hide welcome message
        authButtons.style.display = 'flex';
        loggedInUser.style.display = 'none';
        
        // Hide profile section if not logged in
        if (profileSection) {
            profileSection.style.display = 'none';
        }
    }
}

// LOG OUT THE CURRENT USER
function logout() {
    authToken = null;    // Clear the login token
    currentUser = null;  // Clear user info
    localStorage.removeItem('authToken');     // Remove saved login token from browser
    localStorage.removeItem('currentUser');   // Remove saved user info from browser
    updateAuthUI();      // Update the UI to show login buttons again
}

/*
=============================================================================
MODAL FUNCTIONS - Handle popup windows (login/register forms)
=============================================================================
*/

// OPEN A MODAL (popup window)
function openModal(modalId) {
    // Find the modal by its ID and make it visible
    document.getElementById(modalId).style.display = 'block';
}

// CLOSE A MODAL (hide popup window)
function closeModal(modalId) {
    // Find the modal by its ID and hide it
    document.getElementById(modalId).style.display = 'none';
}

/*
=============================================================================
EVENT LISTENERS - Set up what happens when users click buttons/submit forms
=============================================================================
*/

// SET UP ALL THE EVENT LISTENERS (button clicks, form submissions, etc.)
function setupEventListeners() {
    // Initialize custom dropdowns
    initializeCustomDropdowns();
    // When user submits the search form (searches for clan/player)
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // When user submits authentication forms
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);       // Login form submission
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister); // Register form submission
    }
    
    // Auth button event listeners
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutButton');
    
    if (loginButton) {
        loginButton.addEventListener('click', () => openModal('loginModal'));
    }
    if (registerButton) {
        registerButton.addEventListener('click', () => openModal('registerModal'));
    }
    // Profile button now links to dedicated profile page
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
    
    // Modal close button event listeners
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.getAttribute('data-modal');
            if (modalId) {
                closeModal(modalId);
            }
        });
    });
    
    // Player search button
    const searchPlayerButton = document.getElementById('searchPlayerButton');
    if (searchPlayerButton) {
        searchPlayerButton.addEventListener('click', searchPlayer);
    }
    
    // Player tag input - handle Enter key
    const playerTagInput = document.getElementById('playerTagInput');
    if (playerTagInput) {
        playerTagInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchPlayer();
            }
        });
    }
    
    // Leaderboard toggle button
    const leaderboardToggle = document.getElementById('leaderboardToggle');
    if (leaderboardToggle) {
        leaderboardToggle.addEventListener('click', toggleLeaderboard);
    }
    
    // Load leaderboard button
    const loadLeaderboardButton = document.getElementById('loadLeaderboardButton');
    if (loadLeaderboardButton) {
        loadLeaderboardButton.addEventListener('click', loadLeaderboard);
    }
    
    // Close buttons (universal handler)
    const sectionCloseButtons = document.querySelectorAll('.section-close');
    sectionCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const closeAction = e.target.getAttribute('data-close');
            if (closeAction) {
                switch(closeAction) {
                    case 'clanSearch':
                        closeClanSearch();
                        break;
                    case 'playerSearch':
                        closePlayerSearch();
                        break;
                    case 'leaderboard':
                        closeLeaderboard();
                        break;
                }
            }
        });
    });
    
    // Section header toggle listeners (for mobile collapsible sections)
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            const sectionName = e.currentTarget.getAttribute('data-section');
            if (sectionName) {
                toggleSection(sectionName);
            }
        });
    });
    
    // Overlay click handler
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeAllPopups);
    }
    
    // Close modals when user clicks outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {  // If they clicked the dark background
            e.target.style.display = 'none';         // Hide the modal
        }
    });
    
    // Event delegation for dynamically created tab buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-button')) {
            const tabTarget = e.target.getAttribute('data-tab-target');
            const cardId = e.target.getAttribute('data-card-id');
            if (tabTarget && cardId) {
                showTab(tabTarget, e.target, cardId);
            }
        }
        
        
        // Event delegation for clan list items
        if (e.target.classList.contains('clan-list-item') || e.target.closest('.clan-list-item')) {
            const listItem = e.target.classList.contains('clan-list-item') ? e.target : e.target.closest('.clan-list-item');
            const clanTag = listItem.getAttribute('data-clan-tag');
            if (clanTag) {
                fetchClanByTag(clanTag);
            }
        }
        
        // Event delegation for pagination buttons
        if (e.target.classList.contains('pagination-btn')) {
            const action = e.target.getAttribute('data-action');
            if (action === 'next') {
                const afterCursor = e.target.getAttribute('data-after');
                if (afterCursor) {
                    loadNextClans(afterCursor);
                }
            } else if (action === 'previous') {
                loadPreviousClans();
            }
        }
    });
}

// Authentication handlers
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
            closeModal('loginModal');
            loginForm.reset();
        } else {
            showError(data.error);
        }
    } catch (error) {
        showError('Login failed');
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
            closeModal('registerModal');
            registerForm.reset();
        } else {
            showError(data.error);
        }
    } catch (error) {
        showError('Registration failed');
    }
}

// Search handler
async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchType = formData.get('searchType');
    const searchValue = formData.get('searchValue');
    
    if (!searchValue.trim()) {
        showError('Please enter a search value');
        return;
    }
    
    await fetchData(searchType, searchValue);
}

// Show/hide functions
function showLoading() {
    loadingDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    // Clear all result containers
    const clanResults = document.getElementById('clanResults');
    const playerResults = document.getElementById('playerResults');
    if (clanResults) clanResults.innerHTML = '';
    if (playerResults) playerResults.innerHTML = '';
    if (resultsDiv) resultsDiv.innerHTML = '';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
}

function showError(message) {
    hideLoading();
    errorDiv.innerHTML = `<strong>Error:</strong> ${message}`;
    errorDiv.style.display = 'block';
}

function showResults(html, searchType = null) {
    hideLoading();
    errorDiv.style.display = 'none';
    
    // Determine which container to use based on search type
    let targetContainer;
    if (searchType === 'clan' || searchType === 'clanSearch') {
        targetContainer = document.getElementById('clanResults');
        showCloseButton('clan'); // Show close button for clan results
    } else if (searchType === 'player') {
        targetContainer = document.getElementById('playerResults');
        showCloseButton('player'); // Show close button for player results
    } else {
        targetContainer = resultsDiv; // Fallback to global results
    }
    
    if (targetContainer) {
        targetContainer.innerHTML = html;
        targetContainer.classList.add('show');
    }
}

// Utility functions
function formatNumber(num) {
    return num ? num.toLocaleString() : '0';
}

// Enhanced clan card with tabs
function createClanCardWithTabs(clan, currentTag) {
    const badgeUrl = clan.badgeUrls?.medium || clan.badgeUrls?.small || '';
    const cardId = `clan-${currentTag}`;
    
    return `
        <div class="clan-card" data-clan-id="${cardId}">
            <div class="clan-header">
                ${badgeUrl ? `<img src="${badgeUrl}" alt="Clan Badge" class="clan-badge">` : ''}
                <div class="clan-info">
                    <h3>${clan.name}</h3>
                    <span class="tag">${clan.tag}</span>
                    ${clan.description ? `<p class="clan-description">${clan.description}</p>` : ''}
                </div>
            </div>
            
            <div class="tabs">
                <button class="tab-button active" data-tab-target="${cardId}-overview" data-card-id="${cardId}">Overview</button>
                <button class="tab-button" data-tab-target="${cardId}-members" data-card-id="${cardId}" data-clan-tag="${currentTag}">Members (${clan.members})</button>
                <button class="tab-button" data-tab-target="${cardId}-warlog" data-card-id="${cardId}" data-clan-tag="${currentTag}">War Log</button>
                <button class="tab-button" data-tab-target="${cardId}-capital" data-card-id="${cardId}" data-clan-tag="${currentTag}">Clan Capital</button>
            </div>
            
            <div id="${cardId}-overview" class="tab-content active">
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-value">${formatNumber(clan.clanPoints)}</div>
                        <div class="stat-label">Clan Points</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${clan.members || 0}/50</div>
                        <div class="stat-label">Members</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${clan.clanLevel || 1}</div>
                        <div class="stat-label">Clan Level</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${formatNumber(clan.clanVersusPoints || 0)}</div>
                        <div class="stat-label">Versus Points</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${formatNumber(clan.requiredTrophies || 0)}</div>
                        <div class="stat-label">Required Trophies</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${clan.warFrequency || 'Unknown'}</div>
                        <div class="stat-label">War Frequency</div>
                    </div>
                    ${clan.location ? `<div class="stat-item">
                        <div class="stat-value">${clan.location.name}</div>
                        <div class="stat-label">Location</div>
                    </div>` : ''}
                    ${clan.warLeague ? `<div class="stat-item">
                        <div class="stat-value">${clan.warLeague.name}</div>
                        <div class="stat-label">War League</div>
                    </div>` : ''}
                </div>
            </div>
            
            <div id="${cardId}-members" class="tab-content">
                <div style="text-align: center; padding: 2rem;">Loading members...</div>
            </div>
            
            <div id="${cardId}-warlog" class="tab-content">
                <div style="text-align: center; padding: 2rem;">Loading war log...</div>
            </div>
            
            <div id="${cardId}-capital" class="tab-content">
                <div style="text-align: center; padding: 2rem;">Loading clan capital data...</div>
            </div>
        </div>
    `;
}



// Tab switching
function showTab(tabName, button, cardId) {
    // Find the clan card container
    const clanCard = document.querySelector(`[data-clan-id="${cardId}"]`);
    if (!clanCard) return;
    
    // Hide all tab contents within this clan card
    const tabContents = clanCard.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons within this clan card
    const tabButtons = clanCard.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab and mark button as active
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
        button.classList.add('active');
        
        // Load data for specific tabs
        const clanTag = button.dataset.clanTag;
        if (clanTag) {
            const tabType = tabName.split('-').pop(); // Get the last part (members, warlog, capital)
            if (tabType === 'members') {
                loadClanMembers(clanTag, tabName);
            } else if (tabType === 'warlog') {
                loadWarLog(clanTag, tabName);
            } else if (tabType === 'capital') {
                loadClanCapital(clanTag, tabName);
            }
        }
    }
}

// Load clan members
async function loadClanMembers(clanTag, tabId) {
    console.log('Loading clan members for:', clanTag, 'into tab:', tabId);
    const targetElement = document.getElementById(tabId);
    if (!targetElement) {
        console.error('Target element not found:', tabId);
        return;
    }
    
    // Show loading state
    targetElement.innerHTML = '<div style="text-align: center; padding: 2rem;"><div class="spinner"></div><p>Loading members...</p></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/clan/${clanTag}/members`);
        const data = await response.json();
        
        console.log('Members API response:', data);
        
        if (!response.ok) throw new Error(data.message || 'Failed to fetch members');
        
        const membersHtml = createMembersList(data.members);
        targetElement.innerHTML = membersHtml;
        console.log('Members loaded successfully');
    } catch (error) {
        console.error('Error loading members:', error);
        targetElement.innerHTML = `<div class="error">Failed to load members: ${error.message}</div>`;
    }
}

// Create members list
function createMembersList(members) {
    if (!members || members.length === 0) {
        return '<div class="error">No members found</div>';
    }
    
    const memberItems = members.map(member => `
        <div class="member-item">
            <div>
                <strong>${member.name}</strong><br>
                <span class="tag">${member.tag}</span>
            </div>
            <span class="member-role role-${member.role.toLowerCase()}">${member.role}</span>
            <div>TH${member.townHallLevel || 'N/A'}</div>
            <div>${formatNumber(member.donations || 0)}</div>
            <div>${formatNumber(member.donationsReceived || 0)}</div>
        </div>
    `).join('');
    
    return `
        <div class="member-list">
            <div class="member-item member-header">
                <div>Player Name</div>
                <div>Role</div>
                <div>TH Level</div>
                <div>Donated</div>
                <div>Received</div>
            </div>
            ${memberItems}
        </div>
    `;
}

// Load war log
async function loadWarLog(clanTag, tabId) {
    const targetElement = document.getElementById(tabId);
    if (!targetElement) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/clan/${clanTag}/warlog`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        const warlogHtml = createWarLogList(data.items);
        targetElement.innerHTML = warlogHtml;
    } catch (error) {
        targetElement.innerHTML = `<div class="error">Failed to load war log: ${error.message}</div>`;
    }
}

// Create war log list with game-like design
function createWarLogList(wars) {
    if (!wars || wars.length === 0) {
        return '<div class="error">No war log available or clan has private war log</div>';
    }
    
    const warItems = wars.slice(0, 10).map(war => {
        const result = war.result || 'unknown';
        const resultClass = `war-result-${result}`;
        const resultIcon = result === 'win' ? '🏆' : result === 'lose' ? '💥' : '🤝';
        
        const clanStars = war.clan?.stars || 0;
        const opponentStars = war.opponent?.stars || 0;
        const maxStars = (war.teamSize || 0) * 3;
        
        const clanDestruction = Math.round(war.clan?.destructionPercentage || 0);
        const opponentDestruction = Math.round(war.opponent?.destructionPercentage || 0);
        
        return `
            <div class="war-card ${resultClass}">
                <div class="war-header">
                    <div class="war-result-badge ${resultClass}">
                        <span class="war-result-icon">${resultIcon}</span>
                        <span class="war-result-text">${result.toUpperCase()}</span>
                    </div>
                    <div class="war-date">
                        ${war.endTime ? new Date(war.endTime).toLocaleDateString() : 'In Progress'}
                    </div>
                </div>
                
                <div class="war-battle">
                    <div class="war-clan war-clan-us">
                        <div class="clan-name">Our Clan</div>
                        <div class="clan-stats">
                            <div class="stars-display">
                                ${generateStarsDisplay(clanStars, maxStars)}
                                <span class="star-count">${clanStars}/${maxStars}</span>
                            </div>
                            <div class="destruction-bar">
                                <div class="destruction-fill" style="width: ${clanDestruction}%"></div>
                                <span class="destruction-text">${clanDestruction}%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="war-vs">VS</div>
                    
                    <div class="war-clan war-clan-opponent">
                        <div class="clan-name">${war.opponent?.name || 'Unknown'}</div>
                        <div class="clan-stats">
                            <div class="stars-display">
                                ${generateStarsDisplay(opponentStars, maxStars)}
                                <span class="star-count">${opponentStars}/${maxStars}</span>
                            </div>
                            <div class="destruction-bar">
                                <div class="destruction-fill" style="width: ${opponentDestruction}%"></div>
                                <span class="destruction-text">${opponentDestruction}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="war-footer">
                    <span class="team-size">${war.teamSize || 0}v${war.teamSize || 0} War</span>
                </div>
            </div>
        `;
    }).join('');
    
    return `<div class="war-log-container">${warItems}</div>`;
}

// Generate stars display (⭐ for earned, ☆ for missed)
function generateStarsDisplay(stars, maxStars) {
    let display = '';
    for (let i = 0; i < maxStars && i < 15; i++) { // Limit to 15 stars for display
        if (i < stars) {
            display += '<span class="star-earned">⭐</span>';
        } else {
            display += '<span class="star-missed">☆</span>';
        }
    }
    return display;
}

// Load clan capital
async function loadClanCapital(clanTag, tabId) {
    const targetElement = document.getElementById(tabId);
    if (!targetElement) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/clan/${clanTag}/capitalraidseasons?limit=3`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        const capitalHtml = createCapitalInfo(data.items);
        targetElement.innerHTML = capitalHtml;
    } catch (error) {
        targetElement.innerHTML = `<div class="error">Failed to load clan capital: ${error.message}</div>`;
    }
}

// Create capital info
function createCapitalInfo(seasons) {
    if (!seasons || seasons.length === 0) {
        return '<div class="error">No clan capital data available</div>';
    }
    
    const latestSeason = seasons[0];
    const stats = `
        <div class="capital-stats">
            <div class="stat-item">
                <div class="stat-value">${formatNumber(latestSeason.capitalTotalLoot || 0)}</div>
                <div class="stat-label">Total Loot</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${latestSeason.raidsCompleted || 0}</div>
                <div class="stat-label">Raids Completed</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${latestSeason.totalAttacks || 0}</div>
                <div class="stat-label">Total Attacks</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${latestSeason.enemyDistrictsDestroyed || 0}</div>
                <div class="stat-label">Districts Destroyed</div>
            </div>
        </div>
    `;
    
    return `
        <div>
            <h4>Latest Raid Weekend Results</h4>
            ${stats}
            <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                Data from recent clan capital raid weekend
            </div>
        </div>
    `;
}

// Player card (enhanced)
function createPlayerCard(player) {
    return `
        <div class="player-card">
            <div class="player-header">
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <span class="tag">${player.tag}</span>
                </div>
            </div>
            
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.trophies || 0)}</div>
                    <div class="stat-label">Trophies</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.bestTrophies || 0)}</div>
                    <div class="stat-label">Best Trophies</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${player.expLevel || 1}</div>
                    <div class="stat-label">Experience Level</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.attackWins || 0)}</div>
                    <div class="stat-label">Attack Wins</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.defenseWins || 0)}</div>
                    <div class="stat-label">Defense Wins</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.townHallLevel || 1)}</div>
                    <div class="stat-label">Town Hall Level</div>
                </div>
            </div>
            
            ${player.clan ? `
                <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                    <strong>Clan:</strong> ${player.clan.name} (${player.clan.tag})<br>
                    <strong>Role:</strong> ${player.role || 'Member'}
                </div>
            ` : `
                <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                    <strong>Status:</strong> Not in a clan
                </div>
            `}
            
            ${player.league ? `
                <div style="margin-top: 1rem;">
                    <strong>League:</strong> ${player.league.name}
                </div>
            ` : ''}
        </div>
    `;
}

// Global variables for pagination
let currentSearchQuery = '';
let searchHistory = []; // Store pagination cursors
let isSearching = false;

// Clan search results (enhanced with pagination)
function createClanSearchResults(data, searchQuery = '') {
    if (!data.items || data.items.length === 0) {
        return '<div class="error">No clans found with that name.</div>';
    }
    
    const clanItems = data.items.map(clan => `
        <div class="clan-list-item" data-clan-tag="${clan.tag.substring(1)}">
            <h4>${clan.name}</h4>
            <div style="margin: 0.5rem 0;">
                <span class="tag">${clan.tag}</span>
            </div>
            <div>
                <strong>Level:</strong> ${clan.clanLevel || 1} | 
                <strong>Members:</strong> ${clan.members || 0}/50 | 
                <strong>Points:</strong> ${formatNumber(clan.clanPoints || 0)}
            </div>
            ${clan.location ? `<div style="margin-top: 0.5rem;"><strong>Location:</strong> ${clan.location.name}</div>` : ''}
        </div>
    `).join('');
    
    const paginationButtons = `
        <div class="pagination-controls">
            ${searchHistory.length > 0 ? `<button class="pagination-btn" data-action="previous">← Previous</button>` : ''}
            <span class="pagination-info">Showing ${data.items.length} clan(s) - Page ${searchHistory.length + 1}</span>
            ${data.paging && data.paging.cursors && data.paging.cursors.after ? `<button class="pagination-btn" data-action="next" data-after="${data.paging.cursors.after}">Next →</button>` : ''}
        </div>
    `;
    
    return `
        <div class="clan-list">
            ${clanItems}
        </div>
        ${paginationButtons}
    `;
}

// Main fetch function
async function fetchData(searchType, searchValue) {
    showLoading();
    
    try {
        let url;
        let cleanValue = searchValue.trim();
        
        if (searchType === 'clan' || searchType === 'player') {
            cleanValue = cleanValue.replace('#', '');
        }
        
        switch (searchType) {
            case 'clan':
                url = `${API_BASE_URL}/api/clan/${cleanValue}`;
                break;
            case 'clanSearch':
                currentSearchQuery = cleanValue;
                searchHistory = []; // Reset search history for new search
                url = `${API_BASE_URL}/api/clans/search?name=${encodeURIComponent(cleanValue)}`;
                break;
            default:
                throw new Error('Invalid search type');
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || `Failed to fetch ${searchType} data`);
        }
        
        let html;
        switch (searchType) {
            case 'clan':
                html = createClanCardWithTabs(data, cleanValue);
                break;
            case 'clanSearch':
                html = createClanSearchResults(data, currentSearchQuery);
                break;
        }
        
        showResults(html, searchType);
        
        // Show the appropriate close button after successful search
        if (searchType === 'clan' || searchType === 'clanSearch') {
            showCloseButton('clan');
        } else if (searchType === 'player') {
            showCloseButton('player');
        }
        
    } catch (error) {
        showError(error.message);
        // Still show close button even on error so user can clear
        if (searchType === 'clan' || searchType === 'clanSearch') {
            showCloseButton('clan');
        } else if (searchType === 'player') {
            showCloseButton('player');
        }
    }
}

// Fetch clan by tag (used when clicking on search results)
async function fetchClanByTag(clanTag) {
    await fetchData('clan', clanTag);
}

// Pagination functions for clan search
async function loadNextClans(afterCursor) {
    if (isSearching) return;
    isSearching = true;
    
    // Save current state to history before loading next
    searchHistory.push(afterCursor);
    
    showLoading();
    
    try {
        const url = `${API_BASE_URL}/api/clans/search?name=${encodeURIComponent(currentSearchQuery)}&after=${afterCursor}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch clan data');
        }
        
        const html = createClanSearchResults(data, currentSearchQuery);
        showResults(html);
        
    } catch (error) {
        showError(error.message);
        searchHistory.pop(); // Revert history on error
    } finally {
        isSearching = false;
    }
}

async function loadPreviousClans() {
    if (isSearching || searchHistory.length === 0) return;
    isSearching = true;
    
    // Remove the last cursor from history
    searchHistory.pop();
    
    showLoading();
    
    try {
        let url = `${API_BASE_URL}/api/clans/search?name=${encodeURIComponent(currentSearchQuery)}`;
        
        // If there's still history, use the last cursor
        if (searchHistory.length > 0) {
            url += `&after=${searchHistory[searchHistory.length - 1]}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch clan data');
        }
        
        const html = createClanSearchResults(data, currentSearchQuery);
        showResults(html);
        
    } catch (error) {
        showError(error.message);
        // Restore the cursor on error
        searchHistory.push(searchHistory.length > 0 ? searchHistory[searchHistory.length - 1] : '');
    } finally {
        isSearching = false;
    }
}

// Legend League Leaderboard functions
function toggleLeaderboard() {
    const section = document.getElementById('leaderboardSection');
    const collapsible = document.querySelector('.collapsible');
    
    section.classList.toggle('active');
    collapsible.classList.toggle('active');
}

async function loadLocations() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/locations`);
        const data = await response.json();
        
        if (response.ok && data.items) {
            const options = data.items.map(location => 
                `<option value="${location.id}">${location.name}</option>`
            ).join('');
            locationSelect.innerHTML = `<option value="global">Global</option>${options}`;
            
            // Refresh custom dropdown if it exists
            refreshCustomDropdown(locationSelect);
        }
    } catch (error) {
        console.error('Failed to load locations:', error);
    }
}

/*
=============================================================================
EVENTS LOADING FUNCTIONS - Load news and events from database
=============================================================================
*/

// LOAD EVENTS from the database
async function loadEvents() {
    const eventSlider = document.getElementById('eventSlider');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/events`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to load events');
        }
        
        if (data.events && data.events.length > 0) {
            const eventsHtml = createEventsHTML(data.events);
            eventSlider.innerHTML = eventsHtml;
            
            // Start countdown updates for real-time timers
            startCountdownUpdates();
            
            console.log(`Loaded ${data.events.length} events:`, {
                active: data.meta?.active || 0,
                upcoming: data.meta?.upcoming || 0,
                total: data.meta?.total || data.events.length
            });
        } else {
            eventSlider.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <h4>No events available</h4>
                    <p>Check back later for the latest Clash of Clans news and events!</p>
                </div>
            `;
            
            // Stop countdown updates if no events
            stopCountdownUpdates();
        }
        
    } catch (error) {
        console.error('Failed to load events:', error);
        eventSlider.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div class="error">Failed to load events: ${error.message}</div>
            </div>
        `;
    }
}

// EVENT IMAGE MAPPING - Maps event types to their corresponding images
function getEventImage(eventType, title = '') {
    const eventImages = {
        'cwl': 'assets/images/events/cwl-crystal.png',
        'clan_games': 'assets/images/events/clan-games.png',
        'gold_pass': 'assets/images/events/season-pass.png',
        'clan_capital': 'assets/images/events/clan-capital.png',
        'builder_base': 'assets/images/events/builder-base.png',
        'war': 'assets/images/events/clan-war.png',
        'seasonal': 'assets/images/events/seasonal.png',
        'general': 'assets/images/events/news-update.png'
    };
    
    // Special handling for CWL leagues
    if (eventType === 'cwl' && title.toLowerCase().includes('legend')) {
        return 'assets/images/events/cwl-legend.png';
    } else if (eventType === 'cwl' && title.toLowerCase().includes('titan')) {
        return 'assets/images/events/cwl-titan.png';
    } else if (eventType === 'cwl' && title.toLowerCase().includes('champion')) {
        return 'assets/images/events/cwl-champion.png';
    }
    
    return eventImages[eventType] || eventImages['general'];
}

// CREATE EVENTS HTML from enhanced event data with countdowns
function createEventsHTML(events) {
    return events.map(event => {
        // Get event image
        const eventImage = getEventImage(event.event_type, event.title);
        
        // Create status badge
        let statusBadge = '';
        if (event.status === 'upcoming') {
            statusBadge = '<span class="status-badge upcoming">Upcoming</span>';
        } else if (event.status === 'active') {
            statusBadge = '<span class="status-badge active">Live</span>';
        }
        
        // Create countdown timer
        let countdownDisplay = '';
        if (event.timeRemaining) {
            const { days, hours, minutes, type } = event.timeRemaining;
            let timeText = '';
            
            if (days > 0) {
                timeText = `${days}d ${hours}h ${minutes}m`;
            } else if (hours > 0) {
                timeText = `${hours}h ${minutes}m`;
            } else {
                timeText = `${minutes}m`;
            }
            
            const timerClass = type === 'starts_in' ? 'timer-upcoming' : 'timer-active';
            const timerLabel = type === 'starts_in' ? 'Starts in' : 'Ends in';
            
            countdownDisplay = `
                <div class="event-countdown ${timerClass}">
                    ${timerLabel}: <strong>${timeText}</strong>
                </div>
            `;
        }
        
        // Format regular dates as fallback
        let dateDisplay = '';
        if (!countdownDisplay && event.start_date && event.end_date) {
            const startDate = new Date(event.start_date).toLocaleDateString();
            const endDate = new Date(event.end_date).toLocaleDateString();
            dateDisplay = `<div class="event-date">${startDate} - ${endDate}</div>`;
        } else if (!countdownDisplay) {
            if (event.event_type === 'seasonal') {
                dateDisplay = '<div class="event-date">Seasonal Event</div>';
            } else if (event.event_type === 'war') {
                dateDisplay = '<div class="event-date">Ongoing</div>';
            } else {
                dateDisplay = '<div class="event-date">Active</div>';
            }
        }
        
        // Source indicator
        const sourceIndicator = event.source === 'coc_api' ? 
            '<span class="source-badge">Live Data</span>' : 
            event.source === 'blog_scrape' ? 
            '<span class="source-badge">Official News</span>' : 
            event.source === 'generated' ?
            '<span class="source-badge">Generated</span>' : 
            '';
        
        return `
            <div class="event-card ${event.status || 'active'}" data-event-id="${event.id || ''}">
                <div class="event-image">
                    <img src="${eventImage}" alt="${event.title}" onerror="this.src='assets/images/events/news-update.png'">
                </div>
                <div class="event-content">
                    <div class="event-header">
                        <h4>${event.emoji ? event.emoji + ' ' : ''}${event.title}</h4>
                        <div class="event-badges">
                            ${statusBadge}
                            ${sourceIndicator}
                        </div>
                    </div>
                    <div class="event-meta">
                        ${countdownDisplay} ${dateDisplay}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update countdown timers in real-time
function updateCountdowns() {
    const eventCards = document.querySelectorAll('.event-card[data-event-id]');
    
    eventCards.forEach(card => {
        const countdown = card.querySelector('.event-countdown');
        if (!countdown) return;
        
        // Extract timer info from the countdown element
        const isUpcoming = countdown.classList.contains('timer-upcoming');
        const timerText = countdown.querySelector('strong');
        if (!timerText) return;
        
        // Get the current time text and parse it
        const currentText = timerText.textContent;
        const timeMatch = currentText.match(/(\d+)d\s*(\d+)h\s*(\d+)m|(\d+)h\s*(\d+)m|(\d+)m/);
        
        if (timeMatch) {
            let totalMinutes = 0;
            
            if (timeMatch[1]) {
                // Format: XdYhZm
                totalMinutes = parseInt(timeMatch[1]) * 24 * 60 + parseInt(timeMatch[2]) * 60 + parseInt(timeMatch[3]);
            } else if (timeMatch[4]) {
                // Format: XhYm
                totalMinutes = parseInt(timeMatch[4]) * 60 + parseInt(timeMatch[5]);
            } else if (timeMatch[6]) {
                // Format: Xm
                totalMinutes = parseInt(timeMatch[6]);
            }
            
            // Decrease by 1 minute
            totalMinutes = Math.max(0, totalMinutes - 1);
            
            // Convert back to display format
            const days = Math.floor(totalMinutes / (24 * 60));
            const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
            const minutes = totalMinutes % 60;
            
            let newTimeText = '';
            if (days > 0) {
                newTimeText = `${days}d ${hours}h ${minutes}m`;
            } else if (hours > 0) {
                newTimeText = `${hours}h ${minutes}m`;
            } else {
                newTimeText = `${minutes}m`;
            }
            
            timerText.textContent = newTimeText;
            
            // If timer reached zero, refresh events
            if (totalMinutes === 0) {
                console.log('Event timer expired, refreshing events...');
                loadEvents();
                return;
            }
        }
    });
}

// Start countdown timer updates
let countdownInterval = null;

function startCountdownUpdates() {
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Update every minute
    countdownInterval = setInterval(updateCountdowns, 60000);
}

// Stop countdown updates
function stopCountdownUpdates() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

async function loadLeaderboard() {
    const locationId = locationSelect.value;
    const content = document.getElementById('leaderboardContent');
    
    content.innerHTML = '<div style="text-align: center; padding: 2rem;"><div class="spinner"></div><p>Loading leaderboard...</p></div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/leagues/legend?locationId=${locationId}&limit=50`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        const leaderboardHtml = createLeaderboard(data.items);
        content.innerHTML = leaderboardHtml;
        
        // Show close button after loading leaderboard
        showCloseButton('leaderboard');
        
    } catch (error) {
        content.innerHTML = `<div class="error">Failed to load leaderboard: ${error.message}</div>`;
        // Show close button even on error
        showCloseButton('leaderboard');
    }
}

// Event image mapping system
const eventImages = {
    // Main Events
    'clan_games': 'assets/images/events/Clan_Games.png',
    'clan_capital': 'assets/images/events/Clan_Capital.png',
    'cwl': 'assets/images/events/CWL_Gold_2.png', // Default CWL image
    'gold_pass': 'assets/images/events/Gold_Pass.png',
    'silver_pass': 'assets/images/events/Silver_Pass.png',
    'builder_base': 'assets/images/events/Goblin_Builder.png',
    'builder_event': 'assets/images/events/Goblin_Builder_BG.png',
    
    // CWL League specific images
    'cwl_bronze': 'assets/images/events/CWL_Bronze_2.png',
    'cwl_silver': 'assets/images/events/CWL_Silver_2.png', 
    'cwl_gold': 'assets/images/events/CWL_Gold_2.png',
    'cwl_crystal': 'assets/images/events/CWL_Crystal_2.png',
    'cwl_master': 'assets/images/events/CWL_Master_2.png',
    'cwl_champion': 'assets/images/events/CWL_Champion_2.png',
    
    // Default fallback
    'default': 'assets/images/events/Clan_Games.png'
};

// Get event image based on event type and additional context
function getEventImage(eventType, eventTitle = '', description = '') {
    const type = eventType.toLowerCase();
    const title = eventTitle.toLowerCase();
    const desc = description.toLowerCase();
    
    // CWL with league detection
    if (type.includes('cwl') || title.includes('clan war league')) {
        if (title.includes('champion') || desc.includes('champion')) return eventImages.cwl_champion;
        if (title.includes('master') || desc.includes('master')) return eventImages.cwl_master;
        if (title.includes('crystal') || desc.includes('crystal')) return eventImages.cwl_crystal;
        if (title.includes('gold') || desc.includes('gold')) return eventImages.cwl_gold;
        if (title.includes('silver') || desc.includes('silver')) return eventImages.cwl_silver;
        if (title.includes('bronze') || desc.includes('bronze')) return eventImages.cwl_bronze;
        return eventImages.cwl; // Default CWL
    }
    
    // Clan Games
    if (type.includes('clan') && (type.includes('game') || title.includes('clan game'))) {
        return eventImages.clan_games;
    }
    
    // Clan Capital
    if (type.includes('capital') || title.includes('capital') || title.includes('raid')) {
        return eventImages.clan_capital;
    }
    
    // Season Pass
    if (title.includes('gold pass') || desc.includes('gold pass')) {
        return eventImages.gold_pass;
    }
    if (title.includes('silver pass') || desc.includes('silver pass')) {
        return eventImages.silver_pass;
    }
    
    // Builder Base
    if (type.includes('builder') || title.includes('builder') || title.includes('goblin')) {
        return desc.includes('background') ? eventImages.builder_event : eventImages.builder_base;
    }
    
    // Event type mapping
    if (eventImages[type]) {
        return eventImages[type];
    }
    
    return eventImages.default;
}

// League trophy mapping
const leagueTrophies = {
    'Champion League': 'assets/images/icons/league trophies/Icon_HV_League_Champion.png',
    'Titan League I': 'assets/images/icons/league trophies/Icon_HV_League_Titan_1.png', 
    'Titan League II': 'assets/images/icons/league trophies/Icon_HV_League_Titan_2.png',
    'Legend League': 'assets/images/icons/league trophies/Icon_HV_League_Legend_4.png',
    'Master League I': 'assets/images/icons/league trophies/Icon_HV_League_Master_1.png',
    'Master League II': 'assets/images/icons/league trophies/Icon_HV_League_Master_2.png',
    'Crystal League I': 'assets/images/icons/league trophies/Icon_HV_League_Crystal_1.png',
    'Crystal League II': 'assets/images/icons/league trophies/Icon_HV_League_Crystal_2.png',
    'Gold League II': 'assets/images/icons/league trophies/Icon_HV_League_Gold_2.png',
    'Silver League II': 'assets/images/icons/league trophies/Icon_HV_League_Silver_2.png'
};

// Get league trophy based on trophies count or league name
function getLeagueTrophy(player) {
    // If player has league info, use that
    if (player.league && player.league.name) {
        const trophyPath = leagueTrophies[player.league.name];
        if (trophyPath) {
            return `<img src="${trophyPath}" alt="${player.league.name}" class="league-trophy" title="${player.league.name}">`;
        }
    }
    
    // Fallback: determine league by trophy count
    const trophies = player.trophies || 0;
    let leagueName = '';
    
    if (trophies >= 5000) {
        leagueName = 'Legend League';
    } else if (trophies >= 4600) {
        leagueName = 'Titan League I';
    } else if (trophies >= 4400) {
        leagueName = 'Titan League II';
    } else if (trophies >= 4200) {
        leagueName = 'Champion League';
    } else if (trophies >= 3200) {
        leagueName = 'Master League I';
    } else if (trophies >= 2800) {
        leagueName = 'Master League II';
    } else if (trophies >= 2400) {
        leagueName = 'Crystal League I';
    } else if (trophies >= 2000) {
        leagueName = 'Crystal League II';
    } else if (trophies >= 1600) {
        leagueName = 'Gold League II';
    } else {
        leagueName = 'Silver League II';
    }
    
    const trophyPath = leagueTrophies[leagueName];
    return `<img src="${trophyPath}" alt="${leagueName}" class="league-trophy" title="${leagueName}">`;
}

function createLeaderboard(players) {
    if (!players || players.length === 0) {
        return '<div class="error">No leaderboard data available</div>';
    }
    
    const playerItems = players.map((player, index) => {
        const trophyImage = getLeagueTrophy(player);
        
        return `
            <div class="leaderboard-item">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span class="leaderboard-rank">#${index + 1}</span>
                    ${trophyImage}
                    <div>
                        <strong>${player.name}</strong><br>
                        <span class="tag">${player.tag}</span>
                        ${player.clan ? `<div style="font-size: 0.8rem; color: var(--text-secondary);">${player.clan.name}</div>` : ''}
                    </div>
                </div>
                <div style="text-align: right;">
                    <strong>${formatNumber(player.trophies)}</strong><br>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">trophies</span>
                </div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="legend-leaderboard">
            ${playerItems}
        </div>
    `;
}

/*
=============================================================================
NEW PLAYER SEARCH FUNCTIONS
=============================================================================
*/

// Player search functionality
async function searchPlayer() {
    const playerTag = document.getElementById('playerTagInput').value.trim();
    if (!playerTag) {
        showError('Please enter a player tag');
        return;
    }
    
    const cleanTag = playerTag.replace('#', '');
    const quickInfoDiv = document.getElementById('playerQuickInfo');
    
    // Show loading state
    quickInfoDiv.innerHTML = '<div style="text-align: center; padding: 1rem;"><div class="spinner"></div><p>Loading player...</p></div>';
    quickInfoDiv.classList.add('show');
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/player/${cleanTag}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message || 'Failed to fetch player');
        
        const playerHtml = createPlayerQuickInfo(data);
        quickInfoDiv.innerHTML = playerHtml;
        
        // Show close button after successful player search
        showCloseButton('player');
        
    } catch (error) {
        quickInfoDiv.innerHTML = `<div class="error">Failed to load player: ${error.message}</div>`;
        // Show close button even on error so user can clear
        showCloseButton('player');
    }
}

// Handle Enter key in player search
function handlePlayerSearchKeypress(event) {
    if (event.key === 'Enter') {
        searchPlayer();
    }
}

// Create quick player info display
function createPlayerQuickInfo(player) {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
                <h4>${player.name}</h4>
                <span class="tag">${player.tag}</span>
            </div>
            <button onclick="showFullPlayerInfo('${player.tag.substring(1)}')" 
                    style="background: var(--primary-purple); color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                🔍 Full Details
            </button>
        </div>
        <div class="stats">
            <div class="stat-item">
                <div class="stat-value">${formatNumber(player.trophies || 0)}</div>
                <div class="stat-label">Trophies</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${player.townHallLevel || 1}</div>
                <div class="stat-label">Town Hall</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${player.expLevel || 1}</div>
                <div class="stat-label">XP Level</div>
            </div>
            ${player.clan ? `<div class="stat-item">
                <div class="stat-value">${player.clan.name}</div>
                <div class="stat-label">Clan</div>
            </div>` : ''}
        </div>
        ${player.league ? `
            <div style="margin-top: 1rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 6px; border: 1px solid var(--border-color);">
                <strong>League:</strong> ${player.league.name}
            </div>
        ` : ''}
    `;
}

// Create detailed player card for full display
function createDetailedPlayerCard(player) {
    return `
        <div class="player-card">
            <div class="player-header">
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <span class="tag">${player.tag}</span>
                    ${player.clan ? `<p class="player-clan">Member of ${player.clan.name} (${player.clan.tag})</p>` : '<p class="player-clan">Not in a clan</p>'}
                </div>
            </div>
            
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.trophies || 0)}</div>
                    <div class="stat-label">Current Trophies</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.bestTrophies || 0)}</div>
                    <div class="stat-label">Best Trophies</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${player.townHallLevel || 1}</div>
                    <div class="stat-label">Town Hall Level</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${player.expLevel || 1}</div>
                    <div class="stat-label">Experience Level</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.donations || 0)}</div>
                    <div class="stat-label">Donations</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(player.donationsReceived || 0)}</div>
                    <div class="stat-label">Received</div>
                </div>
                ${player.warStars ? `<div class="stat-item">
                    <div class="stat-value">${formatNumber(player.warStars)}</div>
                    <div class="stat-label">War Stars</div>
                </div>` : ''}
                ${player.attackWins ? `<div class="stat-item">
                    <div class="stat-value">${formatNumber(player.attackWins)}</div>
                    <div class="stat-label">Attack Wins</div>
                </div>` : ''}
                ${player.defenseWins ? `<div class="stat-item">
                    <div class="stat-value">${formatNumber(player.defenseWins)}</div>
                    <div class="stat-label">Defense Wins</div>
                </div>` : ''}
            </div>
            
            ${player.league ? `
                <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">League Information</h4>
                    <p style="margin: 0;"><strong>League:</strong> ${player.league.name}</p>
                    ${player.league.iconUrls ? `<img src="${player.league.iconUrls.small}" alt="League" style="width: 32px; height: 32px; margin-top: 0.5rem;">` : ''}
                </div>
            ` : ''}
            
            ${player.clan ? `
                <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; border: 1px solid var(--border-color);">
                    <h4 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Clan Information</h4>
                    <p style="margin: 0;"><strong>Clan:</strong> ${player.clan.name} (${player.clan.tag})</p>
                    <p style="margin: 0.25rem 0 0 0;"><strong>Role:</strong> ${player.role || 'Member'}</p>
                    ${player.clan.badgeUrls ? `<img src="${player.clan.badgeUrls.small}" alt="Clan Badge" style="width: 32px; height: 32px; margin-top: 0.5rem;">` : ''}
                </div>
            ` : ''}
        </div>
    `;
}

// Show full player info in results
async function showFullPlayerInfo(playerTag) {
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/player/${playerTag}`);
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message || 'Failed to fetch player');
        
        // Create detailed player card
        const playerHtml = createDetailedPlayerCard(data);
        showResults(playerHtml, 'player');
        
    } catch (error) {
        showError(`Failed to load player details: ${error.message}`);
    }
}

/*
=============================================================================
CLOSE BUTTON FUNCTIONS
=============================================================================
*/

/*
=============================================================================
CLEAR/CANCEL SEARCH FUNCTIONS - Clear results and reset forms
=============================================================================
*/

// Clear clan search results
function clearClanResults() {
    const clanResults = document.getElementById('clanResults');
    if (clanResults) {
        clanResults.innerHTML = '';
        clanResults.classList.remove('show');
        clanResults.style.display = 'none'; // Force hide
    }
}

// Clear player search results
function clearPlayerResults() {
    const playerResults = document.getElementById('playerResults');
    if (playerResults) {
        playerResults.innerHTML = '';
        playerResults.classList.remove('show');
        playerResults.style.display = 'none'; // Force hide
    }
    
    // Also clear quick info if shown
    const playerQuickInfo = document.getElementById('playerQuickInfo');
    if (playerQuickInfo) {
        playerQuickInfo.innerHTML = '';
        playerQuickInfo.classList.remove('show');
        playerQuickInfo.style.display = 'none'; // Force hide
    }
}

// CLEAR CLAN SEARCH - Reset form and clear results
function closeClanSearch() {
    // Clear the search form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.reset();
    }
    
    // Clear clan search results using the new function
    clearClanResults();
    
    // Hide error messages
    const errorDiv = document.getElementById('error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    
    // Reset pagination state
    currentSearchQuery = '';
    searchHistory = [];
    
    // Hide the close button
    hideCloseButton('clan');
    
    console.log('Clan search cleared');
}

// CLEAR PLAYER SEARCH - Reset form and clear results
function closePlayerSearch() {
    // Clear the player search input
    const playerInput = document.getElementById('playerTagInput');
    if (playerInput) {
        playerInput.value = '';
    }
    
    // Clear player search results using the new function
    clearPlayerResults();
    
    // Hide the close button
    hideCloseButton('player');
    
    console.log('Player search cleared');
}

/*
=============================================================================
COLLAPSIBLE SECTIONS & CLOSE BUTTON MANAGEMENT
=============================================================================
*/

// TOGGLE SECTION VISIBILITY (for mobile collapsible sections)
function toggleSection(sectionName) {
    // Only work on mobile screens
    if (window.innerWidth > 768) return;
    
    const content = document.getElementById(sectionName + 'Content');
    const arrow = document.getElementById(sectionName + 'Arrow');
    
    if (content && arrow) {
        content.classList.toggle('collapsed');
        content.classList.toggle('expanded');
        arrow.classList.toggle('rotated');
    }
}

// SHOW CLOSE BUTTON when user performs a search
function showCloseButton(sectionType) {
    let closeButton;
    
    if (sectionType === 'clan') {
        closeButton = document.querySelector('.search-section .section-close');
    } else if (sectionType === 'player') {
        closeButton = document.querySelector('.player-search-section .section-close');
    } else if (sectionType === 'leaderboard') {
        closeButton = document.querySelector('#leaderboardSection .section-close');
    }
    
    if (closeButton) {
        closeButton.classList.remove('hidden');
        closeButton.classList.add('visible');
    }
}

// HIDE CLOSE BUTTON when search is cleared
function hideCloseButton(sectionType) {
    let closeButton;
    
    if (sectionType === 'clan') {
        closeButton = document.querySelector('.search-section .section-close');
    } else if (sectionType === 'player') {
        closeButton = document.querySelector('.player-search-section .section-close');
    } else if (sectionType === 'leaderboard') {
        closeButton = document.querySelector('#leaderboardSection .section-close');
    }
    
    if (closeButton) {
        closeButton.classList.remove('visible');
        closeButton.classList.add('hidden');
    }
}

// CLEAR LEADERBOARD - Clear results and close section
function closeLeaderboard() {
    // Clear leaderboard content
    const leaderboardContent = document.getElementById('leaderboardContent');
    if (leaderboardContent) {
        leaderboardContent.innerHTML = '';
    }
    
    // Reset location selector to default
    const locationSelect = document.getElementById('locationSelect');
    if (locationSelect) {
        locationSelect.value = 'global';
    }
    
    // Close the leaderboard section
    const section = document.getElementById('leaderboardSection');
    const collapsible = document.querySelector('.collapsible');
    if (section) {
        section.classList.remove('active');
    }
    if (collapsible) {
        collapsible.classList.remove('active');
    }
    
    // Hide the close button
    hideCloseButton('leaderboard');
    
    console.log('Leaderboard cleared and closed');
}

/*
=============================================================================
OVERLAY FUNCTIONS (for modals)
=============================================================================
*/

// Close all popups
function closeAllPopups() {
    // Close any open modals by clicking on overlay
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Initialize with welcome message
setTimeout(() => {
    if (resultsDiv.innerHTML === '') {
        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <h3>🚀 Welcome to CoC Pro Dashboard!</h3>
                <p>Your advanced Clash of Clans analytics platform</p>
                <br>
                <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                    <p><strong>🔍 Search Features:</strong></p>
                    <ul style="margin: 1rem 0;">
                        <li><strong>Clan Analysis:</strong> View members, war log, and clan capital stats</li>
                        <li><strong>Player Lookup:</strong> Get detailed player statistics</li>
                        <li><strong>Clan Discovery:</strong> Search clans by name</li>
                        <li><strong>Legend Leaderboard:</strong> View top players globally or by location</li>
                    </ul>
                    
                    <p><strong>💡 Pro Tips:</strong></p>
                    <ul style="margin: 1rem 0;">
                        <li>Use clan tag <code>#j8j280yc</code> to explore your clan</li>
                        <li>Try player tag <code>#p2jlrlo2y</code> for player lookup</li>
                        <li>Try searching for "reddit" to find Reddit clans</li>
                        <li>Check out the Legend League leaderboard for top players</li>
                        <li>Click 📊 Quick Stats buttons for instant info</li>
                    </ul>
                </div>
                <br>
                <p style="font-size: 0.9rem; color: #999;">
                    Register or login to unlock additional features!
                </p>
            </div>
        `;
    }
}, 500);

/*
=============================================================================
PLAYER PROFILE FUNCTIONS - Profile management and advanced player features
=============================================================================
*/

// Current active profile data
let currentPlayerProfile = null;
let linkedPlayers = [];

// TOGGLE PLAYER PROFILE SECTION visibility
function togglePlayerProfile() {
    const profileSection = document.getElementById('playerProfileSection');
    if (!profileSection) return;
    
    const isVisible = profileSection.style.display !== 'none';
    
    if (isVisible) {
        closePlayerProfile();
    } else {
        profileSection.style.display = 'block';
        loadLinkedPlayers(); // Load user's linked accounts
    }
}

// CLOSE PLAYER PROFILE SECTION
function closePlayerProfile() {
    const profileSection = document.getElementById('playerProfileSection');
    if (profileSection) {
        profileSection.style.display = 'none';
    }
    
    // Reset to link tab
    showProfileTab('link');
}


// CLOSE PLAYER PROFILE SECTION
function closePlayerProfile() {
    const profileSection = document.getElementById('playerProfileSection');
    if (profileSection) {
        profileSection.style.display = 'none';
    }
    
    // Reset to link tab
    showProfileTab('link');
}

// SHOW SPECIFIC PROFILE TAB
function showProfileTab(tabName) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.profile-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update content visibility
    const contents = document.querySelectorAll('.profile-content');
    contents.forEach(content => content.style.display = 'none');
    
    const activeContent = document.getElementById(tabName + 'Content');
    if (activeContent) {
        activeContent.style.display = 'block';
    }
}

// SHOW SECURITY METHOD (switch between token and tag methods)
function showSecurityMethod(method) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.security-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = document.querySelector(`[onclick="showSecurityMethod('${method}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update method visibility
    const tokenMethod = document.getElementById('tokenMethod');
    const tagMethod = document.getElementById('tagMethod');
    
    if (method === 'token') {
        if (tokenMethod) tokenMethod.style.display = 'block';
        if (tagMethod) tagMethod.style.display = 'none';
    } else {
        if (tokenMethod) tokenMethod.style.display = 'none';
        if (tagMethod) tagMethod.style.display = 'block';
    }
}

// HANDLE ENTER KEY in token input
function handleTokenKeypress(event) {
    if (event.key === 'Enter') {
        verifyWithToken();
    }
}

// HANDLE ENTER KEY in link player input
function handleLinkPlayerKeypress(event) {
    if (event.key === 'Enter') {
        linkPlayerAccount();
    }
}

// VERIFY WITH API TOKEN (Most Secure Method)
async function verifyWithToken() {
    const tokenInput = document.getElementById('apiTokenInput');
    const tokenButton = document.getElementById('tokenButton');
    
    if (!tokenInput || !authToken) {
        showError('Please log in to link player accounts');
        return;
    }
    
    const playerToken = tokenInput.value.trim();
    if (!playerToken) {
        showError('Please enter your CoC API token');
        return;
    }
    
    // Show loading state
    tokenButton.textContent = '🔄 Verifying Token...';
    tokenButton.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/verify-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ playerToken })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess(`✅ ${data.message} Account: ${data.linkedPlayer.playerName}`);
            tokenInput.value = '';
            loadLinkedPlayers(); // Refresh the list
            
            // Show success details
            setTimeout(() => {
                showSuccess(`🔒 Verification Method: ${data.method} | Security Level: ${data.security}`);
            }, 2000);
        } else {
            showError(data.error || 'Token verification failed');
            if (data.help) {
                setTimeout(() => showError(data.help), 3000);
            }
        }
    } catch (error) {
        showError('Network error during token verification');
    } finally {
        tokenButton.textContent = '🔒 Verify & Link Account';
        tokenButton.disabled = false;
    }
}

// LINK PLAYER ACCOUNT to current user
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
    
    // Show loading state
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
            loadLinkedPlayers(); // Refresh the list
        } else {
            showError(data.error || 'Failed to link player account');
        }
    } catch (error) {
        showError('Network error while linking player account');
    } finally {
        linkButton.textContent = '🔗 Link Account';
        linkButton.disabled = false;
    }
}

// LOAD USER'S LINKED PLAYERS
async function loadLinkedPlayers() {
    if (!authToken) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/linked-players`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            linkedPlayers = data.linkedPlayers || [];
            displayLinkedPlayers();
            
            // Enable other tabs if player is linked
            const hasPrimary = linkedPlayers.some(player => player.is_primary);
            enableProfileTabs(linkedPlayers.length > 0);
            
            // Auto-load primary player profile if exists
            if (hasPrimary) {
                const primaryPlayer = linkedPlayers.find(player => player.is_primary);
                if (primaryPlayer) {
                    loadPlayerProfile(primaryPlayer.player_tag);
                }
            }
        }
    } catch (error) {
        console.error('Failed to load linked players:', error);
    }
}

// DISPLAY LINKED PLAYERS LIST
function displayLinkedPlayers() {
    const linkedPlayersList = document.getElementById('linkedPlayersList');
    if (!linkedPlayersList) return;
    
    if (linkedPlayers.length === 0) {
        linkedPlayersList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <p>No player accounts linked yet</p>
                <p style="font-size: 0.9rem;">Link your first account above to get started!</p>
            </div>
        `;
        return;
    }
    
    linkedPlayersList.innerHTML = linkedPlayers.map(player => `
        <div class="linked-player-card">
            <div class="linked-player-info">
                ${player.is_primary ? '<span class="primary-badge">PRIMARY</span>' : ''}
                <div>
                    <div class="player-name">${player.player_name || 'Unknown Player'}</div>
                    <div class="player-tag">${player.player_tag}</div>
                </div>
            </div>
            <div class="linked-player-actions">
                ${!player.is_primary ? `<button class="set-primary-btn" onclick="setPrimaryPlayer(${player.id})">Set Primary</button>` : ''}
                <button class="view-profile-btn" onclick="loadPlayerProfile('${player.player_tag}')">View Profile</button>
                <button class="unlink-btn" onclick="unlinkPlayer(${player.id})">Unlink</button>
            </div>
        </div>
    `).join('');
}

// ENABLE/DISABLE PROFILE TABS based on whether user has linked players
function enableProfileTabs(hasLinkedPlayers) {
    const tabs = ['overviewTab', 'upgradesTab', 'warTab', 'activityTab'];
    tabs.forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.disabled = !hasLinkedPlayers;
        }
    });
}

// SET PRIMARY PLAYER
async function setPrimaryPlayer(linkId) {
    if (!authToken) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/set-primary/${linkId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('Primary player updated successfully!');
            loadLinkedPlayers(); // Refresh the list
        } else {
            showError(data.error || 'Failed to set primary player');
        }
    } catch (error) {
        showError('Network error while setting primary player');
    }
}

// UNLINK PLAYER
async function unlinkPlayer(linkId) {
    if (!authToken) return;
    
    if (!confirm('Are you sure you want to unlink this player account?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/unlink-player/${linkId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccess('Player account unlinked successfully!');
            loadLinkedPlayers(); // Refresh the list
        } else {
            showError(data.error || 'Failed to unlink player');
        }
    } catch (error) {
        showError('Network error while unlinking player');
    }
}

// LOAD DETAILED PLAYER PROFILE
async function loadPlayerProfile(playerTag) {
    if (!authToken) {
        showError('Please log in to view player profiles');
        return;
    }
    
    showLoading();
    
    try {
        const cleanTag = playerTag.replace('#', '');
        const response = await fetch(`${API_BASE_URL}/api/profile/player/${encodeURIComponent('#' + cleanTag)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentPlayerProfile = data;
            displayPlayerProfile(data);
            showProfileTab('overview'); // Switch to overview tab
        } else {
            showError(data.error || 'Failed to load player profile');
        }
    } catch (error) {
        showError('Network error while loading player profile');
    } finally {
        hideLoading();
    }
}

// DISPLAY PLAYER PROFILE in overview tab
function displayPlayerProfile(profileData) {
    displayPlayerOverview(profileData);
    displayPlayerUpgrades(profileData);
    displayPlayerWarStatus(profileData);
    displayPlayerActivity(profileData);
}

// DISPLAY PLAYER OVERVIEW
function displayPlayerOverview(profileData) {
    const overviewData = document.getElementById('playerOverviewData');
    if (!overviewData || !profileData.player) return;
    
    const player = profileData.player;
    const clan = profileData.clan;
    
    overviewData.innerHTML = `
        <div class="player-overview-card">
            <div class="player-basic-info">
                <div class="town-hall">TH${player.townHallLevel}</div>
                <div>
                    <h3>${player.name}</h3>
                    <p style="color: #666; font-family: monospace;">${player.tag}</p>
                    ${clan ? `<p style="color: #888;">🏰 ${clan.name}</p>` : '<p style="color: #888;">No Clan</p>'}
                </div>
            </div>
            
            <div class="player-stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Trophies</div>
                    <div class="stat-value">🏆 ${player.trophies || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Best Trophies</div>
                    <div class="stat-value">⭐ ${player.bestTrophies || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">War Stars</div>
                    <div class="stat-value">⭐ ${player.warStars || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Attack Wins</div>
                    <div class="stat-value">⚔️ ${player.attackWins || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Defense Wins</div>
                    <div class="stat-value">🛡️ ${player.defenseWins || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Donations</div>
                    <div class="stat-value">🎁 ${player.donations || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Received</div>
                    <div class="stat-value">📨 ${player.donationsReceived || 0}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Donation Ratio</div>
                    <div class="stat-value">${profileData.insights.activityStatus.donationRatio}</div>
                </div>
            </div>
            
            ${clan ? `
                <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-card); border-radius: 8px;">
                    <h4>🏰 Clan Information</h4>
                    <p><strong>Name:</strong> ${clan.name}</p>
                    <p><strong>Level:</strong> ${clan.clanLevel || 'N/A'}</p>
                    <p><strong>Members:</strong> ${clan.members || 'N/A'}/50</p>
                    <p><strong>Type:</strong> ${clan.type || 'N/A'}</p>
                    ${clan.warWins ? `<p><strong>War Wins:</strong> ${clan.warWins}</p>` : ''}
                </div>
            ` : ''}
        </div>
    `;
}

// DISPLAY PLAYER UPGRADES
function displayPlayerUpgrades(profileData) {
    const upgradesData = document.getElementById('playerUpgradesData');
    if (!upgradesData || !profileData.insights) return;
    
    const upgrades = profileData.insights.currentUpgrades;
    
    upgradesData.innerHTML = `
        <div class="upgrades-grid">
            <div class="upgrade-category">
                <h5>🏰 Buildings & Heroes</h5>
                ${upgrades.buildings && upgrades.buildings.length > 0 ? 
                    upgrades.buildings.map(item => `
                        <div class="upgrade-item">
                            <span class="upgrade-name">${item.name || 'Unknown'}</span>
                            <span class="upgrade-time">${formatUpgradeTime(item.upgradeTime)}</span>
                        </div>
                    `).join('') : 
                    '<p style="color: #666; text-align: center; padding: 1rem;">No buildings currently upgrading</p>'
                }
            </div>
            
            <div class="upgrade-category">
                <h5>⚔️ Troops</h5>
                ${upgrades.heroes && upgrades.heroes.length > 0 ? 
                    upgrades.heroes.map(item => `
                        <div class="upgrade-item">
                            <span class="upgrade-name">${item.name || 'Unknown'}</span>
                            <span class="upgrade-time">${formatUpgradeTime(item.upgradeTime)}</span>
                        </div>
                    `).join('') : 
                    '<p style="color: #666; text-align: center; padding: 1rem;">No troops currently upgrading</p>'
                }
            </div>
            
            <div class="upgrade-category">
                <h5>✨ Spells</h5>
                ${upgrades.spells && upgrades.spells.length > 0 ? 
                    upgrades.spells.map(item => `
                        <div class="upgrade-item">
                            <span class="upgrade-name">${item.name || 'Unknown'}</span>
                            <span class="upgrade-time">${formatUpgradeTime(item.upgradeTime)}</span>
                        </div>
                    `).join('') : 
                    '<p style="color: #666; text-align: center; padding: 1rem;">No spells currently upgrading</p>'
                }
            </div>
        </div>
        
        <div class="upgrade-category" style="margin-top: 1rem;">
            <h5>🏛️ Raid Weekend Status</h5>
            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px;">
                <p><strong>Weekly Raid Medals:</strong> ${profileData.insights.raidStatus.weeklyRaidMedals}</p>
                <p><strong>Participation Status:</strong> 
                    <span class="activity-status ${profileData.insights.raidStatus.hasParticipated ? 'active' : 'inactive'}">
                        ${profileData.insights.raidStatus.hasParticipated ? 'Participated' : 'Not Participated'}
                    </span>
                </p>
                ${!profileData.insights.raidStatus.hasParticipated ? 
                    '<p style="color: var(--warning-color); font-weight: 500;">⚠️ Remember to participate in Raid Weekend!</p>' : 
                    '<p style="color: var(--success-color); font-weight: 500;">✅ Great job participating in Raid Weekend!</p>'
                }
            </div>
        </div>
    `;
}

// DISPLAY PLAYER WAR STATUS
function displayPlayerWarStatus(profileData) {
    const warData = document.getElementById('playerWarData');
    if (!warData || !profileData.insights) return;
    
    const warStatus = profileData.insights.warStatus;
    
    if (!warStatus || !profileData.clan) {
        warData.innerHTML = `
            <div class="war-status-card">
                <h4>⚔️ War Status</h4>
                <p style="color: #666; text-align: center; padding: 2rem;">
                    ${!profileData.clan ? 'Player is not in a clan' : 'Clan is not currently in war'}
                </p>
            </div>
        `;
        return;
    }
    
    warData.innerHTML = `
        <div class="war-status-card">
            <h4>⚔️ Current War Status</h4>
            
            <div class="war-state ${warStatus.warState}">
                ${getWarStateDisplay(warStatus.warState)}
            </div>
            
            <div class="war-attacks-info">
                <div class="attack-stat">
                    <div class="number">${warStatus.attacksUsed}</div>
                    <div class="label">Attacks Used</div>
                </div>
                <div class="attack-stat">
                    <div class="number">${warStatus.attacksRemaining}</div>
                    <div class="label">Attacks Remaining</div>
                </div>
                <div class="attack-stat">
                    <div class="number">${warStatus.warStars || 0}</div>
                    <div class="label">Stars Earned</div>
                </div>
            </div>
            
            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <p><strong>Map Position:</strong> #${warStatus.mapPosition}</p>
                ${warStatus.attacksRemaining > 0 ? 
                    `<p style="color: var(--warning-color); font-weight: 500;">⚠️ You have ${warStatus.attacksRemaining} attack(s) remaining!</p>` : 
                    '<p style="color: var(--success-color); font-weight: 500;">✅ All attacks used!</p>'
                }
            </div>
        </div>
    `;
    
    // Load clan war members who haven't attacked
    loadClanWarStatus();
}

// DISPLAY PLAYER ACTIVITY
function displayPlayerActivity(profileData) {
    const activityData = document.getElementById('playerActivityData');
    if (!activityData || !profileData.insights) return;
    
    const activity = profileData.insights.activityStatus;
    
    activityData.innerHTML = `
        <div class="activity-card">
            <h4>📊 Activity Status</h4>
            
            <div class="activity-indicator">
                <span>Current Status:</span>
                <span class="activity-status ${activity.isActive ? 'active' : 'inactive'}">
                    ${activity.isActive ? '🟢 Active' : '🔴 Inactive'}
                </span>
            </div>
            
            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px;">
                <p><strong>Last Seen:</strong> ${activity.lastSeen ? formatLastSeen(activity.lastSeen) : 'Unknown'}</p>
                <p><strong>Donation Ratio:</strong> ${activity.donationRatio}</p>
                <p><strong>Activity Level:</strong> ${activity.isActive ? 'Player has been active within the last 7 days' : 'Player has been inactive for more than 7 days'}</p>
            </div>
        </div>
    `;
}

// LOAD CLAN WAR STATUS (who hasn't attacked)
async function loadClanWarStatus() {
    if (!authToken || !currentPlayerProfile) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/profile/clan-war-status`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok && data.membersWithoutAttacks) {
            displayClanWarMissing(data);
        }
    } catch (error) {
        console.log('Could not load clan war status:', error);
    }
}

// DISPLAY CLAN MEMBERS WHO HAVEN'T ATTACKED
function displayClanWarMissing(warData) {
    const warContent = document.getElementById('playerWarData');
    if (!warContent) return;
    
    const missingAttacksHTML = `
        <div class="war-status-card" style="margin-top: 1rem;">
            <h4>📊 Clan War Overview</h4>
            
            <div style="display: flex; gap: 2rem; margin-bottom: 1rem;">
                <div class="attack-stat">
                    <div class="number">${warData.membersNeedingAttacks}</div>
                    <div class="label">Members Need Attacks</div>
                </div>
                <div class="attack-stat">
                    <div class="number">${warData.totalMembers}</div>
                    <div class="label">Total War Members</div>
                </div>
            </div>
            
            ${warData.membersWithoutAttacks.length > 0 ? `
                <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px;">
                    <h5>⚠️ Members Who Haven't Attacked:</h5>
                    <div style="max-height: 200px; overflow-y: auto; margin-top: 0.5rem;">
                        ${warData.membersWithoutAttacks.map(member => `
                            <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--bg-secondary); margin-bottom: 0.25rem; border-radius: 4px;">
                                <span>${member.name}</span>
                                <span style="color: var(--warning-color);">${member.attacksRemaining} attacks left</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : `
                <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; color: var(--success-color); text-align: center;">
                    <p>🎉 All clan members have used their attacks!</p>
                </div>
            `}
        </div>
    `;
    
    warContent.innerHTML += missingAttacksHTML;
}

// UTILITY FUNCTIONS
function formatUpgradeTime(seconds) {
    if (!seconds || seconds <= 0) return 'Completed';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

function formatLastSeen(lastSeenDate) {
    if (!lastSeenDate) return 'Unknown';
    
    const now = new Date();
    const lastSeen = new Date(lastSeenDate);
    const diffMs = now - lastSeen;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
        return `${diffDays} days ago`;
    } else if (diffHours > 0) {
        return `${diffHours} hours ago`;
    } else {
        return 'Recently';
    }
}

function getWarStateDisplay(warState) {
    switch (warState) {
        case 'preparation': return '🛠️ Preparation Day';
        case 'inWar': return '⚔️ Battle Day';
        case 'warEnded': return '🏆 War Ended';
        default: return '❓ Unknown State';
    }
}

function showSuccess(message) {
    // Reuse the error div but with success styling
    const errorDiv = document.getElementById('error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.background = 'var(--success-color)';
        errorDiv.style.color = 'white';
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
            errorDiv.style.background = ''; // Reset
            errorDiv.style.color = '';
        }, 5000);
    }
}

/*
=============================================================================
CUSTOM DROPDOWN COMPONENT FUNCTIONALITY
=============================================================================
*/

// Initialize all custom dropdowns
function initializeCustomDropdowns() {
    // Convert existing select elements to custom dropdowns
    const selects = document.querySelectorAll('select:not(.converted)');
    selects.forEach(convertToCustomDropdown);
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select')) {
            document.querySelectorAll('.custom-select.open').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
}

// Convert a native select to custom dropdown
function convertToCustomDropdown(selectElement) {
    const options = Array.from(selectElement.options);
    const selectedOption = options.find(opt => opt.selected) || options[0];
    
    // Create custom dropdown structure
    const customSelect = document.createElement('div');
    customSelect.className = 'custom-select';
    customSelect.dataset.name = selectElement.name || selectElement.id;
    
    // Create trigger (the clickable part)
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.innerHTML = `
        <span class="custom-select-text">${selectedOption.textContent}</span>
        <span class="custom-select-arrow">▼</span>
    `;
    
    // Create options container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'custom-select-options';
    
    // Create option elements
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'custom-select-option';
        if (option.selected) optionElement.classList.add('selected');
        optionElement.textContent = option.textContent;
        optionElement.dataset.value = option.value;
        
        optionElement.addEventListener('click', () => {
            selectCustomOption(customSelect, optionElement, selectElement);
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Toggle dropdown on trigger click
    trigger.addEventListener('click', () => {
        // Close other dropdowns
        document.querySelectorAll('.custom-select.open').forEach(dropdown => {
            if (dropdown !== customSelect) {
                dropdown.classList.remove('open');
            }
        });
        
        // Toggle this dropdown
        customSelect.classList.toggle('open');
    });
    
    customSelect.appendChild(trigger);
    customSelect.appendChild(optionsContainer);
    
    // Replace the original select
    selectElement.style.display = 'none';
    selectElement.classList.add('converted');
    selectElement.parentNode.insertBefore(customSelect, selectElement.nextSibling);
}

// Handle option selection
function selectCustomOption(customSelect, optionElement, originalSelect) {
    // Update visual selection
    const currentSelected = customSelect.querySelector('.custom-select-option.selected');
    if (currentSelected) currentSelected.classList.remove('selected');
    optionElement.classList.add('selected');
    
    // Update trigger text
    const triggerText = customSelect.querySelector('.custom-select-text');
    triggerText.textContent = optionElement.textContent;
    
    // Update original select value
    originalSelect.value = optionElement.dataset.value;
    
    // Trigger change event on original select
    const changeEvent = new Event('change', { bubbles: true });
    originalSelect.dispatchEvent(changeEvent);
    
    // Close dropdown
    customSelect.classList.remove('open');
}

// Refresh custom dropdown when original select options change
function refreshCustomDropdown(originalSelect) {
    if (!originalSelect.classList.contains('converted')) return;
    
    const customSelect = originalSelect.nextElementSibling;
    if (!customSelect || !customSelect.classList.contains('custom-select')) return;
    
    const optionsContainer = customSelect.querySelector('.custom-select-options');
    const triggerText = customSelect.querySelector('.custom-select-text');
    
    // Clear existing options
    optionsContainer.innerHTML = '';
    
    // Get current options from original select
    const options = Array.from(originalSelect.options);
    const selectedOption = options.find(opt => opt.selected) || options[0];
    
    // Update trigger text
    triggerText.textContent = selectedOption.textContent;
    
    // Create new option elements
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'custom-select-option';
        if (option.selected) optionElement.classList.add('selected');
        optionElement.textContent = option.textContent;
        optionElement.dataset.value = option.value;
        
        optionElement.addEventListener('click', () => {
            selectCustomOption(customSelect, optionElement, originalSelect);
        });
        
        optionsContainer.appendChild(optionElement);
    });
}

