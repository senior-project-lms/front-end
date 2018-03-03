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
        .catch(error => {
            return service.___then(error.response);
        })
    }



    enrollAsObserver(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/course/${publicKey}/enroll-as-observer?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(error => {
            return service.___then(error.response);
        })
    }

    cancel(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/enrollment-request/${publicKey}/cancel?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(error => {
            return service.___then(error.response);
        })
    }

    reject(coursePublicKey, enrollmentRequestPublicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/course/${coursePublicKey}/enrollment-request/${enrollmentRequestPublicKey}/reject?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(error => {
            return service.___then(error.response);
        });
    }
    approve(coursePublicKey, enrollmentRequestPublicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/course/${coursePublicKey}/enrollment-request/${enrollmentRequestPublicKey}/approve?access_token=${access_token}`)
        .then(response => {
            return service.___then(response)
        })
        .catch(error => {
            return service.___then(error.response);
        })
    }



    getAuthUserEnrollmentRequests(){
        return service.getAll('/api/me/enrollment-requests');
    }
    
    getEnrollmentRequestsOfCourse(publicKey){
        return service.getAll(`/api/course/${publicKey}/enrollment-requests`);
    }
}