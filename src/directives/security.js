
export default {

    bind: function (el, binding, vnode) {
        const userPrivileges = binding.value.user.accessPrivileges;
        const privilege = binding.value.privilege;
        if(!userPrivileges.includes(privilege)){
            el.style.visibility = "hidden"
        }
    }

}