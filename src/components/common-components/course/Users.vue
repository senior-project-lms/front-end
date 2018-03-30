<template>
  <div>
    <v-container fluid grid-list-md grid-list-sm grid-list-xs>
        <router-view></router-view>
    </v-container>
    <v-bottom-nav absolute :value="true" :active.sync="selected">
        <v-btn
         v-for="(menu, i) in displayedMenus"
         :key="`bottom-btn-${i}`"
         flat color="primary" :value="menu.text" 
         :to="menu.to">
            <span>{{ menu.text }}</span>
            <v-icon>{{ menu.icon }}</v-icon>
            <v-badge class="notification"
            v-if="enrollmentRequestCounts[menu.notification] > 0">
                <span slot="badge">{{ enrollmentRequestCounts[menu.notification] }}</span>
            </v-badge>  
        </v-btn>
    </v-bottom-nav>     
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {AccessPrivileges} from '../../../properties/accessPrivileges';

export default{
    data(){
        return{
            selected: 'Students',
            bottomMenus: [
                {
                    icon: 'group',                    
                    text: 'Students',
                    to: {name: 'CourseStudents'},
                    privilege: AccessPrivileges.PAGE_COURSE_ENROLLED_STUDENTS,
                },
                {
                    icon: 'accessibility',                    
                    text: 'Assistants',
                    to: {name: 'CourseAuthenticatedUsers'},
                    privilege: AccessPrivileges.PAGE_COURSE_AUTHENTICATED_USERS,
                },
                {
                    icon: 'group_add',                    
                    text: 'Enrollment Requests',
                    to: {name: 'CourseEnrollmentRequests'},
                    privilege: AccessPrivileges.PAGE_COURSE_ENROLLED_STUDENTS,
                    notification: 'pending',
                },
            ],
        }
    },
    created(){
        this.$store.dispatch('getEnrollmentRequestCounts', this.$route.params.id);
    },
    computed: {
        ...mapGetters(["authenticatedUser", 'enrollmentRequestCounts']),
        displayedMenus(){
            const menus = [];
            for(var i in this.bottomMenus){
                const privilege = this.bottomMenus[i].privilege;  
                if(this.authenticatedUser.coursePrivileges.includes(privilege)){
                    menus.push(this.bottomMenus[i]);
                }
            }
            return menus;
        }
    
    },
}
</script>
<style lang="stylus" scoped>
    .notification
        margin-left 30px
</style>
