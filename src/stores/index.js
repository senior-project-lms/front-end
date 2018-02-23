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
}