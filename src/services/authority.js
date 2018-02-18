import {Axios} from './axios';
import Service from './common'

const service = new Service();

export default class AuthorityService{

    constructor(){

    }

    getAll(){
        return service.getAll('/api/access-levels');
    }

}