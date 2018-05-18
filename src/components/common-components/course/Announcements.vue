<template>
  <div>
          <v-flex md12 sm12>
              <v-flex md2 offset-md5 v-if="courseAnnouncements.length == 0">
                    <h3 class="text-md-center text-xs-center no-content">There is no announcement yet.</h3>
              </v-flex>
              <section class="Container">
                  <announcement-template v-for="(announcement, i) in courseAnnouncements" :key="i" :announcement="announcement" :courseAnnouncement="true"/>
              </section>
          </v-flex> 
      
        
          <div>
            <v-btn fixed dark fab bottom right color="pink" @click="dialog = !dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE_ANNOUNCEMENT)"> 
            <v-icon>add</v-icon>
          </v-btn>
          </div>

          <template>
            <v-btn block class="load-more" light outline @click="loadCourseAnnouncements(page)" v-if="loader">More</v-btn>
          </template>

          <post-course-announcement :dialog="dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE_ANNOUNCEMENT)"/>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { AccessLevel } from "@/properties/accessLevel";
import { AccessPrivileges } from "@/properties/accessPrivileges";

import AnnouncementTemplate from "../AnnouncementTemplate";
import PostCourseAnnouncement from "./SaveCourseAnnouncement";

export default {
  components: {
    AnnouncementTemplate,
    PostCourseAnnouncement
  },
  data() {
    return {
      dialog: false,
      page: 1,
      deleteDialog: false
    };
  },
  created() {
    if (this.courseAnnouncements.length == 0) {
      this.loadCourseAnnouncements(this.page);
    } else {
      this.page = this.courseAnnouncements.length / 5 + 1;
    }
  },
  methods: {
    loadCourseAnnouncements(page) {
      const data = {
        publicKey: this.$route.params.id,
        page: page
      };
      this.$store.dispatch("getCourseAnnouncements", data).then(response => {
        if (!response.status) {
          this.$notify({
            type: "error",
            title: "Course Announcement",
            text: response.data.message
          });
        }
      });
      this.page++;
    },

    deleteAnnouncement(publicKey) {
      if (
        this.authenticatedUser.accessPrivileges.includes(
          this.accessPrivileges.DELETE_COURSE_ANNOUNCEMENT
        )
      ) {
        this.$store
          .dispatch("deleteCourseAnnouncement", publicKey)
          .then(response => {
            if (response.status) {
              this.$notify({
                type: "info",
                title: "Course Announcement",
                text: "Successfuly deleted"
              });
            } else {
              this.$notify({
                type: "error",
                title: "Course Announcement",
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
  beforeDestroy(){
    this.$store.commit('clearCourseAnnouncementStore');
  },
  computed: {
    ...mapGetters([
      "authenticatedUser",
      "accessPrivileges",
      "courseAnnouncements"
    ]),
    loader() {
      return this.courseAnnouncements.length / this.page == 5;
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
