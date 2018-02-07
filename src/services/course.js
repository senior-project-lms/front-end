
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

    getAllActive(){
        return service.getAll('/api/courses/active');
    }


    getStatuses(){
        const accessToken = authService.getAccessToken();
        return Axios.get(`/api/admin/courses/statuses?access_token=${accessToken}`)
        .then(response =>{
            return service.___then(response)
        })
        .catch(error => {
            return this.___then(error.response);
        });
    }

}