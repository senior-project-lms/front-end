import {Axios} from './axios'



export default class UserService{

    constructor(){

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