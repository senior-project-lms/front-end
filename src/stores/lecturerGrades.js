
import LecturerGrades from '../services/lecturerGrades';

var lecturerGradesService = new LecturerGradesService();
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
        exampeVariable: 0,
        grades: [{
            gradePublicId: '3019283012830912378192739123',
            studentGradePublicId: '04530750j3274587c359634j5692387',
            text: 'Quiz 1',
            score: 78,
            maxScore: 100,
            average: 54,
            affect: 3,
        },
        {
            gradePublicId: 'mc928492134826346128734c812634',
            studentGradePublicId: 'm72603461283648c12b63462b754b`125348',
            text: 'Assignment 1',
            score: 90,
            maxScore: 100,                        
            average: 70,
            affect: 4,
        },
        {
            gradePublicId: 'm02364cb2893946895v219378469m23y4s2cb',
            studentGradePublicId: ',082398xy12tbt4x2g3413yug4nx23h41uhanhx',
            text: 'Quiz 2',
            maxScore: 100,                        
            score: 90,
            average: 70,
            affect: 3,
        },
        {
            gradePublicId: 'x,o2u1mz3248u8n1y8794yuecgufgi1273t4',
            studentGradePublicId: 'co5m467yn2txuz3btr1b61r523bzd3ty2f',
            text: 'Midterm',
            maxScore: 100,                        
            score: 56,
            average: 34,
            affect: 30,
        }]
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

        fetchExampleObjectFromServer(context, dataComesFromComponent){

            return exampleService.fetchExampleObject(dataComesFromComponent)
            .then(responedExampleObject => {
                
                if(responedExampleObject != null){

                    context.commit('setExampleObject', responedExampleObject);
                }
            })
        
        },

        clearExampleArray(context){
            context.commit('setExampleArray', []);
        },

        getGrades(context, page){
            return lecturerGradesService.getAll(page)
            /*.then(response => {
                if(response.status){
                    if(page == 0){
                        context.commit("clearGrades");
    
                    }
                    if(response.data != null && response.data.length > 0){
                        context.commit("setGrades", response.data);
                    }
                }
                return response;
            });*/
        },

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
        grades(state){
            return state.grades;
        }

    }
}