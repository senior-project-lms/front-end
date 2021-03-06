import authentication from './authentication';
import systemAnnouncement from './systemAnnouncement';
import menu from './frontend/menu';
import privileges from './frontend/privileges';
import course from './course'
import excel from './excel'
import user from './user'
import authority from './authority'
import defaultAuthorityPrivileges from './defaultAuthorityPrivilege'
import privilege from './privilege'
import enrollmentRequest from './enrollmentRequest'
import systemEvent from './systemEvent'
import courseAnnouncement from './courseAnnouncement';
import globalQA from './globalQA';
import courseQA from './courseQA';
import quizTest from './quizTest';
import grade from './grade';
import assignment from './assignment';
import publicResources from './publicResources';
import courseResources from  './courseResources';

export default{

    privileges: privileges,
    menu: menu,

    authentication: authentication,
    systemAnnouncement: systemAnnouncement,
    course: course,  
    excel: excel,    
    user: user,
    authority: authority,
    defaultAuthorityPrivileges: defaultAuthorityPrivileges,
    privilege: privilege,
    enrollmentRequest: enrollmentRequest,
    systemEvent: systemEvent,
    courseAnnouncement: courseAnnouncement,
    globalQA:globalQA,
    courseQA:courseQA,
    quizTest: quizTest,
    grade: grade,
    courseResources: courseResources,
    publicResources: publicResources,
    assignment: assignment,
}