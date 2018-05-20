export default{

    hasPermission(user, privilege){
        const userPrivileges = user.accessPrivileges;
        const userCoursePrivileges = user.coursePrivileges;
        return userPrivileges.includes(privilege) || userCoursePrivileges.includes(privilege);
    }

}