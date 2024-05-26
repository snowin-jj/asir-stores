"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_1 = require("react");
const react_table_1 = require("@tanstack/react-table");
const table_1 = require("@/renderer/components/ui/table");
const data_table_toolbar_1 = require("@/renderer/components/data-table/data-table-toolbar");
function DataTable({ data, columns, filterLabel, sorterAccessorKey, sorterOptions, filterAccessorKey, sorterLabel, }) {
    const [sorting, setSorting] = (0, react_1.useState)([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = (0, react_1.useState)({});
    const table = (0, react_table_1.useReactTable)({
        data,
        columns,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
        onSortingChange: setSorting,
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: (0, react_table_1.getFilteredRowModel)(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(data_table_toolbar_1.DataTableToolbar, { table: table, filterLabel: filterLabel, sorterLabel: sorterLabel, filterAccessorKey: filterAccessorKey, sorterAccessorKey: sorterAccessorKey, sorterOptions: sorterOptions }, void 0), (0, jsx_runtime_1.jsx)("div", { className: 'mt-4 rounded-md border p-4', children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: table.getHeaderGroups().map((headerGroup) => ((0, jsx_runtime_1.jsx)(table_1.TableRow, { children: headerGroup.headers.map((header) => {
                                    return ((0, jsx_runtime_1.jsx)(table_1.TableHead, { children: header.isPlaceholder
                                            ? null
                                            : (0, react_table_1.flexRender)(header.column.columnDef
                                                .header, header.getContext()) }, header.id));
                                }) }, headerGroup.id))) }, void 0), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => ((0, jsx_runtime_1.jsx)(table_1.TableRow, { "data-state": row.getIsSelected() && 'selected', children: row.getVisibleCells().map((cell) => ((0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) : ((0, jsx_runtime_1.jsx)(table_1.TableRow, { children: (0, jsx_runtime_1.jsx)(table_1.TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }, void 0) }, void 0)) }, void 0)] }, void 0) }, void 0)] }, void 0));
}
exports.DataTable = DataTable;
//# sourceMappingURL=index.js.map