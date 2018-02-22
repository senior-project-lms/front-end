

import PrivilegeService from '../services/privilege';

var privilegeService = new PrivilegeService();



export default{

    state:{
        privileges: []
    },

    mutations: {
        setPrivileges(state, list){
            state.privileges = list
        },
        clearPrivilegeStore(state){
            state.privileges = [];
        }
    },
    actions:{
        getAllPrivileges(context){
            return privilegeService.getAll()
            .then(response => {
                if(response.status){
                    context.commit('setPrivileges', response.data);
                }
                return response;
            });        
        }
    },

    getters: {
        privileges(state){
            return state.privileges;
        }
    }

}