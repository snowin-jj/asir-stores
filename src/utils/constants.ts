export const TABLES = {
    CATEGORIES: 'categories',
    PRODUCTS: 'products',
    PRICES: 'prices',
    CUSTOMERS: 'customers',
    ORDERS: 'orders',
    ORDER_ITEMS: 'orderItems',
    TRANSACTIONS: 'transactions',
};

export type TableNames = typeof TABLES

export const ENV =
    process.env.NODE_ENV ||
    ('production' as 'development' | 'production' | 'test');
