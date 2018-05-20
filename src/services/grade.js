import {Axios} from './axios';
import Service from './common'

const service = new Service();


export default class GradeService{
    constructor(){}

    save(coursePublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/grade`, params);
    }

    saveAll(coursePublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/grade/save-all`, params);
    }

    update(coursePublicKey, publicKey, params){
        return service.put(`/api/course/${coursePublicKey}/grade/${publicKey}`, params);
    }   
    
    delete(coursePublicKey, publicKey){
        return service.delete(`/api/course/${coursePublicKey}/grade/${publicKey}`);
    }  
        
    getAll(coursePublicKey){
        return service.getAll(`/api/course/${coursePublicKey}/grades`);
    }   
    
    getAllForStudent(coursePublicKey){
        return service.getAll(`/api/course/${coursePublicKey}/student-grades`);
    }

    get(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/grade/${publicKey}`);
    } 
    
    getForView(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/grade/${publicKey}/view`);
    } 

    publish(coursePublicKey, publicKey){
        return service.put(`/api/course/${coursePublicKey}/grade/${publicKey}/publish`, {});
    }  
    
    disable(coursePublicKey, publicKey){
        return service.put(`/api/course/${coursePublicKey}/grade/${publicKey}/disable`, {});
    }  

    saveScore(coursePublicKey, publicKey, params){
        return service.post(`/api/course/${coursePublicKey}/grade/${publicKey}/score`, params);
    }
}