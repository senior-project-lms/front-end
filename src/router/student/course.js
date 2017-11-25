import Course from '@/components/student/Course'

//Insede Course
import CourseTestQuiz from '@/components/student/course/TestQuiz';
import CourseCalendar from '@/components/student/course/Calendar';
import CourseAnnouncements from '@/components/student/course/Announcements';
import CourseGrades from '@/components/student/course/Grades';
import CourseQA from '@/components/student/course/QA';
import CourseResources from '@/components/student/course/Resources';
import CourseAssignments from '@/components/student/course/Assignments';


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
    
  path: 'courses/:id',
  name: 'StudentCourse',
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
