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
        authService.clearStorage();
        this.$router.push({name: "SignIn"})
    }
}
</script>
