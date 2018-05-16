import {Axios} from './axios'
import AuthenticationService from './authentication';
import Service from './common'

const authenticationService = new AuthenticationService();
const service = new Service();

export default class StorageService{
    
    upload(path, file){
        
        var formData = new FormData();
        formData.append("file", file);
        const accessToken = authenticationService.getAccessToken();
        return Axios.post(`${path}?access_token=${accessToken}`, formData)
        .then(response => {
            return service.___then(response)
        })
        .catch(response => {
            return service.___then(response)
        });
    }


    delete(path, publicKey){
        const accessToken = authenticationService.getAccessToken();
        return Axios.delete(`${path}/${publicKey}?access_token=${accessToken}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(response => {
            return service.___then(response)
        });
    }

}