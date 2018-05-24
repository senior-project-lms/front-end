<template>
  
</template>

<script>
import AuthenticationService from '../../services/authentication';
const authService = new AuthenticationService();
export default {
    data(){
        return{

        }
    },
    created(){
        
        this.$store.commit("cleareAuthenticatedStore");
        this.$store.commit("clearAuthorityStore");
        this.$store.commit("clearCourseStore");
        this.$store.commit("clearDefaultAuthorityPrivilegeStore");
        this.$store.commit("clearExcelStore");
        this.$store.commit("clearPrivilegeStore");
        this.$store.commit("clearSystemAnnouncementStore");
        this.$store.commit("clearEnrollmentRequestStore");
        this.$store.commit("clearUserStore");
        this.$store.commit("clearQuizTestAllStates");
        this.$store.commit("clearSystemEventStore");
        this.$store.commit("clearGlobalQAs");
        this.$store.commit("clearPublicResourcesStore");
        this.$store.commit("clearAllGrades");
        this.$store.commit("clearCourseAnnouncementStore");
        this.$store.commit("clearCourseQAs");
        this.$store.commit("clearAllAllAssignments");


        authService.clearStorage();
        this.$router.push({name: "SignIn"})
    }
}
</script>
