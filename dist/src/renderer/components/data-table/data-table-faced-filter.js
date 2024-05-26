"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableFacetedFilter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const utils_1 = require("@/lib/utils");
const badge_1 = require("@/renderer/components/ui/badge");
const button_1 = require("@/renderer/components/ui/button");
const command_1 = require("@/renderer/components/ui/command");
const popover_1 = require("@/renderer/components/ui/popover");
const separator_1 = require("@/renderer/components/ui/separator");
function DataTableFacetedFilter({ column, title, options, }) {
    const facets = column?.getFacetedUniqueValues();
    const selectedValues = new Set(column?.getFilterValue());
    return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", children: [(0, jsx_runtime_1.jsx)(react_icons_1.PlusCircledIcon, { className: "mr-2 h-4 w-4" }, void 0), title, selectedValues?.size > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(separator_1.Separator, { orientation: "vertical", className: "mx-2 h-4" }, void 0), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "rounded-sm px-1 font-normal lg:hidden", children: selectedValues.size }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "hidden space-x-1 lg:flex", children: selectedValues.size > 2 ? ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "secondary", className: "rounded-sm px-1 font-normal", children: [selectedValues.size, " selected"] }, void 0)) : (options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "rounded-sm px-1 font-normal", children: option.label }, option.value)))) }, void 0)] }, void 0))] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "w-[200px] p-0", align: "start", children: (0, jsx_runtime_1.jsxs)(command_1.Command, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandInput, { placeholder: title }, void 0), (0, jsx_runtime_1.jsxs)(command_1.CommandList, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandEmpty, { children: "No results found." }, void 0), (0, jsx_runtime_1.jsx)(command_1.CommandGroup, { children: options.map((option) => {
                                        const isSelected = selectedValues.has(option.value);
                                        return ((0, jsx_runtime_1.jsxs)(command_1.CommandItem, { onSelect: () => {
                                                if (isSelected) {
                                                    selectedValues.delete(option.value);
                                                }
                                                else {
                                                    selectedValues.add(option.value);
                                                }
                                                const filterValues = Array.from(selectedValues);
                                                column?.setFilterValue(filterValues.length
                                                    ? filterValues
                                                    : undefined);
                                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', isSelected
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'opacity-50 [&_svg]:invisible'), children: (0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { className: (0, utils_1.cn)('h-4 w-4') }, void 0) }, void 0), option.icon && ((0, jsx_runtime_1.jsx)(option.icon, { className: "mr-2 h-4 w-4 text-muted-foreground" }, void 0)), (0, jsx_runtime_1.jsx)("span", { children: option.label }, void 0), facets?.get(option.value) && ((0, jsx_runtime_1.jsx)("span", { className: "ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs", children: facets.get(option.value) }, void 0))] }, option.value));
                                    }) }, void 0), selectedValues.size > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandSeparator, {}, void 0), (0, jsx_runtime_1.jsx)(command_1.CommandGroup, { children: (0, jsx_runtime_1.jsx)(command_1.CommandItem, { onSelect: () => column?.setFilterValue(undefined), className: "justify-center text-center", children: "Clear filters" }, void 0) }, void 0)] }, void 0))] }, void 0)] }, void 0) }, void 0)] }, void 0));
}
exports.DataTableFacetedFilter = DataTableFacetedFilter;
//# sourceMappingURL=data-table-faced-filter.js.map