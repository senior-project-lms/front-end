<template>
  <div>
        <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
            <v-layout row wrap>
                <v-flex md3>
                        <v-card>
                            <v-toolbar color="blue" dark>
                            <v-toolbar-title>Assistants</v-toolbar-title>
                            <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-list two-line>
                                <template v-for="(item, index) in items">
                                    <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                                    <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                                    <v-list-tile avatar v-else :key="item.title">
                                    <v-list-tile-avatar>
                                        <img :src="item.avatar">
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    </v-list-tile>
                                </template>
                                <v-list-tile v-if="items.length == 0">                           
                                    <v-list-tile-content>
                                        <v-list-tile-title class="text-md-center text-sm-center text-xs-center"><p class="grey--text">No such a assistant is found</p></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>                                    
                            </v-list>
                        </v-card>                    
                </v-flex>
            </v-layout>
        </v-container>
        <div>
          <v-btn class="add-btn" fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
            v-has-privilege="{user: authenticatedUser, privilege:  accessPrivileges.SAVE_AUTHENTICATED_USER}"> 
              <v-icon>add</v-icon>
          </v-btn>
        </div>
        <save-authenticated-user :dialog="dialog">
        </save-authenticated-user>      
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import SaveAuthenticatedUser from './SaveAuthenticatedUser'

export default{
    components:{
        SaveAuthenticatedUser,
    },
    data(){
        return{
            items:[],
            dialog: false,
        }
    },
    created(){
    },
    methods:{
        closeDialog(){
            this.dialog = false;
        }
    },
    computed: {
      ...mapGetters(["authenticatedUser", 'accessPrivileges', 'allCoursePrivileges']),
    },
    watch:{
        dialog(nval, oval){
            if(nval){
                this.$store.dispatch('getAllCoursePrivileges', this.$route.params.id);
            }
            return nval;
        }
    }
}
</script>
<style lang="stylus" scoped>
    .add-btn
        margin-bottom 50px
</style>

