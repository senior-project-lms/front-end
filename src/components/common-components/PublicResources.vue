<template>
<div>
  <loader v-if="!isLoaded"/>
  <div v-if="isLoaded">
    <v-container fluid  grid-list-md grid-list-sm grid-list-xs>
      <v-layout row wrap>
        
        <v-flex>
          <v-card height="55">
            <v-card-media class="white--text" height="55" src="/static/parallax2.jpg">
            <v-layout class="">
            <v-spacer></v-spacer>
            <v-btn flat class="white--text courses-btn" @click="coursesDialog = true"
              v-if="$security.hasPermission(authenticatedUser, accessPrivileges.ENROLL_COURSE)">
              Courses
            </v-btn>
            </v-layout>
            </v-card-media>
          </v-card>
        </v-flex >
        
        <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
          <v-layout row wrap>
            <v-flex md5 sm12 xs12>
              <v-card class="courses-temp"> 
                <v-list>
                  <v-subheader>Courses</v-subheader>       
                  <v-divider></v-divider>
                  <template v-for="(course, i) in allCourses">
                    <v-list-tile  v-model="selectedAuthority" :key="course.publicKey" @click="loadPublicResources(course.publicKey)">                           
                      <v-list-tile-content>
                          <v-list-tile-title><p class="course">{{course.code}} - {{course.name}}</p></v-list-tile-title>
                      </v-list-tile-content>
                      <v-icon right v-if="i == selectedAuthority">check_circle</v-icon>

                    </v-list-tile>
                   <v-divider :key="i" v-if="i + 1 < allCourses.length"></v-divider>                      
                  </template>
                            
                  <v-list-tile v-if="allCourses.length == 0">                           
                    <v-list-tile-content>
                      <v-list-tile-title class="text-md-center text-sm-center text-xs-center"><p class="grey--text">No course is available.</p></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>                            
                            
              </v-list>
            </v-card>
          </v-flex> 
        </v-layout>
      </v-container>    
        
      <course-enrollment v-if="$security.hasPermission(authenticatedUser, accessPrivileges.ENROLL_COURSE)" :dialog="coursesDialog"/> 

      <v-container fluid  grid-list-md grid-list-sm grid-list-xs>
        <v-layout row wrap class="">
          <v-flex md2>
            <v-card>
              <a
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_RESOURCE)"
                @click="dialog = true"
                class="right dismiss">
                Remove
              </a>
              
              <v-subheader> Public Resources</v-subheader>
              <v-card-title><h5 class="headline">{{ theResource.title }}</h5></v-card-title>
              <v-divider class="divider"></v-divider>
              
              <v-card-text>
                <pre><p class="text" v-html="theResource.content"/></pre>
                <ul class="file-list" v-for="(resource, i) in theResource.resources" :key="i">
                  <li><a  :href="resource.url" download> {{ resource.originalFileName}}</a></li>
                </ul>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <div class="detail">
                  <span class="right grey--text ">{{ moment(theResource.updatedAt).fromNow() }}</span>
                  <br>
                  <span class="right grey--text ">{{theResource.createdBy.username}}</span>
                </div>
              </v-card-actions>
              <v-divider></v-divider>
            </v-card>
            
            <v-dialog v-model="dialog" max-width="400" persistent>
              <v-card>
                <v-card-title class="headline">Confirm</v-card-title>
                <v-card-text>Do you want to remove the specified resource?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click.native="deleteResourceFile">Agree</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog> 
          </v-flex>
        </v-layout>
      </v-container>
</v-layout></v-container></div></div></template>

<script>
import { mapGetters } from "vuex";
import * as moment from "moment";

import CourseEnrollment from "@/components/common-components/course/CourseEnrollment";
import { AccessPrivileges } from "@/properties/accessPrivileges";
import { AccessLevel } from "@/properties/accessLevel";
import Loader from "@/components/Loader";

export default {
  props: ["theResource"],

  components: {
    Loader,
    CourseEnrollment
  },
  data() {
    return {
      selectedAuthority: null,

      selectedResources: [],
      moment: moment,

      isLoaded: true,
      activeText: "Public Resources",
      coursesDialog: false,
      deleteDialog: false
    };
  },
  created() {
    this.$store.dispatch("getAllCoursesForAuthUser");
  },
  methods: {
    cancelCourseDialog() {
      this.coursesDialog = false;
    },
    loadPublicResources(publicKey) {
      //publicKey: this.$route.params.id,
        
        //var publicKey = this.allCourses[0].publicKey;
        //this.loadPublicResources(publicKey);

        this.$store.dispatch("getAllResources", publicKey).then(response => {
          if (!response.status) {
            this.$notify({
              type: "error",
              title: "Public Resource",
              text: response.data.message
            });
          }
        });
    },

    deleteResourceFile(publicKey) {
      const data = {coursePublicKey: this.$route.params.id, filePublicKey: publicKey};
      this.$store.dispatch("deleteCourseResource", data).then(response => {
        if (response.status) {
          this.$notify({
            type: "info",
            title: "Public Resource",
            text: "Successfuly deleted"
          });
        } else {
          this.$notify({
            type: "error",
            title: "Public Resource",
            text: response.data.message
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      "authenticatedUser",
      "accessPrivileges",
      "allCourses",
      "publicCourseResources"
    ])
  }
};
</script>

<style <style lang="stylus" scoped>
.courses-btn {
  margin-top: -6px;
}

.def-auth-priv {
  margin-left: 15px;
  margin-top: 20px;
}

.no-content {
  padding-top: 50%;
}

.divider {
  margin-top: 2px;
  margin-bottom: 2px;
}

.detail {
  margin-top: -100px;
  margin-bottom: -70px;
}

.text {
  margin-top: -20px;
  padding-left: 20px;
  margin-right: 20px;
  word-wrap: break-word;
}

.dismiss {
  margin-top: 15px;
  margin-right: 5px;
}

.file-list {
  margin-top: 10px;
  margin-bottom: 10px;
  list-style-type: none;
}
</style>

