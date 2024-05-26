import type Knex from 'knex';

import knex from '../lib/db';
import type { Transaction, TransactionPayload } from '../types/transaction';
import { TABLES } from '../utils/constants';
import type { Product } from '../types/product';
import { convertToBaseUnit } from '../utils/convert';

export async function createTransaction(
    payload: TransactionPayload,
    t?: Knex.Knex.Transaction<any, any[]>,
) {
    const trx = t || (await knex.transaction());

    try {
        const product: Product = await trx(TABLES.PRODUCTS)
            .select('*')
            .where('id', payload.productId)
            .first();

        if (!product) throw new Error('Product not found.');

        const transactionId = (
            await trx(TABLES.TRANSACTIONS).insert(payload)
        )[0];

        // TODO: Check if the PurchasedUnitValues works on sales
        const productQuantity = convertToBaseUnit(
            payload.quantity,
            product.baseUnitValue,
            product.purchasedUnitValue,
        );

        if (
            payload.transactionType === 'PURCHASE' ||
            payload.transactionType === 'RETURN'
        ) {
            await trx(TABLES.PRODUCTS)
                .where('id', product.id)
                .increment('stock', productQuantity);
        } else {
            await trx(TABLES.PRODUCTS)
                .where('id', product.id)
                .decrement('stock', productQuantity);
        }

        const createdTransaction = await trx(TABLES.TRANSACTIONS)
            .where('id', transactionId)
            .first();

        if (!t) await trx.commit();
        return JSON.stringify(createdTransaction);
    } catch (error) {
        if (!t) await trx.rollback();
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

export async function getTransactionsWithDetails() {
    try {
        const transaction: Transaction[] = await knex(
            TABLES.TRANSACTIONS,
        ).select('*');
        const transactionsWithDetails = await Promise.all(
            transaction.map(async (transaction) => {
                const product = await knex<Product>(TABLES.PRODUCTS)
                    .select('*')
                    .where('id', transaction.productId)
                    .first();
                return {
                    ...transaction,
                    product,
                };
            }),
        );
        return JSON.stringify(transactionsWithDetails);
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return 'Failed to get transactions with details';
    }
}
