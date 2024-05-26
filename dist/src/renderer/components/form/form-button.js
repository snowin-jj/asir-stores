"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const button_1 = require("../ui/button");
function FormButton({ loading, loadingText, btnText, disabled, }) {
    if (loading)
        return ((0, jsx_runtime_1.jsxs)(button_1.Button, { type: "submit", disabled: loading || disabled, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }, void 0), loadingText] }, void 0));
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: disabled, children: btnText }, void 0));
}
exports.default = FormButton;
//# sourceMappingURL=form-button.js.map