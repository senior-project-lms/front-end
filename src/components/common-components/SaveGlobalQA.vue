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
                <v-btn icon @click="cancel" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>System Global QA</v-toolbar-title>
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
                            <v-text-field label="Title" v-model="qa.title" required=""/>
                        </v-flex>   
                </v-layout>
                <v-layout row wrap>
                        <v-flex md12 sm12 xs12>
                          <vue-editor class="editor" :editorToolbar="customToolbar" 
                          v-model="qa.content" required/>
                        </v-flex>
                </v-layout>
                <v-layout row wrap >
                    <v-flex class="uploader" md12 sm12 xs12>
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
  props: ['dialog'],
  components: {
      VueEditor,
},
  data(){
      return{
          customToolbar: customToolbar, 
          uploader: false,
          resources: [],
          qa: {
              title: '',
              content: '',
          }
      }
  },
  created(){

  },
  methods:{

    save(){
        if(this.qa.title.length > 0 && this.qa.content.length > 0){
            this.$store.dispatch("saveGlobalQA", this.qa)
            .then(response => {
              if(response.status){
                this.$notify({type: "success", title: "Global QA", text: "Successfuly published"})
                this.cancel(true);
              }
              else{
                  this.$notify({type: "error", title: "Global QA", text: response.message})
              }
            });
        }
    },
    clearForm(){
        this.resources = [];
        this.qa = {
            title: '',
            content: '',
          }
    },
    cancel(){
      this.clearForm();
      this.$parent.cancelDialog();
    },
 
  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges']),
  },
  watch:{
  
  },
  beforeDestroy(){
    if(this.qa.imagePublicKeys.length > 0){
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
      height 450px
</style>
