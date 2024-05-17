import { IpcMainInvokeEvent } from 'electron';

import knex from '../lib/db';
import { TransactionPayload } from '../types/transaction';
import { TABLES } from '../utils/constants';
import { Product } from '../types/product';

export async function createTransaction(
    _: IpcMainInvokeEvent,
    payload: TransactionPayload,
) {
    const trx = await knex.transaction();

    try {
        const product: Product = await trx(TABLES.PRODUCTS)
            .select('*')
            .where('id', payload.productId)
            .first();

        if (!product) throw new Error('Product not found.');

        const transactionId = (
            await trx(TABLES.TRANSACTIONS).insert(payload)
        )[0];

        if (
            payload.transactionType === 'PURCHASE' ||
            payload.transactionType === 'RETURN'
        ) {
            await trx(TABLES.PRODUCTS)
                .where('id', product.id)
                .increment('stock', payload.quantity);
        } else {
            await trx(TABLES.PRODUCTS)
                .where('id', product.id)
                .decrement('stock', payload.quantity);
        }

        const createdTransaction = await trx(TABLES.TRANSACTIONS)
            .where('id', transactionId)
            .first();

        await trx.commit();
        return JSON.stringify(createdTransaction);
    } catch (error) {
        await trx.rollback();
        const e = error as Error;
        console.log(e);
        return 'Failed to create transaction';
    }
}

export async function getTransactions() {
    try {
        const transactions = await knex(TABLES.TRANSACTIONS).select('*');
        return JSON.stringify(transactions);
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return 'Failed to get transactions';
    }
}
