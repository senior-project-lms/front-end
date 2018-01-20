<template>
  <div>
      <v-flex>
          <section class="Container">
              <announcement-template v-for="(announcement, i) in systemAnnouncements" :key="i" :announcement="announcement"/>
          </section>
      </v-flex>     
      <div>
             <v-btn fixed dark fab bottom right color="pink" v-if="authenticated.includes(authUser.accessLevel)" @click="dialog = !dialog"> 
              <v-icon>add</v-icon>
            </v-btn>
      </div>
      <template>
        <v-btn block class="load-more" light outline @click="loadSystemAnnouncements(page)" v-if="loader">More</v-btn>
      </template>
      <post-system-announcement :dialog="dialog"/>


  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {AccessLevel} from "../../properties/accessLevel";
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
        authenticated: [AccessLevel.SUPER_ADMIN, AccessLevel.ADMIN],
        page: 0,
    }
  },
  created(){
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
    cancelSystemAnnouncementPosting(){
      this.dialog = false;
    }
  },
  computed:{
      ...mapGetters(['authenticatedUser', 'systemAnnouncements']),
      authUser(){
        return{
          accessLevel: this.authenticatedUser.authority.accessLevel,

        }
      },
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
        
  
</style>
