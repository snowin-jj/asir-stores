"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const index_1 = require("@/renderer/components/data-table/index");
const columns_1 = require("./columns");
const transactions_1 = require("@/renderer/api/transactions");
const ui_1 = require("@/renderer/data/ui");
function TransactionsPage() {
    const [transactions, setTransactions] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        (async () => {
            const data = await (0, transactions_1.getTransactionsWithDetails)();
            console.log(data);
            setTransactions(data);
        })();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("main", { className: 'container my-6 w-full', children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-2xl font-bold', children: "Transactions Page" }, void 0), (0, jsx_runtime_1.jsx)(index_1.DataTable, { data: transactions, columns: columns_1.columns, filterAccessorKey: 'product_name', filterLabel: 'Product Name', sorterLabel: 'Transaction Type', sorterAccessorKey: 'transactionType', sorterOptions: ui_1.transactionTypes }, void 0)] }, void 0));
}
exports.default = TransactionsPage;
//# sourceMappingURL=index.js.map