<template>
  <v-container   fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
      <v-flex md12 sm12>
          <v-flex no-content md4 offset-md4 v-if="systemAnnouncements.length == 0">
                <h3 class="text-md-center text-xs-center">There is no announcement.</h3>
          </v-flex>
   
          <section class="">
              <announcement-template v-for="(announcement, i) in systemAnnouncements" :key="i" :announcement="announcement" :systemAnnouncement="true"/>
          </section>
      </v-flex>     
      <div>
             <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog"
              v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_SYSTEM_ANNOUNCEMENT)"
             > 
              <v-icon>add</v-icon>
            </v-btn>
      </div>
      <template>
        <v-btn block class="load-more" light outline @click="loadSystemAnnouncements(page)" v-if="loader">More</v-btn>
      </template>
      <post-system-announcement :dialog="dialog" 
      v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_SYSTEM_ANNOUNCEMENT)"/>
          
  </v-container>

</template>
<script>
import {mapGetters} from 'vuex';
import {AccessLevel} from "../../properties/accessLevel";
import {AccessPrivileges} from '../../properties/accessPrivileges'

import AnnouncementTemplate from './AnnouncementTemplate';
import PostSystemAnnouncement from '../admin/SaveSystemAnnouncement'


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

      this.$store.dispatch("hasAccessPrivilege", this.accessPrivileges.READ_SYSTEM_ANNOUNCEMENT)
      .then(auth => {
          if(!auth){
            this.$router.back();
          return;
          }
      })
  
    if(this.systemAnnouncements.length == 0){
      this.loadSystemAnnouncements(this.page);
    }
    else{
      this.page = (this.systemAnnouncements.length / 5) + 1;
    }
    
    
  },
  methods:{
    
    loadSystemAnnouncements(page){
      this.$store.dispatch("getSystemAnnouncements", page)
      .then(response => {
          if(!response.status){
            this.$notify({type: "error", title: "System Announcement", text: response.data.message}) 
          }
      });
      this.page++;
    },
    
    deleteAnnouncement(publicKey){
        if(this.authenticatedUser.accessPrivileges.includes(this.accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)){
              this.$store.dispatch("deleteSystemAnnouncement", publicKey)
              .then(response => {
                  if(response.status){
                      this.$notify({type: "info", title: "System Announcement", text: "Successfuly deleted"})
                  }
                  else{
                    this.$notify({type: "error", title: "System Announcement", text: response.data.message})
                  }
              });
        }
    },
    
    cancelDialog(){
      this.dialog = false;
    }

  },
  computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'systemAnnouncements']),
      loader(){
        return (this.systemAnnouncements.length / this.page) == 5;
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
        padding-top 20%
</style>
