
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
        accessToken: authenticationService.getAccessToken(),
        authenticatedUser: {
            username: '',
            name: '',
            surname: '',
            authority: {code: null},
            accessPrivileges: [],
            coursePrivileges: [],
        }
    },
    mutations: {
        setAuthenticatedUser(state, object){
            state.authenticatedUser.username = object.username;
            state.authenticatedUser.name = object.name;
            state.authenticatedUser.surname = object.surname
            state.authenticatedUser.authority = object.authority;
            state.authenticatedUser.accessPrivileges = object.accessPrivileges;
            //state.authenticatedUser.coursePrivileges = [];
        },
        setCoursePrivileges(state, list){
            state.authenticatedUser.coursePrivileges = list;
        },
        cleareAuthenticatedStore(state){
            state.authenticatedUser = {
                username: '',
                name: '',
                surname: '',
                authority: {code: null},
                accessPrivileges: [],
                coursePrivileges: [],
            }
        },
        
    },
    actions: {

        login(context, user){

            return authenticationService.login(user)
            .then( isAuthendticated => {
                if(isAuthendticated){
                    return context.dispatch("getMe")
                    .then(response => {
                        return response.status;
                    });
                }
                else{
                    return isAuthendticated;
                }
                    
            });
        
        },
        
        getMe(context){
            return userService.getProfile()
            .then(response => {
                if(response.status){
                    
                    if(response.data != null){
                        context.commit('setAuthenticatedUser', response.data)
                    }
                }
                return response;
            })
        },
        hasAccessPrivilege(context, privilege){
            return context.state.authenticatedUser.accessPrivileges.includes(privilege) ||  context.state.authenticatedUser.coursePrivileges.includes(privilege);
        },

        getCoursePrivileges(context, publicKey){
            return userService.getCoursePrivilegesOfAuthUser(publicKey)
            .then(response => {
                if(response.status){
                    
                    if(response.data != null){
                        context.commit('setCoursePrivileges', response.data)
                    }
                }
                return response;
            })      
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