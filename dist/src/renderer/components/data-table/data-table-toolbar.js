"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const lucide_react_1 = require("lucide-react");
const input_1 = require("@/renderer/components/ui/input");
const data_table_faced_filter_1 = require("@/renderer/components/data-table/data-table-faced-filter");
const button_1 = require("@/renderer/components/ui/button");
const dropdown_menu_1 = require("@/renderer/components/ui/dropdown-menu");
function DataTableToolbar({ table, filterLabel, filterAccessorKey, sorterAccessorKey, sorterLabel, sorterOptions, }) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center px-2 py-4", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: `Filter by ${filterLabel}...`, value: table
                    .getColumn(filterAccessorKey)
                    ?.getFilterValue() ?? '', onChange: (event) => {
                    table
                        .getColumn(filterAccessorKey)
                        ?.setFilterValue(event.target.value);
                }, className: "max-w-sm" }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "mx-4 space-x-2", children: [sorterAccessorKey &&
                        sorterOptions &&
                        table.getColumn(sorterAccessorKey) && ((0, jsx_runtime_1.jsx)(data_table_faced_filter_1.DataTableFacetedFilter, { column: table.getColumn(sorterAccessorKey), title: sorterLabel, options: sorterOptions }, void 0)), isFiltered && ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: () => table.resetColumnFilters(), children: ["Reset", (0, jsx_runtime_1.jsx)(react_icons_1.Cross2Icon, { className: "ml-2 h-4 w-4" }, void 0)] }, void 0))] }, void 0), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", className: "ml-auto hidden h-8 lg:flex", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SlidersHorizontal, { className: "mr-2 h-4 w-4" }, void 0), "View"] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: table
                            .getAllColumns()
                            .filter((column) => typeof column.accessorFn !== 'undefined' &&
                            column.getCanHide())
                            .map((column) => {
                            return ((0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuCheckboxItem, { className: "capitalize", checked: column.getIsVisible(), onCheckedChange: (value) => column.toggleVisibility(!!value), children: column.id }, column.id));
                        }) }, void 0)] }, void 0)] }, void 0));
}
exports.DataTableToolbar = DataTableToolbar;
//# sourceMappingURL=data-table-toolbar.js.map