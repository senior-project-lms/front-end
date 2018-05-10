<template>
  <div>
      <v-container   fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>

          <v-flex md12 sm12>
              <v-flex md2 offset-md5>
                    <h3 class="text-md-center text-xs-center no-content">No assignment yet.</h3>
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
          <post-course-assignment :dialog="dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE_ASSIGNMENT)"/>

    
          
  </v-container>

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
      deleteDialog: false,
      
    };
  },
  created() {
    this.loadCourseAssignments();
  },
  methods: {
    loadCourseAssignments() {
      this.$store.dispatch("getCourseAssignments", this.$route.params.id)
    },

    deleteAssignment(publicKey) {

      if (
        this.authenticatedUser.accessPrivileges.includes(
          this.accessPrivileges.DELETE_COURSE_ASSIGNMENT_FILE
        )
      ) {
        const data = {coursePublicKey: this.$route.params.id,filePublicKey: publicKey};
        this.$store
          .dispatch("deleteCourseAssignment", data)
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
