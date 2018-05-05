
<template>
    <div>
    <div>
        <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
            <v-layout row wrap>
                <v-flex md12 sm12 xs12>
                    <v-data-table
                        :headers="headers"
                        :items="courseQuizTests"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props" >
                        <td class="">
                            <b>{{ props.item.name }}</b>                            
                            <v-tooltip v-if="!props.item.published">
                                <v-icon class="" color="red darken-2" small slot="activator">error_outline</v-icon>                            
                                <span>Not Published</span>
                            </v-tooltip>                            
                            
                        </td>

                        <td  class="text-xs-left" v-if="props.item.hasDueDate">{{ moment(props.item.endAt).format('MMMM Do YYYY, HH:mm') }}</td>
                        <td  class="text-xs-left" v-else>No due dated</td>
                        
                        <td class="text-xs-right">

                            <span v-if="props.item.dueUp" class="red--text text--darken-1">Due is up</span>
                            <span v-else-if="props.item.timeUp" class="red--text text--darken-1">Time is up</span>

                            <v-btn outline color="indigo" small
                            v-if="!props.item.dueUp && !props.item.timeUp && $security.hasPermission(authenticatedUser, accessPrivileges.JOIN_COURSE_QT)"
                            @click="studentViewDialog = true; selectedPublicKey = props.item.publicKey;">
                                Join
                            </v-btn>


                            <v-menu open-on-hover top offset-y 
                            v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_QT)"
                            >
                                <v-btn outline color="indigo" slot="activator" small>Preferences</v-btn>
                            
                                <v-list :key="`menu-${props.item.publicKey}`" >

  
                                    <v-list-tile
                                    v-if="!props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.UPDATE_COURSE_QT)"
                                     @click="editDialog = true; selectedPublicKey = props.item.publicKey">
                                        <v-list-tile-title >Edit</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile 
                                    v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_QT)"                                    
                                     @click="deleteDialog = true; selectedDeleteItem = props.item;">
                                        <v-list-tile-title>Delete</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile v-if="!props.item.dueUp && !props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.PUBLISH_COURSE_QT)"
                                     @click="publishDialog = true; selectedPublishItem = props.item;" >
                                        <v-list-tile-title>Publish</v-list-tile-title>
                                    </v-list-tile>    
                                    <v-list-tile v-if="props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.PUBLISH_COURSE_QT)"
                                    @click="disableDialog = true; selectedPublishItem = props.item;" >
                                        <v-list-tile-title>Disable</v-list-tile-title>
                                    </v-list-tile>        
                                    <v-list-tile v-if="props.item.published && $security.hasPermission(authenticatedUser, accessPrivileges.VIEW_USER_ANSWERS_COURSE_QT)"
                                    @click="usersAnswersView = true; selectedPublicKey = props.item.publicKey;" >
                                        <v-list-tile-title>View Answers</v-list-tile-title>
                                    </v-list-tile>                                                                                                                                                        
                                </v-list>
                            </v-menu>
                        </td>
                        </template>
                        <template slot="no-data">
                            <div  class="text-xs-center">
                                <b class="">No such a Quiz or Test exist :(</b>
                            </div>
                        </template>                        
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
        <div>
            <v-btn fixed dark fab bottom right color="pink" 
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_QT)"
                @click="dialog = true; edit = false;"
                > 
                <v-icon>add</v-icon>
            </v-btn>
        </div> 
        <post-quiz-test v-if="dialog && $security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_QT)" 
        :dialog="dialog" :edit="edit" :publicKey="selectedPublicKey">
        </post-quiz-test>      

        <qt-student-view
        v-if="studentViewDialog && $security.hasPermission(authenticatedUser, accessPrivileges.JOIN_COURSE_QT)"
        :dialog="studentViewDialog" :publicKey="selectedPublicKey">
        </qt-student-view>

        <qt-student-list
        v-if="usersAnswersView && $security.hasPermission(authenticatedUser, accessPrivileges.VIEW_USER_ANSWERS_COURSE_QT)"
        :dialog="usersAnswersView" :publicKey="selectedPublicKey"
        @cancel="cancelDialog">
        </qt-student-list>        


        <div>
            <v-dialog v-model="deleteDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Delete</v-card-title>
                    <v-card-text>Are you sure to delete</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteQT">Delete</v-btn>
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
                    <v-btn color="green darken-1" flat="flat" @click.native="publishQT">Publish</v-btn>
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
                    <v-btn color="green darken-1" flat="flat" @click.native="disableQT">Disable</v-btn>
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
import PostQuizTest from './PostTestQuiz';
import QuestionView from './QuestionView'
import QtStudentView from './QTStudentView'
import QtStudentList from './QTStudentList'


import * as moment from 'moment';



export default {
    components:{
        PostQuizTest,
        QuestionView,
        QtStudentView,
        QtStudentList,
    },
    data(){
        return{
            moment: moment,
            editDialog: false,
            usersAnswersView: false,
            studentViewDialog: false,
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
                text: 'Exam Date',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            { text: 'Due Date', value: 'dueDate', sortable:false, align: 'left' },
            { text: '', value: 'publicKey', sortable:false, align: 'right' }
            ],                
            exams: [   
                {
                    publicKey: '1231231231230',
                    name: 'Quiz-1',
                    publishDate: '11/04/2018 15:30',
                    dueDate: '19/04/2018 15:30',
                }      
            ]
        }
    },
    created(){
        this.$store.dispatch("getAllCourseQuizTest", this.$route.params.id);
    },

    methods:{
        publishQT(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedPublishItem.publicKey,
            }
            this.$store.dispatch("publishCourseQuizTest", data);
            this.selectedPublishItem = null;
            this.publishDialog = false;
        },
        disableQT(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedPublishItem.publicKey,
            }
            this.$store.dispatch("disableCourseQuizTest", data);
            this.selectedPublishItem = null;
            this.disableDialog = false;
        },        
        deleteQT(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedDeleteItem.publicKey,
            }
            this.$store.dispatch("deleteCourseQuizTest", data);
            this.selectedDeleteItem = null;
            this.deleteDialog = false;
        },
        cancelDialog(){        
            this.$store.dispatch("getAllCourseQuizTest", this.$route.params.id);
            this.dialog = false;    
            this.studentViewDialog = false;
            this.usersAnswersView = false;
            this.editDialog = false;
        },
        isPublished(published){
            return published ? 'green lighten-5' : 'red lighten-5';
        }
    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTests']),
    },
    watch: {
    }
}    
</script>
<style <style lang="stylus" scoped>

    .notify
        margin-right 20px
</style>
