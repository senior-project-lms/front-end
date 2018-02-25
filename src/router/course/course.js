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
import CourseStudents from '../../components/common-components/course/Students';


var testQuiz = {
    path: 'test-quiz',
    name: 'CourseTestQuiz',
    component: CourseTestQuiz
  }
  
var announcements = {
    path: 'announcements',
    name: 'CourseAnnouncements',
    component: CourseAnnouncements
  }

var assignments = {
    path: 'assignments',
    name: 'CourseAssignments',
    component: CourseAssignments
  }

var calendar = {
    path: 'calendar',
    name: 'CourseCalendar',
    component: CourseCalendar
  }
var grades = {
    path: 'grades',
    name: 'CourseGrades',
    component: CourseGrades
  }
var resources = {
    path: 'resources',
    name: 'CourseResources',
    component: CourseResources
  }

var qa = {
    path: 'QA',
    name: 'CourseQA',
    component: CourseQA
  }


var settings = {
  path: 'settings',
  name: 'CourseSettings',
  component: CourseSettings
}

var students = {
  path: 'students',
  name: 'CourseStudents',
  component: CourseStudents
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
      students,
  ]
}
