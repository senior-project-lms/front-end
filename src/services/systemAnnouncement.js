import {Axios} from './axios';
import Service from './common'

const service = new Service();

export default class SystemAnnouncementService{
    constructor(){}


    /*
        function: save
        @param (params) contains the system announncement object that is represented in backend as pojo
        @return (boolean) returns boolean that represent saved or not
        used for to save system announcement
    */     
    save(params){
        return service.save('/api/admin/system-announcement', params);      
    }

    /*
        function: delete
        @param (publicKey) public key is which represent the deleted object
        @return (boolean) returns boolean that represent deleted or not
        used for to delete system announcement
    */       
    delete(publicKey){
        return service.delete('/api/admin/system-announcement', publicKey);
    }

    /*
        function: getAll
        @param (page) page number, api returns 5 object for each page, increment page for new objects
        @return (array) returns empty or filled array of announcment objects
        used for the fetch system announcments page by page 
    */       
    getAll(page){
        return service.getAll(`/api/system-announcements/${page}`);
    }
}