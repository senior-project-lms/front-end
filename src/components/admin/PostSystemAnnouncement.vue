<template>
      <v-dialog v-model="dialog" persistent max-width="900">
        <v-card>
          <v-card-title class="headline">System Announcement</v-card-title>
          <v-flex class="post">
              <v-text-field label="Title" v-model="systemAnnouncement.title" required=""/>
          </v-flex>
          <v-flex class="post">
            <vue-editor :editorToolbar="customToolbar" 
            v-model="systemAnnouncement.content" required />
          </v-flex>
          <v-flex>
                 <!-- <a @click="uploaderVisible = !uploaderVisible" class="right">Upload File</a>             -->
          </v-flex>          
        
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" flat @click.native="cancel(false)">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click="save">Save</v-btn>
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
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
]

export default {
  props: ['dialog'],
  components: {
      VueEditor,
  },
  data(){
      return{
          customToolbar: customToolbar, 
          systemAnnouncement: {
            
            uploaderVisible: false,
            title: '',
            content: '',
            resources: [],
            imagePublicKeys: [],
          }
      }
  },
  created(){

  },
  methods:{

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
      // if(!saved){
      //   this.systemAnnouncement.imagePublicKeys.map(publicKey =>{
      //       this.$store.dispatch("deleteSystemAnnouncementImage", publicKey);
      //   })
      // }
      
      this.$parent.cancelSystemAnnouncementPosting();
      

    },
    // not used because of responsive image problam.
    handleImageAdded(file, Editor, cursorLocation){

        this.$store.dispatch("uploadSystemAnnouncementImage", file)
        .then(data => {
            if(data != null && data != undefined){
              this.systemAnnouncement.imagePublicKeys.push(data.publicKey);
              Editor.insertEmbed(cursorLocation, 'image', data.url)
            }
        });
    }
  },


  computed: {
    ...mapGetters(['accessToken']),
  },
  watch:{
      dialog(){
        this.systemAnnouncement = {
            path: uuidv1(),
            title: '',
            content: '',
            resources: [],
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
      margin-right 20px;
      margin-left  20px;

    .uploader
      margin-top 15px
      margin-bottom 20px
      margin-right 20px
</style>
