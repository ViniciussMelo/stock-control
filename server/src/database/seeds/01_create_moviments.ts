import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('moviments').insert([
        { quantity: 10, stock_type: 'entry', amount: 12.50, product_barcode: 1, moviment_date: new Date() },
        { quantity: 5, stock_type: 'exit', amount: 6.25, product_barcode: 1, moviment_date: new Date() },
        
        { quantity: 4, stock_type: 'entry', amount: 94.64, product_barcode: 2, moviment_date: new Date() },
        { quantity: 2, stock_type: 'exit', amount: 47.32, product_barcode: 2, moviment_date: new Date() },
        
        { quantity: 100, stock_type: 'entry', amount: 26, product_barcode: 3, moviment_date: new Date() },
        
        { quantity: 1, stock_type: 'entry', amount: 25.90, product_barcode: 4, moviment_date: new Date() },
    ]);
}