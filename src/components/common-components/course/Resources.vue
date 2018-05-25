<template>
  <div>
    <loader v-if="!isLoaded"/>
    <div v-if="isLoaded">
      
      <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
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
                :search="search"
                :items="courseResources"
                :rows-per-page-items="[10, 20, 30, 40, 50, 75]"
                class="elevation-1">
                <template slot="items" slot-scope="props">
                  <tr :class="props.item.color">
                    <!-- <td :to="{name: 'Profile', params: {id: props.item.publicKey}}">{{ props.item.username }}</td> -->
                    <td class="text-xs-left"><a  :href="props.item.url" download> {{ props.item.originalFileName}}</a></td>
                    <td class="text-xs-center">{{ props.item.username }}</td>
                    <td class="text-xs-center">{{ moment(props.item.createdAt).format('MMMM Do YYYY HH:mm') }}</td>
                    <td class="text-xs-center"><el-switch
                      v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_RESOURCE)"
                     v-model="props.item.publicShared"
                    :change="sharePublicly(props.item.publicShared, props.item.publicKey)">
                    </el-switch>
                    <span
                      class="blue--text"
                      v-if="!$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_RESOURCE)
                      && props.item.publicShared"
                    >
                      Public
                    </span>
                    <span
                      class="red--text"                    
                      v-if="!$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_RESOURCE)
                      && !props.item.publicShared"
                    > 
                      Private
                    </span>                    
                    </td>
                      <td class="text-xs-right">
                      <a class="red--text" @click="selectedItem=props.item; deleteDialog = true"
                      v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_RESOURCE)"
                      >
                      <!--  -->
                          delete
                        </a>
                    </td>
                  </tr>
              </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      
      <div>
        <v-btn 
          v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_RESOURCE)"
          fixed dark fab bottom right color="pink"  @click="dialog = !dialog" > 
          <v-icon>add</v-icon>
        </v-btn>
      </div>
        
      <save-resource :dialog="dialog"/>
    </div>
    
    <v-dialog v-model="deleteDialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Do you want to remove the specified resource?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">Back</v-btn>
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
      selectedItem: null,
      search: "",
      selectedResources: [],
      isLoaded: true,
      dialog: false,
      activeText: "Course Resources",
      deleteDialog: false,
      headers: [
        { text: "File", value: "originalFileName", align: "left" },
        { text: "Uploaded By", value: "username", align: "center" },
        { text: "Uploaded At", value: "uploadedAt", align: "center" },
        { text: "Publicity Status", value: "publicShared", align:"center"},
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
    

    
    deleteResource() {
     
        const data = {coursePublicKey: this.$route.params.id, publicKey: this.selectedItem.publicKey}

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
            this.deleteDialog = false;

    },
    sharePublicly(val, publicKey){
      const data = {
        publicKey: publicKey,
        coursePublicKey: this.$route.params.id,
        val: val,
      };
      
      this.$store.dispatch("shareCourseResourcePublicly", data);
    },

    cancelDialog() {
      this.dialog = false;
      this.deleteDialog = false;
    }
  },

  computed: {
    ...mapGetters(["authenticatedUser", "accessPrivileges", "courseResources"])
  },
  watch: {
      courseResources(nval, oval){

        nval.forEach(resource => {
            resource.username = resource.createdBy.username;
        });

        return nval;        
      }
  }
};
</script>
<style lang="stylus" scoped>

  .no-content
    padding-top 50%
</style>
