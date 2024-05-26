"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellingPricesColumns = exports.salesPageSidebarLinks = exports.adminPageSidebarLinks = exports.transactionTypes = void 0;
const lucide_react_1 = require("lucide-react");
exports.transactionTypes = [
    {
        label: 'SALE',
        value: 'SALE',
        icon: lucide_react_1.BadgeIndianRupee,
    },
    {
        label: 'PURCHASE',
        value: 'PURCHASE',
        icon: lucide_react_1.ShoppingCart,
    },
    {
        label: 'RETURN',
        value: 'RETURN',
        icon: lucide_react_1.PackageMinus,
    },
];
exports.adminPageSidebarLinks = [
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
exports.salesPageSidebarLinks = [
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
exports.sellingPricesColumns = [
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
//# sourceMappingURL=ui.js.map