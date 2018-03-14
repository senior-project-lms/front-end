import Vue from 'vue'
import Router from 'vue-router'
import {AccessPrivileges} from '../properties/accessPrivileges'
// Insede component

//Insede Course



// common
import  Container from '../components/Container'

import CourseContainer from '../components/common-components/course/CourseContainer'
import Courses from '../components/common-components/course/Courses'


import Calendar from '../components/common-components/Calendar'
import Settings from '../components/common-components/Settings'
import Signout from '../components/authentication/Signout'
import ForgotPassword from '../components/authentication/ForgotPassword'
import UpdatePasswordWithToken from '../components/authentication/UpdatePasswordWithToken'

import Profile from '../components/common-components/Profile'
import PublicResources from '../components/common-components/PublicResources'
import qaGlobal from '../components/common-components/QA-Global'

import CourseRoute from './course/course' 

import SignIn from '../components/authentication/Signin.vue'
import Authenticatior from '../components/authentication/Authenticator';
import SystemAnnouncement from '../components/common-components/SystemAnnouncements'

import Admin from "../components/admin/Admin";
import UsersForAdmin from "../components/admin/Users"
import CoursesForAdmin from "../components/admin/Courses"
import Page404 from '../components/404.vue'
import Page401 from '../components/401.vue'

import DefaultAuthorityPrivileges from '../components/admin/DefaultAuthorityPrivileges'
import Home from '../components/common-components/Home'
import Page from '../components/mock/page'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/app',
      component: Authenticatior,
      children: [
        {
          path: '/',
          name: 'Container',
          component: Container,
          children: [  
              {
                path: 'home',
                name: 'Home',
                component: Home,
                meta: {
                  privilege: AccessPrivileges.PAGE_HOME,
                  requeiresAuthentication: true,
                  base: '',
                  
                }
              },
              { // SYSTEM ANNOUNCEMENT
                path: 'system-announcements',
                name: 'SystemAnnouncements',
                component: SystemAnnouncement,
                meta: {
                  privilege: AccessPrivileges.PAGE_SYSTEM_ANNOUNCEMENT,
                  requeiresAuthentication: true,
                  base: '',
                },
                
              },
              { // ADMIN 
                path: 'admin',
                name: 'Admin',
                component: Admin,
                children: [
                  {
                    path: 'users',
                    name: 'UsersForAdmin',
                    component: UsersForAdmin,
                    meta: {
                      privilege: AccessPrivileges.PAGE_USER_FOR_ADMIN,
                      requeiresAuthentication: true,
                      base: '',
                    },

                  },
                  {
                    path: 'courses',
                    name: 'CoursesForAdmin',
                    component: CoursesForAdmin,
                    meta: {
                      privilege: AccessPrivileges.PAGE_COURSE_FOR_ADMIN,
                      requeiresAuthentication: true,

                    },
                  },
                  {
                    path: '/default-authorities',
                    name: 'DefaultAuthorities',
                    component: DefaultAuthorityPrivileges,
                    meta: {
                      privilege: AccessPrivileges.PAGE_AUTHORITIES,
                      requeiresAuthentication: true,
                    },

                  }
                ],
              },
               
              { // COURSES
                path: 'courses',
                //name: 'CourseConatiner',
                component: CourseContainer,
                children: [
                    CourseRoute,
                    {
                      path: '',
                      name: 'Courses',
                      component: Courses,
                      meta: {
                        privilege: AccessPrivileges.PAGE_COURSES,
                        requeiresAuthentication: true,
                        base: '',
                      },
                    },
                ]
              },
              {
                path: 'calendar',
                name: 'Calendar',
                component: Calendar,
                meta: {
                  privilege: AccessPrivileges.PAGE_GLOBAL_CALENDAR,
                  requeiresAuthentication: true,
                  base: '',
                },

              },
              {
                path: 'settings',
                name: 'Settings',
                component: Settings,
                meta: {
                  privilege: AccessPrivileges.PAGE_SETTINGS,
                  requeiresAuthentication: true,
                  base: '',
                },

              },
              {
                path: 'me',
                name: 'Profile',
                component: Profile,
                meta: {
                  privilege: AccessPrivileges.PAGE_OWN_PROFILE,
                  requeiresAuthentication: true,
                  base: '',
                },
              },       
              {
                path: 'public-resources',
                name: 'PublicResources',
                component: PublicResources,
                meta: {
                  privilege: AccessPrivileges.PAGE_GLOBAL_RESOURCES,
                  requeiresAuthentication: true,
                  base: '',
                },

              },
              {
                path: "qa-global",
                name: 'QA-Global',
                component: qaGlobal,
                meta: {
                  privilege: AccessPrivileges.PAGE_GLOBAL_QA,
                  requeiresAuthentication: true,
                  base: '',
                },

              },                         
          ]
        },
      ]
    },
   
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
      alias: ['/signin'],
      meta: {
        requeiresAuthentication: false,
        base: '',

      }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        requeiresAuthentication: false,
        base: '',

      }
    },
    {
      path: '/update-password/:token',
      name: 'UpdatePasswordWithToken',
      component: UpdatePasswordWithToken,
      meta: {
        requeiresAuthentication: false,
        base: '',

      }
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      component: Signout,
      meta: {
        privilege: null,
        requeiresAuthentication: false,
        base: '',
      }
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404,
      meta: {
        privilege: null,
        requeiresAuthentication: false,
        base: '',
      }
    },  
    {
      path: '/401',
      name: 'Page401',
      component: Page401,
      meta: {
        privilege: null,
        requeiresAuthentication: false,
        base: '',
      }
    },
    {
      path: '/page',
      name: 'Page',
      component: Page,
      meta: {
        privilege: null,
        requeiresAuthentication: false,
        base: '',
      }
    },
  ]
})
