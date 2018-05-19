
import CourseService from '../services/course';

import AssignmentService from '../services/assignment';


var courseService = new CourseService();
var assignmentService = new AssignmentService();

export default{
    state: {
        assignment: {
            publicKey: '',
            title: null,
            content: null,
            dueDate: null,
            lastDate: null,
            gradable: false,
            grade: {
                name: '',
                maxScore: null,
                weight: null,
            }
        },
        assignments: [],

    },
    mutations: {
        setAssignment(state, obj){
            state.assignment = obj;
        },
        setAssignments(state, list){
            state.assignments = list;
        },
        clearAssignment(state){
            state.assignment = {
                publicKey: '',
                name: null,
                content: null,
                dueDate: null,
                lastDate: null,
                gradable: false,
                grade: {
                    name: '',
                    maxScore: null,
                    weight: null,
                }
            };
        },
        clearAllAllAssignments(state){
            state.assignment = {
                publicKey: '',
                name: null,
                content: null,
                dueDate: null,
                lastDate: null,
                gradable: false,
                grade: {
                    name: '',
                    maxScore: null,
                    weight: null,
                }
            };
            state.assignments = [];
    
        }
    },
    actions: {
        getCourseAssignment(context, data){
            return assignmentService.get(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setAssignment", response.data);
                }
                return response;
            });
        },   

        getCourseAssignments(context, coursePublicKey){
            return assignmentService.getAll(coursePublicKey)
            .then(response => {
                if(response.status){
                    context.commit("setAssignments", response.data);
                }
                return response;
            });
        },  
        saveCourseAssignment(context, data){
            return assignmentService.save(data.coursePublicKey, data.params)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseAssignments", data.coursePublicKey);
                } 
                return response;  
            })
        },

        updateCourseAssignment(context, data){
            return assignmentService.update(data.coursePublicKey, data.params)
            .then(response => {
                if(response.status){
                    const dt = {
                        coursePublicKey: data.coursePublicKey,
                        publicKey: response.data.publicKey,
                    }
                    context.dispatch("getCourseAssignments", dt);
                } 
                return response;  
            })
        },    

        deleteCourseAssignment(context, data){
            return assignmentService.delete(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseAssignments", data.coursePublicKey);
                } 
                return response;  
            })
        },

        publishCourseAssignment(context, data){
            return assignmentService.publish(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseAssignments", data.coursePublicKey);
                } 
                return response;  
            })
        },
        disableCourseAssignment(context, data){
            return assignmentService.disable(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseAssignments", data.coursePublicKey);
                } 
                return response;  
            })
        },            


    },
    getters: {
      
        assignment(state){
            return state.assignment;
        },
        assignments(state){
            return state.assignments;
        },        

    }
}