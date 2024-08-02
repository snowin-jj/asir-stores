import { ipcRenderer, contextBridge } from 'electron';

import type { CategoryPayload } from './types/category';
import { IPC_ACTIONS } from './handlers';
import { ProductPayloadWithPrices } from './types/product';
import { TransactionPayload } from './types/transaction';
import {
    CustomerPayload,
    OrderPayload,
    OrderPayloadWithItems,
} from './types/order';
import { UpdateProductPayload } from '@/renderer/components/form/product-form';

const WINDOW_API = {
    createCategory: async (payload: CategoryPayload): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_CATEGORY, payload),
    getCategories: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_CATEGORIES),
    getCategory: async (categoryId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_CATEGORY, categoryId),
    createProduct: async (payload: ProductPayloadWithPrices): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_PRODUCT, payload),
    updateProduct: async (
        productId: number,
        payload: UpdateProductPayload,
    ): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.UPDATE_PRODUCT, productId, payload),
    deleteProduct: async (productId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.DELETE_PRODUCT, productId),
    getProduct: async (productId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_PRODUCT, productId),
    getProducts: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_PRODUCTS),
    getProductsWithDetails: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_PRODUCTS_WITH_DETAILS),
    importProduct: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.IMPORT_PRODUCT),
    getPrices: async (productId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_PRICES, productId),
    getPrice: async (priceId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_PRICE, priceId),
    deletePrices: async (priceId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.DELETE_PRICE, priceId),
    createTransaction: async (payload: TransactionPayload): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_TRANSACTION, payload),
    getTransaction: async (transactionId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_TRANSACTION, transactionId),
    getTransactions: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_TRANSACTIONS),
    getTransactionsWithDetails: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_TRANSACTIONS_WITH_DETAILS),
    createOrder: async (payload: OrderPayloadWithItems): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_ORDER, payload),
    updateOrder: async (
        orderId: number,
        payload: OrderPayload,
    ): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.UPDATE_ORDER, orderId, payload),
    getOrders: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_ORDERS),
    getOrdersWithDetails: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_ORDERS_WITH_DETAILS),
    getOrder: async (orderId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_ORDER, orderId),
    getCustomers: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_CUSTOMERS),
    getCustomer: async (customerId: number): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_CUSTOMER, customerId),
    createCustomer: async (payload: CustomerPayload): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_CUSTOMER, payload),
    updateCustomer: async (
        customerId: number,
        payload: CustomerPayload,
    ): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.UPDATE_CUSTOMER, customerId, payload),
} as const;

export type WindowApi = typeof WINDOW_API;

contextBridge.exposeInMainWorld('api', WINDOW_API);
