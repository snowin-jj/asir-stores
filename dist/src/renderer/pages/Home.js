"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("@/renderer/components/ui/button");
function HomePage() {
    return ((0, jsx_runtime_1.jsx)("main", { className: 'container grid min-h-screen place-items-center', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col gap-2', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/sales", children: "Sales Page" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { asChild: true, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/admin", children: "Admin Page" }, void 0) }, void 0)] }, void 0) }, void 0));
}
exports.default = HomePage;
//# sourceMappingURL=Home.js.map