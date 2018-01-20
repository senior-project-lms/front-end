import {Axios} from './axios';
import AuthenticationService from './authentication';

const authService = new AuthenticationService();

export default class Service{
    constructor(){}

    save(path, params){
        const accessToken = authService.getAccessToken();
        return Axios.post(`${path}?access_token=${accessToken}`, params)
        .then(response => {
            if(response.status === 200){
                const responseData = response.data;
                if (responseData != undefined && responseData != null){
                    return responseData;
                }
            }
            return false;
        })
        .catch(() => {
            return false;
        })
    }

    
    delete(path, publicKey){
        const accessToken = authService.getAccessToken();
        return Axios.delete(`${path}/${publicKey}?access_token=${accessToken}`)
        .then(response => {
            if(response.status === 200){
                const responseData = response.data;
                if (responseData != undefined && responseData != null){
                    return responseData;
                }
            }
            return false;
        })
        .catch(() => {
            return false;
        })
    }

    update(path, publicKey, params){
        const accessToken = authService.getAccessToken();
        return Axios.put(`${path}/${publicKey}?access_token=${accessToken}`, params)
        .then(response => {
            if(response.status === 200){
                const responseData = response.data;
                if (responseData != undefined && responseData != null){
                    return responseData;
                }
            }
            return false;
        })
        .catch(() => {
            return false;
        })
    }

    getAll(path){
        const accessToken = authService.getAccessToken();
        return Axios.get(`${path}?access_token=${accessToken}`)
        .then(response => {
            if(response.status === 200){
                const responseData = response.data;
                if (responseData != undefined && responseData != null){
                    return responseData;
                }
            }
            return [];
        })
        .catch(() => {
            return [];
        })
    }


    get(path, publicKey){
        const accessToken = authService.getAccessToken();
        return Axios.get(`${path}/${publicKey}?access_token=${accessToken}`)
        .then(response => {
            if(response.status === 200){
                const responseData = response.data;
                if (responseData != undefined && responseData != null){
                    return responseData;
                }
            }
            return null;
        })
        .catch(() => {
            return null;
        })
    }


}