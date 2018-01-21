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
        this.$store.dispatch("cleareAuthenticatedUser");
        this.$store.dispatch("clearSystemAnnouncements");
        authService.clearStorage();
        this.$router.push({name: "SignIn"})
    }
}
</script>
