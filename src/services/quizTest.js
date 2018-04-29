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


    getForExam(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/quiz-test/${publicKey}/exam`);
    }


    getBeforeStartTheExam(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/quiz-test/${publicKey}/before-exam`);
    }

    save(coursePublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/quiz-test`, params);
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
        return service.delete(`/api/course/${publicKey}/quiz-test/${publicKey}`);
    }

    saveQuestion(coursePublicKey, publicKey, params){
        return service.post(`/api/course/${coursePublicKey}/quiz-test/${publicKey}/question`, params);
    }

    getQuestion(coursePublicKey, qtPublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/quiz-test/${qtPublicKey}/question/${publicKey}`);
    }

    deleteQuestion(coursePublicKey, qtPublicKey, publicKey){
        return service.delete(`/api/course/${coursePublicKey}/quiz-test/${qtPublicKey}/question/${publicKey}`);
    }

    startQT(coursePublicKey, qtPublicKey){
        return service.post(`/api/course/${coursePublicKey}/quiz-test/${qtPublicKey}/start`);
    }


    finishQT(coursePublicKey, qtPublicKey){
        return service.post(`/api/course/${coursePublicKey}/quiz-test/${qtPublicKey}/finish`);
    }

    setAnswer(coursePublicKey, qtPublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/quiz-test/${qtPublicKey}/set-answer`, params);
    }

    getQTUser(coursePublicKey, qtPublicKey){
        return service.get(`/api/course/${coursePublicKey}/quiz-test/${qtPublicKey}/qt-user`);
    }

}