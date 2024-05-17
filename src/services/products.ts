import { IpcMainInvokeEvent } from 'electron';

import knex from '../lib/db';
import { TABLES } from '../utils/constants';
import type { ProductPayload } from '../types/product';
import type { TransactionPayload } from '../types/transaction';
import { getProductsWithPriceAndCategory } from '../utils/product';

export async function createProduct(
    _: IpcMainInvokeEvent,
    payload: ProductPayload,
) {
    const trx = await knex.transaction();

    try {
        const ids = await trx<ProductPayload>(TABLES.PRODUCTS).insert({
            name: payload.name,
            description: payload.description,
            purchasedPrice: payload.purchasedPrice,
            purchasedUnit: payload.purchasedUnit,
            categoryId: payload.categoryId,
            stock: payload.stock,
            reorderPoint: payload.reorderPoint,
            taxValue: payload.taxValue,
            isActive: payload.isActive,
        });

        await Promise.all(
            payload.sellingPrices.map((price) => {
                return trx(TABLES.PRICES).insert({
                    ...price,
                    productId: ids[0],
                });
            }),
        );

        await trx<TransactionPayload>(TABLES.TRANSACTIONS).insert({
            quantity: payload.stock,
            productId: ids[0],
            transactionType: 'PURCHASE',
        });

        const createdProduct = await trx(TABLES.PRODUCTS)
            .where('id', ids[0])
            .first();

        await trx.commit();
        return JSON.stringify(createdProduct);
    } catch (error) {
        await trx.rollback();
        const e = error as Error;
        console.log(e);
        return 'Failed to create product.';
    }
}

export async function getProducts() {
    try {
        const products = await knex(TABLES.PRODUCTS)
            .select('products.*')
            .innerJoin(TABLES.PRICES, 'products.id', 'prices.productId')
            .innerJoin(
                TABLES.CATEGORIES,
                'products.categoryId',
                'categories.id',
            )
            .select(
                'prices.id as priceId',
                'prices.amount',
                'prices.unit',
                'categories.name as categoryName',
                'categories.description as categoryDescription',
            );

        return JSON.stringify(getProductsWithPriceAndCategory(products));
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return 'Failed to get products.';
    }
}
