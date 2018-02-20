
import {Axios} from './axios'
import Service from "./common"
import AuhenticationService from './authentication';
import AuthenticationService from './authentication';


var service = new Service();
var authService = new AuthenticationService();

export default class CourseService{

    constructor(){

    }

    save(params){
        return service.save('/api/admin/course', params);
    }

    saveAll(params){
        return service.save('/api/admin/courses', params)
    }

    getAll(visible){
        var path = '';
        if(visible){
            path = '/api/courses/active';
        }
        else{
            path = '/api/courses/deactivated';
        }
        return service.getAll(path);
    }


    getStatuses(){
        const accessToken = authService.getAccessToken();
        return Axios.get(`/api/admin/courses/statuses?access_token=${accessToken}`)
        .then(response =>{
            return service.___then(response)
        })
        .catch(error => {
            return service.___then(error.response);
        });
    }

    updateVisibility(publicKey, visible){
        const accessToken = authService.getAccessToken();
        var path = '';
        if(visible){
            path = `/api/admin/course/${publicKey}/visible?access_token=${accessToken}`
        }
        else{
            path = `/api/admin/course/${publicKey}/invisible?access_token=${accessToken}`
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