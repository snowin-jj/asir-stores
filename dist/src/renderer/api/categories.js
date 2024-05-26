"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesAsLabel = exports.createCategory = exports.getCategories = exports.getCategory = void 0;
async function getCategory(categoryId) {
    try {
        const res = await window.api.getCategory(categoryId);
        const data = JSON.parse(res);
        return data;
    }
    catch (err) {
        const e = err;
        throw new Error(e.message);
    }
}
exports.getCategory = getCategory;
async function getCategories() {
    try {
        const res = await window.api.getCategories();
        const data = JSON.parse(res);
        return data;
    }
    catch (err) {
        const e = err;
        throw new Error(e.message);
    }
}
exports.getCategories = getCategories;
async function createCategory(payload) {
    try {
        const newCategory = JSON.parse(await window.api.createCategory({
            name: payload.name,
            description: payload.description,
        }));
        return newCategory;
    }
    catch (err) {
        const e = err;
        throw new Error(e.message);
    }
}
exports.createCategory = createCategory;
const getCategoriesAsLabel = async () => {
    const data = await getCategories();
    return data.map((category) => {
        return {
            label: category.name,
            value: category.name,
            icon: undefined,
        };
    });
};
exports.getCategoriesAsLabel = getCategoriesAsLabel;
//# sourceMappingURL=categories.js.map