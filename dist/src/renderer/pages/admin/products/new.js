"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const form_header_1 = __importDefault(require("@/renderer/components/form/form-header"));
const product_form_1 = require("@/renderer/components/form/product-form");
function NewProductPage() {
    return ((0, jsx_runtime_1.jsxs)("main", { className: "flex w-full flex-col gap-14 px-8 py-4", children: [(0, jsx_runtime_1.jsx)(form_header_1.default, { title: "New Product" }, void 0), (0, jsx_runtime_1.jsx)(product_form_1.ProductForm, { mode: 'CREATE' }, void 0)] }, void 0));
}
exports.default = NewProductPage;
//# sourceMappingURL=new.js.map