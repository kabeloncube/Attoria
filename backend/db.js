const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env'), quiet: true });

const originalEmitWarning = process.emitWarning.bind(process);
process.emitWarning = function (warning, ...args) {
    const message = typeof warning === 'string' ? warning : (warning && warning.message ? warning.message : '');
    if (message.includes('SECURITY WARNING: The SSL modes')) {
        return;
    }
    return originalEmitWarning(warning, ...args);
};

const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
const logger = require('./logger');

const sqliteDbPath = path.resolve(__dirname, '..', 'users.db');
const sqliteDb = new sqlite3.Database(sqliteDbPath);

const sqliteCompat = {
    serialize(fn) {
        return sqliteDb.serialize(fn);
    },
    query(sql, params) {
        return new Promise((resolve, reject) => {
            sqliteDb.all(sql, Array.isArray(params) ? params : params == null ? [] : [params], (err, rows) => {
                if (err) return reject(err);
                resolve({ rows });
            });
        });
    },
    run(sql, params, callback) {
        const finalCallback = typeof params === 'function' ? params : callback;
        const finalParams = typeof params === 'function' ? [] : (Array.isArray(params) ? params : params == null ? [] : [params]);

        return sqliteDb.run(sql, finalParams, function onRun(err) {
            if (typeof finalCallback === 'function') {
                finalCallback.call(this, err);
            }
        });
    },
    get(sql, params, callback) {
        const finalCallback = typeof params === 'function' ? params : callback;
        const finalParams = typeof params === 'function' ? [] : (Array.isArray(params) ? params : params == null ? [] : [params]);

        return sqliteDb.get(sql, finalParams, (err, row) => {
            if (typeof finalCallback === 'function') {
                finalCallback(err, row);
            }
        });
    },
    all(sql, params, callback) {
        const finalCallback = typeof params === 'function' ? params : callback;
        const finalParams = typeof params === 'function' ? [] : (Array.isArray(params) ? params : params == null ? [] : [params]);

        return sqliteDb.all(sql, finalParams, (err, rows) => {
            if (typeof finalCallback === 'function') {
                finalCallback(err, rows || []);
            }
        });
    },
    close() {
        return sqliteDb.close();
    },
    end() {
        return sqliteDb.close();
    },
    connect() {
        return {
            query(sql, params) {
                return new Promise((resolve, reject) => {
                    sqliteDb.all(sql, Array.isArray(params) ? params : params == null ? [] : [params], (err, rows) => {
                        if (err) return reject(err);
                        resolve({ rows });
                    });
                });
            },
            release() {},
        };
    },
};

function createPgDatabase() {
    const connectionString = process.env.DATABASE_URL ||
        `postgresql://${process.env.DB_USER || 'attoria'}:${process.env.DB_PASSWORD || 'password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'attoria_db'}`;

    const pool = new Pool({
        connectionString,
        ssl: process.env.DB_SSL === 'true' || connectionString.includes('sslmode=require')
            ? { rejectUnauthorized: false }
            : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });

    function normalizeSqliteToPostgres(sql) {
        let normalized = sql;
        normalized = normalized.replace(/INTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT/gi, 'SERIAL PRIMARY KEY');
        normalized = normalized.replace(/BOOLEAN\s+DEFAULT\s+1/gi, 'BOOLEAN DEFAULT TRUE');
        normalized = normalized.replace(/BOOLEAN\s+DEFAULT\s+0/gi, 'BOOLEAN DEFAULT FALSE');
        normalized = normalized.replace(/DATETIME\b/gi, 'TIMESTAMP');
        return normalized;
    }

    function replaceQuestionMarks(sql, params) {
        let nextIndex = 1;
        const normalizedParams = Array.isArray(params) ? params : params == null ? [] : [params];
        const valueSql = sql.replace(/\?/g, () => `$${nextIndex++}`);
        return { sql: valueSql, params: normalizedParams };
    }

    function buildStatement(sql, params) {
        const normalizedSql = normalizeSqliteToPostgres(sql);
        return replaceQuestionMarks(normalizedSql, params);
    }

    const pgDb = {
        serialize(fn) {
            if (typeof fn === 'function') fn();
        },
        query(sql, params) {
            const { sql: preparedSql, params: preparedParams } = buildStatement(sql, params);
            return pool.query(preparedSql, preparedParams);
        },
        run(sql, params, callback) {
            const finalCallback = typeof params === 'function' ? params : callback;
            const parsedParams = typeof params === 'function' ? [] : params;
            const { sql: preparedSql, params: preparedParams } = buildStatement(sql, parsedParams);
            const isInsert = /^\s*INSERT\b/i.test(preparedSql);
            const finalSql = isInsert && !/RETURNING\b/i.test(preparedSql) ? `${preparedSql} RETURNING id` : preparedSql;

            return pool.query(finalSql, preparedParams)
                .then((result) => {
                    const context = {
                        changes: result && typeof result.rowCount === 'number' ? result.rowCount : 0,
                        lastID: result && Array.isArray(result.rows) && result.rows[0] && result.rows[0].id ? result.rows[0].id : null,
                    };
                    if (typeof finalCallback === 'function') {
                        finalCallback.call(context, null);
                    }
                    return context;
                })
                .catch((error) => {
                    if (typeof finalCallback === 'function') {
                        finalCallback.call({ changes: 0, lastID: null }, error);
                        return null;
                    }
                    throw error;
                });
        },
        get(sql, params, callback) {
            const finalCallback = typeof params === 'function' ? params : callback;
            const parsedParams = typeof params === 'function' ? [] : params;
            const { sql: preparedSql, params: preparedParams } = buildStatement(sql, parsedParams);

            return pool.query(preparedSql, preparedParams)
                .then((result) => {
                    const row = result && result.rows && result.rows[0] ? result.rows[0] : null;
                    if (typeof finalCallback === 'function') {
                        finalCallback(null, row);
                    }
                    return row;
                })
                .catch((error) => {
                    if (typeof finalCallback === 'function') {
                        finalCallback(error, null);
                        return null;
                    }
                    throw error;
                });
        },
        all(sql, params, callback) {
            const finalCallback = typeof params === 'function' ? params : callback;
            const parsedParams = typeof params === 'function' ? [] : params;
            const { sql: preparedSql, params: preparedParams } = buildStatement(sql, parsedParams);

            return pool.query(preparedSql, preparedParams)
                .then((result) => {
                    const rows = result && Array.isArray(result.rows) ? result.rows : [];
                    if (typeof finalCallback === 'function') {
                        finalCallback(null, rows);
                    }
                    return rows;
                })
                .catch((error) => {
                    if (typeof finalCallback === 'function') {
                        finalCallback(error, []);
                        return [];
                    }
                    throw error;
                });
        },
        close() {
            return pool.end();
        },
        end() {
            return pool.end();
        },
        connect() {
            return pool.connect();
        },
    };

    pool.on('error', (err) => {
        logger.error('Unexpected error on idle PostgreSQL client', err);
    });

    return pgDb;
}

const pgDb = createPgDatabase();
const state = { usePg: false };

if (process.env.DATABASE_URL) {
    pgDb.query('SELECT 1 AS ok')
        .then(() => {
            state.usePg = true;
            logger.info('Using Neon/Postgres database for application queries.');
        })
        .catch((error) => {
            logger.debug('Neon/Postgres unavailable from this environment, using SQLite fallback.');
            logger.debug(error && error.message ? error.message : error);
            state.usePg = false;
        });
}

function getActiveDb() {
    return state.usePg ? pgDb : sqliteCompat;
}

const db = {
    serialize(fn) {
        return getActiveDb().serialize(fn);
    },
    query(sql, params) {
        return getActiveDb().query(sql, params);
    },
    run(sql, params, callback) {
        return getActiveDb().run(sql, params, callback);
    },
    get(sql, params, callback) {
        return getActiveDb().get(sql, params, callback);
    },
    all(sql, params, callback) {
        return getActiveDb().all(sql, params, callback);
    },
    close() {
        return Promise.all([sqliteCompat.close(), pgDb.close()])
            .catch(() => {});
    },
    connect() {
        if (state.usePg) {
            return pgDb.connect();
        }
        return sqliteCompat.connect();
    },
    end() {
        return db.close();
    },
};

module.exports = db;
