"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const utils_1 = require("@/lib/utils");
const button_1 = require("@/renderer/components/ui/button");
const command_1 = require("@/renderer/components/ui/command");
const dialog_1 = require("@/renderer/components/ui/dialog");
const input_1 = require("@/renderer/components/ui/input");
const label_1 = require("@/renderer/components/ui/label");
const popover_1 = require("@/renderer/components/ui/popover");
const textarea_1 = require("./ui/textarea");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const categories_1 = require("@/renderer/api/categories");
function CategorySelector({ className, defaultCategory, disabled, updateCategory, }) {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [showNewCategoryDialog, setShowNewCategoryDialog] = (0, react_1.useState)(false);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)(defaultCategory || {
        id: 0,
        name: 'Select a category',
        description: '',
    });
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [categoryName, setCategoryName] = (0, react_1.useState)('');
    const [categoryDescription, setCategoryDescription] = (0, react_1.useState)('');
    const [creatingCategory, setCreatingCategory] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        (async () => {
            const data = JSON.parse(await window.api.getCategories());
            setCategories(data);
        })();
    }, []);
    async function handleSubmit() {
        if (categoryName !== '') {
            setCreatingCategory(true);
            try {
                const newCategory = await (0, categories_1.createCategory)({
                    name: categoryName,
                    description: categoryDescription === '' ? null : categoryDescription,
                });
                updateCategory(newCategory.id);
                setSelectedCategory(newCategory);
                setCategories((categories) => [...categories, newCategory]);
            }
            catch (error) {
                const e = error;
                react_hot_toast_1.default.error(e.message);
                throw new Error(e.message);
            }
            finally {
                setCreatingCategory(false);
                setShowNewCategoryDialog(false);
            }
        }
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: showNewCategoryDialog, onOpenChange: setShowNewCategoryDialog, children: [(0, jsx_runtime_1.jsxs)(popover_1.Popover, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", role: "combobox", "aria-expanded": open, "aria-label": "Select a category", className: (0, utils_1.cn)('min-w-[200px] justify-between', className), disabled: disabled, children: [selectedCategory.name, (0, jsx_runtime_1.jsx)(react_icons_1.CaretSortIcon, { className: "ml-auto h-4 w-4 shrink-0 opacity-50" }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "min-w-full p-0", children: (0, jsx_runtime_1.jsxs)(command_1.Command, { children: [(0, jsx_runtime_1.jsxs)(command_1.CommandList, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandInput, { placeholder: "Search category..." }, void 0), (0, jsx_runtime_1.jsx)(command_1.CommandEmpty, { children: "No team found." }, void 0), categories.map((category) => ((0, jsx_runtime_1.jsx)(command_1.CommandGroup, { className: "w-full", children: (0, jsx_runtime_1.jsxs)(command_1.CommandItem, { onSelect: () => {
                                                        setSelectedCategory(category);
                                                        updateCategory(category.id);
                                                        setOpen(false);
                                                    }, className: "text-sm", children: [category.name, (0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { className: (0, utils_1.cn)('ml-auto h-4 w-4', selectedCategory?.name ===
                                                                category.name
                                                                ? 'opacity-100'
                                                                : 'opacity-0') }, void 0)] }, category.name) }, category.id)))] }, void 0), (0, jsx_runtime_1.jsx)(command_1.CommandSeparator, {}, void 0), (0, jsx_runtime_1.jsx)(command_1.CommandList, { children: (0, jsx_runtime_1.jsx)(command_1.CommandGroup, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(command_1.CommandItem, { onSelect: () => {
                                                        setOpen(false);
                                                        setShowNewCategoryDialog(true);
                                                    }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.PlusCircledIcon, { className: "mr-2 h-5 w-5" }, void 0), "Create Category"] }, void 0) }, void 0) }, void 0) }, void 0)] }, void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create Category" }, void 0), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: "Add a new category to manage products." }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4 py-2 pb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "Category name" }, void 0), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", value: categoryName, onChange: (e) => setCategoryName(e.target.value), placeholder: "Painting Supplies" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "plan", children: "Description" }, void 0), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", value: categoryDescription, onChange: (e) => setCategoryDescription(e.target.value), placeholder: "Type the category description" }, void 0)] }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: () => setShowNewCategoryDialog(false), children: "Cancel" }, void 0), creatingCategory ? ((0, jsx_runtime_1.jsxs)(button_1.Button, { type: "submit", disabled: creatingCategory, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0), "Creating..."] }, void 0)) : ((0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: handleSubmit, children: "Create" }, void 0))] }, void 0)] }, void 0)] }, void 0) }, void 0));
}
exports.default = CategorySelector;
//# sourceMappingURL=category-selector.js.map