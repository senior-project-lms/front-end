import {AccessLevel} from "../../properties/accessLevel";
import {AccessPrivileges} from '../../properties/accessPrivileges'

export default{

    state:{
        leftMenuItems: [
            
            {
              icon: 'fa-tachometer',
              title: 'Home',
              to: {name: 'Home'},
              privilege: AccessPrivileges.PAGE_HOME,
            },
            {
              icon: 'fa-bullhorn',
              title: 'System Announcement',
              to: {name: 'SystemAnnouncements'},
              privilege: AccessPrivileges.PAGE_SYSTEM_ANNOUNCEMENT,
            },
            {
              icon: 'fa-book',
              title: 'Courses',
              to: {name: 'Courses'},
              privilege: AccessPrivileges.PAGE_COURSES,
            },
            {
              icon: 'fa-book',
              title: 'Courses',
              to: {name: 'CoursesForAdmin'},
              privilege: AccessPrivileges.PAGE_COURSE_FOR_ADMIN,
            },
            {
              icon: 'fa-users',
              title: 'Users',
              to: {name: 'UsersForAdmin'},
              privilege: AccessPrivileges.PAGE_USER_FOR_ADMIN,
            },
            {
              icon: 'fa-shield',
              title: 'Authorities',
              to: {name: 'DefaultAuthorities'},
              privilege: AccessPrivileges.PAGE_AUTHORITIES,
            },
            {
              icon: 'fa-calendar',
              title: 'Calendar',
              to: {name:'Calendar'},
              privilege: AccessPrivileges.PAGE_GLOBAL_CALENDAR,
            },
            {
              icon: 'fa-files-o',
              title: 'Public Resources',
              to: {name:'PublicResources'},
              privilege: AccessPrivileges.PAGE_GLOBAL_RESOURCES,
            },
            {
              icon: 'fa-question-circle-o',
              title: 'QA-Global',
              to: {name: 'QA-Global'},
              privilege: AccessPrivileges.PAGE_GLOBAL_QA,
            },
                      
        ],
        topMenuItems: [
            {
              icon: 'fa-user',
              title: 'Profile',
              to: {name:'Profile'},
              privilege: AccessPrivileges.PAGE_OWN_PROFILE,

            },
            {
              icon: 'fa-cog',
              title: 'Settings',
              to: {name:'Settings'},
              privilege: AccessPrivileges.PAGE_SETTINGS,

            },
            {
              icon: 'fa-sign-out',
              title: 'Sign Out',
              to: {name:'SignOut'},
            },
        ],
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
      },
      courseTabMenus(state){
          return state.courseTabMenus;
      }      

    }

}