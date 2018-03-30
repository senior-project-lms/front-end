import {AccessPrivileges} from '../../properties/accessPrivileges'

import Course from '../../components/common-components/course/Course'

//Insede Course
import CourseTestQuiz from '../../components/common-components/course/TestQuiz';
import CourseCalendar from '../../components/common-components/course/Calendar';
import CourseAnnouncements from '../../components/common-components/course/Announcements';
import CourseGrades from '../../components/common-components/course/Grades';
import CourseQA from '../../components/common-components/course/QA';
import CourseResources from '../../components/common-components/course/Resources';
import CourseAssignments from '../../components/common-components/course/Assignments';
import CourseSettings from '../../components/common-components/course/Settings';
import CourseUsers from '../../components/common-components/course/Users';
import CourseStudents from '../../components/common-components/course/Students';
import CourseEnrollmentRequests from '../../components/common-components/course/EnrollmentRequests';
import CourseAuthenticatedUsers from '../../components/common-components/course/AuthenticatedUsers';


var testQuiz = {
    path: 'test-quiz',
    name: 'CourseTestQuiz',
    component: CourseTestQuiz,
    meta: {
      privilege: AccessPrivileges.PAGE_COURSE_QT,
      requeiresAuthentication: true,
      base: 'Course',
    },
  }
  
var announcements = {
    path: 'announcements',
    name: 'CourseAnnouncements',
    component: CourseAnnouncements,
    meta: {
      privilege: AccessPrivileges.PAGE_COURSE_ANNOUNCEMENT,
      requeiresAuthentication: true,
      base: 'Course',
    },
  }

var assignments = {
    path: 'assignments',
    name: 'CourseAssignments',
    component: CourseAssignments,
    meta: {
      privilege: AccessPrivileges.PAGE_COURSE_ASSIGNMENTS,
      requeiresAuthentication: true,
      base: 'Course',
    },
  }

var calendar = {
    path: 'calendar',
    name: 'CourseCalendar',
    component: CourseCalendar,
    meta: {
      privilege: AccessPrivileges.PAGE_COURSE_CALENDAR,
      requeiresAuthentication: true,
      base: 'Course',
    },
  }
var grades = {
    path: 'grades',
    name: 'CourseGrades',
    component: CourseGrades,
    meta: {
      privilege: AccessPrivileges.PAGE_COURSE_GRADES,
      requeiresAuthentication: true,
      base: 'Course',
    },
  }
var resources = {
    path: 'resources',
    name: 'CourseResources',
    component: CourseResources,
    meta: {
      privilege: AccessPrivileges.PAGE_COURSE_RESOURCES,
      requeiresAuthentication: true,
      base: 'Course',
    },
  }

var qa = {
    path: 'QA',
    name: 'CourseQA',
    component: CourseQA,
    meta: {
      privilege: AccessPrivileges.PAGE_COURSE_QA,
      requeiresAuthentication: true,
      base: 'Course',
    },
  }


var settings = {
  path: 'settings',
  name: 'CourseSettings',
  component: CourseSettings,
  meta: {
    privilege: AccessPrivileges.PAGE_COURSE_SETTINGS,
    requeiresAuthentication: true,
    base: 'Course',
  },
  
}

var users = {
  path: 'u',
  name: 'CourseUsers',
  component: CourseUsers,
  meta: {
    privilege: AccessPrivileges.PAGE_COURSE_USERS,
    requeiresAuthentication: true,
    base: 'Course',
  },
  children:[
    {
      path: 'students',
      name: 'CourseStudents',
      component: CourseStudents,
      meta: {
        privilege: AccessPrivileges.PAGE_COURSE_ENROLLED_STUDENTS,
        requeiresAuthentication: true,
        base: 'Course',
      },
    },
    {
      path: 'enrollment-requests',
      name: 'CourseEnrollmentRequests',
      component: CourseEnrollmentRequests,
      meta: {
        privilege: AccessPrivileges.PAGE_COURSE_ENROLLMENT_REQUEST,
        requeiresAuthentication: true,
        base: 'Course',
      },
    },
    {
      path: 'authenticated-users',
      name: 'CourseAuthenticatedUsers',
      component: CourseAuthenticatedUsers,
      meta: {
        privilege: AccessPrivileges.PAGE_COURSE_AUTHENTICATED_USERS,
        requeiresAuthentication: true,
        base: 'Course',
      },
    },
    
  ]
}


export default {
    
  path: ':id',
  name: 'Course',
  component: Course,
  children: [
      announcements,
      grades,
      resources,
      qa,
      calendar,
      testQuiz,
      assignments,
      settings,
      users,
  ],
  meta: {
    privilege: AccessPrivileges.PAGE_COURSE,
    requeiresAuthentication: true,
    base: 'Course',
  },
}
