import { ipcRenderer, contextBridge } from 'electron';

import type { CategoryPayload } from './types/category';
import { IPC_ACTIONS } from './handlers';
import { ProductPayload } from './types/product';
import { TransactionPayload } from './types/transaction';

const WINDOW_API = {
    createCategory: async (payload: CategoryPayload): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_CATEGORY, payload),
    getCategories: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_CATEGORIES),
    createProduct: async (payload: ProductPayload): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_PRODUCT, payload),
    getProducts: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_PRODUCTS),
    createTransaction: async (payload: TransactionPayload): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.CREATE_TRANSACTION, payload),
    getTransactions: async (): Promise<string> =>
        ipcRenderer.invoke(IPC_ACTIONS.GET_TRANSACTIONS),
} as const;

contextBridge.exposeInMainWorld('api', WINDOW_API);

export type WindowApi = typeof WINDOW_API;
