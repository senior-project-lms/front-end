<template>    
  <div 
      v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_QA)">
      <v-layout row wrap>
        <h2 class="headline"> Your answer</h2><br>
          <v-flex md12>
            <vue-editor :editorToolbar="customToolbar" 
            v-model="content" required />
          </v-flex>                 
      </v-layout>
      <v-layout row wrap>
            <v-btn color="info" @click="save"
              v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_QA)">
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
          content: '',
          
      }
  },
  created(){

  },
  methods:{

    save(){
        if(this.content.length > 0){
          const data = {
            coursePublicKey: this.$route.params.id,
            params: {
              publicKey: this.$route.params.qaId,
              content: this.content,
              answer: true,
              anonymous: false,
            }
          }
            this.$store.dispatch("saveCourseQA", data);
        }
    },
    

  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges']),
  },
  watch:{
  },
  
}
</script>
<style lang="stylus" scoped>
</style>
