
import {Axios} from './axios'
import Service from "./common"


var common = new Service();

export default class PrivilegeService{

    constructor(){}


    getAll(){
        return common.getAll('/api/privileges');
    }


}