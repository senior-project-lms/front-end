import AuthorityService from '../services/authority';
var authorityService = new AuthorityService();

export default{
    state: {
        accessLevels: []
    },
    mutations: {
        setAccessLevels(state, accessLevels){
            state.accessLevels = accessLevels;
        },
        clearAuthorityStore(state){
           state.accessLevels = [];
       }
        
    },
    actions: {
        

        getAllAccessLevels(context){
            return authorityService.getAll()
            .then( response => {
                if(response.status){
                    context.commit("setAccessLevels", response.data)
                }
                return response;
            })
        }

    },
    getters: {
        accessLevels(state){
            return state.accessLevels;
      }
    
    }
}
