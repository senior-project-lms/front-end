import {AccessLevel} from "../../properties/accessLevel";
import {AccessPrivileges} from '../../properties/accessPrivileges'

export default{

    state:{
        leftMenuItems: [
            {
              icon: 'fa-tachometer',
              title: 'Home',
              to: {name: 'Announcement'},
              authenticated: null,
              
            },
            {
              icon: 'fa-bullhorn',
              title: 'Announcement',
              to: {name: 'Announcement'},
              badge: true,
              authenticated: null,
            },
            {
              icon: 'fa-book',
              title: 'Courses',
              to: {name: 'CourseList'},
              authenticated: null,
            },
            {
              icon: 'fa-calendar',
              title: 'Calendar',
              to: {name:'Calendar'},
              authenticated: null,
            },
            {
              icon: 'fa-files-o',
              title: 'Public Resources',
              to: {name:'PublicResources'},
              authenticated: null,
            },
            {
              icon: 'fa-question-circle-o',
              title: 'QA-Global',
              to: {name: 'QA-Global'},
              authenticated: null,
            },
            {
              icon: 'fa-bullhorn',
              title: 'System Announcement',
              to: {name: 'SystemAnnouncements'},
              authenticated: AccessPrivileges.READ_SYSTEM_ANNOUNCEMENT
            },
            {
              icon: 'fa-book',
              title: 'Courses',
              to: {name: 'CoursesForAdmin'},
              authenticated:  AccessPrivileges.READ_ALL_COURSES,
            },
            {
              icon: 'fa-users',
              title: 'Users',
              to: {name: 'UsersForAdmin'},
              authenticated: AccessPrivileges.READ_ALL_USERS,
            },
                      
          ],
          topMenuItems: [
            {
              icon: 'fa-user',
              title: 'Profile',
              to: {name:'Profile'},
              authenticated: [],
            },
            {
              icon: 'fa-cog',
              title: 'Settings',
              to: {name:'Settings'},
              authenticated: [],
            },
            {
              icon: 'fa-sign-out',
              title: 'Sign Out',
              to: {name:'SignOut'},
              authenticated: [],
            },
          ]
    },
    mutations:{
        
    },
    actions:{

    },
    getters: {
      leftMenuItems(state){
        return state.leftMenuItems;
      },
      topMenuItems(state){
        return state.topMenuItems;
      }

    }

}