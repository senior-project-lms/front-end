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
                <v-btn icon @click="cancel(false)" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>New Assigment</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn dark flat @click.native="save">Save</v-btn>
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
                                        <el-input placeholder="Assignment name" v-model="assignment.title"></el-input>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex md12>
                                    <vue-editor class="editor" :editorToolbar="customToolbar" v-model="assignment.content"/>

                                </v-flex>
                            </v-layout>
                                <v-layout row wrap >
                                    <v-flex class="uploader" md12 sm12 xs12>
                                        <div class="upload-btn-wrapper">
                                            <v-btn outline v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPLOAD_COURSE_RESOURCE_FILE)" >Upload File</v-btn>
                                            <input type="file" @change="processFiles($event)" multiple/>
                                        </div>
                                        <!-- <input class="input-file" type="file" @change="processFiles($event)" 
                                        > -->
                                    </v-flex>
                                </v-layout>
                                
                                <v-layout row wrap>
                                    <v-flex md12 sm12>
                                        <ul class="file-list">
                                            <li v-for="(resource, i) in resources" :key="i" >
                                            <v-layout>
                                            <v-flex md10 xs10>
                                                <a class="red--text lighten-1 remove-file" @click="removeFile(resource.publicKey)">
                                                    <i class="fa fa-times" aria-hidden="true"></i>
                                                </a>{{ i + 1}} - {{ resource.originalFileName }}                                   
                                                </v-flex>
                                                <v-flex md2 xs2 class="text-md-right">
                                                    <el-switch 
                                                    :key="resource.publicKey"
                                                    v-model="resource.publicShared" 
                                                    :change="sharePublicly(resource.publicShared, resource.publicKey)"></el-switch>                                  
                                                </v-flex>                         
                                            </v-layout>
                                                
                                                <v-divider class="divide-li"/>

                                            </li>
                                        </ul>
                                        {{ resources.length }} file is uploaded.                  
                                    </v-flex>                    
                                </v-layout>                                                             
                        </v-flex>   
                        <v-flex md3>
                            <v-layout row wrap>
                                <v-flex md12 class="tex">
                                    <b class="headline">Settings</b>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout row wrap>
                                <v-flex md4>
                                    <b class="subheading">Due Date</b>
                                </v-flex>
                                <v-flex md8>
                                    <el-date-picker
                                    type="datetime" 
                                    v-model="assignment.dueDate"
                                    placeholder="Select a date and time"
                                    size="small">
                                    </el-date-picker>                                     
                                </v-flex>
                            </v-layout>
                            
                            <v-layout row wrap>
                                <v-flex md4>
                                    <b class="subheading">Last Date</b>
                                </v-flex>
                                <v-flex md8>
                                    <el-date-picker
                                    type="datetime" 
                                    v-model="assignment.lastDate"
                                    placeholder="Select a date and time"
                                    size="small">
                                    </el-date-picker>                                     
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout>
                                <v-flex md4>
                                     <b class="subheading">Gradable</b>                   
                                </v-flex>
                                <v-flex md8>
                                    <el-switch
                                    v-model="assignment.gradable"
                                    active-color="#13ce66"
                                    inactive-color="#E0E0E0">
                                    </el-switch>                                
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap v-if="assignment.gradable">
                                <v-flex md4>
                                    <b class="subheading">Grade Name</b>
                                </v-flex>
                                <v-flex md8 cla>
                                    <el-input
                                    size="small" 
                                    placeholder="Enter a grade name"
                                    v-model="assignment.grade.name"
                                    ></el-input>
                                </v-flex>
                            </v-layout>                            
                            <v-layout v-if="assignment.gradable">
                                <v-flex md4>
                                    <b class="subheading">Max Score</b>
                                </v-flex>
                                <v-flex md4>
                                    <el-input placeholder="0"  size="small" min="0"
                                    v-model="assignment.grade.maxScore"
                                    ></el-input> 
                                </v-flex>                                
                            </v-layout>                                  
                            <v-layout v-if="assignment.gradable">
                                <v-flex md4>
                                    <b class="subheading">Weight</b>
                                </v-flex>
                                <v-flex md4>
                                    <el-input
                                    placeholder="0" size="small" min="0"
                                    v-model="assignment.grade.weight">
                                    </el-input>
                                </v-flex>                                
                                           
                            </v-layout>                                                                                                     
                        </v-flex>     
                  </v-layout>
            </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>


<script>
import {mapGetters} from 'vuex';
import { VueEditor } from 'vue2-editor';

var customToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'link', ],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean',]
]

export default {
    props: ['dialog', 'edit', 'item', 'view'],
    components: {
        VueEditor
    },
    data(){
        return{
            customToolbar: customToolbar, 
            resources: [],
            courseResource: {
                resourceKeys: [],
            }            
        }
    },
    created(){
    },
    methods:{
        save(){
            const data = {
                coursePublicKey: this.$route.params.id,
                params: this.assignment,
            };            
            this.$store.dispatch("saveCourseAssignment", data);
            
            this.cancel(true);
        },
        update(){

        },    
        cancel(saved){
        this.$parent.cancelDialog();
            
        this.$store.commit("clearAllAssignments");
        },
        processFiles(event) {
            
            const chosenFiles = Array.from(event.target.files);
            chosenFiles.map((file) => {
                // this.$store.dispatch("uploadCourseResourceFile", {publicKey: this.$route.params.id, file})
                // .then((response) => {
                //     if(response.status){
                //     const data = response.data;
                //     this.resources.push(data);
                //     this.courseResource.resourceKeys.push(data.publicKey)  
                //     }
                    
                // });
                
            });
        }, 
        remove(filePublicKey){
            const data = {
                publicKey: filePublicKey,
                coursePublicKey: this.$route.params.id
            };
            return this.$store.dispatch("deleteCourseResourceFile", data);
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
            this.resources.map((file, index) => {
                if (file.publicKey === filePublicKey) {
                this.resources.splice(index, 1);
                const index = this.courseResource.resourceKeys.indexOf(
                    file.publicKey
                );
                this.courseResource.resourceKeys.splice(index, 1);
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
      if (!saved) {
        this.resources.forEach(item => {
          this.remove(item.publicKey)
        })
      }
  
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
