import CourseAssignmentService from "../services/courseAssignment";

var courseAssignmentService = new CourseAssignmentService();

export default {

  state: {
    courseAssignments: []
  },
  mutations: {
    setCourseAssignments(state, assignments) {
      assignments = state.courseAssignments.concat(assignments);
      state.courseAssignments = assignments;
    },
    clearCourseAssignments(state) {
      state.courseAssignments = [];
    },
    clearCourseAssignmentStore(state) {
      state.courseAssignments = [];
    }
  },
  actions: {
    getCourseAssignments(context, publicKey) {

      return courseAssignmentService.getAll(publicKey)
        .then(response => {
          if (response.status) {
           context.commit("setCourseAssignments", response.data);
          }
          return response;
        });
    },
    saveCourseAssignment(context, assignment) {
      const publicKey = assignment.publicKey;
      const params = assignment.params;
      return courseAssignmentService.save(publicKey, params)
        .then(response => {
          if (response.status) {
            
            context.dispatch("getCourseAssignments", publicKey);

          }
          return response;
        })
    },
    deleteCourseAssignment(context, data) {
      const publicKey = data.coursePublicKey;
      const filePublicKey = data.filePublicKey;
      return courseAssignmentService.delete(publicKey,filePublicKey)
        .then(response => {
          if (response.status) {
            context.dispatch("getCourseAssignments",publicKey)
          }
          return response;
        })
    },

    clearCourseAssignments(context) {
      context.commit("clearCourseAssignments");
    },
    uploadCourseAssignmentFile(context,{publicKey, file}){
        return courseAssignmentService.uploadFile(publicKey,file);
  },
  deleteCourseAssignmentFile(context, data){
    const publicKey = data.coursePublicKey;
    const filePublicKey = data.filePublicKey;
    return courseAssignmentService.deleteFile(publicKey,filePublicKey);
  },


  },
  getters: {
    courseAssignments(state) {
      return state.courseAssignments;
    }
  }

}
