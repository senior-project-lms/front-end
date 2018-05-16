<template>
    <div class="">
        <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
            <v-layout row wrap>
                <v-flex md12 sm12 xs12> 
                    <div class="detail"
                     v-if="$security.hasPermission(authenticatedUser, accessPrivileges.READ_ALL_COURSE_SCORES)
                     && 
                     $security.hasPermission(authenticatedUser, accessPrivileges.READ_OWN_COURSE_SCORES)"
                    >
                        <h3 class="header">Details of Course Grades</h3>
                        <v-divider></v-divider>                        
                    </div>

                    <grades-lecturer v-if="$security.hasPermission(authenticatedUser, accessPrivileges.READ_ALL_COURSE_SCORES)"></grades-lecturer>

                    <div class="detail"
                     v-if="$security.hasPermission(authenticatedUser, accessPrivileges.READ_ALL_COURSE_SCORES)
                     && 
                     $security.hasPermission(authenticatedUser, accessPrivileges.READ_OWN_COURSE_SCORES)"
                    >
                        <h3 class="header">Details of My Grades</h3>
                        <v-divider ></v-divider>
                    </div>
                    
                    <grades-student v-if="!$security.hasPermission(authenticatedUser, accessPrivileges.READ_ALL_COURSE_SCORES)" ></grades-student>
                </v-flex>
            </v-layout>
        </v-container>
          
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import GradesLecturer from './GradesLecturer';
import GradesStudent from './GradesStudent';

export default {
    components:{
        GradesLecturer,
        GradesStudent
    },
    data(){
        return{
            dialog: false,
            edit: false,
            selectedItem: null,
            disableDialog: false,
            publishDialog: false,
            classListDialog: false,
            deleteDialog: false,
            tableHeaders: [
                {
                    text: 'Name',
                    value: 'name',
                    sortable: false,
                    align: 'left',
                },
                {
                    text: 'Score',
                    value: 'score',
                    sortable: false,
                },
                {
                    text: 'Average',
                    value: 'average',
                    sortable: false,
                },
                {
                    text: 'Affect',
                    value: 'affect',
                    sortable: false,
                },
                {
                    text: '',
                    value: '',
                    sortable: false,
                }
                
            ],
        }
    },
    created(){

    },
    methods: {

        cancelDialog(){
            this.dialog = false;
            this.edit = false;
            this.selectedItem = null;
            this.disableDialog = false;
            this.publishDialog = false;
            this.classListDialog = false;
            this.deleteDialog = false; Course        
        },
    },
        
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTests', 'grades']),
        
    },    
}    
</script>
<style lang="stylus" scoped>
    .grade-footer
        padding-left 25px
    .detail
        margin-top 15px
        margin-bottom 15px
</style>
