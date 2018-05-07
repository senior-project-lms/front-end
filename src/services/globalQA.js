import {Axios} from './axios';
import Service from './common'
import StorageService from './storage'

const service = new Service();

export default class GlobalQAService{
    constructor(){}


    /*
        function: save
        @param (params) contains the system announncement object that is represented in backend as pojo
        @return (boolean) returns boolean that represent saved or not
        used for to save system announcement
    */     
    save(params){
        return service.post('/api/global-qa', params);      
    }

    /*
        function: delete
        @param (publicKey) public key is which represent the deleted object
        @return (boolean) returns boolean that represent deleted or not
        used for to delete system announcement
    */       
    delete(publicKey){
        return service.delete(`/api/global-qa/${publicKey}`);
    }

    /*
        function: getAll
        @param (page) page number, api returns 5 object for each page, increment page for new objects
        @return (array) returns empty or filled array of announcment objects
        used for the fetch system announcments page by page 
    */       
    getAll(page){
        return service.getAll(`/api/global-qas/${page}`);
        
    }

    get(publicKey){
        return service.get(`/api/global-qa/${publicKey}`);
    }


    saveComment(publicKey, params){
        return service.post(`/api/global-qa/${publicKey}/comment`, params);      

    }


    upVote(publicKey){
        return service.post(`/api/global-qa/${publicKey}/up-vote`);
    }


    downVote(publicKey){
        return service.post(`/api/global-qa/${publicKey}/down-vote`);
    }


    starVote(publicKey){
        return service.post(`/api/global-qa/${publicKey}/star-vote`);
    }

    searchTagByName(name){
        return service.get(`/api/global-qa/tag/${name}`);
    }

    getRelateds(publicKey){
        return service.get(`/api/global-qa/${publicKey}/relateds`);
    }
}