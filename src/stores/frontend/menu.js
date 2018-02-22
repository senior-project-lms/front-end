import {AccessLevel} from "../../properties/accessLevel";
import {AccessPrivileges} from '../../properties/accessPrivileges'

export default{

    state:{
        leftMenuItems: [
            
            {
              icon: 'fa-tachometer',
              title: 'Home',
              to: {name: 'Home'},
              authenticated: AccessPrivileges.GLOBAL_ACCESS,
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
              to: {name: 'Courses'},
              authenticated: AccessPrivileges.ACCESS_COURSES_PAGE,
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
            {
              icon: 'fa-shield',
              title: 'Authorities',
              to: {name: 'DefaultAuthorities'},
              authenticated: AccessPrivileges.READ_DEFAULT_AUTHORITIES_AND_PRIVILEGES,
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
              authenticated: AccessPrivileges.READ_SYSTEM_ANNOUNCEMENT
            },
<<<<<<< HEAD
            /*{                                   Burayı tek bir sorunun QA sayfasını düzenlemek için kullandıydım
              icon: 'fa-question-circle-o',
              title: 'QA-Sample',
              to: {name: 'QA-Sample'},
              authenticated: null,
              authenticated: AccessPrivileges.READ_SYSTEM_ANNOUNCEMENT
            },*/
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
=======
>>>>>>> development
                      
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
        ],
        courseTabMenus: [
          {
              text: 'Announcements',
              to: {name: 'CourseAnnouncements'},
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