import {Axios} from './axios';
import AuthenticationService from './authentication';

const authService = new AuthenticationService();

export default class Service{
    constructor(){
         this.catchedResponse = {
            status: false,
            message: "Networking error!",
            data: null
        }


    }


    ___then(response){
        
        const responseData = response.data;

        var returnedResponse = {
            status: false,
            message: null,
            data: null
        }
        if(response.status === 200){
            if (responseData != undefined && responseData != null){
                returnedResponse.status = true;
                returnedResponse.data = responseData
            }
        }
        else {
            returnedResponse.message = responseData.message;

        }
        return returnedResponse;

    }

    /*
        function: save
        @param (path) api path for current process
        @param (params) contains object which represents the pojo in backend
        @return (boolean) returns boolean that represent saved or not
        used in services, to save data, requests with POST method
    */
    save(path, params){
        const accessToken = authService.getAccessToken();
        return Axios.post(`${path}?access_token=${accessToken}`, params)
        .then(response => {
            return this.___then(response)
        })
        .catch(error => {
            return this.___then(error.response);
        })
    }

    /*
        function: delete
        @param (path) api path for current process
        @param (publicKey) public key of deleted object
        @return (boolean) returns boolean that represent deleted or not
        used in services, to delete data, requests with DELETE method
    */    
    delete(path, publicKey){
        const accessToken = authService.getAccessToken();
        return Axios.delete(`${path}/${publicKey}?access_token=${accessToken}`)
        .then(response => {
            return this.___then(response);

        })
        .catch(error => {
            return this.___then(error.response);
        })
    }

    /*
        function: update
        @param (path) api path for current process
        @param (params) contains object which represents the pojo in backend
        @param (publicKey) public key of updated object
        @return (boolean) returns boolean that represent updated or not
        used in services, to delete data, requests with PUT method
    */    
    update(path, publicKey, params){
        const accessToken = authService.getAccessToken();
        return Axios.put(`${path}/${publicKey}?access_token=${accessToken}`, params)
        .then(response => {
            return this.___then(response);
        })
        .catch(error => {
            return this.___then(error.response);
        })
    }
    /*
        function: getAll
        @param (path) api path for current process
        @return (array) returns empty array, or array of the fetched objects from api
        used in services, to fetch array of data, requests with GET method
    */  
    getAll(path){
        const accessToken = authService.getAccessToken();
        return Axios.get(`${path}?access_token=${accessToken}`)
        .then(response => {
            return this.___then(response)
        })
        .catch(error => {
            return this.___then(error.response);
        })
    }

    /*
        function: get
        @param (path) api path for current process
        @param (publicKey) public key of fetched object
        @return (null or object) returns null or fetched object from api
        used in services, to fetch single object from api and returns it, requests with GET method
    */  
    get(path, publicKey){
        const accessToken = authService.getAccessToken();
        return Axios.get(`${path}/${publicKey}?access_token=${accessToken}`)
        .then(response => {
            return this.___then(response)
        })
        .catch(error => {
            return this.___then(error.response);
        })
    }


}