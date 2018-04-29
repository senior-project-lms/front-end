import QuizTestService from "../services/quizTest";
import Service from "../services/common";

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
            duration: 0,
            hasDueDate: false,
            endAt: null,
            questions: [],
            available: false,
        },
        courseQTUser: {
            publicKey: '',
            started: false,
            finished: false,
            startedAt: '',
            finishedAt: '',
            finishesAt: '',
            answers: [],
            timeUp: true,
        },

    },
    mutations: {
        setCourseQuizTests(state, list){
            state.courseQuizTests = list;
        },
        setCourseQuizTest(state, obj){
            state.courseQuizTest = obj;
        },
        setCourseQTQuestion(state, obj){
            state.courseQuizTest.questions.push(obj);
        },
        setCourseQTUser(state, obj){
            state.courseQTUser = obj;
        },

        clearQuizTest(state){
            state.courseQuizTest = {
                publicKey: '',
                name: '',
                detail: '',
                gradable: false,
                limitedDuration: false,
                endAt: false,
                questions: [],
            }            
        },
        clearQuizTestAllStates(state){
            state.courseQuizTests = [];
            state.courseQuizTest = {
                publicKey: '',
                name: '',
                detail: '',
                gradable: false,
                limitedDuration: false,
                duration: 0,
                hasDueDate: false,
                endAt: null,
                questions: [],
                available: false,
            };
            state.courseQTUser = {
                publicKey: '',
                started: false,
                finished: false,
                startedAt: '',
                finishedAt: '',
                finishesAt: '',
                answers: [],
            };
            state.serverExamTime = {
                currentTime: 0,
            }            
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
        getCourseQuizTestForExam(context, data){
            return quizTestService.getForExam(data.coursePublicKey, data.qtPublicKey)
            .then(response => {
                if(response.status){
                    context.commit("setCourseQuizTest", response.data);
                }
                return response;
            });
        },  

        getCourseQTBeforeStartExam(context, data){
            return quizTestService.getBeforeStartTheExam(data.coursePublicKey, data.qtPublicKey)
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
        publishCourseQuizTest(context, data){  
            return quizTestService.publish(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getAllCourseQuizTest", data.coursePublicKey) 
                }
                return response;
            })
        },         
        disableCourseQuizTest(context, data){  
            return quizTestService.disable(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getAllCourseQuizTest", data.coursePublicKey) 
                }
                return response;
            })
        },            
        updateCourseQuizTest(context, data){  
            return quizTestService.update(data.coursePublicKey, data.qtPublicKey, data.params)
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
            return quizTestService.delete(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    
                    context.dispatch("getAllCourseQuizTest",data.coursePublicKey) 
                }
                return response;
            });
        },
        saveCourseQTQuestion(context, data){
            return quizTestService.saveQuestion(data.coursePublicKey, data.qtPublicKey, data.params)
            .then(response => {
                if(response.status){
                    data = {
                        coursePublicKey: data.coursePublicKey,
                        qtPublicKey: data.qtPublicKey,
                        publicKey: response.data.publicKey,
                    }
                    context.dispatch("getCourseQTQuestion", data) 
                }
                return response;
            })
        },
        getCourseQTQuestion(context, data){
            return quizTestService.getQuestion(data.coursePublicKey, data.qtPublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setCourseQTQuestion", response.data);
                }
                return response;
            });
        },
        deleteCourseQTQuestion(context, data){
            return quizTestService.deleteQuestion(data.coursePublicKey, data.qtPublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    const dt = {
                        coursePublicKey: data.coursePublicKey,
                        publicKey: data.qtPublicKey,
                    }
                    context.dispatch("getCourseQuizTest", dt);
                }
                return response;
            });
        },

        getCourseQTUser(context, data){
            return quizTestService.getQTUser(data.coursePublicKey, data.qtPublicKey)
            .then(response => {
                if(response.status){
                    context.commit("setCourseQTUser", response.data); 
                    const respData = response.data;
                    if(respData.started){
                        context.dispatch("getCourseQuizTestForExam", data);
                    }               
                }
                return response;
            });
        },
        startCourseQT(context, data){
            return quizTestService.startQT(data.coursePublicKey, data.qtPublicKey)
            .then(response => {
                return response;
            });
        },
        finishCourseQT(context, data){
            return quizTestService.finishQT(data.coursePublicKey, data.qtPublicKey)
            .then(response => {
                if(response.status){
                    if(response.data.status){
                        context.dispatch("getCourseQTUser", data);
                    }
                }
                return response;
            });
        },
        saveCourseQTAnswer(context, data){
            return quizTestService.setAnswer(data.coursePublicKey, data.qtPublicKey, data.params)
            .then(response => {
                if(response.status){
                    data = {
                        coursePublicKey: data.coursePublicKey,
                        qtPublicKey: data.qtPublicKey,
                        publicKey: response.data.publicKey,
                    }
                    context.dispatch("getCourseQTUser", data) 
                }
                return response;
            })
        }

    },
    getters: {
        courseQuizTests(state){
            return state.courseQuizTests;
        },
        courseQuizTest(state){
            return state.courseQuizTest;
        },
        courseQTUser(state){
            return state.courseQTUser;
        },
  
    }
    
}