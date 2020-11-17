import {Service} from "./Service";

class ProductService extends Service {
    constructor(){
        super('/products');
    }
}

export default new ProductService();