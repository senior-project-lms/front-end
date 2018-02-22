<template>
  <div>
      <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn icon @click="cancel" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Save Course</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn dark flat @click.native="saveAll">Save</v-btn>
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
                        <v-flex md5 lg5 xs12 sm12>
                            <v-card>
                                <v-card-text>
                                <v-layout row wrap>
                                            <v-flex md3 sm12 xs12>
                                                <v-text-field label="Code" v-model="course.code" required/>
                                            </v-flex>
                                            <v-flex md9 sm12 xs12>
                                                <v-text-field label="Name"  v-model="course.name" required/>
                                            </v-flex>
                                    </v-layout>   
                                    <v-layout row wrap>
                                        <v-flex>
                                            <!-- <v-text-field label="Lecturer" v-model="course.lecturer"  required/> -->
                                            <v-select
                                            :items="users"
                                            v-model="course.owner"
                                            label="Search Lecturer"
                                            autocomplete
                                            required
                                            ></v-select>                                            
                                        </v-flex>
                                    </v-layout>                                                                      
                                    <v-layout row wrap>
                                        <v-flex md12>
                                              <div class="text-xs-right">
                                                    <v-btn block outline color="indigo" @click="addToList">Add</v-btn>
                                              </div>
                                        </v-flex>
                                    </v-layout>           
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex md7 xs12 sm12>
                            <v-card>
                                <v-card-text>
                                    <v-layout>
                                        <v-flex md2 sm2>
                                            <div class="upload-btn-wrapper">
                                                <v-btn block outline>Upload File</v-btn>
                                                <input type="file" @change="processFile($event)"/>
                                            </div>
                                        </v-flex>
                                        <v-flex md10 sm10>
                                            <b>Columns must be in excel file:</b> <p class="red--text">code(unique), name, lecturer(email)</p>
                                        </v-flex>
                                    </v-layout>                                         
                                    <v-layout>
                                        <v-flex md12 sm12 xs12>
                                            <v-data-table
                                                :headers="headers"
                                                :items="courses"
                                                class="elevator-1">
                                                    <template slot="items" slot-scope="props">
                                                        <tr>
                                                            <td>{{ props.item.code }}</td>
                                                            <td class="text-xs-center">{{ props.item.name }}</td>
                                                            <td class="text-xs-center">{{ props.item.owner.email }}</td>
                                                            <td class="text-xs-right"><a @click="removeCourse(props.index)"><v-icon color="red darken-2">cancel</v-icon></a></td>
                                                        </tr>
                                                    </template>
                                            </v-data-table>
                                        </v-flex>
                                    </v-layout>                                    
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>                           

            </v-card-text>     
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {AccessLevel} from '../../properties/accessLevel'

export default{
    props: ['dialog'],
    data(){
        return {
            course: {
                code: '',
                name: '',
                owner: null,
            },
            uploadedFile: null,
            active: false,
            leftButton: null,
            rightButton: null,
            pagination: {
                sortBy: 'name'
            },
            headers: [
                { text: 'Code', value: 'code', align: 'left' },
                { text: 'Name', value: 'name', align: 'center'},
                { text: 'Lecturer', value: 'lecturer', align: 'center'},
                { text: '', value: 'event' },
            ],
            courses: [],
           
        }
    },
    created(){
     
        
    },
    methods:{
        processFile(event){
            var file = event.target.files[0];
            if(file != undefined || file != null){

                this.$store.dispatch('excelToJson', file);
            }
        },
        addToList(){
                     
            if(this.course.code.length > 0 && this.course.name.length > 0 && this.course.owner != null){

                const course = {
                    code: this.course.code,
                    name: this.course.name,
                    owner: {
                        email: this.course.owner.email,
                    }
                };
                this.courses.push(course);
            }
            else{
                this.$notify({type: "error", title: "Course", text: "Fill empty fileds."})
            }
        },
        saveAll(){
        
            if(this.courses.length > 0){
                var courses = [];
                
                this.courses.forEach(item => {
                        const course = {
                            code: item.code,
                            name: item.name,
                            owner: {
                                email: item.owner.email,
                            }
                    }
                    courses.push(course);
                })


                this.$store.dispatch("saveAllCourses", courses)
                .then(response => {
                    if(response.status){
                        this.$notify({type: "success", title: "Course", text: "Course Collection is successfuly saved"})
                        this.cancel();
                    }
                    else{
                        this.$notify({type: "error", title: "Course", text: response.message})
                    }
                })
            }
            else{
                this.$notify({type: "error", title: "Course", text: "Add course collection."})
            }
        

        },
        removeCourse(index){
            this.courses.splice(index, 1);
        },
        cancelForm(){
            
            this.course = {
                code: '',
                name: '',
                lecturer: '',
            };
        },
        cancel(){
            this.$store.commit("clearExcelStore");
            this.cancelForm();
            this.course = [];
            this.$parent.cancelDialog();
        
        },
        getLecturers(){
            this.$store.dispatch("getAllUsersByAuthority", AccessLevel.LECTURER);
        }

    },
    beforeDestroy(){

    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'excelJson', 'users']),
    },
    watch:{
        excelJson(nValue, oValue){
            if(nValue != null){
                nValue.forEach(item => {
                        const course = {
                            code: item.code,
                            name: item.name,
                            owner: {
                                email: item.lecturer,
                            }
                    }
                    this.courses.push(course);
                })
                
            }
        },
        dialog(nVal, oVal){
            if(nVal){
                this.getLecturers();
            }
        },
        users(nVal, oVal){
            if(nVal != null){
                nVal.map(user => {
                    user.text = user.name + " " +user.surname;
                });
            }

            return nVal;
        }
 
    }

}
    
</script>
<style lang="stylus" scoped>
    
    .input-file
        background-color Transparent
        background-repeat no-repeat
        border none
        cursor pointer
        overflow hidden
        outline none

    .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        
    }


    .upload-btn-wrapper input[type=file] 
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
</style>
