"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_hot_toast_1 = require("react-hot-toast");
const Home_1 = __importDefault(require("@/renderer/pages/Home"));
const AdminDashboard_1 = __importDefault(require("@/renderer/pages/admin/AdminDashboard"));
const admin_1 = __importDefault(require("@/renderer/pages/admin"));
const Notfound_1 = __importDefault(require("@/renderer/pages/Notfound"));
const transactions_1 = __importDefault(require("@/renderer/pages/admin/transactions"));
const products_1 = __importDefault(require("@/renderer/pages/admin/products"));
const new_1 = __importDefault(require("@/renderer/pages/admin/products/new"));
const new_2 = __importDefault(require("@/renderer/pages/admin/transactions/new"));
const product_1 = __importDefault(require("@/renderer/pages/admin/products/product"));
function App() {
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.HashRouter, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", index: true, element: (0, jsx_runtime_1.jsx)(Home_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { path: "/admin", element: (0, jsx_runtime_1.jsx)(admin_1.default, {}, void 0), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(AdminDashboard_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "products", element: (0, jsx_runtime_1.jsx)(products_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "products/:id", element: (0, jsx_runtime_1.jsx)(product_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "products/new", element: (0, jsx_runtime_1.jsx)(new_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "transactions", element: (0, jsx_runtime_1.jsx)(transactions_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "transactions/new", element: (0, jsx_runtime_1.jsx)(new_2.default, {}, void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(Notfound_1.default, {}, void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(react_hot_toast_1.Toaster, {}, void 0)] }, void 0));
}
exports.default = App;
//# sourceMappingURL=app.js.map