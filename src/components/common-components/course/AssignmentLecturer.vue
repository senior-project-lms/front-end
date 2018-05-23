
<template>
    <div>
    <div>
        <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
            <v-layout row wrap>
                <v-flex md12 sm12 xs12>
                    <v-data-table
                        :headers="headers"
                        hide-actions
                        :items="assignments"
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props" >
                        <td class="">
                            <b>{{ props.item.title }}</b>                            
                            <v-tooltip v-if="!props.item.published">
                                <v-icon class="" color="red darken-2" small slot="activator">error_outline</v-icon>                            
                                <span>Not Published</span>
                            </v-tooltip>                            
                            
                        </td>

                        <td  class="text-xs-left" >{{ moment(props.item.dueDate).format('MMMM Do YYYY, HH:mm') }}</td>
                        
                        
                        <td class="text-xs-right">

                            <span v-if="props.item.dueUp" class="red--text text--darken-1">Due is up</span>
                            <span v-else-if="props.item.timeUp" class="red--text text--darken-1">Time is up</span>

                            <v-menu open-on-hover top offset-y 
                            v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_ASSIGNMENT)"
                            >
                                <v-btn outline color="indigo" slot="activator" small>Preferences</v-btn>
                            
                                <v-list :key="`menu-${props.item.publicKey}`" >

  
                                    <v-list-tile
                                    v-if="!props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.UPDATE_COURSE_ASSIGNMENT)"
                                     @click="editDialog = true; selectedPublicKey = props.item.publicKey">
                                        <v-list-tile-title >Edit</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile 
                                    v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_ASSIGNMENT)"                                    
                                     @click="deleteDialog = true; selectedDeleteItem = props.item;">
                                        <v-list-tile-title>Delete</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile v-if="!props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.PUBLISH_COURSE_ASSIGNMENT)"
                                     @click="publishDialog = true; selectedPublishItem = props.item;" >
                                        <v-list-tile-title>Publish</v-list-tile-title>
                                    </v-list-tile>    
                                    <v-list-tile v-if="props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.PUBLISH_COURSE_ASSIGNMENT)"
                                    @click="disableDialog = true; selectedPublishItem = props.item;" >
                                        <v-list-tile-title>Disable</v-list-tile-title>
                                    </v-list-tile>        
                                    <v-list-tile v-if="props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.VIEW_COURSE_ASSIGNMENT_STUDENT_ANSWERS)"
                                    @click="usersAnswersView = true; selectedPublicKey = props.item.publicKey;" >
                                        <v-list-tile-title>View Answers</v-list-tile-title>
                                    </v-list-tile>                                                                                                                                                        
                                </v-list>
                            </v-menu>
                        </td>
                        </template>
                        <template slot="no-data">
                            <div  class="text-xs-center">
                                <b class="">No such a Assignment exist.</b>
                            </div>
                        </template>                        
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
        <div>
            <v-btn fixed dark fab bottom right color="pink" 
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_ASSIGNMENT)"
                @click="dialog = true; edit = false;"
                > 
                <v-icon>add</v-icon>
            </v-btn>
        </div> 
        <post-assignment
         v-if="dialog && $security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_ASSIGNMENT)"
         :dialog="dialog" :edit="edit" :publicKey="selectedPublicKey">
        </post-assignment>

        <student-answers v-if="usersAnswersView" :dialog="usersAnswersView" :publicKey="selectedPublicKey" @cancel="cancelDialog">

        </student-answers>

        <div>
            <v-dialog v-model="deleteDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Delete</v-card-title>
                    <v-card-text>Are you sure to delete</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteAssignment">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>         
        <div>
            <v-dialog v-model="publishDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Publish</v-card-title>
                    <v-card-text>Are you sure to publish</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="publishDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="publishAssignment">Publish</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>
        <div>
            <v-dialog v-model="disableDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Disable</v-card-title>
                    <v-card-text>Are you sure to disable</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="disableDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="disableAssignment">Disable</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>
        <div>
            <v-dialog v-model="editDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Edit</v-card-title>
                    <v-card-text>Are you sure to edit?</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="editDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="editDialog = false; dialog = true; edit = true;">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>               
    </div>
        
    </div>


</template>

<script>
import {mapGetters} from 'vuex';
import PostAssignment from './PostAssignment';
import StudentAnswers from './AssignmnetViewStudentAnswer'

import * as moment from 'moment';



export default {
    components:{
        PostAssignment,
        StudentAnswers,
    },
    data(){
        return{
            moment: moment,
            usersAnswersView: false,
            editDialog: false,
            selectedDeleteItem: null,
            publishDialog: false,
            deleteDialog: false,
            disableDialog: false,
            selectedPublicKey: null,
            selectedPublishItem: null,
            dialog: false,
            edit: false,
            headers: [
                {
                    text: 'Assignment Name',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Due Date', value: 'dueDate', sortable:false, align: 'left' },
                { text: '', value: 'publicKey', sortable:false, align: 'right' }
            ],                

        }
    },
    created(){
        this.fetchAssignments();
    },

    methods:{
        fetchNotifications(){
            this.$store.dispatch("getNotifications", this.$route.params.id);
        },
        fetchAssignments(){
            this.$store.dispatch("getCourseAssignments", this.$route.params.id);
        },
        publishAssignment(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedPublishItem.publicKey,
            }
            this.$store.dispatch("publishCourseAssignment", data);
            this.selectedPublishItem = null;
            this.publishDialog = false;
            this.fetchNotifications();
            
        },
        disableAssignment(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedPublishItem.publicKey,
            }
            this.$store.dispatch("disableCourseAssignment", data);
            this.selectedPublishItem = null;
            this.disableDialog = false;
            this.fetchNotifications();
        },        
        deleteAssignment(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedDeleteItem.publicKey,
            }
            this.$store.dispatch("deleteCourseAssignment", data);
            this.selectedDeleteItem = null;
            this.deleteDialog = false;
            this.fetchNotifications();
        },
        cancelDialog(){        
            //this.$store.dispatch("getAllCourseQuizTest", this.$route.params.id);
            this.dialog = false;    
            this.studentViewDialog = false;
            this.usersAnswersView = false;
            this.editDialog = false;
            this.fetchNotifications();
        },
        isPublished(published){
            return published ? 'green lighten-5' : 'red lighten-5';
        }
    },
    beforeDestroy(){
        this.$store.commit('clearCourseAnnouncementStore');
    },    
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'assignments', ]),
    },
    watch: {
    }
}    
</script>
<style <style lang="stylus" scoped>

    .notify
        margin-right 20px
</style>
