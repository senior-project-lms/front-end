import QuizTestService from "../services/quizTest";

var quizTestService = new QuizTestService();

export default{
    
    state: {
        courseQuizTests: [],
        courseQuizTest: {
            publicKey: '',
            name: '',
            detail: '',
            gradable: false,
            limitedDuration: false,
            dueDated: false,
            questions: [],
        }
    },
    mutations: {
        setCourseQuizTests(state, list){
            state.courseQuizTests = list;
        },
        setCourseQuizTest(state, obj){
            state.courseQuizTest = obj;
        }
        
    },
    actions: {

        getAllCourseQuizTest(context, coursePublicKey){
            return quizTestService.getAll(coursePublicKey)
            .then(response => {
                if(response.status){
                    context.commit("setCourseQuizTests", response.data);
                }
                return response;
            });
        },
        getCourseQuizTest(context, data){
            return quizTestService.get(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setCourseQuizTest", response.data);
                }
                return response;
            });
        },
        saveCourseQuizTest(context, data){  
            return quizTestService.save(data.coursePublicKey, data.params)
            .then(response => {
                if(response.status){
                    data = {
                        coursePublicKey: data.coursePublicKey,
                        publicKey: response.data.publicKey,
                    }
                    context.dispatch("getCourseQuizTest", data) 
                }
                return response;
            })
        },      
        deleteCourseQuizTest(context, data){
            return quizTestService.delete(data.coursePublicKey, data.publicKey);
        },  
    },
    getters: {
        courseQuizTests(state){
            return state.courseQuizTests;
        },
        courseQuizTest(state){
            return state.courseQuizTest;
        }        
    }
    
}