import {AccessLevel} from "../../properties/accessLevel";
import {AccessPrivileges} from '../../properties/accessPrivileges'

export default{

    state:{
        leftMenuItems: [
            
            {
              icon: 'fa-home',
              title: 'Dashboard',
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
              icon: 'fa-bullhorn',
              title: 'QAPage',
              to: {name: 'QAPage'},
              authenticated: AccessPrivileges.READ_SYSTEM_ANNOUNCEMENT
            },
            {
              icon: 'announcement',
              title: 'Course Announcement',
              to: {name: 'CourseAnnouncements'},
              privilege: AccessPrivileges.PAGE_COURSE_ANNOUNCEMENT,
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
              icon: 'fa-lock',
              title: 'Authorities',
              to: {name: 'DefaultAuthorities'},
              privilege: AccessPrivileges.PAGE_AUTHORITIES,
            },
            {
              icon: 'fas fa-calendar-alt',
              title: 'Calendar',
              to: {name:'Calendar'},
              privilege: AccessPrivileges.PAGE_GLOBAL_CALENDAR,
            },
            {
              icon: 'fas fa-copy',
              title: 'Public Resources',
              to: {name:'PublicResources'},
              privilege: AccessPrivileges.PAGE_GLOBAL_RESOURCES,
            },
            {
              icon: 'fas fa-question',
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
              icon: 'fas fa-sign-out-alt',
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