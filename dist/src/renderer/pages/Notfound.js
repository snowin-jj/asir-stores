"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/renderer/components/ui/button");
const react_router_dom_1 = require("react-router-dom");
function NotfoundPage() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    function handleGoBack() {
        navigate(-1);
    }
    return ((0, jsx_runtime_1.jsx)("main", { className: 'grid min-h-screen place-items-center', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2 text-center', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl', children: "The Page you are looking for is not not found!" }, void 0), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleGoBack, children: "Go Back" }, void 0)] }, void 0) }, void 0));
}
exports.default = NotfoundPage;
//# sourceMappingURL=Notfound.js.map