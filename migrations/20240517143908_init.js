/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
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
        table.string('unit').notNullable();
        table.integer('productId').references('id').inTable('products');
    });

    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description');
        table.float('purchasedPrice').notNullable();
        table.string('purchasedUnit').notNullable();
        table.float('taxValue').notNullable();
        table.integer('stock').notNullable();
        table.integer('reorderPoint').notNullable();
        table.boolean('isActive').notNullable().defaultTo(true);
        table.integer('categoryId').references('id').inTable('categories');
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
        table.integer('priceId').references('id').inTable('prices');
        table.integer('orderId').references('id').inTable('orders');
        table.integer('productId').references('id').inTable('products');
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
        table.integer('productId').references('id').inTable('products');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.dropTable('customers');
    await knex.schema.dropTable('categories');
    await knex.schema.dropTable('products');
    await knex.schema.dropTable('prices');
    await knex.schema.dropTable('orders');
    await knex.schema.dropTable('orderItems');
    await knex.schema.dropTable('transactions');
};
