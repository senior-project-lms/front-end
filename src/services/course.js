
import {Axios} from './axios'
import Service from "./common"
import AuthenticationService from './authentication';
import {SearchType} from '../properties/searchType';


var service = new Service();
var authService = new AuthenticationService();

export default class CourseService{

    constructor(){

    }

    save(params){
        return service.save('/api/course', params);
    }

    saveAll(params){
        return service.save('/api/courses', params)
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
        return Axios.get(`/api/courses/statuses?access_token=${accessToken}`)
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
            path = `/api/course/${publicKey}/visible?access_token=${accessToken}`
        }
        else{
            path = `/api/course/${publicKey}/invisible?access_token=${accessToken}`
        }
        
        return Axios.put(path)
        .then(response => {
            return service.___then(response);
        })
        .catch(error => {
            return service.___then(error.response);
        });

    }


    searchNotRegisteredBySearchParam(searchType, searchParam){
        if(searchType == SearchType.Course.CODE){
            return service.getAll(`/api/courses/not-registered/code/${searchParam}`);
        }
        else if(searchType == SearchType.Course.NAME){
            return service.getAll(`/api/courses/not-registered/name/${searchParam}`);
        }
        else if(searchType == SearchType.Course.LECTURER){
            // not saving, but save method use post request
            return service.save(`/api/courses/not-registered/lecturer`, searchParam);
        }
        
    }


}