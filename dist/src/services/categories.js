"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const db_1 = __importDefault(require("../lib/db"));
const constants_1 = require("../utils/constants");
async function createCategory(payload) {
    try {
        const categoryId = await (0, db_1.default)(constants_1.TABLES.CATEGORIES).insert(payload);
        const createdCategory = await (0, db_1.default)(constants_1.TABLES.CATEGORIES)
            .where('id', categoryId[0])
            .first();
        return JSON.stringify(createdCategory);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to create category.';
    }
}
exports.createCategory = createCategory;
async function getCategories() {
    try {
        const categories = await (0, db_1.default)(constants_1.TABLES.CATEGORIES).select('*');
        return JSON.stringify(categories);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to get categories.';
    }
}
exports.getCategories = getCategories;
async function getCategory(categoryId) {
    try {
        const category = await (0, db_1.default)(constants_1.TABLES.CATEGORIES)
            .select('*')
            .where('id', categoryId)
            .first();
        return JSON.stringify(category);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to get category.';
    }
}
exports.getCategory = getCategory;
//# sourceMappingURL=categories.js.map