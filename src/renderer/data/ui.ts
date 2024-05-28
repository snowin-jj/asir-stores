import { BadgeIndianRupee, PackageMinus, ShoppingCart } from 'lucide-react';
import { TableFilterType } from '../components/data-table/data-table-faced-filter';

export const PAYMENT_METHODS = [
    {
        label: 'CASH',
        VALUE: 'CASH',
    },
    {
        label: 'UPI',
        VALUE: 'UPI',
    },
    {
        label: 'CARD',
        VALUE: 'CARD',
    },
    {
        label: 'NET_BANKING',
        VALUE: 'NET_BANKING',
    },
];

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

export const orderStatus: TableFilterType[] = [
    {
        label: 'PAID',
        value: 'PAID',
        icon: undefined,
    },
    {
        label: 'UNPAID',
        value: 'UNPAID',
        icon: undefined,
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
    {
        to: '/sales/customers',
        label: 'Customers',
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
