import Course from '@/components/common-components/Course'

//Insede Course
import CourseTestQuiz from '@/components/common-components/course/TestQuiz';
import CourseCalendar from '@/components/common-components/course/Calendar';
import CourseAnnouncements from '@/components/common-components/course/Announcements';
import CourseGrades from '@/components/common-components/course/Grades';
import CourseQA from '@/components/common-components/course/QA';
import CourseResources from '@/components/common-components/course/Resources';
import CourseAssignments from '@/components/common-components/course/Assignments';


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
  ]
}
