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
    getCourseAssignments(context, data) {

      return courseAssignmentService.getAll(data.publicKey, data.page)
        .then(response => {
          if (response.status) {
            if (data.page == 0) {
              context.commit("clearCourseAssignments");

            }
            if (response.data != null && response.data.length > 0) {
              context.commit("setCourseAssignments", response.data);
            }
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
            const data = {
              publicKey: assignment.publicKey,
              page: 1,
            }
            context.dispatch("getCourseAssignments", data);

          }
          return response;
        })
    },
    deleteCourseAssignment(context, publicKey) {
      return courseAssignmentService.delete(publicKey)
        .then(response => {
          if (response.status) {
            context.dispatch("getCourseAssignments", 0)
          }
          return response;
        })
    },

    clearCourseAssignments(context) {
      context.commit("clearCourseAssignments");
    }


  },
  getters: {
    courseAssignments(state) {
      return state.courseAssignments;
    }
  }

}
