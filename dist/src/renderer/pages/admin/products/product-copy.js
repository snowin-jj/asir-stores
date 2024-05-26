"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const products_1 = require("@/renderer/api/products");
const active_badge_1 = require("@/renderer/components/active-badge");
const button_1 = require("@/renderer/components/ui/button");
function ProductPage() {
    const { id } = (0, react_router_dom_1.useParams)();
    const [product, setProduct] = (0, react_1.useState)();
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
            // toast.success(res);
            // navigate(-1);
        }
    }
    if (!product)
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading..." }, void 0);
    return ((0, jsx_runtime_1.jsx)("main", { className: "mx-auto grid w-full place-items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full w-full max-w-6xl px-20 py-20", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "link", className: "mb-8 p-0", onClick: () => navigate(-1), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "mr-2 h-5 w-5" }, void 0), " Back"] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full justify-between gap-8 ", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-[60%] space-y-12", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: product.name }, void 0), (0, jsx_runtime_1.jsx)("p", { children: product.description }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "my-4 flex gap-8", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Created At" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: new Date(product.createdAt).toDateString() }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Updated At" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: new Date(product.updatedAt).toDateString() }, void 0)] }, void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/admin/products/edit/${product.id}`, children: "Edit Product" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/admin/transactions/new", state: {
                                                    transactionType: 'Purchase',
                                                    ...product,
                                                }, children: "Make Purchase" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "destructive", onClick: handleDelete, children: "Delete" }, void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto flex w-[40%] justify-center gap-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-fit space-y-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold", children: "Price" }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["\u20B9 ", Number(product.sellingPrices[0].amount)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "w-fit space-y-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold", children: "Quantity" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: product.stock }, void 0)] }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-fit space-y-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold", children: "Reorder Point" }, void 0), (0, jsx_runtime_1.jsx)("p", { children: product.reorderPoint }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "w-fit space-y-1", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold", children: "Is Active" }, void 0), (0, jsx_runtime_1.jsx)(active_badge_1.ActivityBadge, { reorderPoint: product.reorderPoint, stock: product.stock, isActive: product.isActive }, void 0)] }, void 0)] }, void 0)] }, void 0)] }, void 0)] }, void 0) }, void 0));
}
exports.default = ProductPage;
//# sourceMappingURL=product-copy.js.map