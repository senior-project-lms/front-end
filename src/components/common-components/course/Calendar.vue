<template>
    <div>
        <v-container fluid grid-list-md grid-list-sm grid-list-xs>
            <v-layout row wrap>
                <v-flex md12>
                    <v-card>
                        <v-card-text>
                            <full-calendar id="calendar" :events="courseEvents" :defaultView="'month'" :editable="false"/>                    
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_CALENDAR)"> 
            <v-icon>add</v-icon>
        </v-btn>
        <calendar-edit :dialog="dialog" @cancel="cancelDialog" 
        v-if="dialog
        &&
        $security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_CALENDAR)
        "></calendar-edit>
    </div>


</template>

<script>
import {mapGetters} from 'vuex'
import CalendarEdit from './CalendarEdit'

export default {
    components: {
        CalendarEdit,
    },
    data(){
        return{
            menu: false,
            modal: false,            
            dialog: false,

        }
    },
    created(){
        this.$store.dispatch("getAllCourseEvents", this.$route.params.id);
    

    },
    methods: {
        cancelDialog(){
            this.dialog = false;
        }
    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseEvents'])
    }
}    
</script>
<style>

</style>
