<template>
<v-dialog v-model="dialog"
        :width="width"
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable>
    <v-card tile>
        <v-toolbar card dark color="primary">
            <v-btn icon @click="cancel(false)" dark><v-icon>close</v-icon></v-btn>
            <v-toolbar-title>Add Course Resource</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click.native="save">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
                <v-btn slot="activator" dark icon><v-icon>more_vert</v-icon></v-btn>
            </v-menu>
        </v-toolbar>
        
        <v-card-text>
            <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
                <v-layout row wrap >
                    <v-flex class="uploader" md12 sm12 xs12>
                        <div class="upload-btn-wrapper">
                            <v-btn outline v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPLOAD_COURSE_RESOURCE_FILE)" >Upload File</v-btn>
                            <input type="file" @change="processFiles($event)" multiple/>
                        </div>
                        <!-- <input class="input-file" type="file" @change="processFiles($event)" 
                          > -->
                    </v-flex>
                </v-layout>
                
                <v-layout row wrap>
                    <v-flex md12 sm12>
                        <ul class="file-list">
                            <li v-for="(resource, i) in resources" :key="i" >
                              <v-layout>
                              <v-flex md10 xs10>
                                  <a class="red--text lighten-1 remove-file" @click="removeFile(resource.publicKey)">
                                      <i class="fa fa-times" aria-hidden="true"></i>
                                  </a>{{ i + 1}} - {{ resource.originalFileName }}                                   
                                </v-flex>
                                <v-flex md2 xs2 class="text-md-right">
                                    <el-switch 
                                    :key="resource.publicKey"
                                    v-model="resource.publicShared" 
                                    :change="sharePublicly(resource.publicShared, resource.publicKey)"></el-switch>                                  
                                </v-flex>                         
                              </v-layout>
                                
                                <v-divider class="divide-li"/>

                            </li>
                        </ul>
                        {{ resources.length }} file is uploaded.                  
                    </v-flex>                    
                </v-layout>   
            </v-container>                           
        </v-card-text>     
    </v-card>
</v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["dialog"],
  data() {
    return {
      saved: false,
      uploader: false,
      resources: [],

      courseResource: {
        resourceKeys: [],
      }
    };
  },
  
  created() {},
  methods: {
    processFiles(event) {
        
        const chosenFiles = Array.from(event.target.files);
        chosenFiles.map((file) => {
            this.$store.dispatch("uploadCourseResourceFile", {publicKey: this.$route.params.id, file})
            .then((response) => {
                if(response.status){
                  const data = response.data;
                  this.resources.push(data);
                  this.courseResource.resourceKeys.push(data.publicKey)  
                }
                  
            });
              
        });
    },      
        
    save() {
      const data = {
        publicKey: this.$route.params.id,
        params: {
          resources: this.resources
        }
      };
      this.cancel(true);
      this.$store.dispatch("getAllResources", this.$route.params.id);

    },

    removeFile(filePublicKey) {
      const data = {
        publicKey: filePublicKey,
        coursePublicKey: this.$route.params.id
      };
      this.$store.dispatch("deleteCourseResourceFile", data).then(response => {
        if (response.status) {
          this.$notify({
            type: "info",
            title: "Resource File",
            text: "Successfuly deleted"
          });
          this.resources.map((file, index) => {
            if (file.publicKey === filePublicKey) {
              this.resources.splice(index, 1);
              const index = this.courseResource.resourceKeys.indexOf(
                file.publicKey
              );
              this.courseResource.resourceKeys.splice(index, 1);
            }
          });
        } else {
          this.$notify({
            type: "error",
            title: "Resource File",
            text: response.data.message
          });
        }
      });
      this.$store.dispatch("getAllResources", this.$route.params.id);
    },

    cancel(saved) {
      if (!saved) {
        this.resources.forEach(item => {
          this.removeFile(item.publicKey)
        })

      }
  

      this.cancelForm();
      this.$parent.cancelDialog();
    },
    cancelForm() {
      this.resources = [];
      this.courseResource = {
        resources: [],

        resourceKeys: [],
        imagePublicKeys: []
      };
    },

    sharePublicly(val, publicKey){
      const data = {
        publicKey: publicKey,
        coursePublicKey: this.$route.params.id,
        val: val,
      };
      
      this.$store.dispatch("shareCourseResourcePublicly", data);
    },
  },
  computed: {
    ...mapGetters(["authenticatedUser", "accessPrivileges"]),
    width(){
      if(this.$vuetify.breakpoint.width < 650){
          return '100%'
      }
      else {
        return '50%'
      }
    }
  },
  watch: {},
  beforeDestroy() {

  }
};
</script>
<style lang="stylus" scoped>
.uploader 
    margin-top 10px


.file-list 
    margin-top 10px
    list-style-type none


.remove-file 
    margin-right 10px

.input-file
    background-color Transparent
    background-repeat no-repeat
    border none
    cursor pointer
    overflow hidden
    outline none

.upload-btn-wrapper
    position: relative
    overflow: hidden
    

.upload-btn-wrapper input[type=file] 
    font-size 100px
    position absolute
    left 0
    top 0
    opacity 0

.divide-li
  margin 10px 0
</style>
