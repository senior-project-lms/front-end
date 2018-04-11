import {Axios} from './axios';
import Service from './common'

const service = new Service();

export default class QAService{
    constructor(){}


    /*
        function: save
        @param (params) contains the system announncement object that is represented in backend as pojo
        @return (boolean) returns boolean that represent saved or not
        used for to save system announcement
    */     
    save(coursePublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/qa`, params);      
    }

    /*
        function: delete
        @param (publicKey) public key is which represent the deleted object
        @return (boolean) returns boolean that represent deleted or not
        used for to delete system announcement
    */       
    delete(coursePublicKey, publicKey){
        return service.delete(`/api/course/${coursePublicKey}/qa/${publicKey}`);
    }

    /*
        function: getAll
        @param (page) page number, api returns 5 object for each page, increment page for new objects
        @return (array) returns empty or filled array of announcment objects
        used for the fetch system announcments page by page 
    */       
    getAll(coursePublicKey, page){
        return service.getAll(`/api/course/${coursePublicKey}/qas/${page}`);
        
    }

    get(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/qa/${publicKey}`);
    }


    saveComment(coursePublicKey, publicKey, params){
        return service.post(`/api/course/${coursePublicKey}/qa/${publicKey}/comment`, params);      

    }


    upVote(coursePublicKey, publicKey){
        return service.post(`/api/course/${coursePublicKey}/qa/${publicKey}/up-vote`);
    }


    downVote(coursePublicKey, publicKey){
        return service.post(`/api/course/${coursePublicKey}/qa/${publicKey}/down-vote`);
    }


    starVote(coursePublicKey, publicKey){
        return service.post(`/api/course/${coursePublicKey}/qa/${publicKey}/star-vote`);
    }


    searchTagByName(coursePublicKey, name){
        return service.get(`/api/course/${coursePublicKey}/qa/tag/${name}`);
    }

    getRelateds(coursePublicKey, publicKey){
        return service.get(`/api/course/${coursePublicKey}/qa/${publicKey}/relateds`);
    }
}