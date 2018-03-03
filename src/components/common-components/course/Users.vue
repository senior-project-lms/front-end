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
                    icon: 'group_add',                    
                    text: 'Enrollment Requests',
                    to: {name: 'CourseEnrollmentRequests'},
                    privilege: AccessPrivileges.PAGE_COURSE_ENROLLED_STUDENTS,
                },
                {
                    icon: 'accessibility',                    
                    text: 'Authenticated Users',
                    to: {name: 'CourseAuthenticatedUsers'},
                    privilege: AccessPrivileges.PAGE_COURSE_AUTHENTICATED_USERS,
                },
            ],
        }
    },
  

    computed: {
        ...mapGetters(["authenticatedUser",]),
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