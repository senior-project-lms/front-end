

import {Axios} from './axios';
import AuthenticationService from './authentication';
import Service from './common'
import {AccessLevel} from '../properties/accessLevel'


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
    getAllActiveUsers(){
        return service.getAll('/api/users');
    }
  
    save(params){
        return service.save('/api/user', params);
    } 

    saveAll(params){
        return service.save('/api/users', params);
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
        return Axios.get(`/api/users/status?access_token=${accessToken}`)
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
            path = `/api/user/${publicKey}/visible?access_token=${accessToken}`
        }
        else{
            path = `/api/user/${publicKey}/invisible?access_token=${accessToken}`
        }
        
        return Axios.put(path)
        .then(response => {
            return service.___then(response);
        })
        .catch(error => {
            return service.___then(error.response);
        });

    }



    getAllByAuthority(param){
        var path = '';
        if(AccessLevel.LECTURER == param){
            path = '/api/users/lecturer';
        }

        return service.getAll(path);
    }


    getCoursePrivilegesOfAuthUser(publicKey){
        return service.getAll(`/api/course/${publicKey}/me/privileges`);
    }

    getAllUsernames(){
        return Axios.get('/usernames');
    }

}


