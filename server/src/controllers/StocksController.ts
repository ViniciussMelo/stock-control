import { Request, response, Response } from "express";
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
    active: boolean;
}

interface StockView {
    barcode: number;
    name: string;
    active: boolean;
    totalAmount: number;
}

class StocksController {
    async index(request: Request, response: Response) {
        let stockView: StockView[] = [];

        const stocks: Stock[] = await knex('moviments')
            .rightJoin('products', 'moviments.product_barcode', '=', 'products.barcode')
            .select(['moviments.*', 'products.barcode', 'products.name', 'products.active'])
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
                    active: item.active,
                    totalAmount: item.quantity
                });
            }
        });
        return response.json(stockView);
    }
}

export default StocksController;