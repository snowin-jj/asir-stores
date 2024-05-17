// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('./data.json');

exports.seed = async (knex) => {
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
    await knex('orders').insert(data.orders);
    await knex('orderItems').insert(data.orderItems);
    await knex('transactions').insert(data.transactions);
};
