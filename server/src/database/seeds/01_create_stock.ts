import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('stock_products').insert([
        { quantity: 10, stock_type: 'entry', amount: 12.50, product_barcode: 1 },
        { quantity: 5, stock_type: 'exit', amount: 6.25, product_barcode: 1 },
        
        { quantity: 4, stock_type: 'entry', amount: 94.64, product_barcode: 2 },
        { quantity: 2, stock_type: 'exit', amount: 47.32, product_barcode: 2 },
        
        { quantity: 100, stock_type: 'entry', amount: 26, product_barcode: 3 },
        
        { quantity: 1, stock_type: 'entry', amount: 25.90, product_barcode: 4 },
    ]);
}