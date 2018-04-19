import {Axios} from './axios';
import Service from './common'
import StorageService from './storage'
import AuthenticationService from './authentication';

const service = new Service();


export default class QuizTestService{
    constructor(){}

    getAll(coursePublicKey){
        return service.getAll(`/api/course/${coursePublicKey}/quiz-test`);
    }

    get(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/quiz-test/${publicKey}`);
    }

    save(coursePublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/quiz-test`, params);
    }
   
    update(coursePublicKey, publicKey, params){
        return service.put(`/api/course/${coursePublicKey}/quiz-test/${publicKey}`, params);
    }
   
    delete(coursePublicKey, publicKey){
        return service.delete(`/api/course/${publicKey}/quiz-test/${publicKey}`);
    }

    saveQuestion(coursePublicKey, publicKey, params){
        return service.post(`/api/course/${coursePublicKey}/quiz-test/${publicKey}/question`, params);
    }

    getQuestion(coursePublicKey, qtPublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/quiz-test/${qtPublicKey}/question/${publicKey}`);
    }
}