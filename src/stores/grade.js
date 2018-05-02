import GradeService from "../services/grade";
const gradeService = new GradeService();



export default{

    state:{
        grades: [],
        grade:{
            publicKey: '',
            name: '',
            maxScore: 0,
            weight: 0,
        },
        scores: [],
    },
    mutations:{
        setGrades(state, list){
            state.grades = list;
        },
        setGrade(state, obj){
            state.grade = obj;
        },
        setScores(state, list){
            state.scores = list;  
        },
        clearAllGrades(state){
            this.grades = [];
            this.scores = [];
            this.grade = {
                publicKey: '',
                name: '',
                maxScore: 0,
                weight: 0,
            };
        }
    },
    actions:{
        getCourseGradeForView(context, data){
            return gradeService.getForView(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setGrade", response.data);
                }
                return response;
            });
        },

        getCourseGrade(context, data){
            return gradeService.get(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setGrade", response.data);
                }
                return response;
            });
        },   

        getCourseGrades(context, coursePublicKey){
            return gradeService.get(coursePublicKey)
            .then(response => {
                if(response.status){
                    context.commit("setGrades", response.data);
                }
                return response;
            });
        },  

        saveCourseGrade(context, data){
            return gradeService.save(data.coursePublicKey, data.params)
            .then(response => {
                if(response.status){
                    const dt = {
                        coursePublicKey: data.coursePublicKey,
                        publicKey: response.data.publicKey,
                    }
                    context.dispatch("getCourseGradeForView", dt);
                } 
                return response;  
            })
        },

        updateCourseGrade(context, data){
            return gradeService.update(data.coursePublicKey, data.publicKey, data.params)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseGradeForView", data);
                } 
                return response;  
            })
        },    

        deleteCourseGrade(context, data){
            return gradeService.delete(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("getCourseGrades", data.coursePublicKey);
                } 
                return response;  
            })
        },

        publishCourseGrade(context, data){
            return gradeService.publish(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("getCourseGrades", data.coursePublicKey);
                } 
                return response;  
            })
        },
        disableCourseGrade(context, data){
            return gradeService.publish(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("getCourseGrades", data.coursePublicKey);
                } 
                return response;  
            })
        },  

        saveCourseScore(context, data){
            return gradeService.saveScore(data.coursePublicKey, data.publicKey, data.params);
        },              

    },
    getters:{

    }
}