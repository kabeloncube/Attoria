/*
=============================================================================
CLASH OF CLANS PRO DASHBOARD - BACKEND SERVER (Node.js)

This file creates a web server that:
1. Serves your website files to users
2. Handles user registration and login
3. Communicates with the Clash of Clans API
4. Manages a database for user accounts
=============================================================================
*/

// IMPORT REQUIRED MODULES (like importing tools/libraries)
const express = require('express');           // Web framework - makes creating web servers easy
const cors = require('cors');                 // Cross-Origin Resource Sharing - allows frontend to talk to backend
const path = require('path');                 // Path utilities - helps work with file and folder paths
const bcrypt = require('bcryptjs');           // Password hashing - keeps user passwords secure
const jwt = require('jsonwebtoken');          // JSON Web Tokens - manages user login sessions
const session = require('express-session');   // Session management - keeps track of user sessions
const sqlite3 = require('sqlite3').verbose(); // SQLite database - stores user account data
const rateLimit = require('express-rate-limit'); // Rate limiting - prevents brute force attacks
const helmet = require('helmet');             // Security headers - protects against common vulnerabilities
const { body, validationResult } = require('express-validator'); // Input validation
require('dotenv').config();                   // Load environment variables from .env file (API keys, secrets)
const Redis = require('ioredis');

/*
=============================================================================
SERVER CONFIGURATION
=============================================================================
*/

// CREATE THE EXPRESS SERVER APPLICATION
const app = express();

// SERVER SETTINGS (read from environment variables or use defaults)
const PORT = process.env.PORT || 3000;                                    // Port to run server on (default: 3000)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'; // Secret key for creating login tokens

/*
=============================================================================
DATABASE SETUP (SQLite) - For storing user accounts
=============================================================================
*/

// CREATE OR CONNECT TO THE DATABASE FILE
const db = new sqlite3.Database('./users.db');  // Creates 'users.db' file in project folder

// CREATE USERS TABLE if it doesn't already exist
// This table stores user account information
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    -- Unique user ID (auto-generated)
    username TEXT UNIQUE NOT NULL,           -- Username (must be unique)
    email TEXT UNIQUE NOT NULL,              -- Email address (must be unique)
    password TEXT NOT NULL,                  -- Encrypted password
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- When account was created
    last_coc_activity DATETIME                -- Last time user accessed CoC features
)`);

// CREATE EVENTS TABLE for news and events
// This table stores CoC news and events information
db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    -- Unique event ID
    title TEXT NOT NULL,                     -- Event title (e.g., "Halloween Event 2024")
    emoji TEXT DEFAULT '',                   -- Emoji for the event (removed)
    description TEXT NOT NULL,               -- Event description
    start_date TEXT,                         -- Event start date
    end_date TEXT,                           -- Event end date
    event_type TEXT DEFAULT 'general',      -- Type: general, seasonal, war, update
    is_active BOOLEAN DEFAULT 1,            -- Whether event should be displayed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Add new columns for real-time event data (migration-safe)
db.serialize(() => {
    const eventColumns = [
        'source TEXT DEFAULT \'manual\'',         // Source: 'manual', 'coc_api', 'blog_scrape'
        'external_id TEXT',                      // External event ID from API
        'multiplier REAL',                       // Event multiplier (for war bonus, etc.)
        'max_tier INTEGER',                      // Max tier (for clan games)
        'priority INTEGER DEFAULT 5',           // Display priority (1=highest, 10=lowest)
        'auto_expire BOOLEAN DEFAULT 0'         // Auto-expire based on end_date
    ];
    
    eventColumns.forEach(column => {
        db.run(`ALTER TABLE events ADD COLUMN ${column}`, (err) => {
            if (err && !err.message.includes('duplicate column name')) {
                console.warn(`Events table migration warning: ${err.message}`);
            }
        });
    });
});

// CREATE PLAYER_ACCOUNTS TABLE for linking user accounts to CoC players
// This table stores the connection between registered users and their CoC player tags
db.run(`CREATE TABLE IF NOT EXISTS player_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,    -- Unique link ID
    user_id INTEGER NOT NULL,                -- References users.id
    player_tag TEXT NOT NULL,               -- CoC player tag (e.g., "#2PP")
    player_name TEXT,                       -- Player's in-game name
    is_primary BOOLEAN DEFAULT 0,          -- Whether this is user's main account
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE(user_id, player_tag)           -- Prevent duplicate links
)`);

// ENHANCE PLAYER_ACCOUNTS TABLE with smart live data caching
// Add columns for real-time data storage and tracking (migration-safe)
db.serialize(() => {
    const newColumns = [
        // Cached player data (smart caching)
        'cached_trophies INTEGER DEFAULT 0',
        'cached_best_trophies INTEGER DEFAULT 0', 
        'cached_town_hall_level INTEGER DEFAULT 1',
        'cached_exp_level INTEGER DEFAULT 1',
        'cached_donations INTEGER DEFAULT 0',
        'cached_donations_received INTEGER DEFAULT 0',
        'cached_clan_name TEXT',
        'cached_clan_tag TEXT', 
        'cached_clan_role TEXT',
        'cached_war_stars INTEGER DEFAULT 0',
        'cached_attack_wins INTEGER DEFAULT 0',
        'cached_defense_wins INTEGER DEFAULT 0',
        
        // Data freshness tracking
        'last_api_refresh DATETIME',
        'api_refresh_count INTEGER DEFAULT 0',
        'data_freshness TEXT DEFAULT \'imported\'', // 'imported', 'live', 'stale', 'error'
        'auto_refresh_enabled BOOLEAN DEFAULT 1',
        
        // Legacy columns for backward compatibility
        'town_hall_level INTEGER DEFAULT 1',
        'trophies INTEGER DEFAULT 0',
        'exp_level INTEGER DEFAULT 1',
        'verification_method TEXT DEFAULT \'json_import\''
    ];
    
    // Add each column, ignoring errors if they already exist
    newColumns.forEach(column => {
        db.run(`ALTER TABLE player_accounts ADD COLUMN ${column}`, (err) => {
            // Ignore "duplicate column name" errors - means column already exists
            if (err && !err.message.includes('duplicate column name')) {
                console.warn(`Database migration warning: ${err.message}`);
            }
        });
    });
    
    console.log('Smart database enhancements applied');
});

// DEFAULT EVENTS INITIALIZATION DISABLED
// Using generated realistic events instead of database defaults

/*
=============================================================================
SECURITY MIDDLEWARE SETUP
=============================================================================
*/

// RATE LIMITING - Prevent brute force attacks (more lenient for development)
const authLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 5, // Limit each IP to 5 requests per 10 seconds
    message: {
        error: 'Too many login attempts, please try again in 10 seconds'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests, please try again later'
    }
});

// SECURITY HEADERS
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com"
            ],
            styleSrcElem: [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com"
            ],
            fontSrc: [
                "'self'",
                "https://fonts.gstatic.com"
            ],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.clashofclans.com"]
        }
    }
}));

// GZIP COMPRESSION - Reduce response sizes (60-80% smaller)
app.use(require('compression')());

// GENERAL MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
// Serve static files BEFORE rate limiting to avoid blocking CSS/JS/images
// Use welcome.html as the default index so visitors see the welcome page first
app.use(express.static(path.join(__dirname, 'public'), { index: 'welcome.html' }));
// Apply rate limiting to API routes only
app.use('/api', generalLimiter);
app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        httpOnly: true, // Prevent XSS attacks
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict' // CSRF protection
    }
}));

// CoC API configuration
const COC_API_BASE_URL = 'https://api.clashofclans.com/v1';
const COC_API_KEY = process.env.COC_API_KEY;

if (!COC_API_KEY) {
    console.warn('Warning: COC_API_KEY not found in environment variables');
}

// Redis client for caching CoC responses (optional). Uses REDIS_URL env var when present.
let redisClient = null;
const REDIS_URL = process.env.REDIS_URL || process.env.REDIS_URI || null;
if (REDIS_URL) {
    try {
        redisClient = new Redis(REDIS_URL);
        redisClient.on('error', (err) => console.warn('Redis error:', err && err.message));
        console.log('Redis client initialized for server-side caching');
    } catch (err) {
        console.warn('Failed to initialize Redis client:', err && err.message);
        redisClient = null;
    }
}

const COC_CACHE_TTL = Number(process.env.COC_CACHE_TTL) || 60; // seconds

async function redisGet(key) {
    if (!redisClient) return null;
    try {
        const raw = await redisClient.get(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.warn('Redis get error:', err && err.message);
        return null;
    }
}

async function redisSet(key, value, ttlSeconds = COC_CACHE_TTL) {
    if (!redisClient) return false;
    try {
        await redisClient.set(key, JSON.stringify(value), 'EX', Math.max(5, Math.min(ttlSeconds, 86400)));
        return true;
    } catch (err) {
        console.warn('Redis set error:', err && err.message);
        return false;
    }
}


// Authentication middleware (moved to `middleware/auth.js`) - create instance with jwt and secret
const authenticateToken = require('./middleware/auth')({ jwt, JWT_SECRET });

// Activity tracking middleware for CoC features
function trackCoCActivity(req, res, next) {
    // Only track if user is authenticated
    if (req.user && req.user.id) {
        db.run('UPDATE users SET last_coc_activity = CURRENT_TIMESTAMP WHERE id = ?', [req.user.id], (err) => {
            if (err) {
                console.warn('Failed to update CoC activity:', err.message);
            }
        });
    }
    next();
}

/*
=============================================================================
SECURITY HELPER FUNCTIONS
=============================================================================
*/

// PASSWORD STRENGTH VALIDATION
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    
    if (password.length < minLength) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!hasUpperCase) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!hasLowerCase) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!hasNumbers) {
        return { isValid: false, message: 'Password must contain at least one number' };
    }
    if (!hasNonalphas) {
        return { isValid: false, message: 'Password must contain at least one special character' };
    }
    
    return { isValid: true, message: 'Password is strong' };
}

// EMAIL VALIDATION
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// INPUT SANITIZATION
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>"'&]/g, (char) => {
        const entities = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;'
        };
        return entities[char] || char;
    });
}

// Helper function to make CoC API requests with our API key
async function fetchCoCAPI(endpoint) {
    const key = `coc:${endpoint}`;
    try {
        // try Redis cache first
        const cached = await redisGet(key);
        if (cached != null) return cached;

        const response = await fetch(`${COC_API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${COC_API_KEY}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`CoC API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // cache the successful response
        await redisSet(key, data).catch(() => {});
        return data;
        } catch (error) {
            console.error('Scheduled refresh failed:', error);
            this.refreshStats.errorCount++;
        }
}

// Helper function to make CoC API requests with player's token (for verification)
async function fetchCoCAPIWithPlayerToken(endpoint, playerToken) {
    try {
        const response = await fetch(`${COC_API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${playerToken}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`CoC API error with player token: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching from CoC API with player token:', error);
        throw error;
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

/* Authentication routes were extracted into `routes/auth.js` to keep server.js lean.
   Mounting the auth router at /api so endpoints remain /api/register and /api/login. */
app.use('/api', require('./routes/auth')({
    db,
    authLimiter,
    bcrypt,
    jwt,
    JWT_SECRET,
    sanitizeInput,
    validatePassword,
    validateEmail
}));

// Get clan information by clan tag
app.get('/api/clan/:clanTag', trackCoCActivity, async (req, res) => {
    try {
        const { clanTag } = req.params;
        const cleanTag = clanTag.replace('#', '');
        const encodedTag = encodeURIComponent(`#${cleanTag}`);
        
        const clanData = await fetchCoCAPI(`/clans/${encodedTag}`);
        res.json(clanData);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch clan data', 
            message: error.message 
        });
    }
});

// Get clan members
app.get('/api/clan/:clanTag/members', trackCoCActivity, async (req, res) => {
    try {
        const { clanTag } = req.params;
        const cleanTag = clanTag.replace('#', '');
        const encodedTag = encodeURIComponent(`#${cleanTag}`);
        
        const clanData = await fetchCoCAPI(`/clans/${encodedTag}`);
        res.json({ members: clanData.memberList || [] });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch clan members', 
            message: error.message 
        });
    }
});

// Get clan war log
app.get('/api/clan/:clanTag/warlog', trackCoCActivity, async (req, res) => {
    try {
        const { clanTag } = req.params;
        const cleanTag = clanTag.replace('#', '');
        const encodedTag = encodeURIComponent(`#${cleanTag}`);
        
        const warlogData = await fetchCoCAPI(`/clans/${encodedTag}/warlog`);
        res.json(warlogData);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch war log', 
            message: error.message 
        });
    }
});

// Get clan capital raids
app.get('/api/clan/:clanTag/capitalraidseasons', async (req, res) => {
    try {
        const { clanTag } = req.params;
        const { limit = 3 } = req.query;
        const cleanTag = clanTag.replace('#', '');
        const encodedTag = encodeURIComponent(`#${cleanTag}`);
        
        const capitalData = await fetchCoCAPI(`/clans/${encodedTag}/capitalraidseasons?limit=${limit}`);
        res.json(capitalData);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch clan capital data', 
            message: error.message 
        });
    }
});

// Get player information by player tag
app.get('/api/player/:playerTag', async (req, res) => {
    try {
        const { playerTag } = req.params;
        const cleanTag = playerTag.replace('#', '');
        const encodedTag = encodeURIComponent(`#${cleanTag}`);
        
        const playerData = await fetchCoCAPI(`/players/${encodedTag}`);
        res.json(playerData);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch player data', 
            message: error.message 
        });
    }
});

// Search clans by name
app.get('/api/clans/search', trackCoCActivity, async (req, res) => {
    try {
        const { name, limit = 10, after } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Clan name is required' });
        }
        
        let url = `/clans?name=${encodeURIComponent(name)}&limit=${limit}`;
        if (after) {
            url += `&after=${encodeURIComponent(after)}`;
        }
        
        const searchData = await fetchCoCAPI(url);
        res.json(searchData);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to search clans', 
            message: error.message 
        });
    }
});

// Get legend league leaderboard
app.get('/api/leagues/legend', trackCoCActivity, async (req, res) => {
    try {
        const { locationId = 'global', limit = 200 } = req.query;
        
        const leaderboardData = await fetchCoCAPI(`/locations/${locationId}/rankings/players?limit=${limit}`);
        res.json(leaderboardData);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch legend league leaderboard', 
            message: error.message 
        });
    }
});

// Get locations for leaderboard dropdown
app.get('/api/locations', async (req, res) => {
    try {
        const locationsData = await fetchCoCAPI(`/locations`);
        
        // Filter out continents and keep only countries
        if (locationsData && locationsData.items) {
            const countries = locationsData.items.filter(location => {
                // Filter out continents by name (they're the first 7 items)
                const continentNames = ['International', 'Europe', 'North America', 'South America', 'Asia', 'Australia', 'Africa'];
                // Also filter out empty names
                return !continentNames.includes(location.name) && location.name.trim() !== '';
            });
            
            res.json({ 
                ...locationsData,
                items: countries 
            });
        } else {
            res.json(locationsData);
        }
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch locations', 
            message: error.message 
        });
    }
});

// Generate realistic CoC event schedule
function generateRealisticEvents() {
    const now = new Date();
    const events = [];
    
    // CWL - First week of every month
    const nextCWL = new Date(now.getFullYear(), now.getMonth(), 1);
    if (nextCWL < now) {
        nextCWL.setMonth(nextCWL.getMonth() + 1);
    }
    const cwlEnd = new Date(nextCWL);
    cwlEnd.setDate(cwlEnd.getDate() + 8); // 8 days duration
    
    events.push({
        title: 'Clan War Leagues',
        emoji: '',
        description: 'Compete with clans worldwide in the ultimate league competition. Earn league medals and exclusive rewards! 8 days of intense clan warfare.',
        start_date: nextCWL.toISOString(),
        end_date: cwlEnd.toISOString(),
        event_type: 'cwl',
        source: 'generated',
        priority: 1,
        external_id: `cwl_${nextCWL.getFullYear()}_${nextCWL.getMonth() + 1}`
    });
    
    // Clan Games - Usually mid-month
    const nextClanGames = new Date(now.getFullYear(), now.getMonth(), 22);
    if (nextClanGames < now) {
        nextClanGames.setMonth(nextClanGames.getMonth() + 1);
    }
    const clanGamesEnd = new Date(nextClanGames);
    clanGamesEnd.setDate(clanGamesEnd.getDate() + 6); // 6 days duration
    
    events.push({
        title: 'Clan Games',
        emoji: '',
        description: 'Complete clan-based challenges together. Unlock tier rewards and strengthen your clan bonds! Work together to reach the final tier.',
        start_date: nextClanGames.toISOString(),
        end_date: clanGamesEnd.toISOString(),
        event_type: 'clan_games',
        source: 'generated',
        priority: 2,
        external_id: `clan_games_${nextClanGames.getFullYear()}_${nextClanGames.getMonth() + 1}`
    });
    
    // Gold Pass Season - Monthly
    const nextSeason = new Date(now.getFullYear(), now.getMonth(), 1);
    if (nextSeason < now) {
        nextSeason.setMonth(nextSeason.getMonth() + 1);
    }
    const seasonEnd = new Date(nextSeason);
    seasonEnd.setMonth(seasonEnd.getMonth() + 1);
    seasonEnd.setDate(0); // Last day of the month
    
    events.push({
        title: 'Gold Pass Season',
        emoji: '',
        description: 'Premium rewards and boosts available throughout the season. Complete challenges to unlock exclusive content and significant bonuses!',
        start_date: nextSeason.toISOString(),
        end_date: seasonEnd.toISOString(),
        event_type: 'gold_pass',
        source: 'generated',
        priority: 3,
        external_id: `gold_pass_${nextSeason.getFullYear()}_${nextSeason.getMonth() + 1}`
    });
    
    // Clan Capital Weekend - Every weekend
    const nextWeekend = new Date(now);
    const daysUntilFriday = (5 - now.getDay() + 7) % 7 || 7;
    nextWeekend.setDate(now.getDate() + daysUntilFriday);
    nextWeekend.setHours(8, 0, 0, 0); // Friday 8 AM
    
    const weekendEnd = new Date(nextWeekend);
    weekendEnd.setDate(weekendEnd.getDate() + 3); // Monday 8 AM
    weekendEnd.setHours(8, 0, 0, 0);
    
    events.push({
        title: 'Clan Capital Weekend',
        emoji: '',
        description: 'Raid Weekend is here! Attack other Clan Capitals and defend your own. Earn Capital Gold and glory for your clan!',
        start_date: nextWeekend.toISOString(),
        end_date: weekendEnd.toISOString(),
        event_type: 'clan_capital',
        source: 'generated',
        priority: 4,
        external_id: `capital_weekend_${Math.floor(nextWeekend.getTime() / 1000)}`
    });
    
    // Builder Base Event - Bi-weekly
    const nextBuilder = new Date(now);
    nextBuilder.setDate(now.getDate() + 3); // 3 days from now
    const builderEnd = new Date(nextBuilder);
    builderEnd.setDate(builderEnd.getDate() + 5); // 5 days duration
    
    events.push({
        title: 'Master Builder Event',
        emoji: '',
        description: 'Special challenges and bonuses for Builder Base! Complete objectives to earn exclusive Builder Base rewards and decorations.',
        start_date: nextBuilder.toISOString(),
        end_date: builderEnd.toISOString(),
        event_type: 'builder_base',
        source: 'generated',
        priority: 5,
        external_id: `builder_event_${Math.floor(nextBuilder.getTime() / 1000)}`
    });
    
    return events;
}

// Get real CoC events from official API
app.get('/api/coc-events', async (req, res) => {
    try {
        // Generate realistic events as primary source
        const generatedEvents = generateRealisticEvents();
        
        // Try to fetch events from CoC API as supplementary
        let cocEvents = [];
        try {
            const eventsData = await fetchCoCAPI('/events');
            if (eventsData && eventsData.items) {
                cocEvents = eventsData.items;
            }
        } catch (apiError) {
            console.log('CoC Events API not available, using generated events:', apiError.message);
        }
        
        // Transform CoC API events to our format (if any)
        const transformedEvents = cocEvents.map(event => {
            const eventTypes = {
                'warBonus': { emoji: '', title: 'War Bonus Event', type: 'war' },
                'clanGames': { emoji: '', title: 'Clan Games', type: 'clan_games' },
                'seasonalChallenge': { emoji: '', title: 'Seasonal Challenge', type: 'seasonal' },
                'builderBase': { emoji: '', title: 'Builder Base Event', type: 'builder_base' },
                'goldRush': { emoji: '', title: 'Resource Event', type: 'general' }
            };
            
            const eventInfo = eventTypes[event.type] || { 
                emoji: '', 
                title: event.type.charAt(0).toUpperCase() + event.type.slice(1), 
                type: 'general' 
            };
            
            return {
                title: eventInfo.title,
                emoji: eventInfo.emoji,
                description: `${eventInfo.title} is currently active! ${event.description || 'Check in-game for details.'}`,
                start_date: event.startTime,
                end_date: event.endTime,
                event_type: eventInfo.type,
                source: 'coc_api',
                priority: 10,
                is_active: new Date() >= new Date(event.startTime) && new Date() <= new Date(event.endTime)
            };
        });
        
        // Merge generated events with any API events and database events
        const allEvents = [...generatedEvents, ...transformedEvents];
        
        // Sort by priority and start date
        allEvents.sort((a, b) => {
            if (a.priority !== b.priority) {
                return (a.priority || 999) - (b.priority || 999);
            }
            return new Date(a.start_date) - new Date(b.start_date);
        });
        
        res.json({ 
            events: allEvents,
            sources: {
                generated_events: generatedEvents.length,
                api_events: transformedEvents.length,
                total: allEvents.length
            }
        });
        
    } catch (error) {
        console.error('Error fetching CoC events:', error);
        res.status(500).json({ 
            error: 'Failed to fetch CoC events', 
            message: error.message 
        });
    }
});

/*
=============================================================================
EVENTS API ENDPOINTS - For news and events management
=============================================================================
*/

// GET ALL ACTIVE EVENTS (use generated events as primary source)
app.get('/api/events', async (req, res) => {
    try {
        // Generate realistic events as primary source
        const generatedEvents = generateRealisticEvents();
        console.log('Generated events count:', generatedEvents.length);
        if (generatedEvents.length > 0) {
            console.log('First generated event:', generatedEvents[0].title, generatedEvents[0].emoji);
        }
        
        // Try to get additional events from CoC API
        let cocEvents = [];
        try {
            const eventsData = await fetchCoCAPI('/events');
            if (eventsData && eventsData.items) {
                cocEvents = eventsData.items.map(event => {
                    const eventTypes = {
                        'warBonus': { emoji: '', title: 'War Bonus Event', type: 'war' },
                        'clanGames': { emoji: '', title: 'Clan Games', type: 'clan_games' },
                        'seasonalChallenge': { emoji: '', title: 'Seasonal Challenge', type: 'seasonal' },
                        'builderBase': { emoji: '', title: 'Builder Base Event', type: 'builder_base' },
                        'goldRush': { emoji: '', title: 'Resource Event', type: 'general' }
                    };
                    
                    const eventInfo = eventTypes[event.type] || { 
                        emoji: '', 
                        title: event.type.charAt(0).toUpperCase() + event.type.slice(1), 
                        type: 'general' 
                    };
                    
                    return {
                        title: eventInfo.title,
                        emoji: eventInfo.emoji,
                        description: `${eventInfo.title} is currently active! ${event.description || 'Check in-game for details.'}`,
                        start_date: event.startTime,
                        end_date: event.endTime,
                        event_type: eventInfo.type,
                        source: 'coc_api',
                        priority: 10,
                        is_active: new Date() >= new Date(event.startTime) && new Date() <= new Date(event.endTime)
                    };
                });
            }
        } catch (apiError) {
            console.log('CoC Events API not available, using generated events only');
        }
        
        // Combine generated events with API events
        const allEvents = [...generatedEvents, ...cocEvents];
        
        // Add real-time status and countdown for events with dates
        const eventsWithStatus = allEvents.map(event => {
            const now = new Date();
            const startDate = event.start_date ? new Date(event.start_date) : null;
            const endDate = event.end_date ? new Date(event.end_date) : null;
            
            let status = 'active';
            let timeRemaining = null;
            
            if (startDate && endDate) {
                if (now < startDate) {
                    status = 'upcoming';
                    const diff = startDate - now;
                    timeRemaining = {
                        type: 'starts_in',
                        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                    };
                } else if (now > endDate) {
                    status = 'expired';
                } else {
                    status = 'active';
                    const diff = endDate - now;
                    timeRemaining = {
                        type: 'ends_in',
                        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                    };
                }
            }
            
            return {
                ...event,
                status,
                timeRemaining
            };
        });
        
        // Filter out expired events and sort by priority/date
        const activeEvents = eventsWithStatus
            .filter(event => event.status !== 'expired')
            .sort((a, b) => {
                // Sort by priority first (lower number = higher priority)
                if (a.priority !== b.priority) {
                    return (a.priority || 5) - (b.priority || 5);
                }
                // Then by created date (newer first)
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            });
        
        res.json({ 
            events: activeEvents,
            meta: {
                total: activeEvents.length,
                active: activeEvents.filter(e => e.status === 'active').length,
                upcoming: activeEvents.filter(e => e.status === 'upcoming').length
            }
        });
        
    } catch (error) {
        console.error('Error in events API:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ADD NEW EVENT (requires authentication)
app.post('/api/events', authenticateToken, (req, res) => {
    try {
        const { title, emoji, description, start_date, end_date, event_type } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        
        db.run(
            'INSERT INTO events (title, emoji, description, start_date, end_date, event_type) VALUES (?, ?, ?, ?, ?, ?)',
            [title, emoji || '', description, start_date, end_date, event_type || 'general'],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to create event' });
                }
                res.json({ message: 'Event created successfully', eventId: this.lastID });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// UPDATE EVENT (requires authentication)
app.put('/api/events/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        const { title, emoji, description, start_date, end_date, event_type, is_active } = req.body;
        
        db.run(
            'UPDATE events SET title = ?, emoji = ?, description = ?, start_date = ?, end_date = ?, event_type = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [title, emoji, description, start_date, end_date, event_type, is_active, id],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to update event' });
                }
                if (this.changes === 0) {
                    return res.status(404).json({ error: 'Event not found' });
                }
                res.json({ message: 'Event updated successfully' });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE EVENT (requires authentication)
app.delete('/api/events/:id', authenticateToken, (req, res) => {
    try {
        const { id } = req.params;
        
        db.run('UPDATE events SET is_active = 0 WHERE id = ?', [id], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete event' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Event not found' });
            }
            res.json({ message: 'Event deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

/* Player profile endpoints moved into routes/profile.js and controllers/profileController.js */
app.use('/api/profile', require('./routes/profile')({
    authenticateToken,
    fetchCoCAPI,
    fetchCoCAPIWithPlayerToken,
    sanitizeInput,
    db
}));

/* Mount the Clash of Clans proxy routes at /api/proxy/coc - provides same-origin access
   to CoC endpoints with caching, validation and rate-limiting. */
app.use('/api/proxy/coc', require('./routes/cocProxy')({ fetchCoCAPI, authenticateToken }));

 // Albion Data proxy - keeps frontend same-origin and avoids CSP/CORS problems
 app.use('/api/proxy/albion', require('./routes/albionProxy')());
 
 // Refining helpers (local ratios + batch planner)
 // ensure refine_presets and refine_history tables exist for user data
 db.run(`CREATE TABLE IF NOT EXISTS refine_presets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    resource_type TEXT,
    tier INTEGER,
    city TEXT,
    quantity INTEGER,
    raw_price REAL,
    prev_tier_price REAL,
    refined_price REAL,
    station_cost REAL,
    premium BOOLEAN,
    focus BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
 )`);
 db.run(`CREATE TABLE IF NOT EXISTS refine_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    quantity INTEGER,
    raw_price REAL,
    prev_tier_price REAL,
    refined_price REAL,
    station_cost REAL,
    premium BOOLEAN,
    focus BOOLEAN,
    rrr REAL,
    raw_required INTEGER,
    prev_tier_required INTEGER,
    returned_raw REAL,
    returned_prev_tier REAL,
    effective_raw_used REAL,
    effective_prev_tier_used REAL,
    material_cost REAL,
    total_production_cost REAL,
    gross_sale_value REAL,
    market_tax_rate REAL,
    market_tax REAL,
    net_sale_value REAL,
    net_profit REAL,
    profit_per_unit REAL,
    profit_margin REAL,
    roi REAL,
    break_even_sell_price_per_unit REAL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
 )`);

 app.use('/api/refine', require('./routes/refine')({ db, authenticateToken }));

/*
=============================================================================
SMART AUTO-REFRESH SYSTEM
=============================================================================
*/

// Background scheduling system for automatic data refresh
class SmartRefreshScheduler {
    constructor() {
        this.refreshInterval = null;
        this.refreshInProgress = false;
        this.refreshStats = {
            totalRefreshes: 0,
            successCount: 0,
            errorCount: 0,
            lastRefreshAt: null,
            nextRefreshAt: null
        };
    }
    
    start(intervalMinutes = 15) {
        // Only log if in development mode
        if (process.env.NODE_ENV !== 'production') {
            console.log(`Starting smart auto-refresh scheduler (every ${intervalMinutes} minutes)`);
        }

        // Clear any existing interval
        this.stop();

        // Set up recurring refresh
        this.refreshInterval = setInterval(async () => {
            await this.performScheduledRefresh();
        }, intervalMinutes * 60 * 1000);

        // Calculate next refresh time
        this.refreshStats.nextRefreshAt = new Date(Date.now() + (intervalMinutes * 60 * 1000));

        if (process.env.NODE_ENV !== 'production') {
            console.log(`Auto-refresh scheduler started. Next refresh: ${this.refreshStats.nextRefreshAt.toISOString()}`);
        }
    }
    
    stop() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
            console.log('Auto-refresh scheduler stopped');
        }
    }
    
    async performScheduledRefresh() {
        if (this.refreshInProgress) {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Skipping scheduled refresh - previous refresh still in progress');
        }
            return;
        }

        this.refreshInProgress = true;
        this.refreshStats.totalRefreshes++;
        this.refreshStats.lastRefreshAt = new Date();

        if (process.env.NODE_ENV !== 'production') {
            console.log(`Starting scheduled refresh #${this.refreshStats.totalRefreshes}...`);
        }
        
        try {
            // Get all players that need refreshing for users active in last 24 hours
            const staleThreshold = new Date(Date.now() - 10 * 60 * 1000).toISOString();
            const activityThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // 24 hours ago

            await new Promise((resolve, reject) => {
                db.all(`
                    SELECT DISTINCT pa.user_id, pa.player_tag, pa.player_name, pa.last_api_refresh, pa.data_freshness
                    FROM player_accounts pa
                    JOIN users u ON pa.user_id = u.id
                    WHERE pa.auto_refresh_enabled = 1
                    AND (pa.last_api_refresh IS NULL OR pa.last_api_refresh < ?)
                    AND (u.last_coc_activity IS NOT NULL AND u.last_coc_activity >= ?)
                    ORDER BY pa.last_api_refresh ASC
                    LIMIT 50
                `, [staleThreshold, activityThreshold], async (err, stalePlayers) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    if (stalePlayers.length === 0) {
                        console.log('No players need refreshing');
                        resolve();
                        return;
                    }
                    
                    console.log(`Found ${stalePlayers.length} players needing refresh`);
                    
                    let successCount = 0;
                    let errorCount = 0;
                    
                    // Refresh each player with rate limiting
                    for (let i = 0; i < stalePlayers.length; i++) {
                        const player = stalePlayers[i];
                        
                        try {
                            // Add delay between API calls to avoid rate limits
                            if (i > 0) {
                                await new Promise(resolve => setTimeout(resolve, 300));
                            }
                            
                            const encodedTag = encodeURIComponent(player.player_tag);
                            const playerData = await fetchCoCAPI(`/players/${encodedTag}`);
                            
                            if (playerData) {
                                // Update cached data
                                await new Promise((updateResolve, updateReject) => {
                                    const updateQuery = `
                                        UPDATE player_accounts SET 
                                            cached_trophies = ?, cached_best_trophies = ?, cached_town_hall_level = ?,
                                            cached_exp_level = ?, cached_donations = ?, cached_donations_received = ?,
                                            cached_clan_name = ?, cached_clan_tag = ?, cached_clan_role = ?,
                                            cached_war_stars = ?, cached_attack_wins = ?, cached_defense_wins = ?,
                                            last_api_refresh = CURRENT_TIMESTAMP, api_refresh_count = api_refresh_count + 1,
                                            data_freshness = 'live', last_updated = CURRENT_TIMESTAMP
                                        WHERE user_id = ? AND player_tag = ?
                                    `;
                                    
                                    db.run(updateQuery, [
                                        playerData.trophies || 0, playerData.bestTrophies || 0, playerData.townHallLevel || 1,
                                        playerData.expLevel || 1, playerData.donations || 0, playerData.donationsReceived || 0,
                                        playerData.clan ? playerData.clan.name : null, playerData.clan ? playerData.clan.tag : null,
                                        playerData.clan ? playerData.clan.role : null, playerData.warStars || 0,
                                        playerData.attackWins || 0, playerData.defenseWins || 0,
                                        player.user_id, player.player_tag
                                    ], function(err) {
                                        if (err) updateReject(err);
                                        else updateResolve();
                                    });
                                });
                                
                                successCount++;
                                console.log(`[${i+1}/${stalePlayers.length}] Refreshed ${playerData.name} (${player.player_tag})`);
                            }
                            
                        } catch (playerError) {
                            errorCount++;
                            console.warn(`[${i+1}/${stalePlayers.length}] Failed ${player.player_tag}: ${playerError.message}`);
                            
                            // Mark as stale
                            db.run('UPDATE player_accounts SET data_freshness = ? WHERE user_id = ? AND player_tag = ?', 
                                ['stale', player.user_id, player.player_tag]);
                        }
                    }
                    
                    this.refreshStats.successCount += successCount;
                    this.refreshStats.errorCount += errorCount;
                    
                    console.log(`Scheduled refresh completed: ${successCount} success, ${errorCount} errors`);
                    resolve();
                });
            });
            
        } catch (error) {
            console.error('❌ Scheduled refresh failed:', error);
            this.refreshStats.errorCount++;
        } finally {
            this.refreshInProgress = false;
            
            // Calculate next refresh time
            this.refreshStats.nextRefreshAt = new Date(Date.now() + (15 * 60 * 1000)); // 15 minutes from now
        }
    }
    
    getStats() {
        return {
            ...this.refreshStats,
            isRunning: !!this.refreshInterval,
            refreshInProgress: this.refreshInProgress
        };
    }
}

// Initialize the scheduler
const smartRefreshScheduler = new SmartRefreshScheduler();

// Start auto-refresh when server starts (15-minute intervals)
setTimeout(() => {
    smartRefreshScheduler.start(15);
}, 30000); // Start 30 seconds after server startup

// Scheduler control endpoint
app.get('/api/scheduler/status', (req, res) => {
    res.json(smartRefreshScheduler.getStats());
});

app.post('/api/scheduler/start', (req, res) => {
    const { intervalMinutes = 15 } = req.body;
    smartRefreshScheduler.start(intervalMinutes);
    res.json({ message: 'Scheduler started', interval: intervalMinutes });
});

app.post('/api/scheduler/stop', (req, res) => {
    smartRefreshScheduler.stop();
    res.json({ message: 'Scheduler stopped' });
});

// Refresh single player data (smart background refresh)
app.post('/api/refresh-player/:playerTag', authenticateToken, async (req, res) => {
    try {
        const { playerTag } = req.params;
        const userId = req.user.id;
        const cleanTag = playerTag.replace('#', '').toUpperCase();
        const fullTag = `#${cleanTag}`;
        
        console.log(`Refreshing player data for ${fullTag}...`);
        
        // Verify this player is linked to the authenticated user
        db.get('SELECT * FROM player_accounts WHERE user_id = ? AND player_tag = ?', 
            [userId, fullTag], async (err, linkedPlayer) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            if (!linkedPlayer) {
                return res.status(403).json({ error: 'Player not linked to your account' });
            }
            
            try {
                // Fetch live data from CoC API using our server's API key
                const encodedTag = encodeURIComponent(fullTag);
                const playerData = await fetchCoCAPI(`/players/${encodedTag}`);
                
                if (!playerData) {
                    throw new Error('No player data received from CoC API');
                }
                
                // Update cached data with live information (smart caching)
                const updateQuery = `
                    UPDATE player_accounts SET 
                        cached_trophies = ?,
                        cached_best_trophies = ?,
                        cached_town_hall_level = ?,
                        cached_exp_level = ?,
                        cached_donations = ?,
                        cached_donations_received = ?,
                        cached_clan_name = ?,
                        cached_clan_tag = ?,
                        cached_clan_role = ?,
                        cached_war_stars = ?,
                        cached_attack_wins = ?,
                        cached_defense_wins = ?,
                        last_api_refresh = CURRENT_TIMESTAMP,
                        api_refresh_count = api_refresh_count + 1,
                        data_freshness = 'live',
                        last_updated = CURRENT_TIMESTAMP
                    WHERE id = ?
                `;
                
                const updateParams = [
                    playerData.trophies || 0,
                    playerData.bestTrophies || 0,
                    playerData.townHallLevel || 1,
                    playerData.expLevel || 1,
                    playerData.donations || 0,
                    playerData.donationsReceived || 0,
                    playerData.clan ? playerData.clan.name : null,
                    playerData.clan ? playerData.clan.tag : null,
                    playerData.clan ? playerData.clan.role : null,
                    playerData.warStars || 0,
                    playerData.attackWins || 0,
                    playerData.defenseWins || 0,
                    linkedPlayer.id
                ];
                
                db.run(updateQuery, updateParams, function(err) {
                    if (err) {
                        console.error('Failed to update player cache:', err);
                        return res.status(500).json({ error: 'Failed to update player data' });
                    }
                    
                    console.log(`Refreshed ${playerData.name} (${fullTag}) - ${playerData.trophies} trophies`);
                    
                    res.json({
                        success: true,
                        message: 'Player data refreshed successfully',
                        playerTag: fullTag,
                        playerName: playerData.name,
                        dataFreshness: 'live',
                        refreshedAt: new Date().toISOString(),
                        liveData: {
                            trophies: playerData.trophies,
                            townHallLevel: playerData.townHallLevel,
                            expLevel: playerData.expLevel,
                            donations: playerData.donations,
                            clan: playerData.clan ? {
                                name: playerData.clan.name,
                                tag: playerData.clan.tag,
                                role: playerData.clan.role
                            } : null
                        }
                    });
                });
                
            } catch (apiError) {
                console.error(`❌ Failed to refresh ${fullTag}:`, apiError.message);
                
                // Mark as stale if API call failed
                db.run('UPDATE player_accounts SET data_freshness = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?', 
                    ['stale', linkedPlayer.id]);
                
                res.status(400).json({ 
                    error: 'Failed to fetch live player data',
                    message: apiError.message,
                    dataFreshness: 'stale'
                });
            }
        });
        
    } catch (error) {
        console.error('Player refresh error:', error);
        res.status(500).json({ error: 'Server error during player refresh' });
    }
});

// Bulk refresh all linked players for a user (smart refresh)
app.post('/api/refresh-all-players', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        console.log(`Bulk refreshing all players for user ${userId}...`);
        
        // Get all linked players for this user
        db.all('SELECT * FROM player_accounts WHERE user_id = ? AND auto_refresh_enabled = 1', 
            [userId], async (err, linkedPlayers) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            if (linkedPlayers.length === 0) {
                return res.json({ 
                    message: 'No players to refresh',
                    refreshedCount: 0,
                    players: []
                });
            }
            
            const refreshResults = [];
            let refreshedCount = 0;
            
            // Refresh each player (with delay to avoid API rate limits)
            for (let i = 0; i < linkedPlayers.length; i++) {
                const player = linkedPlayers[i];
                
                try {
                    await new Promise(resolve => setTimeout(resolve, i * 200)); // 200ms delay between calls
                    
                    const encodedTag = encodeURIComponent(player.player_tag);
                    const playerData = await fetchCoCAPI(`/players/${encodedTag}`);
                    
                    if (playerData) {
                        // Update cached data
                        const updateQuery = `
                            UPDATE player_accounts SET 
                                cached_trophies = ?, cached_best_trophies = ?, cached_town_hall_level = ?,
                                cached_exp_level = ?, cached_donations = ?, cached_donations_received = ?,
                                cached_clan_name = ?, cached_clan_tag = ?, cached_clan_role = ?,
                                cached_war_stars = ?, cached_attack_wins = ?, cached_defense_wins = ?,
                                last_api_refresh = CURRENT_TIMESTAMP, api_refresh_count = api_refresh_count + 1,
                                data_freshness = 'live', last_updated = CURRENT_TIMESTAMP
                            WHERE id = ?
                        `;
                        
                        await new Promise((resolve, reject) => {
                            db.run(updateQuery, [
                                playerData.trophies || 0, playerData.bestTrophies || 0, playerData.townHallLevel || 1,
                                playerData.expLevel || 1, playerData.donations || 0, playerData.donationsReceived || 0,
                                playerData.clan ? playerData.clan.name : null, playerData.clan ? playerData.clan.tag : null,
                                playerData.clan ? playerData.clan.role : null, playerData.warStars || 0,
                                playerData.attackWins || 0, playerData.defenseWins || 0, player.id
                            ], function(err) {
                                if (err) reject(err);
                                else resolve();
                            });
                        });
                        
                        refreshResults.push({
                            playerTag: player.player_tag,
                            playerName: playerData.name,
                            status: 'success',
                            trophies: playerData.trophies,
                            townHallLevel: playerData.townHallLevel
                        });
                        refreshedCount++;
                        
                        console.log(`Refreshed ${playerData.name} (${player.player_tag}) - ${playerData.trophies} trophies`);
                    }
                    
                } catch (playerError) {
                    console.warn(`⚠️ Failed to refresh ${player.player_tag}:`, playerError.message);
                    
                    // Mark as stale
                    db.run('UPDATE player_accounts SET data_freshness = ? WHERE id = ?', ['stale', player.id]);
                    
                    refreshResults.push({
                        playerTag: player.player_tag,
                        playerName: player.player_name,
                        status: 'failed',
                        error: playerError.message
                    });
                }
            }
            
                        console.log(`Bulk refresh completed: ${refreshedCount}/${linkedPlayers.length} players refreshed`);
            
            res.json({
                success: true,
                message: `Refreshed ${refreshedCount} of ${linkedPlayers.length} players`,
                refreshedCount,
                totalPlayers: linkedPlayers.length,
                players: refreshResults,
                refreshedAt: new Date().toISOString()
            });
        });
        
    } catch (error) {
        console.error('Bulk refresh error:', error);
        res.status(500).json({ error: 'Server error during bulk refresh' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        hasApiKey: !!COC_API_KEY
    });
});

// Token debugging endpoint
app.post('/api/debug-token', async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json({ error: 'Token is required for debugging' });
    }
    
    const debug = {
        token: {
            provided: token,
            length: token.length,
            expectedLength: '20-30+ characters',
            format: /^[a-zA-Z0-9]+$/.test(token) ? 'Valid format' : 'Invalid format (contains special chars)',
            firstChars: token.substring(0, 4),
            lastChars: token.length > 4 ? '...' + token.substring(token.length - 4) : token
        },
        tests: []
    };
    
    // Test 1: Direct API call
    try {
        const response = await fetch(`${COC_API_BASE_URL}/locations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        
        debug.tests.push({
            name: 'Direct CoC API Test',
            status: response.status,
            statusText: response.statusText,
            success: response.ok,
            response: response.ok ? 'API accessible' : await response.text()
        });
    } catch (error) {
        debug.tests.push({
            name: 'Direct CoC API Test',
            success: false,
            error: error.message
        });
    }
    
    // Test 2: Try uppercase
    if (token !== token.toUpperCase()) {
        try {
            const response = await fetch(`${COC_API_BASE_URL}/locations`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.toUpperCase()}`,
                    'Accept': 'application/json'
                }
            });
            
            debug.tests.push({
                name: 'Uppercase Token Test',
                status: response.status,
                success: response.ok,
                note: 'Trying uppercase version of token'
            });
        } catch (error) {
            debug.tests.push({
                name: 'Uppercase Token Test',
                success: false,
                error: error.message
            });
        }
    }
    
    // Add recommendations
    debug.recommendations = [];
    
    if (debug.token.length < 15) {
        debug.recommendations.push('Token seems too short. Make sure you copied the complete token from Clash of Clans.');
    }

    if (debug.tests.every(test => !test.success)) {
        debug.recommendations.push('Token appears to be invalid or expired. Try generating a new one in Clash of Clans.');
    }

    debug.recommendations.push('To get a new token: Clash of Clans -> Settings -> More Settings -> API Token -> Show/Generate');
    
    res.json(debug);
});

// CoC API diagnostic endpoint
app.get('/api/coc-status', async (req, res) => {
    const status = {
        serverApiKey: !!COC_API_KEY,
        apiBaseUrl: COC_API_BASE_URL,
        canAccessAPI: false,
        error: null
    };
    
    if (COC_API_KEY) {
        try {
            // Test our server's API key
            const testResponse = await fetch(`${COC_API_BASE_URL}/locations`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${COC_API_KEY}`,
                    'Accept': 'application/json'
                }
            });
            
            status.canAccessAPI = testResponse.ok;
            status.serverResponseStatus = testResponse.status;
            
            if (!testResponse.ok) {
                status.error = `Server API key test failed: ${testResponse.status} ${testResponse.statusText}`;
            }
        } catch (error) {
            status.error = `Network error: ${error.message}`;
        }
    } else {
        status.error = 'No CoC API key configured on server';
    }
    
    res.json(status);
});

// Helper function to get local network IP
function getLocalNetworkIP() {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            // Skip internal (loopback) and non-IPv4 addresses
            if (interface.family === 'IPv4' && !interface.internal) {
                return interface.address;
            }
        }
    }
    return 'localhost'; // Fallback
}

app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalNetworkIP();
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Also accessible on local network at http://${localIP}:${PORT}`);
    console.log(`API Key configured: ${!!COC_API_KEY}`);
});
