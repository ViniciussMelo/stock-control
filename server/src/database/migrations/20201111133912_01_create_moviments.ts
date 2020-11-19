import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('moviments', table => {
        table.increments('id').primary();
        table.integer('quantity').notNullable();
        table.enu('stock_type', ['entry', 'exit']).notNullable();
        table.decimal('amount').notNullable();

        table.integer('product_barcode')
            .notNullable()
            .references('barcode')
            .inTable('products');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('moviments');
}

