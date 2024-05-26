const data = require('../data');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('categories').del();
    await knex('products').del();
    await knex('prices').del();
    await knex('customers').del();
    await knex('orders').del();
    await knex('orderItems').del();
    await knex('transactions').del();
    await knex('categories').insert(data.categories);
    await knex('products').insert(data.products);
    await knex('prices').insert(data.prices);
    await knex('customers').insert(data.customers);
    await knex('transactions').insert(data.transactions);
};
//# sourceMappingURL=init.js.map