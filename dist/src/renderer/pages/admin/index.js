"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const sidebar_1 = require("@/renderer/components/sidebar");
const ui_1 = require("@/renderer/data/ui");
function AdminLayout() {
    return ((0, jsx_runtime_1.jsxs)("main", { className: 'flex min-h-screen', children: [(0, jsx_runtime_1.jsx)(sidebar_1.Sidebar, { links: ui_1.adminPageSidebarLinks, page: 'Admin' }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}, void 0)] }, void 0));
}
exports.default = AdminLayout;
//# sourceMappingURL=index.js.map