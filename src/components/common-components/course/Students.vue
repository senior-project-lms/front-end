<template>
  <div>
    <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm >
        <v-layout row wrap>
            <v-flex md6 sm12 xs12>
                <v-layout row wrap>
                    <v-flex md12 xs12 sm12>
                        <v-layout row wrap>
                            <v-flex class="">
                                <v-text-field
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                    v-model="searchStudent"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex>
                                <v-data-table
                                :headers="headersStudentTable"
                                :items="students"
                                :rows-per-page-items="[10, 20]"
                                class="elevation-1"
                                :search="searchStudent">
                                    <template slot="items" slot-scope="props">
                                        <tr>
                                            <td >{{ props.item.username }}</td>
                                            <td class="text-xs-center">{{props.item.name}}</td>
                                            <td>{{ props.item.surname}}</td>
                                            <td class="text-xs-center">{{ props.item.email }}</td>    
                                            <td>
                                                <v-btn icon>
                                                    <v-icon>settings</v-icon>
                                                </v-btn>
                                            </td>                                
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-flex>
                        </v-layout>        
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md4 sm12 xs12 offset-md2>
                <v-layout row wrap>
                    <v-flex md12 xs12 sm12>
                        <v-layout row wrap>
                            <v-flex class="">
                                <v-text-field
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                    v-model="searchEnrollmentRequest"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex>
                                <v-data-table
                                :headers="enrollmentRequestsTable"
                                :items="enrollmentRequests"
                                class="elevation-1"
                                :rows-per-page-items="[10, 20]"
                                :search="searchEnrollmentRequest">
                                    <template slot="items" slot-scope="props">
                                        <tr>
                                            <td class="">{{props.item.user.name}} {{ props.item.user.surname}}</td>
                                            <td class="text-md-right green--text" v-if="props.item.enrolled">
                                                enrolled
                                            </td>   
                                            <td class="text-md-right red--text text--lighten-3" v-else-if="props.item.cancelled">
                                                cancelled
                                            </td>   
                                            <td class="text-md-right red--text text--darken-3" v-else-if="props.item.rejected">
                                                rejected
                                            </td>   
                                            <td class="text-md-right" v-else>
                                                <a @click="approve(props.item.publicKey)">approve</a> | 
                                                <a @click="reject(props.item.publicKey)">reject</a>
                                            </td>                                                                                                                        
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-flex>
                        </v-layout>        
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>

  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default{
    data(){
        return{
            searchStudent: '',
            searchEnrollmentRequest: '',

            headersStudentTable: [
                { text: "Username", value: "username", align: "left" },
                { text: "Name", value: "name", align: "center" },
                { text: "Surname", value: "surname", align: "center" },
                { text: "Email", value: "email", align: "center" },
                { text: "", value: "event" }
            ],
            enrollmentRequestsTable: [
                { text: "Name - Surname", value: "user.name", align: "left" },
                { text: "", value: "event" }
            ]
        }
    },
    created(){
        if(this.$route.params.id != null){
            this.$store.dispatch("getEnrollmentRequestsOfCourse", this.$route.params.id);
            this.$store.dispatch("getEnrolledUsers", this.$route.params.id)
        }
    },
    beforeDestroy(){
        this.$store.commit('clearEnrollmentRequestStore');
    },
    methods:{
        approve(publicKey){
            this.$store.dispatch("approveEnrollementRequest", publicKey)
                .then(response => {
                    if(response.status){
                        this.$notify({type: "success", title: "Course Enrollment", text: "Approved Successfully"});
                        this.$store.dispatch("getEnrollmentRequestsOfCourse", this.$route.params.id);
                        this.$store.dispatch("getEnrolledUsers", this.$route.params.id)
                    }
                    else{
                        this.$notify({type: "error", title: "Course Enrollment", text: "Approvment Failed"});
                    }
                });
        },
        reject(publicKey){
            this.$store.dispatch("rejecetEnrollementRequest", publicKey)
                .then(response => {
                    if(response.status){
                        this.$notify({type: "info", title: "Course Enrollment", text: "Request Rejected"});
                        this.$store.dispatch("getEnrollmentRequestsOfCourse", this.$route.params.id);
                    }
                    else{
                        this.$notify({type: "error", title: "Course Enrollment", text: "Rejection Failed"});
                    }
                });
        },
    },
    computed: {
        ...mapGetters(["authenticatedUser", "accessPrivileges", 'students', 'enrollmentRequests']),
    },
}
</script>