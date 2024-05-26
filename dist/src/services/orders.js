"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const db_1 = __importDefault(require("../lib/db"));
const constants_1 = require("../utils/constants");
const utils_1 = require("../lib/utils");
const transactions_1 = require("./transactions");
const convert_1 = require("../utils/convert");
async function createOrder(payload) {
    const trx = await db_1.default.transaction();
    let totalPrice = 0;
    try {
        // Calculate total price with tax
        for (const orderItem of payload.orderItems) {
            const product = await trx(constants_1.TABLES.PRODUCTS)
                .select('*')
                .where('id', orderItem.productId)
                .first();
            if (!product) {
                throw new Error(`Product with id ${orderItem.productId} not found`);
            }
            const price = await trx(constants_1.TABLES.PRICES)
                .select('*')
                .where('id', orderItem.priceId)
                .first();
            if (!price) {
                throw new Error(`Price with id ${orderItem.priceId} not found`);
            }
            totalPrice += orderItem.quantity * (0, utils_1.calculateTaxAmount)(price);
        }
        // Insert order
        const [orderId] = await trx(constants_1.TABLES.ORDERS).insert({
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
        await trx(constants_1.TABLES.ORDER_ITEMS).insert(orderItemsInserts);
        // Create transactions for each order item
        for (const orderItem of payload.orderItems) {
            const product = await trx(constants_1.TABLES.PRODUCTS)
                .select('*')
                .where('id', orderItem.productId)
                .first();
            const price = await trx(constants_1.TABLES.PRICES)
                .select('*')
                .where('id', orderItem.priceId)
                .first();
            const transactionQuantity = price.unit === product.purchasedUnit
                ? orderItem.quantity * price.quantity
                : (0, convert_1.convertToPurchasedUnit)(orderItem.quantity * price.quantity, product.baseUnitValue);
            await (0, transactions_1.createTransaction)({
                quantity: transactionQuantity,
                productId: orderItem.productId,
                transactionType: 'SALE',
            }, trx);
        }
        const createdOrder = await trx(constants_1.TABLES.ORDERS)
            .select('*')
            .where('id', orderId)
            .first();
        await trx.commit();
        return JSON.stringify(createdOrder);
    }
    catch (error) {
        await trx.rollback();
        const e = error;
        console.log(e);
        return 'Failed to create order.';
    }
}
exports.createOrder = createOrder;
async function getOrders() {
    try {
        const orders = await (0, db_1.default)(constants_1.TABLES.ORDERS).select('*');
        return JSON.stringify(orders);
    }
    catch (error) {
        const e = error;
        console.log(e);
        return 'Failed to get orders.';
    }
}
exports.getOrders = getOrders;
//# sourceMappingURL=orders.js.map