import e, { Request, response, Response } from "express";
import knex from "../database/connection";

interface Product {
    price: number;
    active: boolean;
}

interface Stock {
    id: number;
    quantity: number;
    name: string;
    stock_type: string;
    amount: number;
    moviment_date: Date;
    barcode: number;
}

interface StockView {
    barcode: number;
    name: string;
    totalAmount: number;
}

class StockController {
    async index(request: Request, response: Response) {
        let stockView: StockView[] = [];

        const stocks: Stock[] = await knex('moviments')
            .rightJoin('products', 'moviments.product_barcode', '=', 'products.barcode')
            .select(['moviments.*', 'products.barcode', 'products.name'])
            .orderBy('products.barcode');

        stocks.forEach((item) => {
            let indexStock = stockView.findIndex(element => element.barcode === item.barcode);
            item.quantity = item.stock_type === 'entry' ? item.quantity : - item.quantity;
            if(indexStock > -1) {
                stockView[indexStock].totalAmount += item.quantity
            } else {
                stockView.push({
                    barcode: item.barcode,
                    name: item.name,
                    totalAmount: item.quantity
                });
            }
        });
        return response.json(stockView);
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
            await knex('moviments').insert(stock);

            return response.status(201).send();
        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new stock'
            });
        }
    }
}

export default StockController;