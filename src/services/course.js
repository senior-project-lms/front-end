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
export default class CourseService {

  constructor() {

  }

  save(params) {
    return service.post('/api/course', params);
  }

  saveAll(params) {
    return service.post('/api/courses', params)
  }

  getAll(visible) {
    var path = '';
    if (visible) {
      path = '/api/courses/active';
    } else {
      path = '/api/courses/deactivated';
    }
    return service.getAll(path);
  }


  getStatuses() {
    const accessToken = authService.getAccessToken();
    return Axios.get(`/api/courses/statuses?access_token=${accessToken}`)
      .then(response => {
        return service.___then(response)
      })
      .catch(error => {
        return service.___then(error.response);
      });
  }

  updateVisibility(publicKey, visible) {
    const accessToken = authService.getAccessToken();
    var path = '';
    if (visible) {
      path = `/api/course/${publicKey}/visible?access_token=${accessToken}`
    } else {
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


  searchNotRegisteredBySearchParam(searchType, searchParam) {
    if (searchType == SearchType.Course.CODE) {
      return service.getAll(`/api/courses/not-registered/code/${searchParam}`);
    } else if (searchType == SearchType.Course.NAME) {
      return service.getAll(`/api/courses/not-registered/name/${searchParam}`);
    } else if (searchType == SearchType.Course.LECTURER) {
      // not saving, but save method use post request
      return service.post(`/api/courses/not-registered/lecturer`, searchParam);
    }

  }


  getAuthUserCourses() {
    return service.getAll('/api/me/courses');
  }

  getEnrolledUsers(publicKey) {
    return service.getAll(`/api/course/${publicKey}/enrolled-users`);
  }

  getEnrolledObserverUsers(publicKey) {
    return service.getAll(`/api/course/${publicKey}/observer-users`);
  }

  getCourseInfo(publicKey) {
    return service.get(`/api/course/${publicKey}/info`);
  }

  saveAssistant(publicKey, params) {
    return service.post(`/api/course/${publicKey}/assistant`, params);
  }

  getCourseAssistants(publicKey) {
    return service.getAll(`/api/course/${publicKey}/assistants`);
  }

  deleteAssistantCoursePrivilege(publicKey, userPublicKey) {
    return service.delete(`/api/course/${publicKey}/assistant/${userPublicKey}`)
  }

  saveEvent(publicKey, params) {
    return service.post(`/api/course/${publicKey}/calendar`, params);
  }
  deleteEvent(publicKey, eventPublicKey) {
    return service.delete(`/api/course/${publicKey}/calendar/${eventPublicKey}`);
  }

  getAllEvents(publicKey) {
    return service.getAll(`/api/course/${publicKey}/calendar`);
  }

  getAllEventsOfRegisteredCoursesOfAuthUser() {
    return service.getAll(`/api/course/all/calendar`);

  }
  getAllResources(publicKey) {
    return service.getAll(`/api/courses/${publicKey}/resources`);
  }

  saveCourseResource(publicKey, params) {
    return service.post(`/api/courses/${publicKey}/resource`, params);

  }



  uploadFile(coursePublicKey,file) {
    const accessToken = authService.getAccessToken();

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

  deleteFile(coursePublicKey, publicKey) {
    return storageService.delete(`/api/courses/${coursePublicKey}/storage/file`, publicKey);
  }

}
