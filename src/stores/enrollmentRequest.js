
import EnrollmentRequestService from '../services/enrollmentRequest';

var enrollmentRequestService = new EnrollmentRequestService();


export default{
    state: {
        enrollmentRequestCounts: {},
        enrollmentRequests: [],
        courseEnrollmentRequests: [],
    },
    mutations: {
        setEnrollmentRequests(state, list){
            state.enrollmentRequests = list;
        },
        setEnrollmentRequestCounts(state, obj){
            state.enrollmentRequestCounts = obj;
        },
        setCourseEnrollmentRequests(state, list){
            state.courseEnrollmentRequests = list;
        },
        clearEnrollmentRequestStore(state){
            state.enrollmentRequests = [];
            state.courseEnrollmentRequests = [];
            state.enrollmentRequestCounts={};
        },

        
    },
    actions: {
        enrollCourse(context, publicKey){
            return enrollmentRequestService.enroll(publicKey);
        },
        enrollCourseAsObserver(context, publicKey){
            return enrollmentRequestService.enrollAsObserver(publicKey);
        },
        cancelEnrollementRequest(context, publicKey){
            return enrollmentRequestService.cancel(publicKey);
        },
        rejecetEnrollementRequest(context, data){
            const coursePublicKey = data.coursePublicKey;
            const  enrollmentRequestPublicKey = data.enrollmentRequestPublicKey;
            return enrollmentRequestService.reject(coursePublicKey, enrollmentRequestPublicKey);
        },
        approveEnrollementRequest(context, data){
            const coursePublicKey = data.coursePublicKey;
            const  enrollmentRequestPublicKey = data.enrollmentRequestPublicKey;
            return enrollmentRequestService.approve(coursePublicKey, enrollmentRequestPublicKey);
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
                        context.commit("setCourseEnrollmentRequests", response.data)
                    }
                    return response;
                })    
        },
        getEnrollmentRequestCounts(context, publicKey){
            return enrollmentRequestService.getEnrollmentRequestCounts(publicKey)
            .then( response => {
                if(response.status){
                    context.commit("setEnrollmentRequestCounts", response.data)
                }
                return response;
            })   
        },

    },
    getters: {
        enrollmentRequests(state){
            return state.enrollmentRequests;
        },
        courseEnrollmentRequests(state){
            return state.courseEnrollmentRequests;
        },
        enrollmentRequestCounts(state){
            return state.enrollmentRequestCounts;
        }
    }
}