import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('products').insert([
        { name: 'Prego', price: 1.25 },
        { name: 'Martelo', price: 23.66 },
        { name: 'Parafuso', price: 0.26 },
        { name: 'Serrote', price: 25.90 },
    ]);
}