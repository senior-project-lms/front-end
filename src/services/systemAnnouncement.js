import {Axios} from './axios';
import Service from './common'
import StorageService from './storage'
import AuthenticationService from './authentication';

const service = new Service();
const storageService = new StorageService();
const authenticationService = new AuthenticationService();


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
        const accessToken = authenticationService.getAccessToken();
        return service.getAll(`/api/system-announcements/${page}`)
        .then(response => {
            if(response.status){
                var announcments = response.data;
                announcments.map(announcement => {
                    announcement.resources.map((resource) => {
                        resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                    });
                })
                response.data = announcments;
            }
            
            return response;
        });
    }

    uploadImage(image){
        const accessToken = authenticationService.getAccessToken();
        return storageService.upload('/api/admin/system-announcement/storage/image', image)
        .then(response => {
            if(response.status){
                
                if(response.data != null && response.data != undefined){
                    response.data.path = `${Axios.defaults.baseURL}${response.data.path}?access_token=${accessToken}`;
                }
            }
            return response;
            
        });
    
    }

    deleteImage(publicKey){
        return storageService.delete('/api/admin/system-announcement/storage/image', publicKey);
    }



    uploadFile(file){
        const accessToken = authenticationService.getAccessToken();
        return storageService.upload('/api/admin/system-announcement/storage/file', file)
        .then(response => {
            if(response.ata != null && response.data != undefined){
                response.data.path = `${Axios.defaults.baseURL}${response.data.path}?access_token=${accessToken}`;
            }
            return response;
            
        });
    
    }

    deleteFile(publicKey){
        return storageService.delete('/api/admin/system-announcement/storage/file', publicKey);
    }

}