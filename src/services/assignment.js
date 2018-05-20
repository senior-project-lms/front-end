import {Axios} from './axios';
import Service from './common'
import StorageService from './storage'
import AuthenticationService from './authentication';

const service = new Service();
var authService = new AuthenticationService();
var storageService = new StorageService();

export default class AssignmentService{
    constructor(){}


    getStudentsAssignmentAnswers(coursePublicKey, publicKey){
        const accessToken = authService.getAccessToken();
        return service.getAll(`/api/course/${coursePublicKey}/assignment/${publicKey}/student-assignments`)
        .then(response => {
            if(response.status){
                var assignments = response.data;
                assignments.map(assignment => {
                    assignment.resources.map((resource) => {
                        resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                    });
                })
                response.data = assignments;
            }
            
            return response;
        })
        .catch(error => {
            return service.___then(error.response);
        });
    }


    getAllForStudent(coursePublicKey){
        return service.getAll(`/api/course/${coursePublicKey}/assignments/student`)

    }

    getAll(coursePublicKey){
        return service.getAll(`/api/course/${coursePublicKey}/assignments`);
    }


    getAuthStudentAssignment(coursePublicKey, publicKey){
        const accessToken = authService.getAccessToken();

        return service.get(`/api/course/${coursePublicKey}/assignment/${publicKey}/me`)
        .then(response => {
            if(response.status){
                var assignment = response.data;

                assignment.resources.map((resource) => {
                        resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                });
            
                response.data = assignment;
            }
            
            return response;
        })
        .catch(error => {
            return service.___then(error.response);
        });
    }



    getForStudent(coursePublicKey, publicKey){
        const accessToken = authService.getAccessToken();

        return service.get(`/api/course/${coursePublicKey}/assignment/${publicKey}/student`)
        .then(response => {
            if(response.status){
                var assignment = response.data;

                assignment.resources.map((resource) => {
                        resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                });
            
                response.data = assignment;
            }
            
            return response;
        })
        .catch(error => {
            return service.___then(error.response);
        });
    }


    get(coursePublicKey, publicKey){
        const accessToken = authService.getAccessToken();

        return service.get(`/api/course/${coursePublicKey}/assignment/${publicKey}`)
        .then(response => {
            if(response.status){
                var assignment = response.data;

                assignment.resources.map((resource) => {
                        resource.url = `${Axios.defaults.baseURL}${resource.url}?access_token=${accessToken}`;
                });
            
                response.data = assignment;
            }
            
            return response;
        })
        // .catch(error => {
        //     return service.___then(error.response);
        // });
    }


    save(coursePublicKey, params){
        return service.post(`/api/course/${coursePublicKey}/assignment`, params);
    }
   
    update(coursePublicKey, publicKey, params){
        return service.put(`/api/course/${coursePublicKey}/assignment/${publicKey}`, params);
    }

    publish(coursePublicKey, publicKey){
        return service.put(`/api/course/${coursePublicKey}/assignment/${publicKey}/publish`, {});
    }

    disable(coursePublicKey, publicKey){
        return service.put(`/api/course/${coursePublicKey}/assignment/${publicKey}/disable`, {});
    }    

    delete(coursePublicKey, publicKey){
        return service.delete(`/api/course/${publicKey}/assignment/${publicKey}`);
    }

    uploadFile(coursePublicKey, file) {
        const accessToken = authService.getAccessToken();
    
        return storageService.upload(`/api/course/${coursePublicKey}/storage/assignment/file`, file)
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

    saveStudentAssignment(coursePublicKey, publicKey, params){
        return service.post(`/api/course/${coursePublicKey}/assignment/${publicKey}/me`, params);
    }
    updateStudentAssignment(coursePublicKey, publicKey, stdPublicKey, params){
        return service.put(`/api/course/${coursePublicKey}/assignment/${publicKey}/me/${stdPublicKey}`, params);
    }
}