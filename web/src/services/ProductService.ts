import {Service} from "./Service";

class FuncionarioService extends Service {
    constructor(){
        super('/products');
    }
}

export default new FuncionarioService();