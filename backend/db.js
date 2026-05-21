const { Pool } = require('pg');
const logger = require('./logger');

// PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER || 'attoria',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'attoria_db',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    max: 20, // Connection pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Error handling
pool.on('error', (err) => {
    logger.error('Unexpected error on idle client', err);
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        logger.error('Database connection failed:', err);
    } else {
        logger.info('Database connected:', res.rows[0]);
    }
});

module.exports = pool;
