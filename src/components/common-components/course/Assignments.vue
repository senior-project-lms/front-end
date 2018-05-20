
<template>
    <div>
        <assignment-lecturer
        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.ACCESS_ASSIGNMENT_LECTURER_VIEW)"        
        />

        <assignment-student
        v-if="$security.hasPermission(authenticatedUser, accessPrivileges.ACCESS_ASSIGNMENT_STUDENT_VIEW)"        
        />
        
    </div>


</template>

<script>
import {mapGetters} from 'vuex';
import AssignmentStudent from './AssignmentStudent'
import AssignmentLecturer from './AssignmentLecturer'

import * as moment from 'moment';



export default {
    components:{
        AssignmentLecturer,
        AssignmentStudent,
    },
    data(){
        return{
             

        }
    },
    created(){
    },

    methods:{
     
    },
    beforeDestroy(){
        this.$store.commit('clearCourseAnnouncementStore');
    },    
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', ]),
    },
    watch: {
    }
}    
</script>
<style <style lang="stylus" scoped>

    .notify
        margin-right 20px
</style>
