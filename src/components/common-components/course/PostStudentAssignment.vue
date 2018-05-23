<template>
     <div class="your-answer">
         <v-layout row wrap>
           <v-flex md3>
             <b class="subheading">Post Answer</b>
           </v-flex>
           <v-flex md9 class="text-md-right">
                       <v-btn small color="primary" v-if="!isSaved" v-show="!assignment.dueUp" @click="save">Save</v-btn>
                       <v-btn small color="primary" v-else @click="update" v-show="!assignment.dueUp">Update</v-btn>
           </v-flex>
         </v-layout>
        <v-layout row wrap>
                <v-flex md12 sm12 xs12>
                    <!-- <vue-editor 
                    v-show="!assignment.dueUp"
                    :editorToolbar="customToolbar" 
                    v-model="studentAssignment.content" required/> -->
                     <quill-editor class="editor" v-model="studentAssignment.content"></quill-editor>
                    
                </v-flex>
                <p 
                v-show="assignment.dueUp">
                    {{ studentAssignment.content }}
                </p>
        </v-layout>
        <v-layout row wrap >
            <v-flex class="uploader" md12 sm12 xs12>
                <input 
                v-show="!assignment.dueUp"
                type="file" @change="processFiles($event)" multiple
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPLOAD_OWN_COURSE_ASSIGNMENT_FILE)">
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex md12 sm12>
                <ul class="file-list">
                    <li v-for="(resource, i) in studentAssignment.resources" :key="i">
                        <a 
                        v-show="!assignment.dueUp"
                        class="red--text lighten-1 remove-file" @click="removeFile(resource.publicKey)">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <a  :href="resource.url" download>{{resource.originalFileName}}</a>                                 

                    </li>
                </ul>
                <v-divider></v-divider>  
                {{ studentAssignment.resources.length }} file is uploaded                  
            </v-flex>                    
        </v-layout>
     </div>


 
</template>


<script>
import {mapGetters} from 'vuex';
//import { VueEditor } from 'vue2-editor';

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

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
  props: ['publicKey'],
  components: {
      //VueEditor,
      quillEditor
},
  data(){
      return{
          customToolbar: customToolbar, 
          uploader: false,
      }
  },
  created(){
      this.fetchStudentAssignment();
  },
  methods:{
    fetchStudentAssignment(){
        const data = {
            coursePublicKey: this.$route.params.id,
            publicKey: this.publicKey,
        };            
        this.$store.dispatch("getCourseAuthStudentAssignment", data);
        

    },
    processFiles(event) {
            
            const chosenFiles = Array.from(event.target.files);
            chosenFiles.map((file) => {
                this.$store.dispatch("uploadCourseAssignmentFile", {publicKey: this.$route.params.id, file})
                .then((response) => {
                    if(response.status){
                    const data = response.data;
                    this.studentAssignment.resources.push(data);
                    this.studentAssignment.resourceKeys.push(data.publicKey)  
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
            this.studentAssignment.resources.map((file, index) => {
                if (file.publicKey === filePublicKey) {
                this.studentAssignment.resources.splice(index, 1);
                const index = this.studentAssignment.resourceKeys.indexOf(
                    file.publicKey
                );
                this.studentAssignment.resourceKeys.splice(index, 1);
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
    save(){
        const data = {
            params: this.studentAssignment,
            coursePublicKey: this.$route.params.id,
            publicKey: this.publicKey,
        }
        this.$store.dispatch("saveCourseStudentAssignment", data);
        this.$store.dispatch('getEnrollmentRequestCounts', this.$route.params.id);
    },
    update(){
        const data = {
            params: this.studentAssignment,
            coursePublicKey: this.$route.params.id,
            publicKey: this.publicKey,
            stdPublicKey: this.studentAssignment.publicKey,
        }
        this.$store.dispatch("updateCourseStudentAssignment", data);
        this.$store.dispatch('getEnrollmentRequestCounts', this.$route.params.id);
        
    },
   cancel(saved){

      this.clearForm();
      this.$parent.cancelDialog();
      this.$store.commit("clearStudentAssignment");

    },
 
  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'studentAssignment', 'assignment']),
    
    isSaved(){
        return this.studentAssignment.publicKey.length != 0;
    },

  },
  watch:{
  
  },

}
</script>
<style lang="stylus" scoped>
    .your-answer
        margin-top 30px
    .uploader   
      margin-top 50px
    
    .file-list
      margin-top 10px
      list-style-type none
    
    .remove-file
      margin-right 10px
    
    .editor
      height 450px
</style>
