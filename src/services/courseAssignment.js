import {
  Axios
} from './axios';
import Service from './common'
import StorageService from './storage'
import AuthenticationService from './authentication';

const service = new Service();
const storageService = new StorageService();
const authenticationService = new AuthenticationService();


export default class CourseAssignmentService {
  constructor() {}



  save(publicKey, params) {
    //return service.post(`/api/courses/${publicKey}/assignments`, params);      
    return console.log("HAHA");

  }



  delete(publicKey) {
    return service.delete(`/api/courses/${publicKey}/assignments`, );

  }


  getAll(publicKey, page) {
    const accessToken = authenticationService.getAccessToken();
    return service.getAll(`/api/courses/${publicKey}/assignments/${page}`)
    /*
        .then(response => {
            
            if(response.status){
                var announcements = response.data;
                announcements.map(announcement => {
                    announcement.resources.map((resource) => {
                        resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                    });
                })
                response.data = announcements;
            }
            return response;
        })
        .catch(error => {
            console.log(error)

            return service.___then(error);
        });
    */
  }

}
