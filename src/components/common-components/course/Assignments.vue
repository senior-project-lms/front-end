<template>
  <div>
          <v-flex md12 sm12>
              <v-flex md2 offset-md5 v-if="courseAssignments.length == 0">
                    <h3 class="text-md-center text-xs-center no-content">There is no assignment yet.</h3>
              </v-flex>
              <section class="Container">
                  <announcement-template v-for="(assignment, i) in courseAssignments" :key="i" :assignment="assignment" :courseAssignment="true"/>
              </section>
          </v-flex> 
      
        
          <div>
            <v-btn fixed dark fab bottom right color="pink" @click="dialog = !dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE_ASSIGNMENT)"> 
            <v-icon>add</v-icon>
            </v-btn>
          </div>

          <template>
            <v-btn block class="load-more" light outline @click="loadCourseAssignments(page)" v-if="loader">More</v-btn>
          </template>

          <post-course-assignment :dialog="dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE_ASSIGNMENT)"/>

    
          

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { AccessLevel } from "@/properties/accessLevel";
import { AccessPrivileges } from "@/properties/accessPrivileges";

import AnnouncementTemplate from "../AnnouncementTemplate";
import PostCourseAssignment from "./SaveCourseAssignment";

export default {
  components: {
    AnnouncementTemplate,
    PostCourseAssignment
  },
  data() {
    return {
      dialog: false,
      page: 1,
      deleteDialog: false
    };
  },
  created() {
    if (this.courseAssignments.length == 0) {
      this.loadCourseAssignments(this.page);
    } else {
      this.page = this.courseAssignments.length / 5 + 1;
    }
  },
  methods: {
    loadCourseAssignments(page) {
      const data = {
        publicKey: this.$route.params.id,
        page: page
      };
      this.$store.dispatch("getCourseAssignments", data).then(response => {
        if (!response.status) {
          this.$notify({
            type: "error",
            title: "Course Assignments",
            text: response.data.message
          });
        }
      });
      this.page++;
    },

    deleteAssignment(publicKey) {
      if (
        this.authenticatedUser.accessPrivileges.includes(
          this.accessPrivileges.DELETE_COURSE_ASSIGNMENT_FILE
        )
      ) {
        this.$store
          .dispatch("deleteCourseAssignment", publicKey)
          .then(response => {
            if (response.status) {
              this.$notify({
                type: "info",
                title: "Course Assignment",
                text: "Successfuly deleted"
              });
            } else {
              this.$notify({
                type: "error",
                title: "Course Assignment",
                text: response.data.message
              });
            }
          });
      }
    },

    cancelDialog() {
      this.dialog = false;
    }
  },
  computed: {
    ...mapGetters([
      "authenticatedUser",
      "accessPrivileges",
      "courseAssignments"
    ]),
    loader() {
      return this.courseAssignments.length / this.page == 5;
    }
  }
};
</script>

<style lang="stylus" scoped>
.load-more {
  opacity: 0.7;
  margin-left: 10px;
  margin-right: 10px;
}

.no-content {
  padding-top: 50%;
}
</style>
