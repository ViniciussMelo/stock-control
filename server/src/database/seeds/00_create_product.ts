import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('products').insert([
        { barcode: 1, name: 'Prego', price: 1.25 },
        { barcode: 2, name: 'Martelo', price: 23.66 },
        { barcode: 3, name: 'Parafuso', price: 0.26 },
        { barcode: 4, name: 'Serrote', price: 25.90 },
    ]);
}