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
                <v-toolbar-title>System Announcement</v-toolbar-title>
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
                            <v-text-field label="Title" v-model="systemAnnouncement.title" required=""/>
                        </v-flex>   
                </v-layout>
                <v-layout row wrap>
                        <v-flex md12 sm12 xs12>
                          <!-- <vue-editor class="editor" :editorToolbar="customToolbar" 
                          v-model="systemAnnouncement.content" required/> -->
                     <quill-editor class="editor" v-model="systemAnnouncement.content"></quill-editor>
                        </v-flex>
                </v-layout>
                <v-layout row wrap >
                    <v-flex class="uploader" md12 sm12 xs12>
                      <input type="file" @change="processFiles($event)" multiple
                      v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPLOAD_SYSTEM_ANNOUNCEMENT_FILE)">
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex md12 sm12>
                        <ul class="file-list">
                          <li v-for="(resource, i) in resources" :key="i">
                              <a class="red--text lighten-1" @click="removeFile(resource.publicKey)">
                                  <i class="fa fa-times" aria-hidden="true"></i>
                              </a>
                              {{ i + 1}} - {{ resource.originalFileName }} 
                          </li>
                        </ul>
                        <v-divider></v-divider>  
                        {{ resources.length }} file is uploaded                  
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
  //    VueEditor,
    quillEditor

},
  data(){
      return{
          customToolbar: customToolbar, 
          uploader: false,
          resources: [],
          systemAnnouncement: {
              title: '',
              content: '',
              resourceKeys: [],
              imagePublicKeys: [],
          }
      }
  },
  created(){

  },
  methods:{
    processFiles(event){
        var _this = this;
        
        const chosenFiles = Array.from(event.target.files);
        chosenFiles.map((file) => {
            this.$store.dispatch("uploadSystemAnnouncementFile", file)
            .then((response) => {
                if(response.status){
                  const data = response.data;
                  this.resources.push(data);
                  this.systemAnnouncement.resourceKeys.push(data.publicKey)  
                }
                
           });
            
        });
    },
    removeFile(publicKey){
        this.$store.dispatch("deleteSystemAnnouncementFile", publicKey)
        .then(response => {
            if(response.status){
              this.resources.map((file, index) => {
                  if(file.publicKey === publicKey){
                      this.resources.splice(index, 1);
                      const index = this.systemAnnouncement.resourceKeys.indexOf(file.publicKey);
                      this.systemAnnouncement.resourceKeys.splice(index, 1);
                  }
              });
            }
        
        });
    },
    save(){
        if(this.systemAnnouncement.title.length > 0 && this.systemAnnouncement.content.length > 0){
            this.$store.dispatch("saveSystemAnnouncement", this.systemAnnouncement)
            .then(response => {
              if(response.status){
                this.$notify({type: "success", title: "System Announcement", text: "Successfuly published"})
                this.cancel(true);
              }
              else{
                  this.$notify({type: "error", title: "System Announcement", text: response.data.message})
              }
            });
        }
    },
    clearForm(){
        this.resources = [];
        this.systemAnnouncement = {
            title: '',
            content: '',
            resources: [],
            resourceKeys: [],            
            imagePublicKeys: [],
          }
    },
    cancel(saved){
      if(!saved){
        this.systemAnnouncement.resourceKeys.map(publicKey => {
          this.$store.dispatch("deleteSystemAnnouncementFile", publicKey)
        });
      }
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
    if(this.systemAnnouncement.imagePublicKeys.length > 0){
      // remove the files
    }
  }
}
</script>
<style lang="stylus" scoped>

    .uploader
      margin-top 50px
    
    .file-list
      margin-top 10px
      list-style-type none
    
    .remove-file
      margin-right 10px
    
    .editor
      height 350px
</style>
