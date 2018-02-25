import Service from './common';
import AuthenticationService from './authentication';

const auth = new AuthenticationService();
const service = new Service();
import {Axios} from './axios';



export default class EnrollmentRequestService{

    constructor(){}



    enroll(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/course/${publicKey}/enroll?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(() => {
            return service.catchedResponse;
        });
    }

    cancel(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/enrollment-request/${publicKey}/cancel?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(() => {
            return service.catchedResponse;
        });
    }

    reject(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/enrollment-request/${publicKey}/reject?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(() => {
            return service.catchedResponse;
        });
    }
    approve(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/enrollment-request/${publicKey}/approve?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(() => {
            return service.catchedResponse;
        });
    }



    getAuthUserEnrollmentRequests(){
        return service.getAll('/api/me/enrollment-requests');
    }
    
    getEnrollmentRequestsOfCourse(publicKey){
        return service.getAll(`/api/course/${publicKey}/enrollment-requests`);
    }
}