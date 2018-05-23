import GlobalQAService from "../services/globalQA";

const globalQAService = new GlobalQAService();

/*

mutations : change data
state: objects, params: state, data
actions: async process for request the services params: context
getters:
*/

export default{
    state: {
        globalQAs: [],
        globalQA: {
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
            },
        },
        relateds: [],      
    },

    mutations:{
        setGlobalQARelateds(state, relateds){
            state.relateds = relateds;
        },
        setGlobalQAs(state, qas){
            qas = state.globalQAs.concat(qas);
            state.globalQAs = qas;
       },        
        setGlobalQA(state, qa){
             state.globalQA = qa;
        },
        clearGlobalQAs(state){
            state.globalQAs = [];
            globalQA= {
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
                },
            };
            relateds= []; 
        }
    },

    actions: {
        getGlobalQAs(context, page){
            return globalQAService.getAll(page)
            .then(response => {
                if(page == 1){
                    context.commit("clearGlobalQAs");

                }
                
                context.commit("setGlobalQAs", response.data);
                 
                return response;
            });
        },

        saveGlobalQA(context, qa){
            return globalQAService.save(qa)
            .then(response => {
                if(response.status){
                    if(qa.answer){
                        context.dispatch("getGlobalQA", qa.publicKey) 
                    }
                    else{
                        context.dispatch("getGlobalQAs", 1) 
                    }
                    
                }
                return response;
            })
        },

        saveGlobalQAComment(context, qa){
            
            return globalQAService.saveComment(qa.publicKey, qa.params)
            .then(response => {
                if(response.status){
                    context.dispatch("getGlobalQA", qa.parentPublicKey) 
                    
                }
                return response;
            })
        },



        deleteGlobalQA(context, publicKey){
            return globalQAService.delete(publicKey)
            .then(response => {
                if(response.status){
                    return context.dispatch("getGlobalQAs", 1) 
                 }
                 return response;
            })
        },


        getGlobalQA(context, publicKey){
            globalQAService.getRelateds(publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setGlobalQARelateds", response.data);
                }
                return response;
            })
            
            return globalQAService.get(publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setGlobalQA", response.data);

                }
                return response;
            })
        },

        upVoteGlobalQA(context, data){
            return globalQAService.upVote(data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getGlobalQA", data.parentPublicKey) 
                 }
                 return response;
            })
        },

        downVoteGlobalQA(context, data){
            return globalQAService.downVote(data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getGlobalQA", data.parentPublicKey) 
                 }
                 return response;
            })
        },

        starVoteGlobalQA(context, data){
            return globalQAService.starVote(data.publicKey)
            .then(response => {
                if(response.status){
                    context.dispatch("getGlobalQA", data.parentPublicKey) 
                 }
                 return response;
            })
        },

        searchGlobalQATag(context, name){
            return globalQAService.searchTagByName(name)
            .then(response => {
                return response;
            })
        }

    },
    getters: {
        globalQAs(state){
            return state.globalQAs;
        },      
        globalQA(state){
            return state.globalQA;
        },
        globalQARelateds(state){
            return state.relateds;
        }



    }
}