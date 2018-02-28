<template>
    <div>
        <v-flex md12>
            <v-card height="70">
               <v-card-media class="white--text" height="70" src="/static/parallax2.jpg">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline">Introduction to Programing</span>
                        </v-flex>
                    </v-layout>
                </v-container>
               </v-card-media>
            </v-card>
        </v-flex>
        <v-flex md12>
            <v-tabs
                v-model="active"
                color="grey lighten-4"
                light
                slider-color="blue"
                grow
                >
                <v-tab
                    v-for="(item, i) in courseTabMenus"
                    :key="i"
                    ripple
                    :to="item.to"
                    v-has-privilege="{user: authenticatedUser, privilege: item.privilege}">
                    {{ item.text }}
                    <v-badge class="notification" v-if="notifications[item.text]">
                        <span slot="badge">{{ notifications[item.text] }}</span>
                    </v-badge>
                </v-tab>
                <v-tab-item>

                </v-tab-item>
            </v-tabs>
            <v-container fluid>
                    <v-layout row wrap>
                        <v-flex fill-height>
                            <router-view></router-view>
                        </v-flex>
                    </v-layout>
            </v-container>                
        </v-flex>      
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
import {AccessPrivileges} from '../../../properties/accessPrivileges';
export default {
        
    data () {
        return {
            active: null,
            notifications: {'Announcements': 1, 'Quiz - Testing': 1},
            courseTabMenus: [
                {
                    text: 'Announcements',
                    to: {name: 'CourseAnnouncements'},
                    privilege: AccessPrivileges.PAGE_COURSE_ANNOUNCEMENT,
            
                },
                {
                    text: 'Grades',
                    to: {name: 'CourseGrades'},
                    privilege: AccessPrivileges.PAGE_COURSE_GRADES,
                },
                {
                    text: 'Assignments',
                    to: {name: 'CourseAssignments'},
                    privilege: AccessPrivileges.PAGE_COURSE_ASSIGNMENTS,
                },
                {
                    text: 'Quiz - Testing',
                    to: {name: 'CourseTestQuiz'},
                    privilege: AccessPrivileges.PAGE_COURSE_QT,
                },
                {
                    text: 'Resources',
                    to: {name: 'CourseResources'},
                    privilege: AccessPrivileges.PAGE_COURSE_RESOURCES,
                },
                {
                    text: 'QA',
                    to: {name: 'CourseQA'},
                    privilege: AccessPrivileges.PAGE_COURSE_QA,
                },
                {
                    text: 'Calendar',
                    to: {name: 'CourseCalendar'},
                    privilege: AccessPrivileges.PAGE_COURSE_CALENDAR,
                },
                {
                    text: 'Students',
                    to: {name: 'CourseStudents'},
                    privilege: AccessPrivileges.PAGE_COURSE_STUDENTS,
                },
                {
                    text: 'Settings',
                    to: {name: 'CourseSettings'},
                    privilege: AccessPrivileges.PAGE_COURSE_SETTINGS,
                },
            ],            

        }
    },
    created(){
        this.$router.push({name: 'CourseAnnouncements'});
    },
    computed: {
        ...mapGetters(["authenticatedUser",]),
    }

}
</script>

<style lang="stylus" scoped>
    
    .nav
        margin-top 10px
    
    .course
        color #424242
    
    .notification
        margin-left 10px
</style>

