import { Request, response, Response } from "express";
import knex from "../database/connection";

interface Product {
    price: number;
    active: boolean;
}

class StockController {
    async index(request: Request, response: Response) {
        const stocks = await knex('stock_products')
            .join('products', 'stock_products.product_barcode', '=', 'products.barcode')
            .distinct()
            .select(['stock_products.*', 'products.name']);
        
        return response.json(stocks);
    }

    async create (request: Request, response: Response) {
        const {
            quantity,
            stock_type,
            product_barcode
        } = request.body;

        const product: Product = await knex('products')
            .where('barcode', product_barcode)
            .select(['active', 'price'])
            .first();
        
        if (!product.active) {
            return response.status(400).json({
                error: 'The product must be active status.'
            });
        }

        const amountProduct = (product.price * quantity);

        const stock = {
            quantity,
            stock_type,
            amount: amountProduct,
            product_barcode,
        }
        try {
            await knex('stock_products').insert(stock);

            return response.status(201).send();
        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new stock'
            });
        }
    }
}

export default StockController;