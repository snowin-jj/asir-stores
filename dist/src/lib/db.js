"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_mjs_1 = __importDefault(require("../../knexfile.mjs"));
const knex = (0, knex_1.default)(knexfile_mjs_1.default['production']);
knex.migrate
    .latest()
    .then(() => console.log('Migration completed!'))
    .catch((err) => console.error('Error in migration: ', err));
exports.default = knex;
//# sourceMappingURL=db.js.map