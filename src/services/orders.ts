import knex from '../lib/db';
import type {
    OrderItemPayload,
    OrderPayload,
    OrderPayloadWithItems,
} from '../types/order';
import { TABLES } from '../utils/constants';
import { calculateTaxAmount } from '../lib/utils';
import { createTransaction } from './transactions';
import { convertToPurchasedUnit } from '../utils/convert';
import type { Price, Product } from '../types/product';

export async function createOrder(payload: OrderPayloadWithItems) {
    const trx = await knex.transaction();
    let totalPrice = 0;

    try {
        // Calculate total price with tax
        for (const orderItem of payload.orderItems) {
            const product = await trx<Product>(TABLES.PRODUCTS)
                .select('*')
                .where('id', orderItem.productId)
                .first();

            if (!product) {
                throw new Error(
                    `Product with id ${orderItem.productId} not found`,
                );
            }

            const price = await trx<Price>(TABLES.PRICES)
                .select('*')
                .where('id', orderItem.priceId)
                .first();

            if (!price) {
                throw new Error(`Price with id ${orderItem.priceId} not found`);
            }

            totalPrice += orderItem.quantity * calculateTaxAmount(price);
        }

        // Insert order
        const [orderId] = await trx<OrderPayload>(TABLES.ORDERS).insert({
            customerId: payload.customerId,
            paymentMethod: payload.paymentMethod,
            isPaid: payload.isPaid,
            paidAt: payload.paidAt,
            totalPrice,
        });

        // Insert order items
        const orderItemsInserts = payload.orderItems.map((orderItem) => ({
            orderId,
            productId: orderItem.productId,
            priceId: orderItem.priceId,
            quantity: orderItem.quantity,
        }));

        await trx<OrderItemPayload>(TABLES.ORDER_ITEMS).insert(
            orderItemsInserts,
        );

        // Create transactions for each order item
        for (const orderItem of payload.orderItems) {
            const product = await trx<Product>(TABLES.PRODUCTS)
                .select('*')
                .where('id', orderItem.productId)
                .first();

            const price = await trx<Price>(TABLES.PRICES)
                .select('*')
                .where('id', orderItem.priceId)
                .first();

            const transactionQuantity =
                price.unit === product.purchasedUnit
                    ? orderItem.quantity * price.quantity
                    : convertToPurchasedUnit(
                          orderItem.quantity * price.quantity,
                          product.baseUnitValue,
                      );

            await createTransaction(
                {
                    quantity: transactionQuantity,
                    productId: orderItem.productId,
                    transactionType: 'SALE',
                },
                trx,
            );
        }

        const createdOrder = await trx(TABLES.ORDERS)
            .select('*')
            .where('id', orderId)
            .first();

        await trx.commit();
        return JSON.stringify(createdOrder);
    } catch (error) {
        await trx.rollback();
        const e = error as Error;
        console.log(e);
        return 'Failed to create order.';
    }
}

export async function getOrders() {
    try {
        const orders = await knex(TABLES.ORDERS).select('*');
        return JSON.stringify(orders);
    } catch (error) {
        const e = error as Error;
        console.log(e);
        return 'Failed to get orders.';
    }
}
