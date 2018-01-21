<template>
  <div>
      <v-flex>

          <v-flex no-content md2 offset-md5 v-if="systemAnnouncements.length == 0">
                <h3 class="text-md-center text-xs-center">There is no announcement.</h3>
          </v-flex>
   
          <section class="Container">
              <announcement-template v-for="(announcement, i) in systemAnnouncements" :key="i" :announcement="announcement" :systemAnnouncement="true"/>
          </section>
      </v-flex>     
      <div>
             <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_SYSTEM_ANNOUNCEMENT)"> 
              <v-icon>add</v-icon>
            </v-btn>
      </div>
      <template>
        <v-btn block class="load-more" light outline @click="loadSystemAnnouncements(page)" v-if="loader">More</v-btn>
      </template>
      <post-system-announcement :dialog="dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_SYSTEM_ANNOUNCEMENT)"/>
          

  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {AccessLevel} from "../../properties/accessLevel";
import {AccessPrivileges} from '../../properties/accessPrivileges'

import AnnouncementTemplate from './AnnouncementTemplate';
import PostSystemAnnouncement from '../admin/PostSystemAnnouncement'


export default {
  components:{
    AnnouncementTemplate,
    PostSystemAnnouncement,
  },
  data(){
    return {
        dialog: false,
        page: 0,
        deleteDialog: false
    }
  },
  created(){
    if(!this.$store.dispatch("hasAccessPrivilege", AccessPrivileges.READ_SYSTEM_ANNOUNCEMENT)){
        this.$router.back();
        return;
    }
    if(this.systemAnnouncements.length == 0){
      this.loadSystemAnnouncements(this.page);
    }
    else{
      this.page = (this.systemAnnouncements.length / 5) + 1;
    }
    
    
  },
  methods:{
    loadSystemAnnouncements(page){
      this.$store.dispatch("getSystemAnnouncements", page);
      this.page++;
    },
    deleteAnnouncement(publicKey){
      try{

       if(this.authenticatedUser.accessPrivileges.includes(this.accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)){
            this.$store.dispatch("deleteSystemAnnouncement", publicKey);
        }
      }
      catch(e){

      }
    },
    cancelSystemAnnouncementPosting(){
      this.dialog = false;
    }
  },
  computed:{
      ...mapGetters(['authenticatedUser', 'systemAnnouncements', 'accessPrivileges']),
    
      loader(){
        return (this.systemAnnouncements.length / this.page) == 5;
    }
  }
}
</script>

<style lang="stylus">
    .Container
        margin-left 10px
        margin-right 10px

    .load-more
        opacity  0.7
        margin-left 10px
        margin-right 10px

    .no-content
        margin-top 150px
</style>
