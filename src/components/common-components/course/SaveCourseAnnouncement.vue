<template>
    <v-dialog 
    v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
      >
      <v-card tile>
        <v-toolbar card dark color="primary">
                <v-btn icon @click="cancel" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Course Announcement</v-toolbar-title>
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
                        <v-flex md12 sm12 xs12>
                            <v-text-field label="Title" v-model="courseAnnouncement.title" required=""/>
                        </v-flex>   
                </v-layout>
                <v-layout row wrap>
                        <v-flex md12 sm12 xs12>
                                <div id="editorContainer"></div>
                     <quill-editor class="editor" v-model="courseAnnouncement.content"></quill-editor>

                          <!-- <vue-editor class="editor" :editorToolbar="customToolbar" 
                          v-model="courseAnnouncement.content" required/> -->
                        </v-flex>
                </v-layout>
                
                
            </v-container>
        </v-card-text>

      </v-card>
    </v-dialog>
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
  props: ['dialog'],
  components: {
      //VueEditor,
      quillEditor
},
  data(){
      return{
          customToolbar: customToolbar, 
          
          
          courseAnnouncement: {
              title: '',
              content: '',
          }
      }
  },
  created(){

  },
  methods:{
    save(){
        if(this.courseAnnouncement.title.length > 0 && this.courseAnnouncement.content.length > 0){
            const data={
                publicKey: this.$route.params.id,
                params:{
                    title:this.courseAnnouncement.title,
                    content:this.courseAnnouncement.content
                }
            }
            console.log(data)
            this.$store.dispatch("saveCourseAnnouncement",data)
            .then(response => {
              if(response.status){
                this.$notify({type: "success", title: "Course Announcement", text: "Successfuly published"})
                this.cancel(true);
              }
              else{
                  this.$notify({type: "error", title: "Course Announcement", text: response.data.message})
              }
            });
        }
    },
    clearForm(){
        this.courseAnnouncement = {
            title: '',
            content: '',
           
          }
    },
    cancel(saved){
      
      this.clearForm();
      this.$parent.cancelDialog();
      this.$store.commit("clearExcelStore");

    },
 
  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges']),
  },
  watch:{
  
  },
  beforeDestroy(){
    
  }
}
</script>
<style lang="stylus" scoped>

    
    .file-list
      margin-top 10px
      list-style-type none

    .editor
      height 350px

</style>
