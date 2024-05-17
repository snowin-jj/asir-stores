import fs from 'fs';
import path from 'path';
import os from 'os';

const dbPath = path.join(os.homedir(), '.config', 'todo-app', 'store.sqlite3');

try {
    // Check if the directory exists
    fs.accessSync(path.dirname(dbPath), fs.constants.F_OK);
} catch (error) {
    // If directory doesn't exist, create it recursively (may throw errors)
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const config = {
    /**
     * @type { import("knex").Knex.Config }
     */
    development: {
        client: 'better-sqlite3',
        connection: {
            filename: './dev.sqlite3',
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
        useNullAsDefault: true,
    },
    /**
     * @type { import("knex").Knex.Config }
     */
    production: {
        client: 'better-sqlite3',
        connection: {
            filename: dbPath,
        },
        migrations: {
            directory: './resources/migrations',
        },
        seeds: {
            directory: './resources/seeds',
        },
        useNullAsDefault: true,
    },
};

export default config;
