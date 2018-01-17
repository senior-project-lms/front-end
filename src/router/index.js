import Vue from 'vue'
import Router from 'vue-router'

// Insede component

//Insede Course



// common
import  Container from '../components/Container'

import Announcement from '../components/common-components/Announcement'
import Calendar from '../components/common-components/Calendar'
import Settings from '../components/common-components/Settings'
import Signout from '../components/common-components/Signout'
import Profile from '../components/common-components/Profile'
import PublicResources from '../components/common-components/PublicResources'
import qaGlobal from '../components/common-components/QA-Global'
import CourseContainer from '@/components/common-components/CourseContainer'
import CourseList from '../components/common-components/CourseList'

import CourseDetail from './course/course' 
import SignIn from '../components/authentication/Signin.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container,
      children: [        
          {
            path: 'courses',
            name: 'CourseConatiner',
            component: CourseContainer,
            children: [
                CourseDetail,
                {
                  path: '',
                  name: 'CourseList',
                  component: CourseList,
                }
            ]
          },
          {
            path: 'announcement',
            name: 'Announcement',
            component: Announcement,
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
            path: 'signout',
            name: 'Signout',
            component: Signout,
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
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
