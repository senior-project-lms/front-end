import {
    Axios
  } from './axios'
  import Service from "./common"
  import AuthenticationService from './authentication';
  import {
    SearchType
  } from '../properties/searchType';
  import StorageService from './storage'
  
  var service = new Service();
  var authService = new AuthenticationService();
  var storageService = new StorageService();
  export default class CourseResourcesService {
  
    constructor() {
  
    }
  
getAllResources(publicKey) {
    const accessToken = authService.getAccessToken();
    return service.getAll(`/api/course/${publicKey}/resources`)
    .then(response => {
      if (response.status) {
        var resources = response.data;
        resources.map(resource => {
          resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;

        })
        response.data = resources;
      }

      return response;
    })
    .catch(error => {
      return service.___then(error.response);
    });
  }

  saveCourseResource(publicKey, params) {
    return service.post(`/api/course/${publicKey}/resource`, params);

  }



  uploadFile(coursePublicKey,file) {
    const accessToken = authService.getAccessToken();

    return storageService.upload(`/api/course/${coursePublicKey}/storage/file`, file)
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

  deleteFile(coursePublicKey, publicKey) {
    return storageService.delete(`/api/course/${coursePublicKey}/resource`, publicKey);
  }


  sharePublicly(coursePublicKey, resourcePublicKey, val){
    if(val){
      return service.put(`/api/course/${coursePublicKey}/resource/${resourcePublicKey}/public`);
    }
    else{
      return service.put(`/api/course/${coursePublicKey}/resource/${resourcePublicKey}/private`);

    }
  }
}
