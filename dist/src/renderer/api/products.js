"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrices = exports.updateProduct = exports.deletePrice = exports.deleteProduct = exports.createProduct = exports.getProductsWithDetails = exports.getProducts = exports.getProduct = void 0;
async function getProduct(productId) {
    try {
        const product = JSON.parse(await window.api.getProduct(productId));
        // console.log(product);
        return product;
    }
    catch (error) {
        const e = error;
        console.error('❌ GET PRODUCT BY ID', error);
        throw new Error(e.message);
    }
}
exports.getProduct = getProduct;
async function getProducts() {
    try {
        const products = JSON.parse(await window.api.getProducts());
        return products;
    }
    catch (error) {
        const e = error;
        console.error('❌ GET PRODUCTS', error);
        throw new Error(e.message);
    }
}
exports.getProducts = getProducts;
async function getProductsWithDetails() {
    try {
        const products = JSON.parse(await window.api.getProductsWithDetails());
        return products;
    }
    catch (error) {
        const e = error;
        console.error('❌ GET PRODUCT BY ID', error);
        throw new Error(e.message);
    }
}
exports.getProductsWithDetails = getProductsWithDetails;
async function createProduct(payload) {
    try {
        const data = JSON.parse(await window.api.createProduct(payload));
        return data;
    }
    catch (err) {
        const e = err;
        throw new Error(e.message);
    }
}
exports.createProduct = createProduct;
async function deleteProduct(productId) {
    try {
        const res = JSON.parse(await window.api.deleteProduct(productId));
        return res;
    }
    catch (err) {
        const e = err;
        throw new Error(e.message);
    }
}
exports.deleteProduct = deleteProduct;
async function deletePrice(priceId) {
    try {
        const res = JSON.parse(await window.api.deletePrices(priceId));
        return res;
    }
    catch (error) {
        const e = error;
        throw new Error(e.message);
    }
}
exports.deletePrice = deletePrice;
async function updateProduct(productId, payload) {
    try {
        const res = JSON.parse(await window.api.updateProduct(productId, payload));
        return res;
    }
    catch (error) {
        const e = error;
        throw new Error(e.message);
    }
}
exports.updateProduct = updateProduct;
async function getPrices(productId) {
    try {
        const res = await window.api.getPrices(productId);
        const data = JSON.parse(res);
        return data;
    }
    catch (err) {
        const e = err;
        throw new Error(e.message);
    }
}
exports.getPrices = getPrices;
//# sourceMappingURL=products.js.map