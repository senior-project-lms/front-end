
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
            resourceKeys: [],
            resources: [],
            grade: {
                name: '',
                maxScore: null,
                weight: null,
            }
        },
        studentAssignment: {
            publicKey: '',
            content: null,
            resourceKeys: [],
            resources: [],
        },
        studentAssignments: [],
        assignments: [],

    },
    mutations: {
        setAssignment(state, obj){
            state.assignment = obj;
        },
        setStudentAssignments(state, list){
            state.studentAssignments = list;
        },
        setAssignments(state, list){
            state.assignments = list;
        },
        setStudentAssignment(state, obj){
            state.studentAssignment = obj;
        },
        clearStudentAssignment(state){
            state.studentAssignment = {
                publicKey: '',
                content: null,
                resourceKeys: [],
                resources: [],
            }
        },
        clearAssignment(state){
            state.assignment = {
                publicKey: '',
                name: null,
                content: null,
                dueDate: null,
                lastDate: null,
                gradable: false,
                resourceKeys: [],
                resources: [],
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
                resourceKeys: [],
                resources: [],
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
        getCourseStudentAssignments(context, data){
            return assignmentService.getStudentsAssignmentAnswers(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setStudentAssignments", response.data);
                }
                return response;
            });
        }, 
        getCourseAuthStudentAssignment(context, data){
            return assignmentService.getAuthStudentAssignment(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setStudentAssignment", response.data);
                }
                return response;
            });
        }, 
        getCourseAssignmentForStudent(context, data){
            return assignmentService.getForStudent(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setAssignment", response.data);
                }
                return response;
            });
        },   
        
        getCourseAssignment(context, data){
            return assignmentService.get(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setAssignment", response.data);
                }
                return response;
            });
        },   
        
        getCourseAssignmentsOfStudent(context, coursePublicKey){
            return assignmentService.getAllForStudent(coursePublicKey)
            .then(response => {
                if(response.status){
                    context.commit("setAssignments", response.data);
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
            return assignmentService.update(data.coursePublicKey, data.publicKey, data.params)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseAssignments", data.coursePublicKey);
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

        uploadCourseAssignmentFile(context, {publicKey, file}) {  
            return assignmentService.uploadFile(publicKey,file);
        },
        
        deleteCourseAssignmentFile(context, data) {
            const coursePublicKey = data.coursePublicKey;
            const publicKey = data.publicKey;
            return assignmentService.deleteFile(coursePublicKey, publicKey)
            //   .then(response => {
            //     if (response.status) {
            //       context.dispatch('getAllResources', coursePublicKey);
            //     }
            //     return response;
            //   });
        },
        saveCourseStudentAssignment(context, data){
            return assignmentService.saveStudentAssignment(data.coursePublicKey, data.publicKey, data.params)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseAuthStudentAssignment", data);
                } 
                return response;  
            })
        },
        updateCourseStudentAssignment(context, data){
            return assignmentService.updateStudentAssignment(data.coursePublicKey, data.publicKey, data.stdPublicKey, data.params)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseAuthStudentAssignment", data);
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
        studentAssignment(state){
            return state.studentAssignment;
        },
        studentAssignments(state){
            return state.studentAssignments;
        }

    }
}