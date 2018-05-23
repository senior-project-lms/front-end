<template>
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
                <v-toolbar-title>Assignment View</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <!-- <v-btn v-if="" dark flat @click.native="save">Save</v-btn>
                <v-btn v-else dark flat @click.native="update">Update</v-btn> -->

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
                        <v-flex md9>
                            <v-layout row wrap>
                                <v-flex md12>
                                        <b class="headline">{{ assignment.title }}</b>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row wrap>
                                <v-flex md12>
                                    <p v-html="assignment.content"></p>
                                </v-flex>
                            </v-layout>
                                <!-- <v-layout row wrap >
                                    <v-flex class="uploader" md12 sm12 xs12>
                                        <div class="upload-btn-wrapper">
                                            <v-btn outline v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPLOAD_OWN_COURSE_ASSIGNMENT_FILE)" >Upload File</v-btn>
                                            <input type="file" @change="processFiles($event)" multiple/>
                                        </div>
                                    </v-flex>
                                </v-layout> -->
                                <v-layout row wrap>
                                    <v-flex md12 class="">
                                        <b class="headline">Files</b>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex md12 sm12>
                                        <ul class="file-list">
                                            <li v-for="(resource, i) in assignment.resources" :key="i" >
                                            <v-layout>
                                            <v-flex md10 xs10>
                                                <a  :href="resource.url" download> {{ i + 1}} - {{resource.originalFileName}}</a>
                                                      
                                                </v-flex>
                                                <v-flex md2 xs2 class="text-md-right">
                                                </v-flex>                         
                                            </v-layout>
                                                
                                            </li>
                                        </ul>
                                    </v-flex>                    
                                </v-layout>           
                        </v-flex>   
                        <v-flex md3>
                            <v-layout row wrap>
                                <v-flex md12 class="">
                                    <b class="headline">Details</b>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row wrap>
                                <v-flex md4>
                                    <b class="subheading">Due Date</b>
                                </v-flex>
                                <v-flex md8>
                                    <span v-show="assignment.dueDate == null">
                                        No Due Date
                                    </span>
                                    <span v-show="assignment.dueDate != null">
                                        {{ moment(assignment.dueDate).format('MMMM Do YYYY, HH:mm') }}
                                    </span>
                                </v-flex>
                            </v-layout>
                            
                            <v-layout row wrap>
                                <v-flex md4>
                                    <b class="subheading">Last Date</b>
                                </v-flex>
                                <v-flex md8>
                                    <span v-show="assignment.lastDate == null">
                                        No Last Date
                                    </span>
                                    <span v-show="assignment.lastDate != null">
                                        {{ moment(assignment.lastDate).format('MMMM Do YYYY, HH:mm') }}
                                    </span>
                                    
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout v-if="assignment.gradable && assignment.hasGrade">
                                <v-flex md4>
                                     <b class="subheading" >Grade</b>                   
                                </v-flex>
                                <v-flex md8>
                                     <b class="subheading">{{ assignment.score }}</b>                   
                                </v-flex>
                            </v-layout>                                                                                               
                        </v-flex>     
                  </v-layout>
                  <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex md9>
                            <post-student-assignment :publicKey="publicKey"></post-student-assignment>
                        </v-flex>
                        <v-flex md3>
                          
                        </v-flex>
                    </v-layout>   

            </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>


<script>
import {mapGetters} from 'vuex';
import * as moment from 'moment';
import PostStudentAssignment from './PostStudentAssignment'

export default {
    props: ['dialog', 'publicKey',],
    components: {
        PostStudentAssignment,
    },
    data(){
        return{
            moment: moment,
            resources: [],
            courseResource: {
                resourceKeys: [],
            }            
        }
    },
    created(){
        this.fetchAssignment()
            
        
    },
    methods:{
        fetchAssignment(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.publicKey,
            };            
            this.$store.dispatch("getCourseAssignmentForStudent", data);
            
        },
        save(){
            //this.assignment.resourceKeys = this.courseResource.resourceKeys;
            const data = {
                coursePublicKey: this.$route.params.id,
                params: this.assignment,
            };            
            this.$store.dispatch("saveCourseAssignment", data);
            
            this.cancel(true);
        },
        update(){
            //this.assignment.resourceKeys = this.courseResource.resourceKeys;
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.publicKey,
                params: this.assignment,
            };            
            this.$store.dispatch("updateCourseAssignment", data);
            
            this.cancel(true);
        },    
        cancel(saved){
        this.$parent.cancelDialog();
            
        this.$store.commit("clearAllAssignments");
        },
        processFiles(event) {
            
            const chosenFiles = Array.from(event.target.files);
            chosenFiles.map((file) => {
                this.$store.dispatch("uploadCourseAssignmentFile", {publicKey: this.$route.params.id, file})
                .then((response) => {
                    if(response.status){
                    const data = response.data;
                    this.assignment.resources.push(data);
                    this.assignment.resourceKeys.push(data.publicKey)  
                    }
                    
                });
                
            });
        }, 
        remove(filePublicKey){
            const data = {
                publicKey: filePublicKey,
                coursePublicKey: this.$route.params.id
            };
            return this.$store.dispatch("deleteCourseAssignmentFile", data);
        },
        removeFile(filePublicKey) {
        const data = {
            publicKey: filePublicKey,
            coursePublicKey: this.$route.params.id
        };
        this.remove(filePublicKey).then(response => {
            if (response.status) {
            this.$notify({
                type: "info",
                title: "Resource File",
                text: "Successfuly deleted"
            });
            this.assignment.resources.map((file, index) => {
                if (file.publicKey === filePublicKey) {
                this.assignment.resources.splice(index, 1);
                const index = this.assignment.resourceKeys.indexOf(
                    file.publicKey
                );
                this.assignment.resourceKeys.splice(index, 1);
                }
            });
            } else {
            this.$notify({
                type: "error",
                title: "Resource File",
                text: response.data.message
            });
            }
        });
        
    },
    cancel(saved) {
    //   if (!saved) {
    //     this.assignment.resources.forEach(item => {
    //       this.remove(item.publicKey)
    //     })
    //   }
  
      this.cancelForm();
      this.$parent.cancelDialog();
      this.$store.commit("clearAssignment");
    }, 
    cancelForm() {
      this.resources = [];
      this.courseResource = {
        resources: [],
        resourceKeys: [],
        imagePublicKeys: []
      };
    

    },               

  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'assignment']),


  },
  watch:{  


  },
  beforeDestroy(){
    
  }
}
</script>
<style lang="stylus" scoped>
.uploader 
    margin-top 10px
    margin-left -10px
.file-list 
    margin-top 10px
    list-style-type none
.remove-file 
    margin-right 10px
.input-file
    background-color Transparent
    background-repeat no-repeat
    border none
    cursor pointer
    overflow hidden
    outline none
.upload-btn-wrapper
    position: relative
    overflow: hidden
    
.upload-btn-wrapper input[type=file] 
    font-size 100px
    position absolute
    left 0
    top 0
    opacity 0
.divide-li
  margin 10px 0
</style>
