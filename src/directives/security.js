
export default {

    bind: function (el, binding, vnode) {
        // authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_SYSTEM_ANNOUNCEMENT)
        const userPrivileges = binding.value.user.accessPrivileges;
        const privilege = binding.value.privilege;
        if(!userPrivileges.includes(privilege)){
            el.style.visibility = "hidden"
         }
    }

}