"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsWithDetails = exports.getTransactions = exports.createTransaction = void 0;
async function createTransaction(payload) {
    try {
        const res = await window.api.createTransaction({
            productId: payload.productId,
            quantity: payload.quantity,
            transactionType: payload.transactionType,
        });
        const data = JSON.parse(res);
        return data;
    }
    catch (error) {
        const e = error;
        console.log(e.message);
        throw new Error(e.message);
    }
}
exports.createTransaction = createTransaction;
async function getTransactions() {
    try {
        const res = await window.api.getTransactions();
        const transactions = JSON.parse(res);
        return transactions;
    }
    catch (error) {
        const e = error;
        console.log(e.message);
        throw new Error(e.message);
    }
}
exports.getTransactions = getTransactions;
async function getTransactionsWithDetails() {
    try {
        const res = await window.api.getTransactionsWithDetails();
        const transactions = JSON.parse(res);
        return transactions;
    }
    catch (error) {
        const e = error;
        console.log(e.message);
        throw new Error(e.message);
    }
}
exports.getTransactionsWithDetails = getTransactionsWithDetails;
//# sourceMappingURL=transactions.js.map