
import ExampleService from '../services/exampleService';

var exampleService = new ExampleService();
/*

mutations : change data
state: objects, params: state, data
actions: async process for request the services params: context
getters:
*/

export default{
    state: {
        exampleObject: {},
        exampleArray: [],
        exampeVariable: 0
    },
    mutations: {
        setExampleObject(state, object){
            state.exampleObject = object;
        },
        setExampleArray(state, array){
            state.exampleObject = array;
        },
        setExampleVariable(state, variable){
            state.exampleObject = variable;
        },
        
    },
    actions: {

        fetchExampleObjectFromServer(dataComesFromComponent){

            return exampleService.fetchExampleObject(dataComesFromComponent)
            .then(responedExampleObject => {
                
                if(responedExampleObject != null){

                    context.commit('setExampleObject', responedExampleObject);
                }
            })
        
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