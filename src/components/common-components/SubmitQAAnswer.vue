<template>    
  <div 
  v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_GLOBAL_QA)">
      <v-layout row wrap>
          <h2 class="headline"> Your answer</h2>
          <v-flex>
            <vue-editor :editorToolbar="customToolbar" 
            v-model="answer.content" required />
          </v-flex>                 
      </v-layout>
      <v-layout row wrap>
            <v-btn color="info" @click="save"
              v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_GLOBAL_QA)">
              Post Your Answer
            </v-btn>    
      </v-layout>
      
    </div>
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
</style>
