<template>
      
        <v-card>
          <v-card-title class="headline">Submit your answer:</v-card-title>
          <v-flex class="post">      
              <v-flex>
                <vue-editor :editorToolbar="customToolbar" 
                v-model="answer.content" required />
              </v-flex>
              <v-flex class="uploader">
                <v-flex>
                    <v-divider></v-divider>                  
                </v-flex>                  
              </v-flex>                  
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn color="green darken-1" flat @click="save"
            v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_SYSTEM_ANNOUNCEMENT)">
            Submit</v-btn>
          </v-card-actions>
        </v-card>
        
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
  
  components: {
      VueEditor,
},
  data(){
      return{
          customToolbar: customToolbar, 
          uploader: false,
          answer: {
              content: '',
          }
      }
  },
  created(){

  },
  methods:{

    save(){
        if(this.answer.content.length > 0){
            this.$store.dispatch("saveGlobalQuestionAnswer", this.answer)
            .then(response => {
              if(response){
                this.cancel(true);
              }
            });
        }
    },
    
    // not used because of responsive image problam.
    // handleImageAdded(file, Editor, cursorLocation){

    //     this.$store.dispatch("uploadanswerImage", file)
    //     .then(data => {
    //         if(data != null && data != undefined){
    //           this.answer.imagePublicKeys.push(data.publicKey);
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

        this.answer = {
            content: ''            
          }
      }
  },
  
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
