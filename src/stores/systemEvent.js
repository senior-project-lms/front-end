import SystemEventService from '../services/systemEvent';

const service = new SystemEventService();


export default{

    state: {
        systemEvents: [],
    },
    mutations: {
        setSystemEvents(state, list){
            state.systemEvents = list; 
        }
    },
    actions: {
        getAllSystemEvents(context){
            return service.getAll()
            .then(response => {
                if(response.status){
                   context.commit("setSystemEvents", response.data); 
                }
                return response;
            })
        },

        saveSystemEvent(context, params){
            return service.save(params)
            .then(response => {
                if(response.status){
                   context.dispatch("getAllSystemEvents"); 
                }
                return response;
            })
        },
        deleteSystemEvent(context, publicKey){
            return service.delete(publicKey)
            .then(response => {
                if(response.status){
                   context.dispatch("getAllSystemEvents"); 
                }
                return response;
            })
        },
        
    },
    getters: {
        systemEvents(state){
            return state.systemEvents;
        }
    }
}
