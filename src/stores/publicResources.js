import PublicResourceService from "../services/publicResources";

var publicResourceService = new PublicResourceService();


export default {
  state: {
    publicCourseResources: [],

  },

  mutations: {

    setPublicCourseResources(state, resources) {
      resources = state.publicCourseResources.concat(resources);
      state.publicCourseResources = resources;
    },
    clearPublicCourseResources(state) {
      state.publicCourseResources = [];
    }

  },
  actions: {
    getAllResources(context, publicKey) {
      return publicResourceService.getAllResources(publicKey)
        .then(response => {
          if (response.status) {
            context.commit("setPublicCourseResources", response.data);
          }
          return response;
        });
    },
    deleteCourseResource(context, data) {
      const publicKey = data.publicKey;
      const filePublicKey = data.filePublicKey;
      return publicResourceService.delete(publicKey, filePublicKey)
        .then(response => {
          if (response.status) {
            context.dispatch('getAllResources', publicKey);
          }
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
    }
  }
}
