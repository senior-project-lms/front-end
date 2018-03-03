<template>
  <div>
    <v-container fluid grid-list-md grid-list-sm grid-list-xs>
        <v-layout row wrap>
            <v-flex md12 sm12 xs12>
                <v-data-table
                :headers="headersStudentTable"
                :items="diplayedStudents"
                :rows-per-page-items="[10, 20]"
                class="elevation-1"
                :search="searchStudent">
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td class="">{{props.item.name}}</td>
                            <td>{{ props.item.surname}}</td>
                            <td class="">{{ props.item.email }}</td>    
                            <td class="red--text text--lighten-2" v-if="props.item.observer">{{props.item.status}}</td>    
                            <td class="blue--text text--lighten-1" v-else>{{props.item.status}}</td>    
                            <td class="text-md-right text-xs-right">
                                <v-btn icon>
                                    <v-icon>settings</v-icon>
                                </v-btn>
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

export default{
    data(){
        return{
            searchStudent: '',
            searchEnrollmentRequest: '',

            headersStudentTable: [
                { text: "Name", value: "name", align: "left" },
                { text: "Surname", value: "surname",  },
                { text: "Email", value: "email", },
                { text: "Status", value: "status", },
                { text: "", value: "event" }
            ],
        }
    },
    created(){
        if(this.$route.params.id != null){
            this.$store.dispatch("getEnrolledUsers", this.$route.params.id)
            this.$store.dispatch("getEnrolledObserverUsers", this.$route.params.id)

        }
    },
    beforeDestroy(){
        //this.$store.commit('clearCourseStore');
    },
    methods:{

    },
    computed: {
        ...mapGetters(["authenticatedUser", "accessPrivileges", 'students', 'observerStudents']),

        diplayedStudents(){
            var students = [];

            for(var i in this.students){
                const student = this.students[i];
                student.observer = false;
                student.status = 'Student';
                students.push(student);
            }
            for(var i in this.observerStudents){
                const student = this.observerStudents[i];
                student.observer = true;
                student.status = 'Observer';
                students.push(student);
            }
            return students;
        }   
    },
}
</script>
<style scoped>

</style>
