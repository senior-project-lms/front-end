
import {Axios} from './axios'
import Service from "./common"


var common = new Service();

export default class PrivilegeService{

    constructor(){}


    getAllPrivilegeles(){
        return common.getAll('/api/privileges');
    }

    getAllCoursePrivileges(publicKey){
        return common.getAll(`/api/course/${publicKey}/privileges/all`)
    }
    getDefaultCourseAssistantPrivileges(publicKey){
        return common.getAll(`/api/course/${publicKey}/privileges/assistant`)
    }

    getAssistantPrivileges(publicKey, userPublicKey){
        return common.getAll(`/api/course/${publicKey}/assistant/${userPublicKey}`)
    }


}