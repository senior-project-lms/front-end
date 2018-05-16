import CourseService from '../services/course';

var courseService = new CourseService();

export default {
  state: {
    course: {
      name: '',
      code: '',
    },

    courses: [],
    coursesStatuses: {},
    notEnrolledCourses: [],
    students: [],
    observerStudents: [],
    assistants: [],
    events: [],

    courseResources: [],


  },
  mutations: {
    setCourse(state, object) {
      state.course = object;
    },
    setEvents(state, list) {
      state.events = list;
    },
    setCourses(state, list) {
      state.courses = list;
    },
    setCoursesStatuses(state, statuses) {
      state.coursesStatuses = statuses;
    },
    setNotEnrolledCourses(state, list) {
      state.notEnrolledCourses = list;
    },
    setStudents(state, list) {
      state.students = list;
    },
    setAssistants(state, list) {
      state.assistants = list;
    },
    setObserverStudents(state, list) {
      state.observerStudents = list;
    },
    setCourseResources(state, list) {
      state.courseResources = list;
    },


    clearCourseStore(state) {
      state.course = {}
      state.courses = [];
      state.coursesStatuses = {};
      state.notEnrolledCourses = [];
      state.students = [];
      state.observerStudents = [];
      state.assistants = [];
      state.events = [];
      state.courseResources = [];

    },

    clearCourseResources(state) {
      state.courseResources = [];
    },

  },
  actions: {

    saveCourse(context, params) {
      return courseService.save(params)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllCoursesByVisibility', true);
            context.dispatch('getCoursesStatuses');
          }
          return response;
        });
    },

    saveAllCourses(context, params) {
      return courseService.saveAll(params)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllCoursesByVisibility', true);
            context.dispatch('getCoursesStatuses');
          }
          return response;
        });
    },

    getAllCoursesByVisibility(context, visible) {
      return courseService.getAll(visible)
        .then(response => {
          if (response.status) {
            context.commit("setCourses", response.data)
          }
          return response;
        })
    },
    updateCourseVisiblity(context, params) {
      const publicKey = params.publicKey;
      const visible = params.visible;

      return courseService.updateVisibility(publicKey, visible)
        .then(response => {
          if (response.status) {
            context.dispatch('getCoursesStatuses');
          }
          return response;
        })
    },
    getCoursesStatuses(context) {
      return courseService.getStatuses()
        .then(response => {
          if (response.status) {
            context.commit("setCoursesStatuses", response.data);

          }
        })
      return response;
    },

    searchNotRegisteredCoursesBySearchParam(context, searchItems) {
      const searchType = searchItems.searchType;
      const searchParam = searchItems.searchParam;

      return courseService.searchNotRegisteredBySearchParam(searchType, searchParam)
        .then(response => {
          if (response.status) {
            context.commit("setNotEnrolledCourses", response.data)
          }
          return response;
        })
    },

    getAllCoursesOfAuthUser(context) {
      return courseService.getAuthUserCourses()
        .then(response => {
          if (response.status) {
            context.commit("setCourses", response.data)
          }
          return response;
        })
    },
    getEnrolledUsers(context, publicKey) {
      return courseService.getEnrolledUsers(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setStudents", response.data)
          }
          return response;
        })
    },
    getEnrolledObserverUsers(context, publicKey) {
      return courseService.getEnrolledObserverUsers(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setObserverStudents", response.data)
          }
          return response;
        })
    },
    getCourse(context, publicKey) {
      return courseService.getCourseInfo(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setCourse", response.data)
          }
          return response;
        })
    },

    saveAssistant(context, data) {
      const publicKey = data.publicKey;
      const params = data.params;
      return courseService.saveAssistant(publicKey, params)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllAssistants', publicKey);
          }
        });
    },

    deleteAssistant(context, data) {
      const publicKey = data.publicKey;
      const userPublicKey = data.userPublicKey;
      return courseService.deleteAssistantCoursePrivilege(publicKey, userPublicKey)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllAssistants', publicKey);
          }
        });
    },

    getAllAssistants(context, publicKey) {
      return courseService.getCourseAssistants(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setAssistants", response.data)
          }
          return response;
        })
    },
    getAllCourseEvents(context, publicKey) {
      return courseService.getAllEvents(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setEvents", response.data)
          }
          return response;
        })
    },
    getAllCourseEventsOfRegisteredCourses(context) {
      return courseService.getAllEventsOfRegisteredCoursesOfAuthUser()
        .then(response => {
          if (response.status) {
            context.commit("setEvents", response.data)
          }
          return response;
        })
    },
    deleteCourseEvent(context, data) {
      const publicKey = data.publicKey;
      const eventPublicKey = data.eventPublicKey;
      return courseService.deleteEvent(publicKey, eventPublicKey)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllCourseEvents', publicKey);
          }
        });
    },

    saveCourseEvent(context, data) {
      const publicKey = data.publicKey;
      const params = data.params;
      return courseService.saveEvent(publicKey, params)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllCourseEvents', publicKey);
          }
        });
    },
    getAllResources(context, publicKey) {
      return courseService.getAllResources(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setCourseResources", response.data);
          }
          return response;
        })
    },
    saveCourseResource(context, data) {
      const publicKey = data.publicKey;
      const params = data.params;
      return courseService.saveCourseResource(publicKey, params)
        .then(response => {
          if (response.status) {

            context.dispatch("getAllResources", publicKey);

          }
          return response;
        });

    },
    uploadCourseResourceFile(context, {publicKey, file}) {  
      return courseService.uploadFile(publicKey,file);
    },

    deleteCourseResourceFile(context, data) {
      const coursePublicKey = data.coursePublicKey;
      const publicKey = data.publicKey;
      return courseService.deleteFile(coursePublicKey, publicKey)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllResources', coursePublicKey);
          }
          return response;
        });
    },
    shareCourseResourcePublicly(context, data){
      return courseService.sharePublicly(data.coursePublicKey, data.publicKey, data.val);
    },

  },
  getters: {

    courses(state) {
      return state.courses;
    },
    students(state) {
      return state.students;
    },
    observerStudents(state) {
      return state.observerStudents;
    },
    coursesStatuses(state) {
      return state.coursesStatuses;

    },
    notEnrolledCourses(state) {
      return state.notEnrolledCourses;
    },
    course(state) {
      return state.course;
    },
    assistants(state) {
      return state.assistants;
    },
    courseEvents(state) {
      return state.events;
    },
    courseResources(state) {
      return state.courseResources;
    }

  }
}
