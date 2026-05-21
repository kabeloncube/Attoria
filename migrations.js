/*
=============================================================================
DATABASE MIGRATIONS FOR COC DASHBOARD FEATURE IMPLEMENTATION
=============================================================================
*/

const sqlite3 = require('sqlite3').verbose();

class DatabaseMigrations {
    constructor(dbPath = './users.db') {
        this.db = new sqlite3.Database(dbPath);
    }

    // Run all migrations in order
    async runAllMigrations() {
        console.log('🔧 Starting database migrations...\n');
        
        try {
            await this.migratePhase1();
            await this.migratePhase2();
            await this.migratePhase3(); 
            await this.migratePhase4();
            
            console.log('\n✅ All migrations completed successfully!');
        } catch (error) {
            console.error('❌ Migration failed:', error);
            throw error;
        } finally {
            this.close();
        }
    }

    // Phase 1: Enhanced Player Data Tracking
    async migratePhase1() {
        console.log('📊 Phase 1: Enhanced Player Data...');
        
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                const newColumns = [
                    'cached_troops_data TEXT DEFAULT NULL',
                    'cached_spells_data TEXT DEFAULT NULL', 
                    'cached_heroes_data TEXT DEFAULT NULL',
                    'cached_pets_data TEXT DEFAULT NULL',
                    'cached_hero_equipment_data TEXT DEFAULT NULL',
                    'offensive_strength INTEGER DEFAULT 0',
                    'last_troops_update DATETIME DEFAULT NULL'
                ];
                
                let completedColumns = 0;
                const totalColumns = newColumns.length;
                
                newColumns.forEach((column, index) => {
                    this.db.run(`ALTER TABLE player_accounts ADD COLUMN ${column}`, (err) => {
                        if (err && !err.message.includes('duplicate column')) {
                            console.warn(`  ⚠️ Column migration warning: ${err.message}`);
                        } else if (!err) {
                            console.log(`  ✅ Added column: ${column.split(' ')[0]}`);
                        }
                        
                        completedColumns++;
                        if (completedColumns === totalColumns) {
                            console.log('✅ Phase 1 migration completed\n');
                            resolve();
                        }
                    });
                });
            });
        });
    }

    // Phase 2: War Management System
    async migratePhase2() {
        console.log('⚔️ Phase 2: War Management System...');
        
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                // Create war_logs table
                this.db.run(`CREATE TABLE IF NOT EXISTS war_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    clan_tag TEXT NOT NULL,
                    war_tag TEXT UNIQUE,
                    start_time TEXT,
                    end_time TEXT,
                    preparation_start_time TEXT,
                    team_size INTEGER,
                    attacks_per_member INTEGER DEFAULT 2,
                    war_status TEXT CHECK(war_status IN ('preparation', 'inWar', 'warEnded')),
                    result TEXT CHECK(result IN ('win', 'lose', 'tie', 'unknown')) DEFAULT 'unknown',
                    our_stars INTEGER DEFAULT 0,
                    opponent_stars INTEGER DEFAULT 0,
                    our_destruction_percentage REAL DEFAULT 0,
                    opponent_destruction_percentage REAL DEFAULT 0,
                    our_clan_name TEXT,
                    opponent_clan_name TEXT,
                    opponent_clan_tag TEXT,
                    raw_war_data TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`, (err) => {
                    if (err && !err.message.includes('already exists')) {
                        reject(err);
                        return;
                    }
                    console.log('  ✅ Created war_logs table');
                });

                // Create war_attacks table
                this.db.run(`CREATE TABLE IF NOT EXISTS war_attacks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    war_log_id INTEGER,
                    attacker_tag TEXT NOT NULL,
                    attacker_name TEXT,
                    defender_tag TEXT NOT NULL,
                    defender_name TEXT,
                    stars INTEGER DEFAULT 0,
                    destruction_percentage REAL DEFAULT 0,
                    attack_order INTEGER,
                    is_fresh_attack BOOLEAN DEFAULT 0,
                    attack_duration INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (war_log_id) REFERENCES war_logs(id) ON DELETE CASCADE
                )`, (err) => {
                    if (err && !err.message.includes('already exists')) {
                        reject(err);
                        return;
                    }
                    console.log('  ✅ Created war_attacks table');
                    console.log('✅ Phase 2 migration completed\n');
                    resolve();
                });
            });
        });
    }

    // Phase 3: Clan Management System  
    async migratePhase3() {
        console.log('🏰 Phase 3: Clan Management System...');
        
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                // Create clan_data table
                this.db.run(`CREATE TABLE IF NOT EXISTS clan_data (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    clan_tag TEXT UNIQUE NOT NULL,
                    name TEXT NOT NULL,
                    description TEXT,
                    location_id INTEGER,
                    location_name TEXT,
                    badge_urls TEXT,
                    clan_level INTEGER DEFAULT 1,
                    clan_points INTEGER DEFAULT 0,
                    clan_builder_base_points INTEGER DEFAULT 0,
                    clan_capital_points INTEGER DEFAULT 0,
                    required_trophies INTEGER DEFAULT 0,
                    war_frequency TEXT,
                    war_win_streak INTEGER DEFAULT 0,
                    war_wins INTEGER DEFAULT 0,
                    war_ties INTEGER DEFAULT 0,
                    war_losses INTEGER DEFAULT 0,
                    is_war_log_public BOOLEAN DEFAULT 1,
                    war_league TEXT,
                    members_count INTEGER DEFAULT 0,
                    chat_language TEXT,
                    required_builder_base_trophies INTEGER DEFAULT 0,
                    required_town_hall_level INTEGER DEFAULT 1,
                    clan_capital_hall_level INTEGER DEFAULT 1,
                    raw_clan_data TEXT,
                    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`, (err) => {
                    if (err && !err.message.includes('already exists')) {
                        reject(err);
                        return;
                    }
                    console.log('  ✅ Created clan_data table');
                });

                // Create clan_members table
                this.db.run(`CREATE TABLE IF NOT EXISTS clan_members (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    clan_data_id INTEGER,
                    player_tag TEXT NOT NULL,
                    name TEXT NOT NULL,
                    role TEXT CHECK(role IN ('leader', 'coLeader', 'admin', 'member')),
                    exp_level INTEGER DEFAULT 1,
                    league_name TEXT,
                    trophies INTEGER DEFAULT 0,
                    builder_base_trophies INTEGER DEFAULT 0,
                    clan_rank INTEGER,
                    previous_clan_rank INTEGER,
                    donations INTEGER DEFAULT 0,
                    donations_received INTEGER DEFAULT 0,
                    last_seen DATETIME,
                    joined_clan_at DATETIME,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (clan_data_id) REFERENCES clan_data(id) ON DELETE CASCADE
                )`, (err) => {
                    if (err && !err.message.includes('already exists')) {
                        reject(err);
                        return;
                    }
                    console.log('  ✅ Created clan_members table');
                    console.log('✅ Phase 3 migration completed\n');
                    resolve();
                });
            });
        });
    }

    // Phase 4: Enhanced Events & Progress Tracking
    async migratePhase4() {
        console.log('📅 Phase 4: Enhanced Events & Progress Tracking...');
        
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                // Create player_progress_tracking table
                this.db.run(`CREATE TABLE IF NOT EXISTS player_progress_tracking (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    player_tag TEXT NOT NULL,
                    tracked_metric TEXT NOT NULL,
                    previous_value INTEGER,
                    current_value INTEGER,
                    change_amount INTEGER,
                    percentage_change REAL,
                    tracking_period TEXT DEFAULT 'daily',
                    tracked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )`, (err) => {
                    if (err && !err.message.includes('already exists')) {
                        reject(err);
                        return;
                    }
                    console.log('  ✅ Created player_progress_tracking table');
                });

                // Extend existing events table
                const eventColumns = [
                    'event_end_time TEXT DEFAULT NULL',
                    'countdown_enabled BOOLEAN DEFAULT 0', 
                    'priority INTEGER DEFAULT 0',
                    'recurrence_pattern TEXT DEFAULT NULL',
                    'next_occurrence DATETIME DEFAULT NULL',
                    'image_url TEXT DEFAULT NULL'
                ];

                let completedEventColumns = 0;
                const totalEventColumns = eventColumns.length;
                
                eventColumns.forEach((column) => {
                    this.db.run(`ALTER TABLE events ADD COLUMN ${column}`, (err) => {
                        if (err && !err.message.includes('duplicate column')) {
                            console.warn(`  ⚠️ Events column warning: ${err.message}`);
                        } else if (!err) {
                            console.log(`  ✅ Enhanced events table: ${column.split(' ')[0]}`);
                        }
                        
                        completedEventColumns++;
                        if (completedEventColumns === totalEventColumns) {
                            console.log('✅ Phase 4 migration completed\n');
                            resolve();
                        }
                    });
                });
            });
        });
    }

    // Create indexes for performance
    async createIndexes() {
        console.log('🚀 Creating database indexes for performance...');
        
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                const indexes = [
                    'CREATE INDEX IF NOT EXISTS idx_player_accounts_user_tag ON player_accounts(user_id, player_tag)',
                    'CREATE INDEX IF NOT EXISTS idx_player_accounts_refresh ON player_accounts(last_api_refresh)',
                    'CREATE INDEX IF NOT EXISTS idx_war_logs_clan_tag ON war_logs(clan_tag)',
                    'CREATE INDEX IF NOT EXISTS idx_war_logs_status ON war_logs(war_status)',
                    'CREATE INDEX IF NOT EXISTS idx_war_attacks_war_log ON war_attacks(war_log_id)',
                    'CREATE INDEX IF NOT EXISTS idx_clan_data_tag ON clan_data(clan_tag)',
                    'CREATE INDEX IF NOT EXISTS idx_clan_members_clan_id ON clan_members(clan_data_id)',
                    'CREATE INDEX IF NOT EXISTS idx_clan_members_player ON clan_members(player_tag)',
                    'CREATE INDEX IF NOT EXISTS idx_progress_tracking_user ON player_progress_tracking(user_id, player_tag)',
                    'CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active, priority)'
                ];

                let completed = 0;
                indexes.forEach((indexSQL, i) => {
                    this.db.run(indexSQL, (err) => {
                        if (err && !err.message.includes('already exists')) {
                            console.warn(`  ⚠️ Index warning: ${err.message}`);
                        } else if (!err) {
                            console.log(`  ✅ Created index ${i + 1}/${indexes.length}`);
                        }
                        
                        completed++;
                        if (completed === indexes.length) {
                            console.log('✅ All indexes created\n');
                            resolve();
                        }
                    });
                });
            });
        });
    }

    // Backup existing database before migration
    backup() {
        const fs = require('fs');
        const backupName = `users_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.db`;
        
        try {
            fs.copyFileSync('./users.db', `./${backupName}`);
            console.log(`✅ Database backed up as: ${backupName}\n`);
            return backupName;
        } catch (error) {
            console.error('❌ Backup failed:', error);
            throw error;
        }
    }

    // Validate database integrity after migration
    async validate() {
        console.log('🔍 Validating database integrity...');
        
        return new Promise((resolve, reject) => {
            this.db.run('PRAGMA integrity_check', (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('✅ Database integrity check passed');
                    resolve();
                }
            });
        });
    }

    close() {
        this.db.close();
    }
}

// Command line interface
if (require.main === module) {
    const migrations = new DatabaseMigrations();
    
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'backup':
            migrations.backup();
            break;
        case 'phase1':
            migrations.migratePhase1().then(() => migrations.close());
            break;
        case 'phase2': 
            migrations.migratePhase2().then(() => migrations.close());
            break;
        case 'phase3':
            migrations.migratePhase3().then(() => migrations.close());
            break;
        case 'phase4':
            migrations.migratePhase4().then(() => migrations.close());
            break;
        case 'indexes':
            migrations.createIndexes().then(() => migrations.close());
            break;
        case 'validate':
            migrations.validate().then(() => migrations.close());
            break;
        case 'all':
        default:
            // Create backup first
            migrations.backup();
            // Run all migrations
            migrations.runAllMigrations();
            break;
    }
}

module.exports = DatabaseMigrations;