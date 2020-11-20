import express from "express";

import ProductsController from "./controllers/ProductsController";
import StocksController from "./controllers/StocksController";
import MovimentsController from "./controllers/MovimentsController";

const routes = express.Router();

const productsController = new ProductsController();
const stocksController = new StocksController();
const movimentsController = new MovimentsController();


routes.get('/products', productsController.index);
routes.post('/products', productsController.create);
routes.put('/products/:barcode', productsController.update);
routes.delete('/products/:barcode', productsController.delete);

routes.get('/stock', stocksController.index);

routes.get('/moviments', movimentsController.index);
routes.post('/moviments', movimentsController.create);
routes.put('/moviments/:id', movimentsController.update);
routes.delete('/moviments/:id', movimentsController.delete);

export default routes;