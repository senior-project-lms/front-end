<template>
  <div>
    <loader v-if="!isLoaded"/>
    <div v-if="isLoaded">
      
      <v-container>
        <v-layout row wrap >
          <v-flex md12 sm12 xs12>
            <v-card>
              <v-card-title>
                <h2 class="active-text grey--text darken-4">{{ activeText }}</h2>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
              </v-card-title>
                    
              <v-data-table
                :headers="headers"
                :items="courseResources"
                :rows-per-page-items="[10, 20, 30, 40, 50, 75]"
                select-all
                v-model="selectedResources"
                class="elevation-1">
                <template slot="items" slot-scope="props">
                  <tr :class="props.item.color">
                    <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox></td>   
                    <!-- <td :to="{name: 'Profile', params: {id: props.item.publicKey}}">{{ props.item.username }}</td> -->
                    <td class="text-xs-center"><a  :href="props.item.url" download> {{ props.item.originalFileName}}</a></td>
                    <td class="text-xs-center">{{props.item.name}} {{ props.item.surname}}</td>
                    <td class="text-xs-center">{{ props.item.email }}</td>
                    <td class="text-xs-center">{{ moment(props.item.uploadedat).fromNow() }}</td>
                    <td class="text-xs-right"><a class="red--text" @click="deleteResource(props.item.publicKey)"
                        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_RESOURCE_FILE)">
                        @click="dialog = true"></a></td>
                  </tr>
              </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      
      <div><v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" > 
        <v-icon>add</v-icon></v-btn>
      </div>
        
      <save-resource :dialog="dialog"/>
    </div>
    
    <v-dialog v-model="dialogg" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Do you want to remove the specified resource?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="dialogg = false">Back</v-btn>
            <v-btn color="green darken-1" flat="flat" @click.native="deleteResource">Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>  
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { AccessLevel } from "@/properties/accessLevel";
import { AccessPrivileges } from "@/properties/accessPrivileges";
import SaveResource from "./SaveResource";
import Loader from "@/components/Loader";
import * as moment from "moment";

export default {
  components: {
    SaveResource,
    Loader
  },

  data() {
    return {
      moment: moment,

      search: "",
      selectedResources: [],
      isLoaded: true,
      dialog: false,
      activeText: "Course Resources",
      dialogg: false,
      headers: [
        { text: "Url", value: "url", align: "left" },
        { text: "UploadedBy", value: "uploadedby", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "UploadedAt", value: "uploadedat", align: "center" },
        { text: "", value: "event" }
      ]
    };
  },
  created() {
    if(this.$route.params.id != null){

      this.$store.dispatch("getAllResources", this.$route.params.id);
    }

  },
  methods: {
    

    
    deleteResource(publicKey) {
      if (
        this.authenticatedUser.accessPrivileges.includes(
          this.accessPrivileges.DELETE_COURSE_RESOURCE_FILE
        )
      ) {
        const data = {coursePublicKey: this.$route.params.id, publicKey: publicKey}

        this.$store.dispatch("deleteCourseResourceFile", data)
        .then(response => {
            if (response.status) {
              this.$notify({
                type: "info",
                title: "Course Resource",
                text: "Successfuly removed"
              });
            } else {
              this.$notify({
                type: "error",
                title: "Course Resource",
                text: response.data.message
              });
            }
          });
      }
    },

    cancelDialog() {
      this.dialog = false;
      this.dialogg = false;
    }
  },

  computed: {
    ...mapGetters(["authenticatedUser", "accessPrivileges", "courseResources"])
  }
};
</script>
<style lang="stylus" scoped>
.input-file {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.no-content {
  padding-top: 50%;
}
</style>
