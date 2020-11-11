import { Request, response, Response } from "express";
import knex from "../database/connection";

class ProductsController {
    async index(request: Request, response: Response) {
        const products =  await knex('products').select('*');

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

        const insertedProduct = await knex('products').insert(product);
        const insertedProductId = insertedProduct[0];        

        return response.json({
            barcode: insertedProductId,
            ...product
        });
    }
}

export default ProductsController;