
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

                                <v-btn outline color="indigo" small
                                v-if="!props.item.dueUp && $security.hasPermission(authenticatedUser, accessPrivileges.JOIN_COURSE_ASSIGNMENT)"
                                @click="dialog = true; selectedPublicKey = props.item.publicKey;">
                                    View
                                </v-btn>

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
                
        </div>
        <div>
            <assignment-student-view v-if="dialog" :dialog="dialog" :publicKey="selectedPublicKey" />
        </div>
    </div>


</template>

<script>
import {mapGetters} from 'vuex';
import AssignmentStudentView from './AssignmentStudentView';


import * as moment from 'moment';



export default {
    components:{
        AssignmentStudentView,
    },
    data(){
        return{
            moment: moment,
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
        fetchAssignments(){
            this.$store.dispatch("getCourseAssignmentsOfStudent", this.$route.params.id);
        },

        cancelDialog(){        
            //this.$store.dispatch("getAllCourseQuizTest", this.$route.params.id);
            this.dialog = false;    
            this.studentViewDialog = false;
            this.usersAnswersView = false;
            this.editDialog = false;
        },

    },
    beforeDestroy(){
        this.$store.commit('clearCourseAnnouncementStore');
    },    
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'assignments']),
    },
    watch: {
    }
}    
</script>
<style <style lang="stylus" scoped>

    .notify
        margin-right 20px
</style>
