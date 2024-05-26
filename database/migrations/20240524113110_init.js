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
        table.integer('points').defaultTo(0);
        table.timestamps(true, true, true);
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
        table.integer('purchasedUnitValue').notNullable();
        table.string('baseUnit').notNullable();
        table.integer('baseUnitValue').notNullable();
        table.bigInteger('stock').defaultTo(0);
        table.integer('reorderPoint').notNullable();
        table.boolean('isActive').notNullable().defaultTo(true);
        table
            .integer('categoryId')
            .references('id')
            .inTable('categories')
            .onDelete('SET NULL');
        table.timestamps(true, true, true);
    });

    await knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.integer('customerId').references('id').inTable('customers');
        table
            .string('paymentMethod')
            .notNullable()
            .checkIn(['CASH', 'UPI', 'CARD', 'NET_BANKING'])
            .defaultTo('CASH');
        table.boolean('isPaid').defaultTo(false);
        table.datetime('paidAt');
        table.float('totalPrice').notNullable();
        table.timestamps(true, true, true);
    });

    await knex.schema.createTable('orderItems', (table) => {
        table.increments('id').primary();
        table.integer('quantity').notNullable();
        table
            .integer('priceId')
            .references('id')
            .inTable('prices')
            .onDelete('SET NULL');
        table
            .integer('orderId')
            .references('id')
            .inTable('orders')
            .onDelete('CASCADE');
        table
            .integer('productId')
            .references('id')
            .inTable('products')
            .onDelete('SET NULL');
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
            .datetime('transactionDate', { useTz: false })
            .defaultTo(knex.fn.now());
        table
            .integer('productId')
            .references('id')
            .inTable('products')
            .onDelete('SET NULL');
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
