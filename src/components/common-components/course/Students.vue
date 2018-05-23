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
                    v-model="searchStudent"
                ></v-text-field>
            </v-flex>
        </v-layout>        
        <v-layout row wrap>
            <v-flex md12 class="text-md-right">
                <json-excel
                    class   = "excel blue--text"
	                :fields = "excelFields"
                    :data   = "diplayedStudents"
                    :name    = "filename">
                    export as excel                    
                </json-excel>            
            </v-flex>
        </v-layout>
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
                                <a class="red--text text--darken-1" @click="deleteDialog = true; selectedItem = props.item;">delete</a>
                            </td>                                
                        </tr>
                    </template>
                </v-data-table>              
            </v-flex>
        </v-layout>
    </v-container>
    <div>
        <v-dialog v-model="deleteDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Delete</v-card-title>
                <v-card-text>Are you sure to delete</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">Cancel</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteStudent">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>        
    </div>     
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import JsonExcel from 'vue-json-excel'

export default{
    components: {
        JsonExcel
    },
    data(){
        return{
            selectedItem: null,
            deleteDialog: false,
            searchStudent: '',
            filename: '',
            excelFields: {
                username: 'username',
                name: 'name',
                surname: 'surname',
                email: 'email',
                status: 'status'
            },
            headersStudentTable: [
                { text: "Name", value: "name", align: "left" },
                { text: "Surname", value: "surname",  },
                { text: "Email", value: "email", },
                { text: "Status", value: "status", },
                { text: "", value: "event", sortable:false, }
            ],
        }
    },
    created(){
        this.filename = this.$route.params.id + '.xls'
        if(this.$route.params.id != null){
            this.$store.dispatch("getEnrolledUsers", this.$route.params.id)
            this.$store.dispatch("getEnrolledObserverUsers", this.$route.params.id)

        }
    },
    beforeDestroy(){
        //this.$store.commit('clearCourseStore');
    },
    methods:{
        deleteStudent(){
            const data = {
                coursePublicKey:  this.$route.params.id,
                userPublicKey: this.selectedItem.publicKey,
            }
            this.$store.dispatch("deleteStudentFromCourse", data);
            this.deleteDialog = false;
        }

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
    .excel{
        text-decoration: underline;
        cursor:pointer;

    }
        
</style>
