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
                                <template v-for="(item, i) in assistants">
                                    <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                                    <v-list-tile :key="`tile-${i}`">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{item.user.name}} {{item.user.surname}}</v-list-tile-title>
                                        <v-list-tile-sub-title v-html="item.user.authority.name">                                            
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <a @click="viewAssistant(item.user)">view</a>              
                                    </v-list-tile-action>
                                    
                                    </v-list-tile>

                                    <v-divider v-if="i < assistants.length - 1" :key="`assistant-divider-${i}`"></v-divider>
                                </template>
                                <v-list-tile v-if="assistants.length == 0">                           
                                    <v-list-tile-content>
                                        <v-list-tile-title class="text-md-center text-sm-center text-xs-center"><p class="grey--text">No such a assistant is found</p></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>                                    
                            </v-list>
                        </v-card>                    
                </v-flex>
                <v-flex md4 offset-md5>
                        <v-card>
                            <v-toolbar color="blue" dark>
                            <v-toolbar-title>Logs</v-toolbar-title>                       
                            <v-spacer></v-spacer>
                            <v-text-field
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                                color="white"
                                v-model="searchLog"
                            ></v-text-field>                                 
                            </v-toolbar>
                            <v-list three-line  >
                                <template v-for="(item, i) in mockLogs">
                                    <v-list-tile :key="`tile-log-${i}`">
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                            <v-list-tile-sub-title v-html="item.text"></v-list-tile-sub-title>
                                            <v-list-tile-sub-title class="caption text-md-right text-xs-right">{{item.user.name}} {{item.user.surname}} - {{ moment(item.date).fromNow() }}</v-list-tile-sub-title>
                                        </v-list-tile-content>                                    
                                    </v-list-tile>
                                    <v-divider v-if="i < assistants.length - 1" :key="`assistant-divider-${i}`"></v-divider>
                                </template>
                                <v-list-tile v-if="assistants.length == 0">                           
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
            v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_AUTHENTICATED_USER)"> 
              <v-icon>add</v-icon>
          </v-btn>
        </div>
        <save-authenticated-user :dialog="dialog"
        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_AUTHENTICATED_USER) && dialog"> 
        </save-authenticated-user>      

        <update-authenticated-user :dialog="updateDialog" :selectedAssistant="selectedAssistant"
        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPDATE_AUTHENTICATED_USER) && updateDialog">
        </update-authenticated-user>      
        
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import SaveAuthenticatedUser from './SaveAuthenticatedUser'
import UpdateAuthenticatedUser from './UpdateAuthenticatedUser'

import * as moment from 'moment';
export default{
    components:{
        SaveAuthenticatedUser,
        UpdateAuthenticatedUser
    },
    data(){
        return{
            moment: moment,
            items:[],
            searchLog: '',
            dialog: false,
            updateDialog: false,
            selectedAssistant: null,
            mockLogs: [
                {
                    id: 1,
                    title: 'Grades',
                    user: {
                        name: 'Umit',
                        surname: 'Kas',
                    },
                    text: "mock.users's midterm score is updated 55 to 60",
                    date: '2018-03-06 19:37:07'
                },
                {
                    id: 1,
                    title: 'Announcement',                    
                    user: {
                        name: 'Umit',
                        surname: 'Kas',
                    },
                    text: "Announcement is posted, with title Midtem results now available.",
                    date: '2018-03-06 19:37:07'
                },
                {
                    id: 1,
                    title: 'Grades',                    
                    user: {
                        name: 'Umit',
                        surname: 'Kas',
                    },
                    text: "mock.users's midterm score is updated 55 to 60",
                    date: '2018-03-06 19:37:07'
                }                                
            ]
        }
    },
    created(){
        this.initialize();
    },
    methods:{
        initialize(){
            this.$store.dispatch('getAllAssistants', this.$route.params.id);

        },
        viewAssistant(assistant){
            console.log(assistant)
            this.selectedAssistant = assistant;
            this.updateDialog = true;
        },
        closeDialog(){
            this.dialog = false;
            this.updateDialog = false;
        }
    },
    computed: {
      ...mapGetters(["authenticatedUser", 'accessPrivileges', 'allCoursePrivileges', 'assistants']),
    }
}
</script>
<style lang="stylus" scoped>
    .add-btn
        margin-bottom 50px
</style>

