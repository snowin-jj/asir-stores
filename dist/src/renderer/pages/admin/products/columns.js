"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columns = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/renderer/components/ui/button");
const active_badge_1 = require("@/renderer/components/active-badge");
const dropdown_menu_1 = require("@/renderer/components/ui/dropdown-menu");
const convert_1 = require("@/utils/convert");
exports.columns = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), children: ["Name", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "ml-2 h-4 w-4" }, void 0)] }, void 0));
        },
        cell: ({ row }) => {
            return ((0, jsx_runtime_1.jsx)("p", { className: "max-w-[15rem] truncate px-4", children: row.original.name }, void 0));
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), children: ["Price", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "ml-2 h-4 w-4" }, void 0)] }, void 0));
        },
        cell: ({ row }) => {
            const price = row.original.sellingPrices[0];
            return ((0, jsx_runtime_1.jsxs)("p", { className: "px-4", children: ["\u20B9 ", price.amount, " / ", price.unit] }, void 0));
        },
    },
    {
        accessorKey: 'stock',
        header: ({ column }) => {
            return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), children: ["Stock", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "ml-2 h-4 w-4" }, void 0)] }, void 0));
        },
        cell: ({ row }) => {
            const stockInPurchasedUnit = (0, convert_1.convertToPurchasedUnit)(row.original.stock, row.original.baseUnitValue);
            return ((0, jsx_runtime_1.jsxs)("p", { className: "px-4", children: [stockInPurchasedUnit, " ", row.original.purchasedUnit] }, void 0));
        },
    },
    {
        accessorKey: 'isActive',
        header: ({ column }) => {
            return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", className: "", onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'), children: ["Is Active", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpDown, { className: "ml-2 h-4 w-4" }, void 0)] }, void 0));
        },
        cell: ({ row }) => {
            const product = row.original;
            return ((0, jsx_runtime_1.jsx)("div", { className: "px-4", children: (0, jsx_runtime_1.jsx)(active_badge_1.ActivityBadge, { reorderPoint: product.reorderPoint, stock: product.stock, isActive: product.isActive }, void 0) }, void 0));
        },
    },
    {
        id: 'categoryName',
        accessorKey: 'category.name',
        header: 'Category',
        filterFn: (row, columnId, value) => {
            return value.includes(row.getValue(columnId));
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Open menu" }, void 0), (0, jsx_runtime_1.jsx)(lucide_react_1.MoreHorizontal, { className: "h-4 w-4" }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuLabel, { children: "Actions" }, void 0), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/admin/transactions/new", state: {
                                        transactionType: 'PURCHASE',
                                        ...row.original,
                                    }, children: "Make Purchase" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `${row.original.id}`, children: "View details" }, void 0) }, void 0)] }, void 0)] }, void 0));
        },
    },
];
//# sourceMappingURL=columns.js.map