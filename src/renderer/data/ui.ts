import { BadgeIndianRupee, PackageMinus, ShoppingCart } from 'lucide-react';

export const transactionTypes = [
    {
        label: 'SALE',
        value: 'SALE',
        icon: BadgeIndianRupee,
    },
    {
        label: 'PURCHASE',
        value: 'PURCHASE',
        icon: ShoppingCart,
    },
    {
        label: 'RETURN',
        value: 'RETURN',
        icon: PackageMinus,
    },
];

export const adminPageSidebarLinks = [
    {
        to: '/admin',
        label: 'Dashboard',
    },
    {
        to: '/admin/products',
        label: 'Products',
    },
    {
        to: '/admin/transactions',
        label: 'Transactions',
    },
];

export const salesPageSidebarLinks = [
    {
        to: '/sales',
        label: 'Home',
    },
    {
        to: '/sales/products',
        label: 'Products',
    },
    {
        to: '/sales/orders',
        label: 'Orders',
    },
];

export const sellingPricesColumns = [
    {
        type: 'number',
        name: 'quantity',
        label: 'Quantity',
    },
    {
        type: 'text',
        name: 'unit',
        label: 'Selling Unit',
    },
    {
        type: 'number',
        name: 'amount',
        label: 'Amount',
    },

    {
        type: 'number',
        name: 'taxValue',
        label: 'Tax Value',
    },
];
