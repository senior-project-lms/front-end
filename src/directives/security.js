
export default {

    bind: function (el, binding, vnode) {
        const user =  binding.value.user;
        const userPrivileges = user.accessPrivileges;
        const userCoursePrivileges = user.coursePrivileges;
        const privilege = binding.value.privilege;
        if(!userPrivileges.includes(privilege) && !userCoursePrivileges.includes(privilege)){
            el.style.visibility = "hidden"
            el = null;
        }
    }

}