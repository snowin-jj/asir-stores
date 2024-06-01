import knex from '../lib/db';

import { UpdateProductPayload } from '@/renderer/components/form/product-form';
import type { Product, ProductPayload } from '../types/product';
import { TABLES } from '../utils/constants';
import { getProductsWithPriceAndCategory } from '../utils/product';
import { getCategory } from './categories';
import { createTransaction } from './transactions';

export async function createProduct(payload: ProductPayload) {
    const trx = await knex.transaction();

    try {
        const productId = (
            await trx(TABLES.PRODUCTS).insert({
                name: payload.name,
                description: payload.description,
                purchasedPrice: payload.purchasedPrice,
                purchasedUnit: payload.purchasedUnit,
                baseUnit: payload.baseUnit,
                baseUnitValue: payload.baseUnitValue,
                categoryId: payload.categoryId,
                reorderPoint: payload.reorderPoint,
                isActive: payload.isActive,
                createdAt: new Date(),
            })
        )[0];

        await Promise.all(
            payload.sellingPrices.map((price) => {
                return trx(TABLES.PRICES).insert({
                    ...price,
                    productId: productId,
                });
            }),
        );

        await createTransaction(
            {
                quantity: payload.stock,
                productId,
                transactionType: 'PURCHASE',
            },
            trx,
        );

        await trx.commit();
        return JSON.stringify('Product created');
    } catch (error) {
        await trx.rollback();
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to create product.');
    }
}

export async function updateProduct(
    productId: number,
    payload: UpdateProductPayload,
) {
    const trx = await knex.transaction();
    try {
        await trx<Product>(TABLES.PRODUCTS).where('id', productId).update({
            name: payload.name,
            description: payload.description,
            purchasedPrice: payload.purchasedPrice,
            purchasedUnit: payload.purchasedUnit,
            baseUnit: payload.baseUnit,
            baseUnitValue: payload.baseUnitValue,
            reorderPoint: payload.reorderPoint,
            isActive: payload.isActive,
            stock: payload.stock,
            categoryId: payload.categoryId,
            updatedAt: new Date(),
        });

        await Promise.all(
            payload.sellingPrices.map(async (price) => {
                if (price.id) {
                    const existingPrice = await trx(TABLES.PRICES)
                        .where('id', price.id)
                        .andWhere('productId', productId)
                        .select('*')
                        .first();

                    if (existingPrice) {
                        return await trx(TABLES.PRICES)
                            .where('id', existingPrice.id)
                            .update({
                                quantity: price.quantity,
                                amount: price.amount,
                                unit: price.unit,
                                taxValue: price.taxValue,
                            });
                    }
                }

                // Insert if no matching price found
                return await trx(TABLES.PRICES).insert({
                    productId,
                    quantity: price.quantity,
                    unit: price.unit,
                    amount: price.amount,
                    taxValue: price.taxValue,
                });
            }),
        );

        await trx.commit();
        return JSON.stringify('Product updated');
    } catch (error) {
        await trx.rollback();
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to update the product');
    }
}

export async function deleteProduct(productId: number) {
    try {
        await knex(TABLES.PRODUCTS).where('id', productId).delete();
        return JSON.stringify('Product deleted');
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to delete the product');
    }
}

export async function getProduct(productId: number) {
    try {
        const product: Product = await knex(TABLES.PRODUCTS)
            .select('*')
            .where('id', productId)
            .first();
        const category = JSON.parse(await getCategory(product.categoryId));
        const sellingPrices = JSON.parse(await getPrices(product.id));

        return JSON.stringify({ ...product, category, sellingPrices });
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to get product');
    }
}

export async function getProducts() {
    try {
        const products = await knex(TABLES.PRODUCTS).select('*');

        return JSON.stringify(products);
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to get products.');
    }
}
export async function getProductsWithDetails() {
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
                'prices.quantity',
                'prices.taxValue',
                'categories.name as categoryName',
                'categories.description as categoryDescription',
            )
            .orderBy('createdAt', 'desc');

        return JSON.stringify(getProductsWithPriceAndCategory(products));
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to get products with details.');
    }
}

export async function getPrices(productId: number) {
    try {
        const prices = await knex(TABLES.PRICES)
            .select('*')
            .where('productId', productId);
        return JSON.stringify(prices);
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to get prices.');
    }
}

export async function getPrice(priceId: number) {
    try {
        const price = await knex(TABLES.PRICES)
            .select('*')
            .where('id', priceId)
            .first();
        return JSON.stringify(price);
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to get price.');
    }
}

export async function deletePrice(priceId: number) {
    try {
        await knex(TABLES.PRICES).where('id', priceId).delete();
        return JSON.stringify('Price deleted');
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return JSON.stringify('Failed to delete price.');
    }
}
