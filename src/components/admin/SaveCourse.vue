<template>
 <v-dialog v-model="dialog" persistent max-width="1000">
        <v-card>
          <v-card-title class="headline">Course</v-card-title>
            <v-layout row wrap class="tab-btn">
                <v-flex md6>
                    <a color="" block @click="active = false" ><p class="text-md-center text-sm-center text-xs-center">Add Single Course</p></a>
                    <v-divider v-if="!active" class="grey darken-4"></v-divider>
                </v-flex>
                <v-flex md6>
                    <a color="" block @click="active = true"><p class="text-md-center text-sm-center text-xs-center">Add Multiple Course</p></a>
                    <v-divider v-if="active" class="grey darken-4"></v-divider>
                </v-flex>
            </v-layout>
                

            <v-flex xs10 sm10 md10 offset-md1 offset-sm1 offset-xs1 class="post"> 
            <v-divider></v-divider>
                <div v-if="!active">
                    <v-layout row wrap>
                        <v-flex md3 xs4 lg3 xs3 class="course-code">
                            <v-text-field label="Code" v-model="course.code" required/>
                        </v-flex>
                        <v-flex >
                            <v-text-field label="Name"  v-model="course.name" required/>
                        </v-flex>
                    </v-layout>   
                    <v-layout row wrap>
                        <v-flex>
                            <v-text-field label="Lecturer" v-model="course.lecturer"  required/>
                        </v-flex>
                    </v-layout>                                
                </div>
                <div v-if="active" class="post">
                    <v-layout>
                        <v-flex>
                            <div class="upload-btn-wrapper">
                                <v-btn block outline>Upload File</v-btn>
                                <input type="file" @change="processFile($event)"/>
                            </div>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                            <v-flex>
                                <v-data-table
                                :headers="headers"
                                :items="courses">
                                    <template slot="items" slot-scope="props">
                                        <tr>
                                            <td>{{ props.item.code }}</td>
                                            <td class="text-xs-center">{{ props.item.name }}</td>
                                            <td class="text-xs-center">{{ props.item.lecturer }}</td>
                                            <td class="text-xs-right"><a @click="removeCourse(props.index)"><v-icon color="red darken-2">cancel</v-icon></a></td>
                                        </tr>
                                    </template>
                                </v-data-table>

                            </v-flex>
                    </v-layout>
                </div> 
            </v-flex>
          <div class="post">
          </div>

          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" flat @click.native="cancel(false)">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click="save"
            v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE)">
            Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  
</template>
<script>
import { mapGetters } from 'vuex';


export default{
    props: ['dialog'],
    data(){
        return {
            course: {
                code: '',
                name: '',
                lecturer: '',
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
        save(){
            if(!this.active){ // single save
                
                if(this.course.code.length > 0 && this.course.name.length > 0 && this.course.lecturer.length > 0){

                    const course = {
                        code: this.course.code,
                        name: this.course.name,
                        owner: {
                            email: this.course.lecturer,
                        }
                    }
                    this.$store.dispatch('saveCourse', course)
                    .then(response => {
                        if(response.status){
                            this.$notify({type: "success", title: "Course", text: "Successfuly published"})
                            this.cancel();
                        }
                        else{
                            this.$notify({type: "error", title: "Course", text: response.message})
                        }
                    });
                }
                else{
                    this.$notify({type: "error", title: "Course", text: "Fill empty fileds."})
                }
            }
            else{ // multi save
                if(this.courses.length > 0){
                    var courses = [];
                    
                    this.courses.forEach(item => {
                         const course = {
                            code: item.code,
                            name: item.name,
                            owner: {
                                email: item.lecturer,
                            }
                        }
                        courses.push(course);
                    })


                    this.$store.dispatch("saveAllCourses", courses)
                }
                else{
                    this.$notify({type: "error", title: "Course", text: "Add course collection."})
                }
            }

        },
        removeCourse(index){
            this.courses.splice(index, 1);
        },
        cancel(){
            this.$store.dispatch("clearExcelJson");
            this.courses = [];
            this.course = {
                code: '',
                name: '',
                lecturer: '',
            },
            this.$parent.cancelSavingCourse();
        
        }

    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'excelJson']),
    },
    watch:{
        excelJson(nValue, oValue){
            this.courses = nValue;
        }
    }

}
    
</script>
<style lang="stylus" scoped>
    .post
        margin-top 30px

    .course-code
        margin-right 20px
    
    .tab-btn
        margin-left 5px
        margin-right 5px
    
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
