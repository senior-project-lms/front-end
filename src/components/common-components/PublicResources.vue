<template>
<div>
  <div >
    <v-container fluid  grid-list-md grid-list-sm grid-list-xs>
      <v-layout row wrap>
        <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
          <v-layout row wrap>
            <v-flex md5 sm12 xs12>
              <v-card class="courses-temp"> 
                <v-list>
                  <v-subheader>Courses</v-subheader>       
                  <v-divider></v-divider>
                  <template v-for="(theCourse, i) in publicResources">
                    <v-list-tile v-model="selected" :key="theCourse.publicKey" @click="selectedItem=theCourse">                           
                      <v-list-tile-content>
                          <v-list-tile-title><p>{{theCourse.code}} - {{theCourse.name}}</p></v-list-tile-title>
                      </v-list-tile-content>
                        <v-icon right v-if="i == selected">check_circle</v-icon>                          
                      
                    </v-list-tile>
                   <v-divider :key="i" v-if="i + 1 < publicResources.length"></v-divider>                      
                  </template>
                            <!--v-if="allCourses.length == 0"-->
                  <v-list-tile v-if="publicResources.length == 0" >                           
                    <v-list-tile-content>
                      <v-list-tile-title class="text-md-center text-sm-center text-xs-center"><p class="grey--text">No course is available.</p></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>                            
                            
              </v-list>
            </v-card>
          </v-flex> 
          <v-flex md7>
            <v-card>
              <v-card-title>
                <h2 class="active-text grey--text darken-4">{{ activeText }}</h2>
                <v-spacer></v-spacer>
                <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
              </v-card-title>
                    
              <v-data-table
                :headers="headers"
                :search="search"
                :items="selectedItem.resources"
                :rows-per-page-items="[10, 20, 30, 40, 50, 75]"
                class="elevation-1">
                <template slot="items" slot-scope="props">
                  <tr :class="props.item.color">
                    <td class="text-xs-left"><a  :href="props.item.url" download> {{ props.item.originalFileName}}</a></td>
                    <td class="text-xs-center">{{ moment(props.item.createdAt).format('MMMM Do YYYY HH:mm') }}</td>
                    
                  </tr>
              </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>    
        

</v-layout></v-container></div></div></template>

<script>
import { mapGetters } from "vuex";
import * as moment from "moment";

export default {
  components: {
    
  },
  data() {
    return {
      search: "",
      activeText: "Public Course Resources",
      moment: moment,
      selected: null,
      selectedItem: [],
      headers: [
        { text: "File", value: "originalFileName", align: "left" },
        { text: "Uploaded At", value: "uploadedAt", align: "center" },
      ]
      
    };
  },
  created() {
    this.loadPublicResources();
  },
  methods: {

    loadPublicResources() {

        this.$store.dispatch("getPublicResources");
    },

    
  },
  computed: {
    ...mapGetters([
      "authenticatedUser",
      "accessPrivileges",
      "publicResources",
      
    ])
  }
};
</script>

<style <style lang="stylus" scoped>
.courses-btn {
  margin-top: -6px;
}

.def-auth-priv {
  margin-left: 15px;
  margin-top: 20px;
}

.no-content {
  padding-top: 50%;
}

.divider {
  margin-top: 2px;
  margin-bottom: 2px;
}

.detail {
  margin-top: -100px;
  margin-bottom: -70px;
}

.text {
  margin-top: -20px;
  padding-left: 20px;
  margin-right: 20px;
  word-wrap: break-word;
}

.dismiss {
  margin-top: 15px;
  margin-right: 5px;
}

.file-list {
  margin-top: 10px;
  margin-bottom: 10px;
  list-style-type: none;
}
</style>

