
import Authentication from '../services/authentication.js';

var authentication = new Authentication();
/*

mutations : change data
state: objects, params: state, data
actions: async process for request the services params: context
getters:
*/

export default{
    state: {
        user: {
            username: '',
            name: '',
            surname: '',
            accessLevel: null,
        }
    },
    mutations: {
        setUser(state, object){
            state.user.username = object.username;
            state.user.name = object.name;
            state.user.surname = object.surname
            state.user.accessLevel = object.accessLevel;
        },
        
    },
    actions: {

        login(user){

            return authentication.login(user)
            .then( isAuthendticated => {
                if(isAuthendticated){
                    // fetch user profile
                }
            });
        
        },

        clearExampleArray(context){
            context.commit('setExampleArray', []);
        }

    },
    getters: {
        exampleObject(state){
            return state.exampleObject;
        },
        exampleArray(state){
            return state.exampleArray;
        },
        exampleVariable(state){
            return state.exampleVariable;
        },

    }
}