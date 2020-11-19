import {Service} from "./Service";

class StockService extends Service {
    constructor(){
        super('/stock');
    }
}

export default new StockService();