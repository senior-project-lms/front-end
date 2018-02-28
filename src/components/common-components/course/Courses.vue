<template>
    <div>
        <v-layout row wrap>
            <v-flex>
                <v-card height="55">
                <v-card-media class="white--text" height="55" src="/static/parallax2.jpg">
                    <v-container fluid class="">
                        <v-layout class="">
                                <v-spacer></v-spacer>
                                <v-btn flat class="white--text courses-btn"
                                @click="coursesDialog = true"
                                v-has-privilege="{user: authenticatedUser, privilege:  accessPrivileges.ENROLL_COURSE}"
                                
                                >
                                Courses
                                </v-btn>
                        </v-layout>
                    </v-container>
                </v-card-media>
                </v-card>
            </v-flex>
        </v-layout>
        <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
            <v-layout row wrap>
                <v-flex md5 sm12 xs12>
                    <v-card class="courses-temp"> 
                        <v-list>            
                            <v-subheader>Courses</v-subheader>       
                            <v-divider></v-divider>   
                            <template v-for="(course, i) in courses">
                                    <v-list-tile  :key="`course-${i}`" :to="{name: 'Course', params: {id: course.publicKey}}">                           
                                        <v-list-tile-content>
                                            <v-list-tile-title><p class="course">{{course.code}} - {{course.name}}</p></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-divider :key="i" v-if="i + 1 < courses.length"></v-divider>                      
                            </template>
                            <v-list-tile v-if="courses.length == 0">                           
                                <v-list-tile-content>
                                    <v-list-tile-title class="text-md-center text-sm-center text-xs-center"><p class="grey--text">No such a course is found</p></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>                            
                            
                        </v-list>
                    </v-card>
                </v-flex> 
            </v-layout>
        </v-container>
        <course-enrollment
        v-has-privilege="{user: authenticatedUser, privilege:  accessPrivileges.ENROLL_COURSE}"
        :dialog="coursesDialog"
        />
     
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import Loader from "@/components/Loader";
import CourseEnrollment from './CourseEnrollment'
export default{
    components:{
        Loader,
        CourseEnrollment,
    },
    data(){
        return{
            coursesDialog: false,
        }
    },
    created(){
        console.log(this)
        this.$store.dispatch('getAllCoursesOfAuthUser');
    },
    methods:{
        cancelCourseDialog(){
            this.coursesDialog = false;
        },
    },
    computed: {
    ...mapGetters([
      "authenticatedUser",
      "accessPrivileges",
      "courses"
    ])
  },
}
</script>

<style <style lang="stylus" scoped>

    .courses-btn
        margin-top -6px


</style>

