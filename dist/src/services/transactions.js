"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsWithDetails = exports.getTransactions = exports.createTransaction = void 0;
const db_1 = __importDefault(require("../lib/db"));
const constants_1 = require("../utils/constants");
const convert_1 = require("../utils/convert");
async function createTransaction(payload, t) {
    const trx = t || (await db_1.default.transaction());
    try {
        const product = await trx(constants_1.TABLES.PRODUCTS)
            .select('*')
            .where('id', payload.productId)
            .first();
        if (!product)
            throw new Error('Product not found.');
        const transactionId = (await trx(constants_1.TABLES.TRANSACTIONS).insert(payload))[0];
        // TODO: Check if the PurchasedUnitValues works on sales
        const productQuantity = (0, convert_1.convertToBaseUnit)(payload.quantity, product.baseUnitValue, product.purchasedUnitValue);
        if (payload.transactionType === 'PURCHASE' ||
            payload.transactionType === 'RETURN') {
            await trx(constants_1.TABLES.PRODUCTS)
                .where('id', product.id)
                .increment('stock', productQuantity);
        }
        else {
            await trx(constants_1.TABLES.PRODUCTS)
                .where('id', product.id)
                .decrement('stock', productQuantity);
        }
        const createdTransaction = await trx(constants_1.TABLES.TRANSACTIONS)
            .where('id', transactionId)
            .first();
        if (!t)
            await trx.commit();
        return JSON.stringify(createdTransaction);
    }
    catch (error) {
        if (!t)
            await trx.rollback();
        const e = error;
        console.log(e);
        return 'Failed to create transaction';
    }
}
exports.createTransaction = createTransaction;
async function getTransactions() {
    try {
        const transactions = await (0, db_1.default)(constants_1.TABLES.TRANSACTIONS).select('*');
        return JSON.stringify(transactions);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to get transactions';
    }
}
exports.getTransactions = getTransactions;
async function getTransactionsWithDetails() {
    try {
        const transaction = await (0, db_1.default)(constants_1.TABLES.TRANSACTIONS).select('*');
        const transactionsWithDetails = await Promise.all(transaction.map(async (transaction) => {
            const product = await (0, db_1.default)(constants_1.TABLES.PRODUCTS)
                .select('*')
                .where('id', transaction.productId)
                .first();
            return {
                ...transaction,
                product,
            };
        }));
        return JSON.stringify(transactionsWithDetails);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to get transactions with details';
    }
}
exports.getTransactionsWithDetails = getTransactionsWithDetails;
//# sourceMappingURL=transactions.js.map