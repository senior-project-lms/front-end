import Vue from 'vue'
import Router from 'vue-router'

// Insede component

//Insede Course



// common
import  Container from '../components/Container'

import CourseContainer from '../components/common-components/course/CourseContainer'
import Courses from '../components/common-components/course/Courses'


import Calendar from '../components/common-components/Calendar'
import Settings from '../components/common-components/Settings'
import Signout from '../components/authentication/Signout'
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
import DefaultAuthorityPrivileges from '../components/admin/DefaultAuthorityPrivileges'
import Home from '../components/common-components/Home'

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
              },
              { // SYSTEM ANNOUNCEMENT
                path: 'system-announcements',
                name: 'SystemAnnouncements',
                component: SystemAnnouncement,
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
                  },
                  {
                    path: 'courses',
                    name: 'CoursesForAdmin',
                    component: CoursesForAdmin,
                  },
                  {
                    path: '/default-authorities',
                    name: 'DefaultAuthorities',
                    component: DefaultAuthorityPrivileges,
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
                    },
                ]
              },
              {
                path: 'calendar',
                name: 'Calendar',
                component: Calendar,
              },
              {
                path: 'settings',
                name: 'Settings',
                component: Settings,
              },
              {
                path: 'me',
                name: 'Profile',
                component: Profile,
              },       
              {
                path: 'public-resources',
                name: 'PublicResources',
                component: PublicResources,
              },
              {
                path: "qa-global",
                name: 'QA-Global',
                component: qaGlobal,
              },                         
          ]
        },
      ]
    },
   
    {
      path: '/',
      name: 'SignIn',
      component: SignIn,
      alias: ['/signin']

    },
    {
      path: '/signout',
      name: 'SignOut',
      component: Signout,
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    }
  ]
})
