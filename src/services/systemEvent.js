import {Axios} from './axios'
import Service from "./common"


const service = new Service();

export default class SystemEventService{

    constructor(){}


    getAll(){
        return service.getAll('/api/system-events');
    }

    save(params){
        return service.post('/api/system-event', params);
    }


    delete(publicKey){
        return service.delete(`/api/system-event/${publicKey}`);
    }

}