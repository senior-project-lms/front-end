<template>
<v-dialog v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable>
  <v-card tile>
    <v-toolbar card dark color="primary">
      
      <v-btn icon @click="cancel" dark>
        <v-icon>close</v-icon>
      </v-btn>
      
      <v-toolbar-title>Course Assignment</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items><v-btn dark flat @click.native="save">Save</v-btn></v-toolbar-items>
                
      <v-menu bottom right offset-y>
        <v-btn slot="activator" dark icon><v-icon>more_vert</v-icon></v-btn>
      </v-menu>
    </v-toolbar>
            
    <v-card-text>
      <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
        <v-layout row wrap>
          <v-flex md12 sm12 xs12>
            <v-text-field label="Title" v-model="courseAssignment.title" required=""/>
          </v-flex>   
        </v-layout>
                
        <v-layout row wrap>
          <v-flex md12 sm12 xs12>
            <vue-editor class="editor" :editorToolbar="customToolbar" v-model="courseAssignment.content" required/>
          </v-flex>
        </v-layout>
        <v-layout row wrap >
                    <v-flex class="uploader" md12 sm12 xs12>
                      <input type="file" @change="processFiles($event)" multiple
                      v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPLOAD_COURSE_ASSIGNMENT_FILE)">
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
                        {{ resources.length }} File is uploaded.                  
                    </v-flex>                    
                </v-layout>
      </v-container>
    </v-card-text>

  </v-card>
</v-dialog>
</template>


<script>
import { mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";

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
  data() {
    return {
      customToolbar: customToolbar,
      uploader: false,
      resources: [],

      courseAssignment: {
        title: '',
        content: '',
        resourceKeys: [],
      }
    }
  },
  created() {},
  methods: {
     processFiles(event){
        const chosenFiles = Array.from(event.target.files);
        chosenFiles.map((file) => {
            this.$store.dispatch("uploadCourseAssignmentFile", {publicKey: this.$route.params.id, file})
            .then((response) => {
                if(response.status){
                  const data = response.data;
                  this.resources.push(data);
                  this.courseAssignment.resourceKeys.push(data.publicKey)  
                }
                
           });
            
        });
    },
    removeFile(publicKey){
        const data = {coursePublicKey: this.$route.params.id, filePublicKey: publicKey};

        this.$store.dispatch("deleteCourseAssignmentFile", data)
        .then(response => {
            if(response.status){
              this.resources.map((file, index) => {
                  if(file.publicKey === publicKey){
                      this.resources.splice(index, 1);
                      const index = this.courseAssignment.resourceKeys.indexOf(file.publicKey);
                      this.courseAssignment.resourceKeys.splice(index, 1);
                  }
              });
            }
        
        });
    },


    save() {
      if (
        this.courseAssignment.title.length > 0 &&
        this.courseAssignment.content.length > 0
      ) {
        const data = {
          publicKey: this.$route.params.id,
          params: {
            title: this.courseAssignment.title,
            content: this.courseAssignment.content
          }
        };
        this.$store.dispatch("saveCourseAssignment", data).then(response => {
          if (response.status) {
            this.$notify({
              type: "success",
              title: "Course Assignment",
              text: "Successfuly published"
            });
            this.cancel(true);
          } else {
            this.$notify({
              type: "error",
              title: "Course Assignment",
              text: response.data.message
            })
          };
        });
      }
    },
    clearForm() {
      this.resources = [];
      this.courseAssignment = {
        title: "",
        content: "",
        resourceKeys: [],
        resources: [],
      }
    },
    cancel(saved) {
      if(!saved){
        const data = {coursePublicKey: this.$route.params.id, filePublicKey: publicKey};
        
        this.courseAssignment.resourceKeys.map(publicKey => {
          this.$store.dispatch("deleteCourseAssignmentFile", data)
        });
      }
      this.clearForm();
      this.$parent.cancelDialog();
      this.$store.commit("clearExcelStore");
    },
  },

  computed: {
    ...mapGetters(["authenticatedUser", "accessPrivileges"]),
  },
  watch: {},
  beforeDestroy() {}
};
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
