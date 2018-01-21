
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
            accessPrivileges: [],
        }
    },
    mutations: {
        setAuthenticatedUser(state, object){
            state.authenticatedUser.username = object.username;
            state.authenticatedUser.name = object.name;
            state.authenticatedUser.surname = object.surname
            state.authenticatedUser.authority = object.authority;
            state.authenticatedUser.accessPrivileges = object.accessPrivileges;
            
        },
        
        cleareAuthenticatedUser(state){
            state.authenticatedUser = {
                username: '',
                name: '',
                surname: '',
                authority: {accessLevel: null},
            }
        },
        
    },
    actions: {

        login(context, user){

            return authenticationService.login(user)
            .then( isAuthendticated => {
                if(isAuthendticated){
                    return userService.getProfile()
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
        
        getMe(context){
            return userService.getProfile()
            .then(user => {
                if(user != null){
                    context.commit('setAuthenticatedUser', user);
                    return true;
                }
                return false;
            })
        },
        hasAccessPrivilege(context, privilege){
            return context.state.authenticatedUser.accessPrivileges.includes(privilege);
        },
        cleareAuthenticatedUser(context){
            context.commit("cleareAuthenticatedUser");
        }
        
    },
    getters: {
        authenticatedUser(state){
            return state.authenticatedUser;
        }

    }
}