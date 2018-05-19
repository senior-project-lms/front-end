import {Axios} from './axios';
import Service from './common'
import StorageService from './storage'
import AuthenticationService from './authentication';

const service = new Service();


export default class AssignmentService{
    constructor(){}


    getAll(coursePublicKey){
        return service.getAll(`/api/course/${coursePublicKey}/assignments`);
    }

    get(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/quiz-test/${publicKey}`);
    }


    save(coursePublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/assignment`, params);
    }
   
    update(coursePublicKey, publicKey, params){
        return service.put(`/api/course/${coursePublicKey}/quiz-test/${publicKey}`, params);
    }

    publish(coursePublicKey, publicKey){
        return service.put(`/api/course/${coursePublicKey}/quiz-test/${publicKey}/publish`, {});
    }

    disable(coursePublicKey, publicKey){
        return service.put(`/api/course/${coursePublicKey}/quiz-test/${publicKey}/disable`, {});
    }    

    delete(coursePublicKey, publicKey){
        return service.delete(`/api/course/${publicKey}/assignment/${publicKey}`);
    }



}