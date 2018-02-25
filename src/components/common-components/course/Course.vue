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
                        :to="item.to">
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
export default {
        
    data () {
        return {
            active: null,
            notifications: {'Announcements': 1, 'Quiz - Testing': 1},
            courseTabMenus: [
                {
                    text: 'Announcements',
                    to: {name: 'CourseAnnouncements', params: {id: this.$route.params.id}},
                },
                {
                    text: 'Grades',
                    to: {name: 'CourseGrades'}
                },
                {
                    text: 'Assignments',
                    to: {name: 'CourseAssignments'}
                },
                {
                    text: 'Quiz - Testing',
                    to: {name: 'CourseTestQuiz'},
                },
                {
                    text: 'Resources',
                    to: {name: 'CourseResources'}
                },
                {
                    text: 'QA',
                    to: {name: 'CourseQA'}
                },
                {
                    text: 'Calendar',
                    to: {name: 'CourseCalendar'}
                },
                {
                    text: 'Students',
                    to: {name: 'CourseStudents'}
                },
                {
                    text: 'Settings',
                    to: {name: 'CourseSettings'}
                },
            ],            

        }
    },
    created(){
    
    },
    computed: {
        ...mapGetters([]),
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

