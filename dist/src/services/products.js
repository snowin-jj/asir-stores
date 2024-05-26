"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrice = exports.getPrices = exports.getProductsWithDetails = exports.getProducts = exports.getProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const db_1 = __importDefault(require("../lib/db"));
const constants_1 = require("../utils/constants");
const product_1 = require("../utils/product");
const transactions_1 = require("./transactions");
const categories_1 = require("./categories");
async function createProduct(payload) {
    const trx = await db_1.default.transaction();
    try {
        const productId = (await trx(constants_1.TABLES.PRODUCTS).insert({
            name: payload.name,
            description: payload.description,
            purchasedPrice: payload.purchasedPrice,
            purchasedUnit: payload.purchasedUnit,
            purchasedUnitValue: payload.purchasedUnitValue,
            baseUnit: payload.baseUnit,
            baseUnitValue: payload.baseUnitValue,
            categoryId: payload.categoryId,
            reorderPoint: payload.reorderPoint,
            isActive: payload.isActive,
        }))[0];
        await Promise.all(payload.sellingPrices.map((price) => {
            return trx(constants_1.TABLES.PRICES).insert({
                ...price,
                productId: productId,
            });
        }));
        await (0, transactions_1.createTransaction)({
            quantity: payload.stock,
            productId,
            transactionType: 'PURCHASE',
        }, trx);
        const createdProduct = await trx(constants_1.TABLES.PRODUCTS)
            .where('id', productId)
            .first();
        await trx.commit();
        return JSON.stringify(createdProduct);
    }
    catch (error) {
        await trx.rollback();
        const e = error;
        console.log(e);
        return JSON.stringify('Failed to create product.');
    }
}
exports.createProduct = createProduct;
async function updateProduct(productId, payload) {
    const trx = await db_1.default.transaction();
    try {
        await trx(constants_1.TABLES.PRODUCTS).where('id', productId).update({
            name: payload.name,
            description: payload.description,
            purchasedPrice: payload.purchasedPrice,
            purchasedUnit: payload.purchasedUnit,
            purchasedUnitValue: payload.purchasedUnitValue,
            baseUnit: payload.baseUnit,
            baseUnitValue: payload.baseUnitValue,
            reorderPoint: payload.reorderPoint,
            isActive: payload.isActive,
            stock: payload.stock,
            categoryId: payload.categoryId,
        });
        // Process selling prices
        for (const price of payload.sellingPrices) {
            const existingPrice = await trx(constants_1.TABLES.PRICES)
                .select('*')
                .where({ productId, unit: price.unit })
                .first();
            if (existingPrice) {
                await trx(constants_1.TABLES.PRICES)
                    .where({ productId, unit: price.unit })
                    .update({
                    quantity: Number(price.quantity),
                    amount: Number(price.amount),
                    taxValue: Number(price.taxValue),
                });
            }
            else {
                await trx(constants_1.TABLES.PRICES).insert({
                    productId,
                    quantity: Number(price.quantity),
                    unit: price.unit,
                    amount: Number(price.amount),
                    taxValue: Number(price.taxValue),
                });
            }
        }
        await trx.commit();
        return JSON.stringify('Product updated');
    }
    catch (error) {
        await trx.rollback();
        const e = error;
        console.log(e);
        return JSON.stringify('Failed to update the product');
    }
}
exports.updateProduct = updateProduct;
async function deleteProduct(productId) {
    try {
        await (0, db_1.default)(constants_1.TABLES.PRODUCTS).where('id', productId).delete();
        return JSON.stringify('Product deleted');
    }
    catch (error) {
        const e = error;
        console.log(e);
        return JSON.stringify('Failed to delete the product');
    }
}
exports.deleteProduct = deleteProduct;
async function getProduct(productId) {
    try {
        const product = await (0, db_1.default)(constants_1.TABLES.PRODUCTS)
            .select('*')
            .where('id', productId)
            .first();
        const category = JSON.parse(await (0, categories_1.getCategory)(product.categoryId));
        const sellingPrices = JSON.parse(await getPrices(product.id));
        return JSON.stringify({ ...product, category, sellingPrices });
    }
    catch (error) {
        const e = error;
        console.log(e);
        return JSON.stringify('Failed to get product');
    }
}
exports.getProduct = getProduct;
async function getProducts() {
    try {
        const products = await (0, db_1.default)(constants_1.TABLES.PRODUCTS).select('*');
        return JSON.stringify(products);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to get products.';
    }
}
exports.getProducts = getProducts;
async function getProductsWithDetails() {
    try {
        const products = await (0, db_1.default)(constants_1.TABLES.PRODUCTS)
            .select('products.*')
            .innerJoin(constants_1.TABLES.PRICES, 'products.id', 'prices.productId')
            .innerJoin(constants_1.TABLES.CATEGORIES, 'products.categoryId', 'categories.id')
            .select('prices.id as priceId', 'prices.amount', 'prices.unit', 'categories.name as categoryName', 'categories.description as categoryDescription');
        return JSON.stringify((0, product_1.getProductsWithPriceAndCategory)(products));
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to get products with details.';
    }
}
exports.getProductsWithDetails = getProductsWithDetails;
async function getPrices(productId) {
    try {
        const prices = await (0, db_1.default)(constants_1.TABLES.PRICES)
            .select('*')
            .where('productId', productId);
        return JSON.stringify(prices);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return JSON.stringify('Failed to get price.');
    }
}
exports.getPrices = getPrices;
async function deletePrice(priceId) {
    try {
        await (0, db_1.default)(constants_1.TABLES.PRICES).where('id', priceId).delete();
        return JSON.stringify('Price deleted');
    }
    catch (error) {
        const e = error;
        console.log(e);
        return JSON.stringify('Failed to delete price.');
    }
}
exports.deletePrice = deletePrice;
//
// export async function getProduct(productId: number) {
//     try {
//         const product = await knex(TABLES.PRODUCTS)
//             .select('*')
//             .where('id', productId)
//             .first();
//         return JSON.stringify(product);
//     } catch (error) {
//         const e = error as Error;
//         console.log(e);
//         return 'Failed to get product.';
//     }
// }
//# sourceMappingURL=products.js.map