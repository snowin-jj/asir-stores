"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const index_1 = require("@/renderer/components/data-table/index");
const products_1 = require("@/renderer/api/products");
const columns_1 = require("@/renderer/pages/admin/products/columns");
const categories_1 = require("@/renderer/api/categories");
const button_1 = require("@/renderer/components/ui/button");
const react_router_dom_1 = require("react-router-dom");
function ProductsPage() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        (async () => {
            const data = await (0, products_1.getProductsWithDetails)();
            const categoriesData = await (0, categories_1.getCategoriesAsLabel)();
            setProducts(data);
            setCategories(categoriesData);
        })();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { className: 'container my-6 w-full', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-2xl font-bold', children: "Products Page" }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: '/admin/products/new', children: "New Product" }, void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(index_1.DataTable, { data: products, columns: columns_1.columns, filterAccessorKey: 'name', filterLabel: 'Product', sorterLabel: 'Category', sorterAccessorKey: 'categoryName', sorterOptions: categories }, void 0)] }, void 0));
}
exports.default = ProductsPage;
//# sourceMappingURL=index.js.map