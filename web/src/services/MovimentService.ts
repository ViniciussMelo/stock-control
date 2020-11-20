import {Service} from "./Service";

class MovimentService extends Service {
    constructor(){
        super('/moviments');
    }
}

export default new MovimentService();