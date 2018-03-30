import GlobalQAService from "../services/globalQA";

var globalQAService = new GlobalQAService();

/*

mutations : change data
state: objects, params: state, data
actions: async process for request the services params: context
getters:
*/

export default{
    state: {
        globalQAs: []
    },

    mutations:{
        setGlobalQAs(state, qas){
             qas = state.globalQAs.concat(qas);
             state.globalQAs = qas;
        },
        clearSystemAnnouncements(state){
            state.globalQAs = [];
        }
    },

    actions: {
        getGlobalQAs(context, page){
            return globalQAService.getAll(page)
            .then(response => {
                if(page == 0){
                    context.commit("clearGlobalQAs");

                }
                if(response != null && response.length > 0){
                    context.commit("setGlobalQAs", response);
                    return true;
                }
                return false;
            });
        },

        saveGlobalQuestion(context, publicKey, question){
            return globalQAService.save(question)
            /*.then(response => {
                if(response){
                   return context.dispatch("getGlobalQAs", 0) 
                      .then(() => {
                        return true;
                    });
                  
                }
                else{
                    return false;
                }
            })*/
        },

        deleteGlobalQuestion(context, publicKey){
            return globalQAService.delete(publicKey)
            .then(response => {
                if(response){
                    return context.dispatch("getGlobalQAs", 0) 
                    .then(() => {
                        return true;
                     });
                }
                else{
                    return false;
                }
            })
        },

        saveGlobalQuestionAnswer(context, publicKey, answer){

        },

        getAllGlobalQuestionAnswers(context, questionPublicKey){
            return globalQAService.getAnswers(questionPublicKey);
        }

    },
    getters: {
        globalQAs(state){
            return state.globalQAs;
        }        

    }
}