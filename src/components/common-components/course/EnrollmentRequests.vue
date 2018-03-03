<template>
  <div>
    <v-container fluid grid-list-md grid-list-sm grid-list-xs>      
        <v-layout row wrap>
            <v-flex class="">
                <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="searchEnrollmentRequest">

                </v-text-field>
            </v-flex>
        </v-layout>        
        <v-layout row wrap>
            <v-flex md12 sm12 xs12>
            <v-data-table
            :headers="enrollmentRequestsTable"
            :items="courseEnrollmentRequests"
            class="elevation-1"
            :rows-per-page-items="[10, 20]"
            :search="searchEnrollmentRequest">
                <template slot="items" slot-scope="props">
                    <tr>
                        <td class="">{{props.item.user.name}} {{ props.item.user.surname}}</td>
                        <td class="">{{props.item.user.email}}</td>
                        <td class="red--text text--lighten-2" v-if="props.item.observer">Observer</td>
                        <td class="blue--text text--lighten-1" v-else>Student</td>

                        <td class="text-md-right green--text" v-if="props.item.enrolled">
                            enrolled
                        </td>   
                        <td class="text-md-right red--text text--lighten-3" v-else-if="props.item.cancelled">
                            cancelled
                        </td>   
                        <td class="text-md-right red--text text--lighten-3" v-else-if="props.item.rejected">
                            rejected
                        </td>   
                        <td class="text-md-right text-xs-right" v-else>
                            
                            <a
                            v-has-privilege="{user: authenticatedUser, privilege:  accessPrivileges.APPROVE_ENROLLMENT_REQUEST}"
                                @click="approve(props.item.publicKey)"
                            >
                            approve
                            </a> | 
                            <a 
                            class="red--text text--lighten-1"
                            v-has-privilege="{user: authenticatedUser, privilege:  accessPrivileges.REJECT_ENROLLMENT_REQUEST}"
                            @click="reject(props.item.publicKey)">
                                reject
                                </a>
                        </td>                                                                                                                        
                    </tr>
                </template>
            </v-data-table>          
            </v-flex>
        </v-layout>
    </v-container>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as moment from 'moment'
export default{
    data(){
        return{
            searchEnrollmentRequest: '',
            enrollmentRequestsTable: [
                { text: "Name - Surname", value: "user.name", align: "left" },
                { text: "Email", value: "user.email", },
                { text: "Status", value: "status",  align: 'left'},
                { text: "", value: "event" }
            ]
        }
    },
    created(){
        if(this.$route.params.id != null){
            this.$store.dispatch("getEnrollmentRequestsOfCourse", this.$route.params.id);
        }
    },
    beforeDestroy(){
        this.$store.commit('clearEnrollmentRequestStore');
    },
    methods:{
        approve(publicKey){
            const data = {coursePublicKey: this.$route.params.id, enrollmentRequestPublicKey: publicKey}
            this.$store.dispatch("approveEnrollementRequest", data)
                .then(response => {
                    if(response.status){
                        this.$notify({type: "success", title: "Course Enrollment", text: "Approved Successfully"});
                        this.$store.dispatch("getEnrollmentRequestsOfCourse", this.$route.params.id);
                        this.$store.dispatch('getEnrollmentRequestCounts', this.$route.params.id);
                    }
                    else{
                        this.$notify({type: "error", title: "Course Enrollment", text: "Approvment Failed"});
                    }
                });
        },
        reject(publicKey){
            const data = {coursePublicKey: this.$route.params.id, enrollmentRequestPublicKey: publicKey}
            this.$store.dispatch("rejecetEnrollementRequest", data)
                .then(response => {
                    if(response.status){
                        this.$notify({type: "info", title: "Course Enrollment", text: "Request Rejected"});
                        this.$store.dispatch("getEnrollmentRequestsOfCourse", this.$route.params.id);
                        this.$store.dispatch('getEnrollmentRequestCounts', this.$route.params.id);
                    }
                    else{
                        this.$notify({type: "error", title: "Course Enrollment", text: "Rejection Failed"});
                    }
                });
        },
    },
    computed: {
        ...mapGetters(["authenticatedUser", "accessPrivileges", 'students', 'courseEnrollmentRequests']),
    },
}
</script>