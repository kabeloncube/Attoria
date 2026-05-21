const fs = require('fs');
const path = require('path');
const pool = require('./db');
const logger = require('./logger');

async function backup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(__dirname, 'backups');
    
    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

    try {
        logger.info('Starting database backup...');

        // Backup users
        const users = await pool.query('SELECT * FROM users');
        logger.info(`Backed up ${users.rows.length} users`);

        // Backup events
        const events = await pool.query('SELECT * FROM events');
        logger.info(`Backed up ${events.rows.length} events`);

        // Backup player accounts
        const playerAccounts = await pool.query('SELECT * FROM player_accounts');
        logger.info(`Backed up ${playerAccounts.rows.length} player accounts`);

        // Write backup file
        const backup = {
            timestamp: new Date().toISOString(),
            users: users.rows,
            events: events.rows,
            player_accounts: playerAccounts.rows,
        };

        fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
        logger.info(`✓ Backup created: ${backupFile}`);

        // Clean up old backups (keep last 30 days)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        fs.readdirSync(backupDir).forEach(file => {
            const filePath = path.join(backupDir, file);
            if (fs.statSync(filePath).mtime.getTime() < thirtyDaysAgo) {
                fs.unlinkSync(filePath);
                logger.info(`Deleted old backup: ${file}`);
            }
        });

        return backupFile;
    } catch (error) {
        logger.error('Backup failed:', error);
        throw error;
    }
}

// Run backup if called directly
if (require.main === module) {
    backup()
        .then(() => {
            logger.info('Backup complete. Exiting.');
            process.exit(0);
        })
        .catch((error) => {
            logger.error('Backup failed:', error);
            process.exit(1);
        });
}

module.exports = { backup };
