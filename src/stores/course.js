
import CourseService from '../services/course';

var courseService = new CourseService();


export default{
    state: {
        courses: [],
        coursesStatuses: {}

    },
    mutations: {
       setCourses(state, courses){
            state.courses = courses;
       },
       setCoursesStatuses(state, statuses){
           state.coursesStatuses = statuses;
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
        },
        getCoursesStatuses(context){
            return courseService.getStatuses()
            .then(response => {
                if(response.status){
                    context.commit("setCoursesStatuses", response.data);
                }
            })
            return response; 
        }

    },
    getters: {
      
        courses(state){
            return state.courses;
        },
        coursesStatuses(state){
            return state.coursesStatuses;

        }


    }
}