import UserService from '../services/user';
var userService = new UserService();

export default{
    state: {
        users: []
    },
    mutations: {
        setUsers(state, users){
            state.users = users;
        }
        
    },
    actions: {
        saveUser(context, params){
            return userService.save(params);
        },

        saveAllUSers(context, params){
            return userService.saveAll(params);
        },

        getAllActiveUsers(context){
            return userService.getAllActiveUsers()
            .then( response => {
                if(response.status){
                    context.commit("setUsers", response.data)
                }
                return response;
            })
        }

    },
    getters: {
        users(state){
            return state.users;
      }
    
    }
}