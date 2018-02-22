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
                                v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.ENROLL_COURSE)"
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
                            <v-subheader>My Courses</v-subheader>       
                            <v-divider></v-divider>   
                            <template v-for="(course, i) in courses">
                                    <v-list-tile  :key="`course-${i}`" :to="{name: 'CourseAnnouncements', params: {id: course.publicId}}">                           
                                        <v-list-tile-content>
                                            <v-list-tile-title><p class="course">{{course.code}} - {{course.name}}</p></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-divider :key="i" v-if="i + 1 < courses.length"></v-divider>                      
                            </template>
                            
                        </v-list>
                    </v-card>
                </v-flex> 
            </v-layout>
        </v-container>
        <course-enrollment
        v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.ENROLL_COURSE)"
        :dialog="coursesDialog"
        />
     
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import Loader from "@/components/Loader";
import CourseEnrollment from './CourseEnrolment'
export default{
    components:{
        Loader,
        CourseEnrollment,
    },
    data(){
        return{
            coursesDialog: false,
            courses: [
                {
                    publicId: '73982492n941798739127c987298377n123798213231c',
                    code: 'CS204',
                    name: 'Industry 4.0'
                },
                {
                    publicId: '73982492n941798739127c987298377n12379821t235533',
                    code: 'CS424',
                    name: 'Introduction to Artificial Inteligence'
                },
                {
                    publicId: '73982492n941798739127c98729hf3458377n123798213',
                    code: 'CS464',
                    name: 'Cloud Computing'
                },
                {
                    publicId: '73982492n9417987391279jnckc987298377n123798213',
                    code: 'CS404',
                    name: 'Introduction To Cryptology'
                }
                                    
            ]
        }
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
    ])
  },
}
</script>

<style <style lang="stylus" scoped>

    .courses-btn
        margin-top -6px


</style>

