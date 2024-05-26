"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const form_1 = require("@/renderer/components/ui/form");
const input_1 = require("@/renderer/components/ui/input");
const textarea_1 = require("@/renderer/components/ui/textarea");
const category_selector_1 = __importDefault(require("@/renderer/components/category-selector"));
const switch_1 = require("@/renderer/components/ui/switch");
const form_button_1 = __importDefault(require("@/renderer/components/form/form-button"));
const button_1 = require("@/renderer/components/ui/button");
const lucide_react_1 = require("lucide-react");
const ui_1 = require("@/renderer/data/ui");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("zod");
const zod_2 = require("@hookform/resolvers/zod");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const products_1 = require("@/renderer/api/products");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const sellingPricesSchema = zod_1.z
    .array(zod_1.z.object({
    amount: zod_1.z.number(),
    unit: zod_1.z.string(),
    taxValue: zod_1.z.number(),
    quantity: zod_1.z.number(),
}))
    .min(1);
const formSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    purchasedPrice: zod_1.z.number(),
    purchasedUnit: zod_1.z.string(),
    purchasedUnitValue: zod_1.z.number(),
    baseUnit: zod_1.z.string(),
    baseUnitValue: zod_1.z.number(),
    stock: zod_1.z.number(),
    reorderPoint: zod_1.z.number(),
    categoryId: zod_1.z.number(),
    isActive: zod_1.z.boolean(),
});
function ProductForm({ mode, payload }) {
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(formSchema),
        defaultValues: {
            name: payload?.name,
            description: payload?.description || '',
            purchasedPrice: payload?.purchasedPrice,
            purchasedUnit: payload?.purchasedUnit,
            purchasedUnitValue: payload?.purchasedUnitValue,
            baseUnit: payload?.baseUnit,
            baseUnitValue: payload?.baseUnitValue,
            reorderPoint: payload?.reorderPoint,
            stock: payload?.stock,
            // @ts-ignore
            isActive: payload ? (payload.isActive === 0 ? false : true) : false,
            categoryId: payload?.categoryId,
        },
    });
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const prices = payload && payload.sellingPrices && payload.sellingPrices.length > 0
        ? payload.sellingPrices
        : [{ quantity: '', unit: '', amount: '', taxValue: '' }];
    const [rows, setRows] = (0, react_1.useState)(prices);
    function updateCategory(categoryId) {
        form.setValue('categoryId', categoryId);
    }
    async function onSubmit(values) {
        try {
            setLoading(true);
            const sellingPrices = await sellingPricesSchema.parseAsync(rows);
            if (mode === 'CREATE') {
                console.log(values);
                const product = await (0, products_1.createProduct)({
                    ...values,
                    sellingPrices,
                });
                react_hot_toast_1.default.success('Product added successfully');
                navigate('/admin/products');
            }
            else if (mode === 'EDIT') {
                const res = await (0, products_1.updateProduct)(payload.id, {
                    name: values.name,
                    categoryId: values.categoryId,
                    description: values.description,
                    stock: values.stock,
                    reorderPoint: values.reorderPoint,
                    baseUnit: values.baseUnit,
                    baseUnitValue: values.baseUnitValue,
                    isActive: values.isActive,
                    sellingPrices,
                    purchasedPrice: values.purchasedPrice,
                    purchasedUnit: values.purchasedUnit,
                    purchasedUnitValue: values.purchasedUnitValue,
                });
                react_hot_toast_1.default.success(res);
                navigate('/admin/products');
            }
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                console.log(error);
                error.errors.forEach((err) => {
                    react_hot_toast_1.default.error(`${err.path[1]}: ${err.message}`);
                });
                return;
            }
            const e = error;
            console.log(e);
            react_hot_toast_1.default.error(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    function addRow() {
        setRows((prevState) => [
            ...prevState,
            { quantity: '', unit: '', amount: '', taxValue: '' },
        ]);
    }
    function handleInputChange(index, columnName, value) {
        const newRows = rows.map((row, idx) => {
            if (idx === index) {
                return { ...row, [columnName]: value };
            }
            return row;
        });
        setRows(newRows);
    }
    function handleRemoveRow(idx) {
        setRows((prevState) => prevState.filter((r, rowIdx) => rowIdx !== idx));
    }
    return ((0, jsx_runtime_1.jsx)(form_1.Form, { ...form, children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex w-full max-w-4xl flex-col items-start justify-center space-y-8 self-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-start justify-center gap-14", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full space-y-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "name", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Name" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "text", placeholder: "Product Name", autoFocus: true, "aria-selected": true, disabled: mode === 'VIEW' }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "description", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Description" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { ...field, placeholder: "Product description", disabled: mode === 'VIEW' }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "purchasedPrice", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Purchased Price" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "number", placeholder: "Enter the price of the product", disabled: mode === 'VIEW', onChange: (e) => form.setValue('purchasedPrice', e.currentTarget
                                                        .valueAsNumber) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "purchasedUnit", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Purchased Unit" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "text", placeholder: "Enter the purchased unit of the product", disabled: mode === 'VIEW', onChange: (e) => form.setValue('purchasedUnit', e.currentTarget.value) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "purchasedUnitValue", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Purchased Unit Value" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "number", placeholder: "Enter the purchased unit Value of the product", disabled: mode === 'VIEW', onChange: (e) => form.setValue('purchasedUnitValue', e.currentTarget
                                                        .valueAsNumber) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "w-full space-y-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "stock", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Stock Level in Purchased Unit" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "number", placeholder: "Stock", disabled: mode === 'EDIT' ||
                                                        mode === 'VIEW', onChange: (e) => form.setValue('stock', e.currentTarget
                                                        .valueAsNumber) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "categoryId", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex flex-col gap-3", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Category" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(category_selector_1.default, { disabled: mode === 'VIEW', defaultCategory: payload
                                                        ? {
                                                            id: payload.categoryId,
                                                            name: payload
                                                                ?.category.name,
                                                            description: payload?.category
                                                                .description,
                                                        }
                                                        : null, updateCategory: updateCategory }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "reorderPoint", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Reorder Point" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "number", placeholder: "Enter Reorder Point", disabled: mode === 'VIEW', onChange: (e) => form.setValue('reorderPoint', e.currentTarget
                                                        .valueAsNumber) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "baseUnit", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Base Unit" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "text", placeholder: "Enter Base Unit", disabled: mode === 'VIEW', onChange: (e) => form.setValue('baseUnit', e.currentTarget.value) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "baseUnitValue", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Base Unit Value" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { ...field, type: "number", placeholder: "Enter Base Unit Value", disabled: mode === 'VIEW', onChange: (e) => form.setValue('baseUnitValue', e.currentTarget
                                                        .valueAsNumber) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(SellingPrices, { rows: rows, addRow: addRow, handleRemoveRow: handleRemoveRow, handleInputChange: handleInputChange, disabled: mode === 'VIEW', mode: mode }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center justify-between", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "isActive", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex flex-col items-start gap-2", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Is Active" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { disabled: mode === 'VIEW', checked: field.value, onCheckedChange: field.onChange }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_button_1.default, { disabled: mode === 'VIEW', loading: loading, loadingText: mode === 'CREATE' ? 'Creating...' : 'Updating...', btnText: mode === 'CREATE' ? 'Create' : 'Save' }, void 0)] }, void 0)] }, void 0) }, void 0));
}
exports.ProductForm = ProductForm;
function SellingPrices({ rows, addRow, handleInputChange, handleRemoveRow, disabled, mode, }) {
    async function handleDeletePrice(rowIndex, priceId) {
        try {
            if (mode === 'EDIT') {
                const res = await (0, products_1.deletePrice)(priceId);
                react_hot_toast_1.default.success(res);
            }
            handleRemoveRow(rowIndex);
        }
        catch (error) {
            const e = error;
            console.log(e);
            react_hot_toast_1.default.error(e.message);
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'font-bold', children: "Selling Prices" }, void 0), rows.map((row, rowIndex) => ((0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-8', children: [ui_1.sellingPricesColumns.map((col, colIndex) => ((0, jsx_runtime_1.jsx)(input_1.Input, { type: col.type, placeholder: `Enter the ${col.label}`, disabled: disabled, 
                        // @ts-ignore
                        value: row[col.name], onChange: (e) => handleInputChange(rowIndex, col.name, col.type === 'number'
                            ? e.target.valueAsNumber
                            : e.target.value) }, colIndex))), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'destructive', type: 'button', disabled: disabled, onClick: () => 
                        // @ts-ignore
                        handleDeletePrice(rowIndex, row.id), children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {}, void 0) }, void 0)] }, rowIndex))), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'secondary', type: 'button', disabled: disabled, onClick: addRow, children: "Add" }, void 0)] }, void 0));
}
//# sourceMappingURL=product-form.js.map