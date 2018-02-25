
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
        cancelEnrollementRequest(context, publicKey){
            return enrollmentRequestService.cancel(publicKey);
        },
        rejecetEnrollementRequest(context, publicKey){
            return enrollmentRequestService.reject(publicKey);
        },
        approveEnrollementRequest(context, publicKey){
            return enrollmentRequestService.approve(publicKey);
        },

        getAuthUserEnrollmentRequests(context){
            
            return enrollmentRequestService.getAuthUserEnrollmentRequests()
                .then( response => {
                    if(response.status){
                        context.commit("setEnrollmentRequests", response.data)
                    }
                    return response;
                })    
        },

        getEnrollmentRequestsOfCourse(context, publicKey){
            
            return enrollmentRequestService.getEnrollmentRequestsOfCourse(publicKey)
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