import {Axios} from './axios'
import AuthenticationService from './authentication';


const authenticationService = new AuthenticationService();


export default class StorageService{
    
    upload(path, file){
        
        var formData = new FormData();
        formData.append("file", file);
        const accessToken = authenticationService.getAccessToken();
        return Axios.post(`${path}?access_token=${accessToken}`, formData)
        .then(response => {
            if(response.status === 200){
                const responseData = response.data;
                return responseData;
            }
            return null;
        })
        .catch(() => {
            return null;
        });
    }


    delete(path, publicKey){
        const accessToken = authenticationService.getAccessToken();
        return Axios.delete(`${path}/${publicKey}?access_token=${accessToken}`)
        .then(response => {
           return response.status === 200;
        })
        .catch(() => {
            return false;
        });
    }

}