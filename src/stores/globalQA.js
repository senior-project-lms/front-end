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
            }         

        },
    },

    mutations:{
        setGlobalQAs(state, qas){
            qas = state.globalQAs.concat(qas);
            state.globalQAs = qas;
       },        
        setGlobalQA(state, qa){
             state.globalQA = qa;
        },
        clearGlobalQAs(state){
            state.globalQAs = [];
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
                   return context.dispatch("getGlobalQAs", 1) 
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
            return globalQAService.get(publicKey)
            .then(response => {
                if(response.status){
                    context.commit("setGlobalQA", response.data);

                }
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
        } 

    }
}