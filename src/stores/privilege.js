

import PrivilegeService from '../services/privilege';

var privilegeService = new PrivilegeService();



export default{

    state:{
        privileges: [],
        allCoursePrivileges: [],
        defaultPrivileges: [],

    },

    mutations: {
        setPrivileges(state, list){
            state.privileges = list
        },
               
        setAllCoursePrivileges(state, list){
            state.allCoursePrivileges = list;
        },
        setDefaultPrivileges(state, list){
            state.defaultPrivileges = list;
        },
        clearPrivilegeStore(state){
            state.privileges = [];
            state.allCoursePrivileges = [];
            state.defaultPrivileges = [];

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
        },

        getAllCoursePrivileges(context, publicKey){
            return privilegeService.getAllCoursePrivileges(publicKey)
            .then(response => {
                if(response.status){
                    context.commit('setAllCoursePrivileges', response.data);
                }
                return response;
            });        
        },

        getDefaultCourseAssistantPrivileges(context, publicKey){
            return privilegeService.getDefaultCourseAssistantPrivileges(publicKey)
            .then(response => {
                if(response.status){
                    context.commit('setDefaultPrivileges', response.data);
                }
                return response;
            });        
        },
        getCourseAssistantPrivileges(context, data){

            return privilegeService.getAssistantPrivileges(data.publicKey, data.userPublicKey)
            .then(response => {
                if(response.status){
                    context.commit('setDefaultPrivileges', response.data);
                }
                return response;
            });        
        }        
    },

    getters: {
        privileges(state){
            return state.privileges;
        },
            
        allCoursePrivileges(state){
            return state.allCoursePrivileges;
        },

        defaultPrivileges(state){
            return state.defaultPrivileges;
        }
    }

}