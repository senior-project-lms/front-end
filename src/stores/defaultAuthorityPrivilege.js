
import DefaultAuthorityPrivilegeService from '../services/defaultAuthorityPrivilege';

const defaultAuthorityPrivilege = new DefaultAuthorityPrivilegeService();
export default{

    state:{
        defaultAuthorityPrivileges: [],
    },
    mutations:{
        setDefaultAuthorityPrivileges(state, list){
            state.defaultAuthorityPrivileges = list;
        },
        clearDefaultAuthorityPrivilegeStore(state){
            state.defaultAuthorityPrivileges = []
        }
    },
    actions:{
        getAllDefaultAuthorityPrivileges(context){
            return defaultAuthorityPrivilege.getAll()
            .then( response => {
                if(response.status){
                    context.commit("setDefaultAuthorityPrivileges", response.data)
                }
                return response;
            })
        }
    },
    getters:{
        defaultAuthorityPrivileges(state){
            return state.defaultAuthorityPrivileges;
        }
    }


}