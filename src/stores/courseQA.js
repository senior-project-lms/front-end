import QAService from "../services/courseQA";

const qaService = new QAService();

/*

mutations : change data
state: objects, params: state, data
actions: async process for request the services params: context
getters:
*/

export default{
    state: {
        courseQAs: [],
        courseQA: {
            title: '',
            content: '',
            answers: [],
            upCount: 0,
            downCount: 0,
            stared: false,
            upped: false,
            downed: false,  
            createdBy: {
                username: ''
            }         
        },
        relateds: [],      

    },

    mutations:{
        setCourseQARelateds(state, relateds){
            state.relateds = relateds;
        },
        setCourseQAs(state, qas){
            qas = state.courseQAs.concat(qas);
            state.courseQAs = qas;
       },        
        setCourseQA(state, qa){
             state.courseQA = qa;
        },
        clearCourseQAs(state){
            state.courseQAs = [];
        }
    },

    actions: {
        getCourseQAs(context, data){
            return qaService.getAll(data.coursePublicKey, data.page)
            .then(response => {
                if(data.page == 1){
                    context.commit("clearCourseQAs");

                }
                
                context.commit("setCourseQAs", response.data);
                 
                return response;
            });
        },

        saveCourseQA(context, data){
            return qaService.save(data.coursePublicKey, data.params)
            .then(response => {
                if(response.status){
                    if(data.params.answer){
                        context.dispatch("getCourseQA", { coursePublicKey: data.coursePublicKey, publicKey: data.params.publicKey})     
                    }
                    else{
                        context.dispatch("getCourseQAs", { coursePublicKey: data.coursePublicKey, page: 1})     
                    }
                }
                return response;
            })
        },

        saveCourseQAComment(context, data){
            
            return qaService.saveComment(data.coursePublicKey, data.publicKey, data.params)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseQA", { coursePublicKey: data.coursePublicKey, publicKey: data.parentPublicKey}) 
                    
                }
                return response;
            })
        },



        deleteCourseQA(context, publicKey){
            return qaService.delete(publicKey)
            .then(response => {
                if(response.status){
                    return context.dispatch("getCourseQAs", 1) 
                 }
                 return response;
            })
        },


        getCourseQA(context, data){
            qaService.getRelateds(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setCourseQARelateds", response.data);
                }
                return response;
            })
            
            return qaService.get(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setCourseQA", response.data);

                }
                return response;
            })
        },

        upVoteCourseQA(context, data){
            return qaService.upVote(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseQA", {coursePublicKey: data.coursePublicKey, publicKey: data.parentPublicKey}) 
                 }
                 return response;
            })
        },

        downVoteCourseQA(context, data){
            return qaService.downVote(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseQA", {coursePublicKey: data.coursePublicKey, publicKey: data.parentPublicKey}) 
                 }
                 return response;
            })
        },

        starVoteCourseQA(context, data){
            return qaService.starVote(data.coursePublicKey, data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getCourseQA",  {coursePublicKey: data.coursePublicKey, publicKey: data.parentPublicKey}) 
                 }
                 return response;
            })
        },


        searchCourseQATag(context, data){
            return qaService.searchTagByName(data.coursePublicKey, data.name)
            .then(response => {
                return response;
            })
        }

    },
    getters: {
        courseQAs(state){
            return state.courseQAs;
        },      
        courseQA(state){
            return state.courseQA;
        },
        courseQARelateds(state){
            return state.relateds;
        }



    }
}