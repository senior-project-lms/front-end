
import AuthenticationService from '../services/authentication';
import UserService from '../services/user'
var authenticationService = new AuthenticationService();
var userService = new UserService();

/*

mutations : change data
state: objects, params: state, data
actions: async process for request the services params: context
getters:
*/

export default{
    state: {
        authenticatedUser: {
            username: '',
            name: '',
            surname: '',
            authority: {accessLevel: null},
        }
    },
    mutations: {
        setAuthenticatedUser(state, object){
            state.authenticatedUser.username = object.username;
            state.authenticatedUser.name = object.name;
            state.authenticatedUser.surname = object.surname
            state.authenticatedUser.authority = object.authority;
        },
        
    },
    actions: {

        login(context, user){

            return authenticationService.login(user)
            .then( isAuthendticated => {
                if(isAuthendticated){
                    return userService.fetchProfile()
                        .then(user => {
                            if(user != null){
                                context.commit('setAuthenticatedUser', user);
                                return true;
                            }
                        })
                }
                return false;
            });
        
        },

        
    },
    getters: {
        authenticatedUser(state){
            return state.authenticatedUser;
        }

    }
}