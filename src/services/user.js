

import {Axios} from './axios';
import AuthenticationService from './authentication';
import Service from './common'

const authenticationService = new AuthenticationService();
const service = new Service();

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

}


