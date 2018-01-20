import {Axios} from './axios';
import Service from './common'

const service = new Service();

export default class SystemAnnouncementService{
    constructor(){}


    save(params){
        return service.save('/api/admin/system-announcement', params);      
    }

    delete(publicKey){
        return service.delete('/api/admin/system-announcement', publicKey);
    }

    getAll(page){
        return service.getAll(`/api/system-announcements/${page}`);
    }
}