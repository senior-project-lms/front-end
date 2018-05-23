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
                <v-toolbar-title>Global QA</v-toolbar-title>
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
                          <!-- <vue-editor :editorToolbar="customToolbar" 
                          v-model="qa.content" required/> -->
                            <quill-editor class="editor" v-model="qa.content"></quill-editor>

                        </v-flex>
                </v-layout>

                <v-layout row layout >
                    <v-flex md3 sm3 xs12 class="tags">
                        <el-autocomplete
                        v-model="tagSearch"
                        :fetch-suggestions="querySearchAsync"
                        @select="handleSelectedTag"
                        placeholder="Search Tag"
                        ></el-autocomplete>    
                        <el-button v-if="addBtn" @click="newTag" type="info" size="mini" plain>add</el-button>
                                          
                    </v-flex>
                    <v-flex md9 sm9 xs12 class="tags">
                            <v-chip v-for="(tag, i) in qa.tags" :key="`tag-${i}`" @input="deleteTag(i)" close >{{tag.name}}</v-chip>
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
        addBtn: false,
        tagSearch: '',   
        customToolbar: customToolbar, 
        uploader: false,
        resources: [],
        qa: {
            title: '',
            content: '',
            tags: [],
        }
      }
  },
  created(){
      this.tagSearch = '';
  },
  methods:{

    save(){
        if(this.qa.title.length > 0 && this.qa.content.length > 0){
            const data = {
                coursePublicKey: this.$route.params.id,
                params: this.qa
            }
            this.$store.dispatch("saveCourseQA", data)
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
            tags: [],
          }
    },
    cancel(){
      this.clearForm();
      this.$parent.cancelDialog();
    },
     querySearchAsync(queryString, cb) {
        this.addBtn = false;
        
        if(queryString.length == 0){
            return
        }

        const data = {
            name: queryString,
            coursePublicKey: this.$route.params.id,
        }
        this.$store.dispatch("searchCourseQATag", data)
        .then(response =>{
            if(response.status){
                var data = response.data;
                data = response.data.map(item => {
                    item.value = item.name
                    return item;
                })
                if(data.length == 0){
                    this.addBtn = true;
                    cb([])
                    return;
                }
                console.log(data)
                //console.log(data)
                cb(data);
            }
            else{
                this.addBtn;
                cb([])
            }
        });
    },
    handleSelectedTag(item) {
        this.addTag(item);
    }, 
    deleteTag(index){
        this.qa.tags.splice(index,1)
    },
    newTag(){
        this.addTag({name: this.tagSearch});
        this.tagSearch = "";
    },
    addTag(item){
        
        if(!this.qa.tags.some(e => e.name == item.name)){
            this.qa.tags.push(item);
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


    .file-list
      margin-top 10px
      list-style-type none
    
    .remove-file
      margin-right 10px
    
    .editor
      height 350px
    .tags
     margin-top 40px
</style>
