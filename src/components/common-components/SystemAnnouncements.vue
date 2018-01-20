<template>
  <div>
      <v-flex>
          <section class="Container">
              <announcement-template v-for="(announcement, i) in systemAnnouncements" :key="i" :announcement="announcement"/>
          </section>
      </v-flex>     
      <div>
             <v-btn fixed dark fab bottom right color="pink" v-if="authenticated.includes(authUser.accessLevel)"> 
              <v-icon>add</v-icon>
            </v-btn>
      </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {AccessLevel} from "../../properties/accessLevel";
import AnnouncementTemplate from './AnnouncementTemplate';

export default {
  components:{
    AnnouncementTemplate,
  },
  data(){
    return {
        authenticated: [AccessLevel.SUPER_ADMIN, AccessLevel.ADMIN],
        page: 1,
    }
  },
  created(){
    this.loadSystemAnnouncements(this.page)
  },
  methods:{
    loadSystemAnnouncements(page){
      this.$store.dispatch("getSystemAnnouncements", page);
    }
  },
  computed:{
      ...mapGetters(['authenticatedUser', 'systemAnnouncements']),
      authUser(){
        return{
          accessLevel: this.authenticatedUser.authority.accessLevel,

        }
      }
  }
}
</script>

<style lang="stylus">
    .Container
        margin-left 10px
        margin-right 10px
</style>
