"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandlers = exports.IPC_ACTIONS = void 0;
const electron_1 = require("electron");
const categories_1 = require("./services/categories");
const products_1 = require("./services/products");
const transactions_1 = require("./services/transactions");
const orders_1 = require("./services/orders");
exports.IPC_ACTIONS = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_CATEGORY: 'GET_CATEGORY',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_PRODUCTS_WITH_DETAILS: 'GET_PRODUCTS_WITH_DETAILS',
    GET_PRODUCT: 'GET_PRODUCT',
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    GET_PRICES: 'GET_PRICES',
    DELETE_PRICE: 'DELETE_PRICE',
    GET_ORDERS: 'GET_ORDERS',
    GET_ORDER: 'GET_ORDER',
    CREATE_ORDER: 'CREATE_ORDER',
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    GET_TRANSACTIONS_WITH_DETAILS: 'GET_TRANSACTIONS_WITH_DETAILS',
    GET_TRANSACTION: 'GET_TRANSACTION',
    CREATE_TRANSACTION: 'CREATE_TRANSACTION',
};
const ipcHandlers = [
    {
        event: exports.IPC_ACTIONS.CREATE_CATEGORY,
        callback: async (_, payload) => await (0, categories_1.createCategory)(payload),
    },
    {
        event: exports.IPC_ACTIONS.GET_CATEGORIES,
        callback: async (_) => await (0, categories_1.getCategories)(),
    },
    {
        event: exports.IPC_ACTIONS.GET_CATEGORY,
        callback: async (_, categoryId) => await (0, categories_1.getCategory)(categoryId),
    },
    {
        event: exports.IPC_ACTIONS.CREATE_PRODUCT,
        callback: async (_, payload) => await (0, products_1.createProduct)(payload),
    },
    {
        event: exports.IPC_ACTIONS.UPDATE_PRODUCT,
        callback: async (_, productId, payload) => await (0, products_1.updateProduct)(productId, payload),
    },
    {
        event: exports.IPC_ACTIONS.DELETE_PRODUCT,
        callback: async (_, productId) => await (0, products_1.deleteProduct)(productId),
    },
    {
        event: exports.IPC_ACTIONS.GET_PRODUCT,
        callback: async (_, productId) => await (0, products_1.getProduct)(productId),
    },
    {
        event: exports.IPC_ACTIONS.GET_PRODUCTS,
        callback: async (_) => await (0, products_1.getProducts)(),
    },
    {
        event: exports.IPC_ACTIONS.GET_PRODUCTS_WITH_DETAILS,
        callback: async (_) => await (0, products_1.getProductsWithDetails)(),
    },
    {
        event: exports.IPC_ACTIONS.GET_PRICES,
        callback: async (_, productId) => await (0, products_1.getPrices)(productId),
    },
    {
        event: exports.IPC_ACTIONS.DELETE_PRICE,
        callback: async (_, priceId) => await (0, products_1.deletePrice)(priceId),
    },
    {
        event: exports.IPC_ACTIONS.CREATE_TRANSACTION,
        callback: async (_, payload) => await (0, transactions_1.createTransaction)(payload),
    },
    {
        event: exports.IPC_ACTIONS.GET_TRANSACTIONS,
        callback: async (_) => await (0, transactions_1.getTransactions)(),
    },
    {
        event: exports.IPC_ACTIONS.GET_TRANSACTIONS_WITH_DETAILS,
        callback: async (_) => await (0, transactions_1.getTransactionsWithDetails)(),
    },
    {
        event: exports.IPC_ACTIONS.CREATE_ORDER,
        callback: async (_, payload) => await (0, orders_1.createOrder)(payload),
    },
    {
        event: exports.IPC_ACTIONS.GET_ORDERS,
        callback: async (_) => await (0, orders_1.getOrders)(),
    },
];
function registerHandlers() {
    return ipcHandlers.forEach((handler) => electron_1.ipcMain.handle(handler.event, handler.callback));
}
exports.registerHandlers = registerHandlers;
//# sourceMappingURL=handlers.js.map