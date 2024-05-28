import {
    Transaction,
    TransactionPayload,
    TransactionWithProduct,
} from '@/types/transaction';

export async function createTransaction(payload: TransactionPayload) {
    try {
        const res = JSON.parse(
            await window.api.createTransaction({
                productId: payload.productId,
                quantity: payload.quantity,
                transactionType: payload.transactionType,
            }),
        );
        return res;
    } catch (error) {
        const e = error as Error;
        console.log(e.message);
        throw new Error(e.message);
    }
}

export async function getTransactions() {
    try {
        const res = await window.api.getTransactions();
        const transactions = JSON.parse(res) as Transaction[];
        return transactions;
    } catch (error) {
        const e = error as Error;
        console.log(e.message);
        throw new Error(e.message);
    }
}

export async function getTransaction(transactionId: number) {
    try {
        const res = await window.api.getTransaction(transactionId);
        const transactions = JSON.parse(res) as TransactionWithProduct;
        return transactions;
    } catch (error) {
        const e = error as Error;
        console.log(e.message);
        throw new Error(e.message);
    }
}

export async function getTransactionsWithDetails() {
    try {
        const res = await window.api.getTransactionsWithDetails();
        const transactions = JSON.parse(res) as TransactionWithProduct[];
        return transactions;
    } catch (error) {
        const e = error as Error;
        console.log(e.message);
        throw new Error(e.message);
    }
}
