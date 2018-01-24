<template>
      <v-dialog v-model="dialog" persistent max-width="1000">
        <v-card>
          <v-card-title class="headline">System Announcement</v-card-title>
          <v-flex class="post">      
              <v-flex>
                  <v-text-field label="Title" v-model="systemAnnouncement.title" required=""/>
              </v-flex>
              <v-flex>
                <vue-editor :editorToolbar="customToolbar" 
                v-model="systemAnnouncement.content" required />
              </v-flex>
              <v-flex class="uploader">
                <v-flex>
                  <input type="file" @change="processFiles($event)" multiple
                  v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.UPLOAD_SYSTEM_ANNOUNCEMENT_FILE)">
                </v-flex>
                <v-flex>
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
              </v-flex>                  
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" flat @click.native="cancel(false)">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click="save"
            v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_SYSTEM_ANNOUNCEMENT)">
            Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  
</template>


<script>
import {mapGetters} from 'vuex';
import { VueEditor } from 'vue2-editor';


const uuidv1 = require('uuid/v1');

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
      VueEditor,
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
            .then((data) => {
                //this.systemAnnouncement.resourceKeys.push(data.publicKey)
                this.resources.push(data);
                this.systemAnnouncement.resourceKeys.push(data.publicKey)
           });
            
        });
    },
    removeFile(publicKey){
        this.$store.dispatch("deleteSystemAnnouncementFile", publicKey)
        .then(result => {
            this.resources.map((file, index) => {
                if(file.publicKey === publicKey){
                    this.resources.splice(index, 1);
                    const index = this.systemAnnouncement.resourceKeys.includes(file.publicKey);
                    this.systemAnnouncement.resourceKeys.splice(index, 1);
                }
            });
        });
    },
    save(){
        if(this.systemAnnouncement.title.length > 0 && this.systemAnnouncement.content.length > 0){
            this.$store.dispatch("saveSystemAnnouncement", this.systemAnnouncement)
            .then(response => {
              if(response){
                this.cancel(true);
              }
            });
        }
    },
    cancel(saved){
      this.systemAnnouncement.resourceKeys.map(publicKey => {
        this.$store.dispatch("deleteSystemAnnouncementFile", publicKey)
      });
      this.$parent.cancelSystemAnnouncementPosting();
      

    },
    // not used because of responsive image problam.
    // handleImageAdded(file, Editor, cursorLocation){

    //     this.$store.dispatch("uploadSystemAnnouncementImage", file)
    //     .then(data => {
    //         if(data != null && data != undefined){
    //           this.systemAnnouncement.imagePublicKeys.push(data.publicKey);
    //           Editor.insertEmbed(cursorLocation, 'image', data.url)
    //         }
    //     });
    // }
  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges']),
  },
  watch:{
      dialog(){
        this.resources = [];
        this.systemAnnouncement = {
            title: '',
            content: '',
            resources: [],
            resourceKeys: [],            
            imagePublicKeys: [],
          }
      }
  },
  beforeDestroy(){
    if(this.systemAnnouncement.imagePublicKeys.length > 0){
      // remove the files
    }
  }
}
</script>
<style lang="stylus" scoped>
    .post
      margin-right 20px
      margin-left  20px

    .uploader
      margin-top 10px
    
    .file-list
      margin-top 10px
      list-style-type none
    
    .remove-file
      margin-right 10px
</style>
