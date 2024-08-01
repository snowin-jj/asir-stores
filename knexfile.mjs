/* eslint-disable */
import fs from 'fs';
import path from 'path';
import os from 'os';

const dbPath = path.join(os.homedir(), '.config', 'asir-store', 'store.sqlite3');

try {
    // Check if the directory exists
    fs.accessSync(path.dirname(dbPath), fs.constants.F_OK);
} catch (error) {
    // If directory doesn't exist, create it recursively (may throw errors)
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
    development: {
        client: 'better-sqlite3',
        connection: {
            filename: './dev.sqlite3',
        },
        pool: {
            min: 2,
            max: 10,
            afterCreate: function (conn, cb) {
                conn.prepare('PRAGMA journal_mode = WAL;').run();
                cb(null, conn);
            },
        },
        migrations: {
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds',
        },
        useNullAsDefault: true,
    },
    production: {
        client: 'better-sqlite3',
        connection: {
            filename: dbPath,
        },
        migrations: {
            directory: './resources/database/migrations',
        },
        seeds: {
            directory: './resources/database/seeds',
        },
        useNullAsDefault: true,
    },
};

export default config;
