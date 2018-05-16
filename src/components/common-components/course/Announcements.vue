<template>
  <div>
    <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
      <v-layout row wrap>
          <v-flex md12 sm12>
              <v-flex md2 offset-md5 v-if="courseAnnouncements.length == 0">
                    <h3 class="text-md-center text-xs-center no-content">There is no announcement.</h3>
              </v-flex>
              <section>
                  <announcement-template v-for="(announcement, i) in courseAnnouncements" :key="i" :announcement="announcement" :courseAnnouncement="true"/>
              </section>
          </v-flex> 
      </v-layout>
      <v-layout>
        <v-flex>
          <template>
            <v-btn block class="load-more" light outline @click="loadCourseAnnouncements" v-if="loader">More</v-btn>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
    <div>
            <v-btn fixed dark fab bottom right color="pink" 
            v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_ANNOUNCEMENT)"

             @click="dialog = !dialog" 
             > 
            <v-icon>add</v-icon>
          </v-btn>
    </div>
    <post-course-announcement :dialog="dialog"
      v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_ANNOUNCEMENT)"

    />
          

  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {AccessLevel} from "@/properties/accessLevel";
import {AccessPrivileges} from '@/properties/accessPrivileges'

import AnnouncementTemplate from '../AnnouncementTemplate';
import PostCourseAnnouncement from './SaveCourseAnnouncement'


export default {
  components:{
    AnnouncementTemplate,
    PostCourseAnnouncement,
  },
  data(){
    return {
        dialog: false,
        page: 1,
        deleteDialog: false
    }
  },
  created(){
    this.fetchAnnouncements()   
  },
  methods:{
    fetchAnnouncements(){
      const data ={
        publicKey:this.$route.params.id,
        page:this.page,
      }
      this.$store.dispatch("getCourseAnnouncements",data)
      .then(response => {
          if(!response.status){
            this.$notify({type: "error", title: "Course Announcement", text: response.data.message}) 
          }
      });
    },
    loadCourseAnnouncements(){
      this.page++;
      this.fetchAnnouncements();
    },
    
    deleteAnnouncement(publicKey){
        if(this.authenticatedUser.accessPrivileges.includes(this.accessPrivileges.DELETE_COURSE_ANNOUNCEMENT)){
          
              this.$store.dispatch("deleteCourseAnnouncement", publicKey)
              .then(response => {
                  if(response.status){
                      this.$notify({type: "info", title: "Course Announcement", text: "Successfuly deleted"})
                  }
                  else{
                    this.$notify({type: "error", title: "Course Announcement", text: response.data.message})
                  }
              });
        }
    },
    
    cancelDialog(){
      this.dialog = false;
      this.page = 1;
      this.fetchAnnouncements(this.page);
    }

  },
  computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseAnnouncements']),
      loader(){
        return (this.courseAnnouncements.length / this.page) == 5;
    }
  }
}
</script>

<style lang="stylus" scoped>
    .load-more
        opacity  0.7
        margin-left 10px
        margin-right 10px

    .no-content
        padding-top 50%
</style>
