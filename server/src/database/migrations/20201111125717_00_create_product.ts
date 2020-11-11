import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', table => {
        table.increments('barcode').primary();
        table.string('name').notNullable();
        table.decimal('price').notNullable();
        table.boolean('active').defaultTo(true).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('products');
}

