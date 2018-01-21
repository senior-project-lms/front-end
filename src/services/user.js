

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
                
                var user = {username: '', name: '', surname: '', authority: {accessLevel: null}};

                if(response.status === 200){
                    const responseData = response.data;
                
                    if(responseData != null){
                        user = responseData;        
                    }
                    return user;
                }
                return user;
            })
            .catch(() => {
                var user = {username: '', name: '', surname: '', authority: {accessLevel: null}};
                return user;
            });

        }

    }

    getAccessPrivileges(){
        return service.getAll('/api/me/privileges');
    }    

}


