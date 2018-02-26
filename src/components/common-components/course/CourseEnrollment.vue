<template>
    <div>
        <v-dialog
            v-model="dialog"
            fullscreen
            transition="dialog-bottom-transition"
            :overlay="false"
            scrollable
            v-has-privilege="{user: authenticatedUser, privilege:  accessPrivileges.ENROLL_COURSE}"
        >
            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon @click.native="cancel" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Courses</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                    <v-menu bottom right offset-y>
                        <v-btn slot="activator" dark icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-menu>
                </v-toolbar>
                <v-card-text>
                    <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
                        <v-layout row wrap>
                            <v-flex md6 sm12 xs12 offset-md1>
                                <v-layout row wrap justify-center>
                                    <v-flex md2 sm3 xs3>
                                        <v-select
                                        label="Search By"
                                        :items="selectItems"
                                        v-model="selectedSearchType"
                                        ></v-select>
                                    </v-flex>    
                                    <v-flex md4 sm6 xs4
                                    v-if="selectedSearchType == null || selectedSearchType.type != SearchType.Course.LECTURER"
                                    >
                                        <v-text-field
                                        v-model="searchParam"
                                        label="Search"
                                        ></v-text-field>
                                    </v-flex>                        
                                    <v-flex md2 sm3 xs3
                                    v-if="selectedSearchType != null && selectedSearchType.type == SearchType.Course.LECTURER"
                                    >
                                        <v-text-field
                                        v-model="searchLecturerParam.name"
                                        label="Name"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex md2 sm3 xs3
                                    v-if="selectedSearchType != null && selectedSearchType.type == SearchType.Course.LECTURER"
                                    >
                                        <v-text-field
                                        v-model="searchLecturerParam.surname"
                                        label="Surname"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex md1 sm3 xs3>
                                        <v-btn
                                        color="secondary"
                                        :loading="loading"
                                        @click.native="filterCourses"
                                        :disabled="loading"
                                        >
                                            Search
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex md12 xs12 sm12>
                                        <v-data-table
                                        :headers="headers"
                                        :items="notEnrolledCourses"
                                        :rows-per-page-items="[10]"	
                                        class="elevation-1">
                                            <template slot="items" slot-scope="props">
                                                <tr :class="props.item.color">
                                                    <td>{{ props.item.code }}</td>
                                                    <td class="text-xs-center">
                                                        {{ props.item.name }}
                                                    </td>
                                                    <td class="text-xs-center">{{ `${props.item.owner.name} ${props.item.owner.surname}` }}</td>
                                                    <td class="text-xs-right text-md-right text-sm-right">
                                                    <a @click="enroll(props.item.publicKey)">enroll</a>
                                                    </td>
                                                </tr>
                                            </template>
                                        </v-data-table>                                
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex md4 sm12 xs12 offset-md1>
                                <v-card>
                                    <v-card-text>
                                        <v-list two-line>
                                            <v-subheader>Enrollment Request</v-subheader>
                                            <template v-for="(request, i) in enrollmentRequests">
                                                <v-divider :key="`req-divider-${i}`"></v-divider>
                                                
                                                <v-list-tile :key="`request-tile-${i}`">
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title class="text-md-right green--text" v-if="request.enrolled">
                                                            enrolled
                                                        </v-list-tile-sub-title>   
                                                        <v-list-tile-sub-title class="text-md-right red--text text--lighten-3" v-else-if="request.cancelled">
                                                            cancelled
                                                        </v-list-tile-sub-title>   
                                                        <v-list-tile-sub-title class="text-md-right red--text text--darken-3" v-else-if="request.rejected">
                                                            rejected
                                                        </v-list-tile-sub-title>                                                           
                                                        <v-list-tile-sub-title class="text-md-right text-sm-right text-xs-right" v-else>
                                                            <a
                                                            class="red--text text--lighten-2" 
                                                            @click="cancelEnrollment(request.publicKey)">cancel</a>
                                                        </v-list-tile-sub-title>
                                                        <v-list-tile-sub-title class="">
                                                            {{request.course.code}} - {{request.course.name}}
                                                        </v-list-tile-sub-title>
                                                        <v-list-tile-sub-title>
                                                            {{ request.course.owner.username }}
                                                        </v-list-tile-sub-title>
                                                        <v-list-tile-sub-title class="text-md-right text-sm-right text-xs-right time-text">
                                                            {{ moment(request.updatedAt).fromNow() }}
                                                        </v-list-tile-sub-title>
                                                    </v-list-tile-content>
                                                </v-list-tile>
                                            </template>
                                            <v-divider v-if="enrollmentRequests.length == 0"></v-divider>
                                            <v-list-tile v-if="enrollmentRequests.length == 0">
                                                <v-list-tile-sub-title class="text-md-center text-sm-center text-xs-center">No such a enrollment is found</v-list-tile-sub-title>
                                            </v-list-tile>
                                            <v-divider ></v-divider>

                                        </v-list>
                                    </v-card-text>
                                </v-card>

                            </v-flex>
                        </v-layout>

                    </v-container>
                    
                </v-card-text>
                <div style="flex: 1 1 auto;"/>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import {SearchType} from '../../../properties/searchType'
import * as moment from 'moment';

export default{
    props: ['dialog'],
    data(){
        return{
            moment: moment,
            SearchType: SearchType,
            searchParam: '',
            searchLecturerParam: {
                name: null,
                surname: null,
            },
            loading: null,
            headers: [
            { text: "Code", value: "code", align: "left" },
            { text: "Name", value: "name", align: "center" },
            { text: "Lecturer", value: "lecturer", align: "center" },
            { text: "", value: "event" },
            ],
            selectedSearchType: null,
            selectItems: [
                {
                    text: 'Code',
                    type: SearchType.Course.CODE
                },
                {
                    text: 'Name',
                    type: SearchType.Course.NAME
                },
                {
                    text: 'Lecturer',
                    type: SearchType.Course.LECTURER
                },
                
            ]
        }
    },
    created(){
    },
    methods:{
        enroll(publicKey){
            this.$store.dispatch("enrollCourse", publicKey)
            .then(response => {
                if(response.status){
                    this.$notify({type: "success", title: "Course Enrollment", text: "Enrolled Successfully"});
                    this.$store.dispatch("getAuthUserEnrollmentRequests");
                    this.filterCourses();
                }
                else{
                    this.$notify({type: "error", title: "Course Enrollment", text: response.message});
                }
            });
        },
        cancelEnrollment(publicKey){

            this.$store.dispatch("cancelEnrollementRequest", publicKey)
            .then(response => {
                if(response.status){
                    this.$notify({type: "info", title: "Course Enrollment", text: "Enrolment is cancelled Successfully"});
                    this.$store.dispatch("getAuthUserEnrollmentRequests");
                }
                else{
                    this.$notify({type: "error", title: "Course Enrollment",  text: response.message});
                }
            });
        },
        filterCourses(){


            if(this.selectedSearchType == null){
                this.$notify({type: "error", title: "Course Enrollment", text: "Select a search type"})
                return;
            }
            else if (this.selectedSearchType.type != SearchType.Course.LECTURER && this.searchParam.length == 0){
                this.$notify({type: "error", title: "Course Enrollment", text: "Enter a search parameter"})
                return;
            }
            else if(this.selectedSearchType.type == SearchType.Course.LECTURER && (this.searchLecturerParam.name == null && this.searchLecturerParam.surname == null)){
                this.$notify({type: "error", title: "Course Enrollment", text: "Enter a Lecturer information parameter"})
                return;
            }
            this.loading = true;

            if(this.selectedSearchType.type == SearchType.Course.LECTURER){

                var searchItems = {
                    searchType: this.selectedSearchType.type,
                    searchParam: this.searchLecturerParam
                
                };
            }
            else{
                var searchItems = {
                    searchType: this.selectedSearchType.type,
                    searchParam: this.searchParam
                
                };
            }
            
            
            this.$store.dispatch("searchNotRegisteredCoursesBySearchParam", searchItems)
            .then(response => {
                this.loading = false;
            });
        },
        cancel(){
            this.$parent.cancelCourseDialog();
            this.$store.commit("setNotEnrolledCourses", []);
        }
    },
    computed: {
        ...mapGetters(["authenticatedUser", "accessPrivileges", "notEnrolledCourses" ,"enrollmentRequests"
        ])
    },
    watch: {
        dialog(nval, oval){
            if(nval == true){
                this.$store.dispatch("getAuthUserEnrollmentRequests");
                
            }
            return nval;
        }
    }
}
</script>
<style lang="stylus" scoped>
    .time-text
        font-size 10px
</style>
