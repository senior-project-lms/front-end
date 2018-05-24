import PublicResourceService from "../services/publicResources";

var publicResourceService = new PublicResourceService();

//public resources
export default {
  state: {
    theCourse: {
      name: '',
      code: '',
    },
    publicResources:[],

  },

  mutations: {
    setPublicResources(state, list) {
      state.publicResources = list;
    },
    clearPublicResourcesStore(state){
      state.theCourse= {
        name: '',
        code: '',
      };
      state.publicResources=[];
    }
    

  },
  actions: {
    
    getPublicResources(context) {
      return publicResourceService.getAllPublicResourses()
        .then(response => {
          if (response.status) {
            context.commit("setPublicResources", response.data);
          }
          return response;
        });
    },
    

  },
  getters: {
    publicResources(state){
      return state.publicResources;
    },
    
  }
}
