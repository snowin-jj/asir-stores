"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const badge_1 = require("./ui/badge");
function ActivityBadge({ isActive, reorderPoint, stock, }) {
    let statusColor;
    if (stock <= reorderPoint)
        statusColor = 'bg-yellow-200 text-yellow-800';
    if (stock <= 1)
        statusColor = 'bg-red-200 text-red-800';
    return ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: stock <= 1
            ? 'destructive'
            : stock <= reorderPoint
                ? 'warning'
                : isActive
                    ? 'default'
                    : 'secondary', children: isActive ? 'Active' : 'Inactive' }, void 0));
}
exports.ActivityBadge = ActivityBadge;
//# sourceMappingURL=active-badge.js.map