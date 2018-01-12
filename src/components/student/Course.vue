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
            <v-tabs grow>
                <v-tabs-bar color="grey lighten-4" light >
                    <v-tabs-slider class="blue"></v-tabs-slider>
                    <v-tabs-item v-for="(item, i) in tabMenus" :key="i" :to="item.to" router>
                        {{ item.text }}
                            <v-badge class="notification" v-if="notifications[item.text]">
                            <span slot="badge">{{ notifications[item.text] }}</span>
                        </v-badge>
                    </v-tabs-item>
                </v-tabs-bar>
                <v-tabs-items>
                <v-tabs-content>
                    <v-card flat>
                        <main>
                            <router-view></router-view>
                        </main>
                    </v-card>
                </v-tabs-content>
                </v-tabs-items>
            </v-tabs>
        </v-flex>      
    </div>
</template>


<script>

   export default {
       
    data () {
      return {
        tabMenus: [
            {
                text: 'Announcements',
                to: {name: 'CourseAnnouncements', params: {}},
            },
            {
                text: 'Grades',
                to: {name: 'CourseGrades', params: {}}
            },
            {
                text: 'Assignments',
                to: {name: 'CourseAssignments', params: {}}
            },
            {
                text: 'Quiz - Testing',
                to: {name: 'CourseTestQuiz', params: {}},
            },
            {
                text: 'Resources',
                to: {name: 'CourseResources', params: {}}
            },
            {
                text: 'QA',
                to: {name: 'CourseQA', params: {}}
            },
            {
                text: 'Calendar',
                to: {name: 'CourseCalendar', params: {}}
            },
        ],
        notifications: {'Announcements': 1, 'Quiz - Testing': 1}

      }
    },
    created(){
    },
    watch: {

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

