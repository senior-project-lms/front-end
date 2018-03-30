import {Axios} from './axios';
import Service from './common'
import StorageService from './storage'
import AuthenticationService from './authentication';

const service = new Service();
const storageService = new StorageService();
const authenticationService = new AuthenticationService();


export default class GlobalQAService{
    constructor(){}


    /*
        function: save
        @param (params) contains the system announncement object that is represented in backend as pojo
        @return (boolean) returns boolean that represent saved or not
        used for to save system announcement
    */     
    save(params){
        return service.save('/api/globalQaQuestion', params);      
    }



    /*
        function: delete
        @param (publicKey) public key is which represent the deleted object
        @return (boolean) returns boolean that represent deleted or not
        used for to delete system announcement
    */       
    delete(publicKey){
        return service.delete('/api/admin/globalQaQuestion', publicKey);
    }

    /*
        function: getAll
        @param (page) page number, api returns 5 object for each page, increment page for new objects
        @return (array) returns empty or filled array of announcment objects
        used for the fetch system announcments page by page 
    */       
    getAll(page){
        const accessToken = authenticationService.getAccessToken();
        return service.getAll(`/api/globalQaQuestion/${page}`);
        
    }

    getAnswers(questionPublicKey){
        return service.getAnswers('api/global-answers/');
    }

    

}