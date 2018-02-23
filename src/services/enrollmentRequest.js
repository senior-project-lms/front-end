import Service from './common';
import AuthenticationService from './authentication';

const auth = new AuthenticationService();
const service = new Service();
import {Axios} from './axios';



export default class EnrollmentRequestService{

    constructor(){}



    enroll(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/course/${publicKey}/enroll?access_token=${access_token}`);
    }

    cancel(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/course/${publicKey}/cancel?access_token=${access_token}`);
    }

    reject(publicKey){
        const access_token = auth.getAccessToken();
        return Axios.post(`/api/course/${publicKey}/reject?access_token=${access_token}`);
    }


    getAuthUserEnrollmentRequests(){
        return service.getAll('/api/me/enrollment-requests');
    }
    
}