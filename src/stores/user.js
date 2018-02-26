import UserService from '../services/user';
var userService = new UserService();

export default{
    state: {
        users: [],
        usersStatus: {}
    },
    mutations: {
        setUsers(state, users){
            state.users = users;
        },
        setUsersStatus(state, status){
            state.usersStatus = status;
        },
        clearUserStore(state){
            state.users = [];
            usersStatus: {}
        }
        
    },
    actions: {
        saveUser(context, params){
            return userService.save(params)
            .then(response => {
                if(response.status){
                    context.dispatch('getAllActiveUsers', true);
                    context.dispatch('getUsersStatus');
                }
                return response;
            });
        },

        saveAllUsers(context, params){
            return userService.saveAll(params)
            .then(response => {
                if(response.status){
                    context.dispatch('getAllActiveUsers', true);
                    context.dispatch('getUsersStatus');
                }
                return response;
            });
        },

        getAllActiveUsers(context,visible){
            return userService.getAll(visible)
            .then( response => {
                if(response.status){
                    context.commit("setUsers", response.data)
                }
                return response;
            })
        },

    
        updateUserVisibility(context, params){
            const publicKey = params.publicKey;
            const visible = params.visible;
            
            return userService.updateVisibility(publicKey, visible)
            .then(response => {
                if(response.status){
                    context.dispatch('getUsersStatus');
                }
                return response;
            })
        },
        getUsersStatus(context){
            return userService.getStatus()
            .then(response => {
                if(response.status){
                    context.commit("setUsersStatus", response.data);

                }
            })
            return response; 
        },
        getAllUsersByAuthority(context, param){
            return userService.getAllByAuthority(param)
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
      },
      usersStatus(state){
        return state.usersStatus;

    }
    
    }
}