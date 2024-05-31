import type Knex from 'knex';

import knex from '../lib/db';
import type { Transaction, TransactionPayload } from '../types/transaction';
import { TABLES } from '../utils/constants';
import type { Product } from '../types/product';
import { convertToBaseUnit } from '../utils/formatters';
import { getProduct } from './products';

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
            await trx<TransactionPayload>(TABLES.TRANSACTIONS).insert(payload)
        )[0];

        const productQuantity = Number(
            convertToBaseUnit(payload.quantity, product.baseUnitValue),
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

        if (!t) await trx.commit();
        return JSON.stringify('Transaction Completed');
    } catch (error) {
        if (!t) await trx.rollback();
        const e = error as Error;
        console.log(e);
        return JSON.parse('Failed to create transaction');
    }
}

export async function getTransactions() {
    try {
        const transactions = await knex(TABLES.TRANSACTIONS).select('*');
        return JSON.stringify(transactions);
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to get transactions');
    }
}

export async function getTransaction(transactionId: number) {
    try {
        const transaction: Transaction = await knex(TABLES.TRANSACTIONS)
            .select('*')
            .where('id', transactionId)
            .first();
        const product = JSON.parse(
            await getProduct(transaction.productId),
        ) as Product;
        let price = null;
        if (transaction.priceId) {
            price = await knex(TABLES.PRICES)
                .select('*')
                .where('id', transaction.priceId)
                .first();
        }
        return JSON.stringify({ ...transaction, product, price });
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to get transaction');
    }
}

export async function getTransactionsWithDetails() {
    try {
        const transaction: Transaction[] = await knex(TABLES.TRANSACTIONS)
            .select('*')
            .orderBy('transactionDate', 'desc');
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
        return JSON.stringify('Failed to get transactions with details');
    }
}
