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
    return service.post(`/api/courses/${publicKey}/assignments`, params);      

  }



  delete(publicKey,filePublicKey) {
    return service.delete(`/api/courses/${publicKey}/assignments/${filePublicKey}`);

  }


  getAll(publicKey) {

    return service.getAll(`/api/courses/${publicKey}/assignments`);
/*
    const accessToken = authenticationService.getAccessToken();

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
          return service.___then(error.response);
        });
   */ 
  }
  uploadFile(coursePublicKey,file) {
    const accessToken = authenticationService.getAccessToken();

    return storageService.upload(`/api/courses/${coursePublicKey}/storage/file`, file)
      .then(response => {
        if (response.data != null && response.data != undefined) {
          response.data.path = `${Axios.defaults.baseURL}${response.data.path}?access_token=${accessToken}`;
        }
        return response;

      })
      .catch(error => {
        return service.___then(error.response);
      })

  }
  deleteFile(publicKey, filePublicKey) {
    return storageService.delete(`/api/courses/${publicKey}/storage/file`, filePublicKey);
  }

}
