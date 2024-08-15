import knex from '../lib/db';
import type {
    CustomerPayload,
    OrderItemPayload,
    OrderPayload,
    OrderPayloadWithItems,
} from '../types/order';
import type { Price, Product } from '../types/product';
import { TABLES } from '../utils/constants';
import { convertToPurchasedUnit } from '../utils/formatters';
import {
    formatOrderItems,
    formatOrdersWithCustomer,
    formatOrdersWithDetails,
} from '../utils/order';
import { createTransaction } from './transactions';

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

            totalPrice += orderItem.quantity * price.amount;
        }

        // Insert order
        const [orderId] = await trx(TABLES.ORDERS).insert({
            customerId: payload.customerId,
            paymentMethod: payload.paymentMethod,
            isPaid: payload.isPaid,
            paidAt: payload.paidAt,
            totalPrice: totalPrice,
            paidAmount: payload.paidAmount,
            balanceAmount: payload.balanceAmount,
            discount: payload.discount,
            createdAt: new Date(),
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
                    priceId: orderItem.priceId,
                    transactionType: 'SALE',
                },
                trx,
            );
        }

        await trx.commit();
        return JSON.stringify('Order Created');
    } catch (error) {
        await trx.rollback();
        const e = error as Error;

        return JSON.stringify('Failed to create order.');
    }
}

export async function getOrdersWithDetails() {
    try {
        const orders = await knex(TABLES.ORDERS)
            .select(
                'orders.*',
                'customers.id as customerId',
                'customers.name as customerName',
                'customers.phone',
                'customers.email',
                'customers.aadhaar',
                'customers.points',
                'customers.createdAt as customerCreatedAt',
                'customers.updatedAt as customerUpdatedAt',
                'orderItems.id as orderItemId',
                'orderItems.quantity',
                'orderItems.priceId',
                'orderItems.productId',
                'products.name',
                'products.description',
                'products.purchasedPrice',
                'products.purchasedUnit',
                'products.baseUnit',
                'products.baseUnitValue',
                'products.stock',
                'products.reorderPoint',
                'products.isActive',
                'products.createdAt as productCreatedAt',
                'products.updatedAt as productUpdatedAt',
                'prices.amount',
                'prices.quantity as priceQuantity',
                'prices.unit',
                'prices.taxValue',
            )
            .leftJoin(TABLES.CUSTOMERS, 'customers.id', 'orders.customerId')
            .leftJoin(TABLES.ORDER_ITEMS, 'orders.id', 'orderItems.orderId')
            .leftJoin(TABLES.PRICES, 'orderItems.priceId', 'prices.id')
            .leftJoin(TABLES.PRODUCTS, 'orderItems.productId', 'products.id')
            .orderBy('createdAt', 'desc');

        return JSON.stringify(formatOrdersWithDetails(orders));
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to get orders.');
    }
}

export async function getOrderWithDetails(orderId: number) {
    try {
        const order = await knex(TABLES.ORDERS)
            .where('orders.id', orderId)
            .first()
            .select(
                'orders.*',
                'customers.name',
                'customers.phone',
                'customers.email',
                'customers.aadhaar',
                'customers.points',
                'customers.createdAt as customerCreatedAt',
                'customers.updatedAt as customerUpdatedAt',
            )
            .leftJoin(TABLES.CUSTOMERS, 'customers.id', 'orders.customerId')
            .orderBy('createdAt', 'desc');
        const orderItems = await knex(TABLES.ORDER_ITEMS)
            .where('orderItems.orderId', orderId)
            .select(
                'orderItems.*',
                'products.name',
                'products.description',
                'products.purchasedPrice',
                'products.purchasedUnit',
                'products.baseUnit',
                'products.baseUnitValue',
                'products.stock',
                'products.reorderPoint',
                'products.isActive',
                'products.createdAt as productCreatedAt',
                'products.updatedAt as productUpdatedAt',
                'prices.amount',
                'prices.quantity as priceQuantity',
                'prices.unit',
                'prices.taxValue',
            )
            .leftJoin(TABLES.PRICES, 'prices.id', 'orderItems.priceId')
            .leftJoin(TABLES.PRODUCTS, 'products.id', 'orderItems.productId');

        return JSON.stringify({
            id: order.id,
            customerId: order.customerId,
            paymentMethod: order.paymentMethod,
            isPaid: order.isPaid,
            paidAt: order.paidAt,
            totalPrice: order.totalPrice,
            paidAmount: order.paidAmount,
            balanceAmount: order.balanceAmount,
            discount: order.discount,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            customer: {
                id: order.customerId,
                name: order.name,
                phone: order.phone,
                email: order.email,
                aadhaar: order.aadhaar,
                points: order.points,
                createdAt: order.customerCreatedAt,
                updatedAt: order.customerUpdatedAt,
            },
            orderItems: formatOrderItems(orderItems),
        });
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to get orders.');
    }
}

export async function getOrders() {
    try {
        const orders = await knex(TABLES.ORDERS)
            .select('orders.*')
            .select(
                'customers.id as customerId',
                'customers.name as customerName',
                'customers.phone',
                'customers.email',
                'customers.aadhaar',
                'customers.points',
                'customers.createdAt as customerCreatedAt',
                'customers.updatedAt as customerUpdatedAt',
            )
            .leftJoin(TABLES.CUSTOMERS, 'customers.id', 'orders.customerId')
            .orderBy('createdAt', 'desc');

        return JSON.stringify(formatOrdersWithCustomer(orders));
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to create order.');
    }
}

export async function updateOrder(orderId: number, payload: OrderPayload) {
    try {
        await knex(TABLES.ORDERS)
            .update({ ...payload, updatedAt: new Date().toISOString() })
            .where('id', orderId);
        return JSON.stringify('Order Updated');
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to update order.');
    }
}

/**
 * CUSTOMERS
 */

export async function getCustomers() {
    try {
        const customers = await knex(TABLES.CUSTOMERS)
            .select('*')
            .orderBy('createdAt', 'desc');
        return JSON.stringify(customers);
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to get customers.');
    }
}

export async function getCustomer(customerId: number) {
    try {
        const customer = await knex(TABLES.CUSTOMERS)
            .select('*')
            .where('id', customerId)
            .first();
        return JSON.stringify(customer);
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to get customer.');
    }
}

export async function createCustomer(payload: CustomerPayload) {
    try {
        await knex(TABLES.CUSTOMERS).insert({
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return JSON.stringify('Customer Created');
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to create customer.');
    }
}

export async function updateCustomer(
    customerId: number,
    payload: CustomerPayload,
) {
    try {
        await knex(TABLES.CUSTOMERS)
            .update({ ...payload, updatedAt: new Date() })
            .where('id', customerId);
        return JSON.stringify('Customer Updated');
    } catch (error) {
        const e = error as Error;

        return JSON.stringify('Failed to update customer.');
    }
}
