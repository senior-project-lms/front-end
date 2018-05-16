import PublicResourceService from "../services/publicResources";

var publicResourceService = new PublicResourceService();


export default {
  state: {
    theCourse: {
      name: '',
      code: '',
    },
    publicCourseResources: [],
    allCourses:[],

  },

  mutations: {
    setCourses(state, list) {
      state.allCourses = list;
    },
    setCourse(state, object) {
      state.theCourse = object;
    },

    setPublicCourseResources(state, resources) {
      resources = state.publicCourseResources.concat(resources);
      state.publicCourseResources = resources;
    },
    clearPublicCourseResources(state) {
      state.publicCourseResources = [];
    }

  },
  actions: {
    getAllCoursesForAuthUser(context) {
      return publicResourceService.getAllCourses()
        .then(response => {
          if (response.status) {
            context.commit("setCourses", response.data)
          }
          return response;
        })
    },
    getAllPublicResources(context, publicKey) {
      return publicResourceService.getAllResources(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setPublicCourseResources", response.data);
          }
          return response;
        });
    },
    deleteCourseResource(context, data) {
      const publicKey = data.coursePublicKey;
      const filePublicKey = data.filePublicKey;
      return publicResourceService.delete(publicKey, filePublicKey)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllResources', publicKey);
          }
          return response;

        });
    },
    saveCourseResource(context, data) {
      const publicKey = data.publicKey;
      const params = data.params;

      return publicResourceService.save(publicKey, params)
        .then(response => {
          if (response.status) {

            context.dispatch("getAllResources", publicKey);

          }
          return response;
        });

    },

  },
  getters: {
    publicCourseResources(state) {
      return state.publicCourseResources;
    },
    allCourses(state){
      return state.allCourses;
    },
    theCourse(state) {
      return state.theCourse;
    },
  }
}
