"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeVariants = exports.Badge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const utils_1 = require("@/lib/utils");
const badgeVariants = (0, class_variance_authority_1.cva)('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
            secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            warning: 'border-transparent bg-warning text-yellow-900 hover:bg-warning/80',
            outline: 'text-foreground',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
exports.badgeVariants = badgeVariants;
function Badge({ className, variant, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(badgeVariants({ variant }), className), ...props }, void 0));
}
exports.Badge = Badge;
//# sourceMappingURL=badge.js.map