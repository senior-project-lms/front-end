import {
    Axios
  } from './axios';
  import Service from './common'
  import StorageService from './storage'
  import AuthenticationService from './authentication';
  
  const service = new Service();
  const storageService = new StorageService();
  const authService = new AuthenticationService();
  
  export default class PublicResourceService {
    constructor() {}

    getAllPublicResourses(){
      const accessToken = authService.getAccessToken();
      return service.getAll(`/api/public-resources`)
      .then(response => {
        if(response.status){
            var courses = response.data;
            courses.map(course => {
                course.resources.map((resource) => {
                    resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                });
            })
            response.data = courses;
        }
        
        return response;
    })
    .catch(error => {
        return service.___then(error.response);
    });
    }
    
  }
  