import { ipcMain, IpcMainInvokeEvent } from 'electron';

import {
    createCategory,
    getCategories,
    getCategory,
} from './services/categories';
import {
    createProduct,
    deletePrice,
    deleteProduct,
    getPrice,
    getPrices,
    getProduct,
    getProducts,
    getProductsWithDetails,
    updateProduct,
} from './services/products';
import {
    createTransaction,
    getTransaction,
    getTransactions,
    getTransactionsWithDetails,
} from './services/transactions';
import {
    createCustomer,
    createOrder,
    getCustomer,
    getCustomers,
    getOrders,
    getOrdersWithDetails,
    getOrderWithDetails,
    updateCustomer,
    updateOrder,
} from './services/orders';
import type { CategoryPayload } from './types/category';
import type { ProductPayload } from './types/product';
import type { TransactionPayload } from './types/transaction';
import type {
    CustomerPayload,
    OrderPayload,
    OrderPayloadWithItems,
} from './types/order';
import { UpdateProductPayload } from '@/renderer/components/form/product-form';

export const IPC_ACTIONS = {
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
    GET_PRICE: 'GET_PRICE',
    DELETE_PRICE: 'DELETE_PRICE',
    GET_ORDERS: 'GET_ORDERS',
    GET_ORDERS_WITH_DETAILS: 'GET_ORDERS_WITH_DETAILS',
    GET_ORDER: 'GET_ORDER',
    CREATE_ORDER: 'CREATE_ORDER',
    UPDATE_ORDER: 'UPDATE_ORDER',
    GET_CUSTOMERS: 'GET_CUSTOMERS',
    GET_CUSTOMER: 'GET_CUSTOMER',
    CREATE_CUSTOMER: 'CREATE_CUSTOMER',
    UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
    DELETE_CUSTOMER: 'DELETE_CUSTOMER',
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    GET_TRANSACTIONS_WITH_DETAILS: 'GET_TRANSACTIONS_WITH_DETAILS',
    GET_TRANSACTION: 'GET_TRANSACTION',
    CREATE_TRANSACTION: 'CREATE_TRANSACTION',
};

const ipcHandlers = [
    {
        event: IPC_ACTIONS.CREATE_CATEGORY,
        callback: async (_: IpcMainInvokeEvent, payload: CategoryPayload) =>
            await createCategory(payload),
    },
    {
        event: IPC_ACTIONS.GET_CATEGORIES,
        callback: async (_: IpcMainInvokeEvent) => await getCategories(),
    },
    {
        event: IPC_ACTIONS.GET_CATEGORY,
        callback: async (_: IpcMainInvokeEvent, categoryId: number) =>
            await getCategory(categoryId),
    },
    {
        event: IPC_ACTIONS.CREATE_PRODUCT,
        callback: async (_: IpcMainInvokeEvent, payload: ProductPayload) =>
            await createProduct(payload),
    },
    {
        event: IPC_ACTIONS.UPDATE_PRODUCT,
        callback: async (
            _: IpcMainInvokeEvent,
            productId: number,
            payload: UpdateProductPayload,
        ) => await updateProduct(productId, payload),
    },
    {
        event: IPC_ACTIONS.DELETE_PRODUCT,
        callback: async (_: IpcMainInvokeEvent, productId: number) =>
            await deleteProduct(productId),
    },
    {
        event: IPC_ACTIONS.GET_PRODUCT,
        callback: async (_: IpcMainInvokeEvent, productId: number) =>
            await getProduct(productId),
    },
    {
        event: IPC_ACTIONS.GET_PRODUCTS,
        callback: async (_: IpcMainInvokeEvent) => await getProducts(),
    },
    {
        event: IPC_ACTIONS.GET_PRODUCTS_WITH_DETAILS,
        callback: async (_: IpcMainInvokeEvent) =>
            await getProductsWithDetails(),
    },
    {
        event: IPC_ACTIONS.GET_PRICES,
        callback: async (_: IpcMainInvokeEvent, productId: number) =>
            await getPrices(productId),
    },
    {
        event: IPC_ACTIONS.GET_PRICE,
        callback: async (_: IpcMainInvokeEvent, priceId: number) =>
            await getPrice(priceId),
    },
    {
        event: IPC_ACTIONS.DELETE_PRICE,
        callback: async (_: IpcMainInvokeEvent, priceId: number) =>
            await deletePrice(priceId),
    },
    {
        event: IPC_ACTIONS.CREATE_TRANSACTION,
        callback: async (_: IpcMainInvokeEvent, payload: TransactionPayload) =>
            await createTransaction(payload),
    },
    {
        event: IPC_ACTIONS.GET_TRANSACTION,
        callback: async (_: IpcMainInvokeEvent, transactionId: number) =>
            await getTransaction(transactionId),
    },
    {
        event: IPC_ACTIONS.GET_TRANSACTIONS,
        callback: async (_: IpcMainInvokeEvent) => await getTransactions(),
    },
    {
        event: IPC_ACTIONS.GET_TRANSACTIONS_WITH_DETAILS,
        callback: async (_: IpcMainInvokeEvent) =>
            await getTransactionsWithDetails(),
    },
    {
        event: IPC_ACTIONS.CREATE_ORDER,
        callback: async (
            _: IpcMainInvokeEvent,
            payload: OrderPayloadWithItems,
        ) => await createOrder(payload),
    },
    {
        event: IPC_ACTIONS.UPDATE_ORDER,
        callback: async (
            _: IpcMainInvokeEvent,
            orderId: number,
            payload: OrderPayload,
        ) => await updateOrder(orderId, payload),
    },
    {
        event: IPC_ACTIONS.GET_ORDERS,
        callback: async (_: IpcMainInvokeEvent) => await getOrders(),
    },
    {
        event: IPC_ACTIONS.GET_ORDERS_WITH_DETAILS,
        callback: async (_: IpcMainInvokeEvent) => await getOrdersWithDetails(),
    },
    {
        event: IPC_ACTIONS.GET_ORDER,
        callback: async (_: IpcMainInvokeEvent, orderId: number) =>
            await getOrderWithDetails(orderId),
    },
    {
        event: IPC_ACTIONS.GET_CUSTOMERS,
        callback: async (_: IpcMainInvokeEvent) => await getCustomers(),
    },
    {
        event: IPC_ACTIONS.GET_CUSTOMER,
        callback: async (_: IpcMainInvokeEvent, customerId: number) =>
            await getCustomer(customerId),
    },
    {
        event: IPC_ACTIONS.CREATE_CUSTOMER,
        callback: async (_: IpcMainInvokeEvent, payload: CustomerPayload) =>
            await createCustomer(payload),
    },
    {
        event: IPC_ACTIONS.UPDATE_CUSTOMER,
        callback: async (
            _: IpcMainInvokeEvent,
            customerId: number,
            payload: CustomerPayload,
        ) => await updateCustomer(customerId, payload),
    },
];

export function registerHandlers() {
    return ipcHandlers.forEach((handler) =>
        ipcMain.handle(handler.event, handler.callback),
    );
}
