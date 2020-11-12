import express from "express";

import ProductsController from "./controllers/ProductsController";
import StockController from "./controllers/StockController";

const routes = express.Router();

const productsController = new ProductsController();
const stockController = new StockController();


routes.get('/products', productsController.index);
routes.post('/products', productsController.create);
routes.put('/products/:barcode', productsController.update);

routes.get('/stock', stockController.index);
routes.post('/stock', stockController.create);

export default routes;