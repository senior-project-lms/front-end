<template>
    <div>
        <loader v-if="!isLoaded"/>
        <div v-if="isLoaded">
            <v-container fluid grid-list-md>
                <v-layout row wrap>   
                    <v-flex md4 sm4>
                        <v-card color="green lighten-2" class="white--text">
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">{{ coursesStatuses.visibleCourses }}</div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">
                                                <a class="white--text" @click="fetchActiveCourses">
                                                    Actives
                                                </a>
                                                
                                            </div>
                                        </div>
                                    </v-flex>
                                </v-layout>                            
                            </v-container>
                        </v-card>
                    </v-flex>
                    <v-flex md4 sm4>
                        <v-card color="blue lighten-2" class="white--text">
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">{{ coursesStatuses.invisibleCourses }}</div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">
                                                <a class="white--text" @click="fetchInactiveCourses">
                                                    Deactiveted
                                                </a>
                                            </div>
                                        </div>
                                    </v-flex>
                                </v-layout>                            
                            </v-container>
                        </v-card>
                    </v-flex>   
                    <v-flex md4 sm4>
                        <v-card color="red lighten-1" class="white--text">
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">99</div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">Nothing</div>
                                        </div>
                                    </v-flex>
                                </v-layout>                            
                            </v-container>
                        </v-card>
                    </v-flex>             
                </v-layout>
                <v-divider class="box-divider"></v-divider>
                <v-layout>
                    <v-flex>
                        <v-card>
                            <v-card-title>
                                <h2 class="active-text grey--text darken-4">{{ activeText }}</h2>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                    v-model="search"
                                ></v-text-field>
                            </v-card-title>
                            <v-data-table
                            :headers="headers"
                            :items="courses"
                            :rows-per-page-items="[50, 75]"	>
                                <template slot="items" slot-scope="props">
                                    <tr :class="props.item.color">
                                        <td>{{ props.item.code }}</td>
                                        <td class="text-xs-center">
                                            <router-link :to="{name: 'CourseAnnouncements', params: {id: props.item.publicKey}}">
                                                {{ props.item.name }}
                                            </router-link>
                                        </td>
                                        <td class="text-xs-center">{{ `${props.item.owner.name} ${props.item.owner.surname}` }}</td>
                                        <td>
                                            <v-layout  right>
                                                <v-flex>
                                                    <v-switch class="course-switch" v-model="props.item.visible" @change="updateVisibility(props.item.publicKey, props.item.visible)"></v-switch>
                                                </v-flex>
                                                <v-flex>
                                                    <a><v-icon color="blue darken-2">settings</v-icon></a>
                                                </v-flex>
                                            </v-layout>    
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>

                        </v-card>

                    </v-flex>
                </v-layout>    
            </v-container>

                
            <div>
                <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE)"> 
                    <v-icon>add</v-icon>
                    </v-btn>
            </div>

            <save-course :dialog="dialog"/>
        </div>


    </div>
  
</template>
<script>
import { mapGetters } from "vuex";
import SaveCourse from "./SaveCourse";
import Loader from "@/components/Loader";

export default {
  components: {
    SaveCourse,
    Loader
  },
  data() {
    return {
      search: "",
      isLoaded: false,
      dialog: false,
      activeText: "Active Courses",
      headers: [
        { text: "Code", value: "code", align: "left" },
        { text: "Name", value: "name", align: "center" },
        { text: "Lecturer", value: "lecturer", align: "center" },
        { text: "", value: "event" }
      ]
    };
  },
  created() {
    this.$store
      .dispatch("hasAccessPrivilege", this.accessPrivileges.READ_ALL_COURSES)
      .then(auth => {
        if (!auth) {
          this.$router.push({ name: "Page404" });
          return;
        }
        this.initializeData();
        this.isLoaded = true;
      });
  },
  methods: {
    initializeData() {
      this.$store.dispatch("getCoursesStatuses");
      this.fetchActiveCourses();
    },

    fetchActiveCourses() {
      this.$store.dispatch("getAllCoursesByVisibility", true);
      this.activeText = "Active Courses";
    },
    fetchInactiveCourses() {
      this.$store.dispatch("getAllCoursesByVisibility", false);
      this.activeText = "Deactivated Courses";
    },
    updateVisibility(publicKey, visible) {
      for (var index in this.courses) {
        if (publicKey == this.courses[index].publicKey) {
          if (visible) {
            this.courses[index].color = "light-green lighten-4";
          } else {
            this.courses[index].color = "red lighten-4";
          }

          break;
        }
      }
      this.$store.dispatch("updateCourseVisiblity", {
        publicKey: publicKey,
        visible: visible
      });
    },

    cancelDialog() {
      this.dialog = false;
    }
  },
  computed: {
    ...mapGetters([
      "authenticatedUser",
      "accessPrivileges",
      "courses",
      "coursesStatuses"
    ])
  }
};
</script>

<style lang="stylus" scoped>

.box-divider 
    margin-top 20px
    margin-bottom: 10px


</style>
