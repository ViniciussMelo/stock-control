import { Request, Response } from "express";
import knex from "../database/connection";

class ProductsController {
    async index(request: Request, response: Response) {
        const products =  await knex('products')
            .select('*')
            .orderBy('barcode');

        return response.json(products);
    }

    async create (request: Request, response: Response) {
        const {
            name,
            price,
        } = request.body;

        const product = {
            name,
            price
        }

        try {
            await knex('products').insert(product);
            
            return response.status(201).send();
        }
        catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating new product'
            });
        }
    }

    async update (request: Request, response: Response) {
        const {
            barcode
        } = request.params;
        

        const {
            active
        } = request.body;

        try {
            await knex('products')
                .where('barcode', barcode)
                .update({active: active});
            
            return response.status(201).send();
        }catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while updating the stock'
            });
        }
    }
}

export default ProductsController;