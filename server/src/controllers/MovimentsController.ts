import { Request, response, Response } from "express";
import knex from "../database/connection";

interface Product {
    active: boolean;
}

class MovimentsController {
    async index (request: Request, response: Response) {
        const moviments = await knex('moviments')
            .join('products', 'moviments.product_barcode', '=', 'products.barcode')
            .select(['moviments.id',
                    'moviments.quantity',
                    {stockType: 'moviments.stock_type'},
                    {movimentDate: 'moviments.moviment_date'},
                    'moviments.amount',
                    'products.barcode', 
                    'products.name',
                    'products.active'])
            .orderBy('moviments.product_barcode');

        return response.json(moviments);
    }

    async create (request: Request, response: Response) {
        const {
            quantity,
            stockType,
            amount,
            movimentDate,
            barcode
        } = request.body;

        const moviment = {
            quantity,
            stock_type: stockType,
            amount,
            moviment_date: movimentDate,
            product_barcode: barcode
        };

        const product: Product = await knex('products')
            .where('barcode', barcode)
            .select('acitve')
            .first();

        if (!product.active) {
            return response.status(400).json({
                error: 'The product must be active status.'
            });
        }

        try {
            await knex('moviments').insert(moviment);

            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                error: 'Unexpected error while creating moviment'
            });
        }
    }

    async update (request: Request, response: Response) {
        const {
            id
        } = request.params;
        
        const {
            quantity,
            stockType,
            amount,
            movimentDate
        } = request.body;

        try {
            await knex('moviments')
                .where('id', id)
                .update({
                    quantity: quantity,
                    stock_type: stockType,
                    amount: amount,
                    moviment_date: movimentDate
                });

            return response.status(201).send();
        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while updating the moviment'
            });
        }
    }

    async delete (request: Request, response: Response) {
        const {
            id
        } = request.params;

        try {
            await knex('moviments')
                .where('id', id)
                .del();
            
            return response.status(201).send();
        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while deleting the moviment',
                message: err
            });
        }
    }
}

export default MovimentsController;