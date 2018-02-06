
import CourseService from '../services/course';

var courseService = new CourseService();


export default{
    state: {
        courses: [],

    },
    mutations: {
       setCourses(state, courses){
            state.courses = courses;
       },

    },
    actions: {
        saveCourse(context, params){
            return courseService.save(params);
        },

        saveAllCourses(context, params){
            return courseService.saveAll(params);
        },

        getAllActiveCourses(context, params){
            return courseService.getAllActive()
            .then( response => {
                if(response.status){
                    context.commit("setCourses", response.data)
                }
                return response;
            })
        }

    },
    getters: {
      
        courses(state){
            return state.courses;
      },


    }
}