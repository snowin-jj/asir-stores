"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const zod_1 = require("zod");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("@hookform/resolvers/zod");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/renderer/components/ui/button");
const select_1 = require("@/renderer/components/ui/select");
const form_1 = require("@/renderer/components/ui/form");
const input_1 = require("@/renderer/components/ui/input");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const popover_1 = require("@/renderer/components/ui/popover");
const utils_1 = require("@/lib/utils");
const products_1 = require("@/renderer/api/products");
const command_1 = require("@/renderer/components/ui/command");
const transactions_1 = require("@/renderer/api/transactions");
const label_1 = require("@/renderer/components/ui/label");
const convert_1 = require("@/utils/convert");
const formSchema = zod_1.z.object({
    productId: zod_1.z.number(),
    quantity: zod_1.z.number(),
    transactionType: zod_1.z.enum(['PURCHASE', 'SALE', 'RETURN']),
});
function NewTransactionPage() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const passedProduct = location.state;
    (0, react_1.useEffect)(() => {
        (async () => {
            const productsData = await (0, products_1.getProducts)();
            setProducts(productsData);
        })();
    }, []);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(formSchema),
        defaultValues: {
            productId: passedProduct?.id,
            transactionType: passedProduct?.transactionType || 'PURCHASE',
        },
    });
    async function onSubmit(values) {
        console.log(values);
        try {
            setLoading(true);
            if (Number(values.quantity) <= 0) {
                throw new Error('The quantity must be greater than 0 in order to make a transaction.');
            }
            const res = await (0, transactions_1.createTransaction)({
                productId: values.productId,
                quantity: values.quantity,
                transactionType: values.transactionType,
            });
            react_hot_toast_1.default.success('Transaction completed');
            navigate('/admin/transactions');
        }
        catch (error) {
            const e = error;
            react_hot_toast_1.default.error(e.message);
            throw new Error(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    function getCurrentStock(productId) {
        const product = products.find((product) => product.id === productId);
        if (!product)
            return 0;
        return `${(0, convert_1.convertToPurchasedUnit)(product.stock, product.baseUnitValue)} ${product.purchasedUnit}`;
    }
    return ((0, jsx_runtime_1.jsxs)("main", { className: "flex w-full flex-col gap-14 px-8 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "New Transaction" }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "secondary", onClick: () => navigate(-1), children: "Cancel" }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(form_1.Form, { ...form, children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex w-full max-w-4xl flex-col items-start justify-center space-y-8 self-center", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "productId", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "flex w-full flex-col", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Product" }, void 0), (0, jsx_runtime_1.jsxs)(popover_1.Popover, { children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", role: "combobox", className: (0, utils_1.cn)('min-w-[200px] justify-between', !field.value &&
                                                            'text-muted-foreground'), children: [field.value
                                                                ? products.find((product) => product.id ===
                                                                    field.value)?.name
                                                                : 'Select product', (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" }, void 0)] }, void 0) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, { className: "min-w-[200px] p-0", align: "end", children: (0, jsx_runtime_1.jsx)(command_1.Command, { children: (0, jsx_runtime_1.jsxs)(command_1.CommandList, { children: [(0, jsx_runtime_1.jsx)(command_1.CommandInput, { placeholder: "Search product..." }, void 0), (0, jsx_runtime_1.jsx)(command_1.CommandEmpty, { children: "No product found." }, void 0), (0, jsx_runtime_1.jsx)(command_1.CommandGroup, { children: products.map((product) => ((0, jsx_runtime_1.jsxs)(command_1.CommandItem, { value: product.name, onSelect: () => {
                                                                        form.setValue('productId', product.id);
                                                                    }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: (0, utils_1.cn)('mr-2 h-4 w-4', product.id ===
                                                                                field.value
                                                                                ? 'opacity-100'
                                                                                : 'opacity-0') }, void 0), product.name] }, product.id))) }, void 0)] }, void 0) }, void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 pt-4", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "Current Stock:" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: getCurrentStock(field.value) }, void 0)] }, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "quantity", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "w-full", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Quantity" }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", placeholder: "Product quantity", min: 0, ...field, onChange: (e) => form.setValue('quantity', e.currentTarget.valueAsNumber) }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "transactionType", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: "w-full", children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Transaction Type" }, void 0), (0, jsx_runtime_1.jsxs)(select_1.Select, { disabled: true, onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: `Select a transaction type` }, void 0) }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "PURCHASE", children: "PURCHASE" }, void 0), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "SALE", children: "SALE" }, void 0), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "RETURN", children: "RETURN" }, void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}, void 0)] }, void 0)) }, void 0), loading ? ((0, jsx_runtime_1.jsxs)(button_1.Button, { type: "submit", disabled: loading, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0), "Making..."] }, void 0)) : ((0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: "Make Transaction" }, void 0))] }, void 0) }, void 0)] }, void 0));
}
exports.default = NewTransactionPage;
//# sourceMappingURL=new.js.map