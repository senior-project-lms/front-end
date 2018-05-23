
import CourseResourcesService from '../services/courseResources';

var courseResourceService = new CourseResourcesService();

export default {
  state: {

    courseResources: [],


  },
mutations: {
setCourseResources(state, list) {
    state.courseResources = list;
    },
    clearCourseStore(state) {
      state.courseResources = [];
    },
    
  },

actions: {
getAllResources(context, publicKey) {
    return courseResourceService.getAllResources(publicKey)
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
    return courseResourceService.saveCourseResource(publicKey, params)
      .then(response => {
        if (response.status) {

          context.dispatch("getAllResources", publicKey);

        }
        return response;
      });

  },
  uploadCourseResourceFile(context, {publicKey, file}) {  
    return courseResourceService.uploadFile(publicKey,file);
  },

  deleteCourseResourceFile(context, data) {
    const coursePublicKey = data.coursePublicKey;
    const publicKey = data.publicKey;
    return courseResourceService.deleteFile(coursePublicKey, publicKey)
      .then(response => {
        if (response.status) {
          context.dispatch('getAllResources', coursePublicKey);
        }
        return response;
      });
  },
  shareCourseResourcePublicly(context, data){
    return courseResourceService.sharePublicly(data.coursePublicKey, data.publicKey, data.val);
  },
},

  getters: {
    courseResources(state) {
        return state.courseResources;
      }
    }
}