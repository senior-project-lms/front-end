<template>
<v-dialog v-model="dialog" persistent max-width="1000" transition="dialog-bottom-transition" :overlay="false" scrollable>
    <v-card tile>
        <v-toolbar card dark color="primary">
            <v-btn icon @click="cancel" dark><v-icon>close</v-icon></v-btn>
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
                        <input type="file" @change="processFiles($event)" multiple
                        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.UPLOAD_COURSE_RESOURCE_FILE)">
                    </v-flex>
                </v-layout>
                
                <v-layout row wrap>
                    <v-flex md12 sm12>
                        <ul class="file-list">
                            <li v-for="(resource, i) in resources" :key="i">
                                <a class="red--text lighten-1" @click="removeFile(this.$route.params.id)">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </a>{{ i + 1}} - {{ resource.originalFileName }} 
                            </li>
                        </ul>
                        <v-divider></v-divider>  
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
      uploader: false,
      resources: [],

      courseResource: {
        resourceKeys: [],
        imagePublicKeys: [],
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
                this.systemAnnouncement.resourceKeys.push(data.publicKey)  
              }
                
          });
            
      });
  },      
      
    save() {
      const data = {
        publicKey: this.$route.params.id,
        params: {
          resourceKeys: this.courseResource.resourceKeys,
          imagePublicKeys: this.courseResource.imagePublicKeys
        }
      };
      this.$store.dispatch("saveCourseResource", this.data).then(response => {
        if (response.status) {
          this.$notify({
            type: "success",
            title: "Course Resource",
            text: "Successfuly saved"
          });
          this.cancel();
        } else {
          this.$notify({
            type: "error",
            title: "Course Resource",
            text: response.data.message
          });
        }
      });
    },

    removeFile(courseResourcePublicKey) {
      const data = {
        publicKey: this.$route.params.id,
        courseResourcePublicKey: publicKey
      };
      this.$store.dispatch("deleteCourseResourceFile", data).then(response => {
        if (response.status) {
          this.$notify({
            type: "info",
            title: "Resource File",
            text: "Successfuly deleted"
          });
          this.resources.map((file, index) => {
            if (file.publicKey === publicKey) {
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
    },
    cancel(saved) {
      if (!saved) {
        this.courseResource.resourceKeys.map(publicKey => {
          this.$store.dispatch("deleteCourseResourceFile", publicKey);
        });
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
    }
  },
  computed: {
    ...mapGetters(["authenticatedUser", "accessPrivileges"])
  },
  watch: {},
  beforeDestroy() {
    if (this.courseResource.imagePublicKeys.length > 0) {
      // remove the files
    }
  }
};
</script>
<style lang="stylus" scoped>
.uploader {
    margin-top: 50px;
}

.file-list {
    margin-top: 10px;
    list-style-type: none;
}

.remove-file {
    margin-right: 10px;
}
</style>

