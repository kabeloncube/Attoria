const pool = require('./db');
const logger = require('./logger');

async function runMigrations() {
    const client = await pool.connect();
    
    try {
        logger.info('Starting database migrations...');

        // Create USERS table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_coc_activity TIMESTAMP,
                last_login TIMESTAMP
            )
        `);
        logger.info('✓ Users table created/exists');

        // Create EVENTS table
        await client.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                emoji TEXT DEFAULT '',
                description TEXT NOT NULL,
                start_date TEXT,
                end_date TEXT,
                event_type TEXT DEFAULT 'general',
                is_active BOOLEAN DEFAULT TRUE,
                source TEXT DEFAULT 'manual',
                external_id TEXT,
                multiplier REAL,
                max_tier INTEGER,
                priority INTEGER DEFAULT 5,
                auto_expire BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        logger.info('✓ Events table created/exists');

        // Create PLAYER_ACCOUNTS table
        await client.query(`
            CREATE TABLE IF NOT EXISTS player_accounts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                player_tag TEXT NOT NULL,
                player_name TEXT,
                is_primary BOOLEAN DEFAULT FALSE,
                cached_trophies INTEGER DEFAULT 0,
                cached_best_trophies INTEGER DEFAULT 0,
                cached_town_hall_level INTEGER DEFAULT 1,
                cached_exp_level INTEGER DEFAULT 1,
                cached_donations INTEGER DEFAULT 0,
                cached_donations_received INTEGER DEFAULT 0,
                cached_clan_name TEXT,
                cached_clan_tag TEXT,
                cached_clan_role TEXT,
                cached_war_stars INTEGER DEFAULT 0,
                cached_attack_wins INTEGER DEFAULT 0,
                cached_defense_wins INTEGER DEFAULT 0,
                last_api_refresh TIMESTAMP,
                api_refresh_count INTEGER DEFAULT 0,
                data_freshness TEXT DEFAULT 'imported',
                auto_refresh_enabled BOOLEAN DEFAULT TRUE,
                verification_method TEXT DEFAULT 'json_import',
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, player_tag)
            )
        `);
        logger.info('✓ Player accounts table created/exists');

        // Create indexes for performance
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
            CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
            CREATE INDEX IF NOT EXISTS idx_player_accounts_user_id ON player_accounts(user_id);
            CREATE INDEX IF NOT EXISTS idx_player_accounts_player_tag ON player_accounts(player_tag);
            CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
            CREATE INDEX IF NOT EXISTS idx_events_is_active ON events(is_active);
        `);
        logger.info('✓ Indexes created');

        logger.info('✓ All migrations completed successfully');
    } catch (error) {
        logger.error('Migration error:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Run migrations if called directly
if (require.main === module) {
    runMigrations()
        .then(() => {
            logger.info('Migrations complete. Exiting.');
            process.exit(0);
        })
        .catch((error) => {
            logger.error('Migration failed:', error);
            process.exit(1);
        });
}

module.exports = { runMigrations };
