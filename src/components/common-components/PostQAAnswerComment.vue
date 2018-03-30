<template>
      <v-dialog v-model="answerDialog" persistent max-width="1000">
        <v-card>
          <v-card-title class="headline">Give your feedback to the answer</v-card-title>
          <v-flex class="post">      
              <v-flex>
                  <v-text-field label="Title" v-model="courseQuestion.title" required=""/>
              </v-flex>
              <v-flex>
                <vue-editor :editorToolbar="customToolbar" 
                v-model="answer.content" required />
              </v-flex>
                 
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" flat @click.native="cancel(false)">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click="save"
            v-if=true>
            Submit</v-btn>
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
  props: ['answerDialog'],
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
            this.$store.dispatch("saveQAAnswer", this.answer)
            .then(response => {
              if(response){
                this.cancel(true);
              }
            });
        }
    },

    cancel(saved){
      this.$parent.cancelAnswerPost();
    },

    // not used because of responsive image problam.
    // handleImageAdded(file, Editor, cursorLocation){

    //     this.$store.dispatch("uploadcourseQuestionImage", file)
    //     .then(data => {
    //         if(data != null && data != undefined){
    //           this.courseQuestion.imagePublicKeys.push(data.publicKey);
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
            
            content: '',
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