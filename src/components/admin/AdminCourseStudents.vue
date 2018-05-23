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
                    :data   = "allRegisteredStudets"
                    :name    = "filename">
                    export as excel                    
                </json-excel>            
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex md12 sm12 xs12>
                <v-data-table
                :headers="headersStudentTable"
                :items="allRegisteredStudets"
                :rows-per-page-items="[5, 10, 20, 50]"
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
    <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
    v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_USER)"
        > 
        <v-icon>add</v-icon>
    </v-btn>    
    <div>
        <add-multi :dialog="dialog"></add-multi>
    </div>
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
import AddMulti from "./AddMultiUserToCourse";

export default{
    components: {
        JsonExcel,
        AddMulti,

    },
    data(){
        return{
            dialog: false,
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
            this.$store.dispatch("getAllRegisteredStudents", this.$route.params.id)

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
        },
        closeDialog() {
        this.dialog = false;
        }        

    },
    computed: {
        ...mapGetters(["authenticatedUser", "accessPrivileges", 'allRegisteredStudets']),
      
    },
    watch:{
          allRegisteredStudets(nval, oval){
            nval.forEach(user => {
                user.status = user.observer ? 'Observer' : 'Student';
                return user;
            });

            return nval;
        
        }
    }
}
</script>
<style scoped>
    .excel{
        text-decoration: underline;
        cursor:pointer;

    }
        
</style>
