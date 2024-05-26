"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const dbPath = path_1.default.join(os_1.default.homedir(), '.config', 'todo-app', 'store.sqlite3');
try {
    // Check if the directory exists
    fs_1.default.accessSync(path_1.default.dirname(dbPath), fs_1.default.constants.F_OK);
}
catch (error) {
    // If directory doesn't exist, create it recursively (may throw errors)
    fs_1.default.mkdirSync(path_1.default.dirname(dbPath), { recursive: true });
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
exports.default = config;
//# sourceMappingURL=knexfile.mjs.map