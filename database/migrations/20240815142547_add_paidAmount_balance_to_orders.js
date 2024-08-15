/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema.table('orders', (table) => {
        table.float('paidAmount').notNullable().defaultTo(0.0);
        table.float('balanceAmount').notNullable().defaultTo(0.0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
    await knex.schema.table('orders', (table) => {
        table.dropColumn('paidAmount');
        table.dropColumn('balanceAmount');
    });
};
