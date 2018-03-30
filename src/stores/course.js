
import CourseService from '../services/course';

var courseService = new CourseService();


export default{
    state: {
        courses: [],
        coursesStatuses: {},
        notEnrolledCourses: [],

    },
    mutations: {
       setCourses(state, list){
            state.courses = list;
       },
       setCoursesStatuses(state, statuses){
           state.coursesStatuses = statuses;
       },
       setNotEnrolledCourses(state, list){
        state.notEnrolledCourses = list;
    },
       clearCourseStore(state){
           state.courses = [];
           state.coursesStatuses = {};
           state.notEnrolledCourses = [];
       }
    },
    actions: {
        saveCourse(context, params){
            return courseService.save(params)
            .then(response => {
                if(response.status){
                    context.dispatch('getAllCoursesByVisibility', true);
                    context.dispatch('getCoursesStatuses');
                }
                return response;
            });
        },

        saveAllCourses(context, params){
            return courseService.saveAll(params)
            .then(response => {
                if(response.status){
                    context.dispatch('getAllCoursesByVisibility', true);
                    context.dispatch('getCoursesStatuses');
                }
                return response;
            });
        },

        getAllCoursesByVisibility(context, visible){
            return courseService.getAll(visible)
            .then( response => {
                if(response.status){
                    context.commit("setCourses", response.data)
                }
                return response;
            })
        },
        updateCourseVisiblity(context, params){
            const publicKey = params.publicKey;
            const visible = params.visible;
             
            return courseService.updateVisibility(publicKey, visible)
            .then(response => {
                if(response.status){
                    context.dispatch('getCoursesStatuses');
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
        },

        searchNotRegisteredCoursesBySearchParam(context, searchParam){
            return courseService.searchNotRegisteredBySearchParam(searchParam)
            .then( response => {
                if(response.status){
                    context.commit("setNotEnrolledCourses", response.data)
                }
                return response;
            })
        },

    },
    getters: {
      
        courses(state){
            return state.courses;
        },
        coursesStatuses(state){
            return state.coursesStatuses;

        },
        notEnrolledCourses(state){
            return state.notEnrolledCourses;

        }


    }
}