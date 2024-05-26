"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const button_1 = require("../ui/button");
function FormHeader({ title }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: title }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "secondary", onClick: () => navigate(-1), children: "Cancel" }, void 0)] }, void 0));
}
exports.default = FormHeader;
//# sourceMappingURL=form-header.js.map