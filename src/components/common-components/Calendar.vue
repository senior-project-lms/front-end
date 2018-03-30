<template>
    <div>
        <v-container fluid grid-list-md grid-list-sm grid-list-xs>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-card-text>
                            <full-calendar id="calendar" :events="events" :defaultView="'month'" :editable="false"/>                    
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_GLOBAL_CALENDAR)"> 
            <v-icon>add</v-icon>
        </v-btn>
        <calendar-edit :dialog="dialog" @cancel="cancelDialog" 
        v-if="dialog
        &&
        $security.hasPermission(authenticatedUser, accessPrivileges.SAVE_GLOBAL_CALENDAR)
        "></calendar-edit>
    </div>


</template>

<script>
import {mapGetters} from 'vuex'
import CalendarEdit from './CalendarEdit'
import * as moment from 'moment'


export default {
    components: {
        CalendarEdit,
    },
    data(){
        return{
            menu: false,
            modal: false,            
            dialog: false,
            colors: ['#E57373', '#7986CB', '#1E88E5', '#26A69A', '#43A047',
             '#7CB342', '#B3E5FC', '#D4E157', '#FFEE58', '#FFA726', '#FF8A65',
              '#8D6E63', '#78909C'],

        }
    },
    created(){
        this.$store.commit('setEvents', []);
        this.$store.dispatch("getAllCourseEventsOfRegisteredCourses");
        this.$store.dispatch("getAllSystemEvents");
    },
    methods: {
        cancelDialog(){
            this.dialog = false;
        }
    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseEvents', 'systemEvents']),
        events(){
            var events = [];

            var courseCodes = [];
            this.courseEvents.map(event => {
                if(!courseCodes.includes(event.course.code)){
                    courseCodes.push(event.course.code)
                }
            })

            this.courseEvents.map(event => {
                //var event = this.courseEvents[i];
                event.title = event.course.code + ' |  ' + event.title
                event.color = this.colors[courseCodes.indexOf(event.course.code)]
                event.start = event.start + (3 * 60 * 60 * 1000)
                event.end = event.end + (3 * 60 * 60 * 1000);
            })
            
            this.systemEvents.map(event => {
                event.start = event.start + (3 * 60 * 60 * 1000)
                event.end = event.end + (3 * 60 * 60 * 1000);
            })
            events = events.concat(this.courseEvents)
            events = events.concat(this.systemEvents)
            return events;
        }
    }
}    
</script>
<style>

</style>
