"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const badge_1 = require("./badge");
function Logo({ page, href, className, ...props }) {
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: href ?? '/', className: `flex items-center gap-2 text-3xl font-black ${className}`, ...props, children: ["Asir Stores", (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "mt-2", variant: "secondary", children: page || 'Admin' }, void 0)] }, void 0));
}
exports.default = Logo;
//# sourceMappingURL=logo.js.map