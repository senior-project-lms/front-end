

import {Axios} from './axios';
import AuthenticationService from './authentication';

const authenticationService = new AuthenticationService();

export default class UserService{

    constructor(){

    }

    fetchProfile(){
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




}


/*
    this function should be in userService.js
    function: ​fetchProfile
    parameters:​none
    returns:​boolean - successfully fetched or not
    Task: ​URLSearchParams, e session storage da tutulan access_token eklenir.
    Axios.post methodu ile /api/me ​endpointine request gönderilir.
    dönen name, surname, username, public_id alanları session storage a ilgili
    fonksiyonlar ile eklenir.
*/