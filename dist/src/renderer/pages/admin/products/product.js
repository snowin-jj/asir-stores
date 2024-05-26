"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const react_router_dom_1 = require("react-router-dom");
const products_1 = require("@/renderer/api/products");
const button_1 = require("@/renderer/components/ui/button");
const product_form_1 = require("@/renderer/components/form/product-form");
function ProductPage() {
    const { id } = (0, react_router_dom_1.useParams)();
    const [product, setProduct] = (0, react_1.useState)();
    const [mode, setMode] = (0, react_1.useState)('VIEW');
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        (async () => {
            const data = await (0, products_1.getProduct)(Number(id));
            setProduct(data);
        })();
    }, []);
    async function handleDelete() {
        const choice = confirm(`Are you sure? Do you want to delete '${product?.name}'?`);
        if (choice) {
            const res = await (0, products_1.deleteProduct)(Number(product?.id));
            react_hot_toast_1.default.success(res);
            navigate(-1);
        }
    }
    function toggleMode() {
        setMode((prevState) => (prevState === 'EDIT' ? 'VIEW' : 'EDIT'));
    }
    if (!product)
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading..." }, void 0);
    return ((0, jsx_runtime_1.jsxs)("main", { className: "mx-auto w-full max-w-4xl space-y-4 py-8", children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex w-full items-center justify-between", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "link", className: "p-0", onClick: () => navigate(-1), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "mr-2 h-5 w-5" }, void 0), " Back"] }, void 0), mode === 'VIEW' ? ((0, jsx_runtime_1.jsxs)("div", { className: 'space-x-6', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'destructive', onClick: handleDelete, children: "Delete" }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: toggleMode, children: "Edit" }, void 0)] }, void 0)) : ((0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => navigate(0), children: "Cancel" }, void 0))] }, void 0), (0, jsx_runtime_1.jsx)(product_form_1.ProductForm, { mode: mode, payload: product }, void 0)] }, void 0));
}
exports.default = ProductPage;
//# sourceMappingURL=product.js.map