"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("./ui/button");
const logo_1 = __importDefault(require("./ui/logo"));
function Sidebar({ page, links }) {
    return ((0, jsx_runtime_1.jsxs)("main", { className: "flex min-h-full w-full max-w-[15rem] flex-col justify-between border-2 p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsx)(logo_1.default, { className: "pl-4", page: page }, void 0), (0, jsx_runtime_1.jsx)("nav", { className: "flex flex-col items-start gap-2", children: links.map((link, idx) => ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: link.to || '/', className: "w-full", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", className: "w-full justify-start", children: link.label }, void 0) }, `${link.label}-${idx}`))) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start gap-2", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/admin/settings", className: "w-full", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", className: "w-full justify-start", children: "Settings" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", className: "w-full justify-start", children: "Logout" }, void 0)] }, void 0)] }, void 0));
}
exports.Sidebar = Sidebar;
//# sourceMappingURL=sidebar.js.map