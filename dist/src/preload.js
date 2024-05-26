"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const handlers_1 = require("./handlers");
const WINDOW_API = {
    createCategory: async (payload) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.CREATE_CATEGORY, payload),
    getCategories: async () => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_CATEGORIES),
    getCategory: async (categoryId) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_CATEGORY, categoryId),
    createProduct: async (payload) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.CREATE_PRODUCT, payload),
    updateProduct: async (productId, payload) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.UPDATE_PRODUCT, productId, payload),
    deleteProduct: async (productId) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.DELETE_PRODUCT, productId),
    getProduct: async (productId) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_PRODUCT, productId),
    getProducts: async () => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_PRODUCTS),
    getProductsWithDetails: async () => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_PRODUCTS_WITH_DETAILS),
    getPrices: async (productId) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_PRICES, productId),
    deletePrices: async (priceId) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.DELETE_PRICE, priceId),
    createTransaction: async (payload) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.CREATE_TRANSACTION, payload),
    getTransactions: async () => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_TRANSACTIONS),
    getTransactionsWithDetails: async () => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_TRANSACTIONS_WITH_DETAILS),
    createOrder: async (payload) => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.CREATE_ORDER, payload),
    getOrders: async () => electron_1.ipcRenderer.invoke(handlers_1.IPC_ACTIONS.GET_ORDERS),
};
electron_1.contextBridge.exposeInMainWorld('api', WINDOW_API);
//# sourceMappingURL=preload.js.map