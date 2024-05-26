import knex from '../lib/db';

import { TABLES } from '../utils/constants';
import type { Price, Product, ProductPayload } from '../types/product';
import { getProductsWithPriceAndCategory } from '../utils/product';
import { createTransaction } from './transactions';
import { getCategory } from './categories';
import { UpdateProductPayload } from '@/renderer/components/form/product-form';

export async function createProduct(payload: ProductPayload) {
    const trx = await knex.transaction();

    try {
        const productId = (
            await trx<ProductPayload>(TABLES.PRODUCTS).insert({
                name: payload.name,
                description: payload.description,
                purchasedPrice: payload.purchasedPrice,
                purchasedUnit: payload.purchasedUnit,
                purchasedUnitValue: payload.purchasedUnitValue,
                baseUnit: payload.baseUnit,
                baseUnitValue: payload.baseUnitValue,
                categoryId: payload.categoryId,
                reorderPoint: payload.reorderPoint,
                isActive: payload.isActive,
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

        const createdProduct = await trx(TABLES.PRODUCTS)
            .where('id', productId)
            .first();

        await trx.commit();
        return JSON.stringify(createdProduct);
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
            purchasedUnitValue: payload.purchasedUnitValue,
            baseUnit: payload.baseUnit,
            baseUnitValue: payload.baseUnitValue,
            reorderPoint: payload.reorderPoint,
            isActive: payload.isActive,
            stock: payload.stock,
            categoryId: payload.categoryId,
        });

        // Process selling prices
        for (const price of payload.sellingPrices) {
            const existingPrice = await trx(TABLES.PRICES)
                .select('*')
                .where({ productId, unit: price.unit })
                .first();

            if (existingPrice) {
                await trx(TABLES.PRICES)
                    .where({ productId, unit: price.unit })
                    .update({
                        quantity: Number(price.quantity),
                        amount: Number(price.amount),
                        taxValue: Number(price.taxValue),
                    });
            } else {
                await trx(TABLES.PRICES).insert({
                    productId, // Ensure productId is included for new inserts
                    quantity: Number(price.quantity),
                    unit: price.unit,
                    amount: Number(price.amount),
                    taxValue: Number(price.taxValue),
                });
            }
        }

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
        return 'Failed to get products.';
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
                'categories.name as categoryName',
                'categories.description as categoryDescription',
            );

        return JSON.stringify(getProductsWithPriceAndCategory(products));
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return 'Failed to get products with details.';
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

//
// export async function getProduct(productId: number) {
//     try {
//         const product = await knex(TABLES.PRODUCTS)
//             .select('*')
//             .where('id', productId)
//             .first();
//         return JSON.stringify(product);
//     } catch (error) {
//         const e = error as Error;
//         console.log(e);
//         return 'Failed to get product.';
//     }
// }
