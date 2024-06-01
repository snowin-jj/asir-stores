const moment = require('moment-timezone');

// Get the current time in Asia/Kolkata time zone
const currentTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('customers', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.string('email');
        table.string('aadhaar');
        table.integer('points').defaultTo(0).notNullable();
        table.datetime('createdAt');
        table.datetime('updatedAt');
    });

    await knex.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
    });

    await knex.schema.createTable('prices', (table) => {
        table.increments('id').primary();
        table.float('amount').notNullable();
        table.integer('quantity').notNullable();
        table.string('unit').notNullable();
        table.float('taxValue').defaultTo(0.0).notNullable();
        table
            .integer('productId')
            .references('id')
            .inTable('products')
            .onDelete('CASCADE');
    });

    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.float('purchasedPrice').notNullable();
        table.string('purchasedUnit').notNullable();
        table.string('baseUnit').notNullable();
        table.integer('baseUnitValue').notNullable();
        table.bigInteger('stock').defaultTo(0);
        table.integer('reorderPoint').notNullable();
        table.boolean('isActive').notNullable().defaultTo(true);
        table
            .integer('categoryId')
            .references('id')
            .inTable('categories')
            .onDelete('SET NULL')
            .nullable();
        table.datetime('createdAt');
        table.datetime('updatedAt');
    });

    await knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table
            .integer('customerId')
            .references('id')
            .inTable('customers')
            .onDelete('SET NULL')
            .nullable();
        table
            .string('paymentMethod')
            .checkIn(['CASH', 'UPI', 'CARD', 'NET_BANKING']);
        table.boolean('isPaid').defaultTo(0);
        table.datetime('paidAt');
        table.float('totalPrice').notNullable();
        table.datetime('createdAt');
    });

    await knex.schema.createTable('orderItems', (table) => {
        table.increments('id').primary();
        table.integer('quantity').notNullable();
        table
            .integer('priceId')
            .references('id')
            .inTable('prices')
            .onDelete('SET NULL')
            .nullable();
        table
            .integer('orderId')
            .references('id')
            .inTable('orders')
            .onDelete('CASCADE');
        table
            .integer('productId')
            .references('id')
            .inTable('products')
            .onDelete('SET NULL')
            .nullable();
    });

    await knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('quantity').notNullable();
        table
            .string('transactionType')
            .notNullable()
            .checkIn(['SALE', 'PURCHASE', 'RETURN'])
            .defaultTo('SALE');
        table
            .integer('priceId')
            .references('id')
            .inTable('prices')
            .onDelete('RESTRICT');
        table
            .integer('productId')
            .references('id')
            .inTable('products')
            .onDelete('SET NULL')
            .nullable();
        table.datetime('createdAt');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('transactions');
    await knex.schema.dropTableIfExists('orderItems');
    await knex.schema.dropTableIfExists('orders');
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('prices');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('customers');
};
