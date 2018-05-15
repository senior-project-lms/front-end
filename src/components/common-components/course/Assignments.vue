<template>
  <div>
      
     <!-- <v-container   fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>   </v-container>
-->

          <v-flex md12 sm12>
              <v-flex md2 offset-md5 v-if="courseAssignments.length == 0">
                    <h3 class="text-md-center text-xs-center no-content">No assignment yet.</h3>
              </v-flex>
              <section class="Container">
                  <announcement-template v-for="(assignment, i) in courseAssignments" :key="i" :assignment="assignment" :courseAssignment="true"/>
              </section>
          </v-flex> 

          <div>
            <v-btn fixed dark fab bottom right color="pink" @click="dialog = !dialog"> 
            <v-icon>add</v-icon>
            </v-btn>
          </div>
          <post-course-assignment :dialog="dialog"/>

    
          
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
      deleteDialog: false

      
    };
  },
  created() {
    if(this.$route.params.id != null){
      this.$store.dispatch("getCourseAssignments", this.$route.params.id)
    }
  },
  methods: {
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

.no-content {
  padding-top: 50%;
}
</style>
