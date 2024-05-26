"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columns = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/renderer/components/ui/button");
const dropdown_menu_1 = require("@/renderer/components/ui/dropdown-menu");
const ui_1 = require("@/renderer/data/ui");
const react_router_dom_1 = require("react-router-dom");
exports.columns = [
    {
        accessorKey: 'id',
        header: 'Transaction Id',
    },
    {
        accessorKey: 'product.name',
        header: ({ column }) => {
            return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), children: ["Product Name", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "ml-2 h-4 w-4" }, void 0)] }, void 0));
        },
        cell: ({ row }) => {
            const product = row.original.product;
            return ((0, jsx_runtime_1.jsx)("p", { className: "max-w-[15rem] truncate px-4", children: product ? product.name : 'Unknown' }, void 0));
        },
    },
    {
        id: 'transactionType',
        accessorKey: 'transactionType',
        header: 'Transaction Type',
        cell: ({ row, column: { id } }) => {
            const transactionType = ui_1.transactionTypes.find((transactionType) => transactionType.value === row.getValue(id));
            if (!transactionType) {
                return null;
            }
            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-[100px] items-center px-1", children: [transactionType.icon && ((0, jsx_runtime_1.jsx)(transactionType.icon, { className: "mr-2 h-4 w-4 text-muted-foreground" }, void 0)), (0, jsx_runtime_1.jsx)("span", { children: transactionType.label }, void 0)] }, void 0));
        },
        filterFn: (row, columnId, value) => {
            return value.includes(row.getValue(columnId));
        },
    },
    {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row }) => {
            return ((0, jsx_runtime_1.jsxs)("p", { className: "px-1", children: [row.original.quantity, " ", row.original.product.purchasedUnit] }, void 0));
        },
    },
    {
        accessorKey: 'transactionDate',
        header: ({ column }) => {
            return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), children: ["Transaction Date", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "ml-2 h-4 w-4" }, void 0)] }, void 0));
        },
        cell: ({ row }) => {
            const date = row.original;
            return ((0, jsx_runtime_1.jsx)("div", { className: "px-5", children: (0, jsx_runtime_1.jsx)("span", { children: new Date(date.transactionDate).toDateString() }, void 0) }, void 0));
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const transaction = row.original;
            return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Open menu" }, void 0), (0, jsx_runtime_1.jsx)(lucide_react_1.MoreHorizontal, { className: "h-4 w-4" }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `${transaction.id}`, className: "w-full", children: "View details" }, void 0) }, void 0) }, void 0)] }, void 0));
        },
    },
];
//# sourceMappingURL=columns.js.map