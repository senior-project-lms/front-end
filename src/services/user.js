

import {Axios} from './axios';
import AuthenticationService from './authentication';
import Service from './common'

var authenticationService = new AuthenticationService();
var service = new Service();

export default class UserService{

    constructor(){

    }

    getProfile(){
        const accessToken = authenticationService.getAccessToken();
        if(accessToken != null || accessToken != ''){
            
            return Axios.get(`/api/me?access_token=${accessToken}`)
            .then(response => {
                return service.___then(response)
            })
            .catch(() => {
                return service.catchedResponse;
            });

        }

    }

    getAccessPrivileges(){
        return service.getAll('/api/me/privileges');
    }
    getAllActiveUsers(){
        return service.getAll('/api/admin/users');
    }
    getAllActiveUsersByUserType(){

    }   
    save(params){
        return service.save('/api/admin/user', params);
    } 
    saveAll(params){
        return service.saveAll('/api/admin/users',params);
    }
    getAll(visible){
        var path = '';
        if(visible){
            path = '/api/users/active';
        }
        else{
            path = '/api/users/deactivated';
        }
        return service.getAll(path);
    }
    getStatus(){
        const accessToken = authenticationService.getAccessToken();
        return Axios.get(`/api/admin/users/status?access_token=${accessToken}`)
        .then(response =>{
            return service.___then(response)
        })
        .catch(error => {
            return service.___then(error.response);
        });
    }
    updateVisibility(publicKey, visible){
        const accessToken = authenticationService.getAccessToken();
        var path = '';
        if(visible){
            path = `/api/admin/user/${publicKey}/visible?access_token=${accessToken}`
        }
        else{
            path = `/api/admin/user/${publicKey}/invisible?access_token=${accessToken}`
        }
        
        return Axios.put(path)
        .then(response => {
            return service.___then(response);
        })
        .catch(error => {
            return service.___then(error.response);
        });

    }



    

}


