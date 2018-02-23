
import EnrollmentRequestService from '../services/enrollmentRequest';

var enrollmentRequestService = new EnrollmentRequestService();


export default{
    state: {
        enrollmentRequests: []
    },
    mutations: {
        setEnrollmentRequests(state, list){
            state.enrollmentRequests = list;
        },
        clearEnrollmentRequestStore(state, array){
            state.enrollmentRequests = [];
        },

        
    },
    actions: {
        enrollCourse(context, publicKey){
            return enrollmentRequestService.enroll(publicKey);
        },
        cancelEnrollementCourse(context, publicKey){
            return enrollmentRequestService.cancel(publicKey);
        },
        rejecetEnrollementCourse(context, publicKey){
            return enrollmentRequestService.reject(publicKey);
        },
        getAuthUserEnrollmentRequests(context){
            
            return enrollmentRequestService.getAuthUserEnrollmentRequests()
                .then( response => {
                    if(response.status){
                        context.commit("setEnrollmentRequests", response.data)
                    }
                    return response;
                })    
        }

    },
    getters: {
        enrollmentRequests(state){
            return state.enrollmentRequests;
        },

    }
}