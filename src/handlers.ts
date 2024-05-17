import { ipcMain } from 'electron';

import { createCategory, getCategories } from './services/categories';
import { createProduct, getProducts } from './services/products';
import { createTransaction, getTransactions } from './services/transactions';

export const IPC_ACTIONS = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_PRODUCT: 'GET_PRODUCT',
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    GET_ORDERS: 'GET_ORDERS',
    GET_ORDER: 'GET_ORDER',
    CREATE_ORDER: 'CREATE_ORDER',
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    GET_TRANSACTION: 'GET_TRANSACTION',
    CREATE_TRANSACTION: 'CREATE_TRANSACTION',
};

const ipcHandlers = [
    {
        event: IPC_ACTIONS.CREATE_CATEGORY,
        callback: createCategory,
    },
    {
        event: IPC_ACTIONS.GET_CATEGORIES,
        callback: getCategories,
    },
    {
        event: IPC_ACTIONS.CREATE_PRODUCT,
        callback: createProduct,
    },
    {
        event: IPC_ACTIONS.GET_PRODUCTS,
        callback: getProducts,
    },
    {
        event: IPC_ACTIONS.CREATE_TRANSACTION,
        callback: createTransaction,
    },
    {
        event: IPC_ACTIONS.GET_TRANSACTIONS,
        callback: getTransactions,
    },
];

export function registerHandlers() {
    return ipcHandlers.forEach((handler) =>
        ipcMain.handle(handler.event, handler.callback),
    );
}
