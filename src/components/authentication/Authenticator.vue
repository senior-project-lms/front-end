<template>
    <div v-if="signedIn"> 
        <loader v-if="!loaded"/>
        <router-view v-if="loaded"></router-view>
    </div>
</template>

<script>
import AuthenticationService from '../../services/authentication';
import {mapGetters} from 'vuex'
import Loader from '../Loader'

const authService = new AuthenticationService();

export default {
    components: {
        Loader
    },
    data(){
        return {
            signedIn: false,
            tokenCheckerInterval: null,
            loaded: false,
        }
    },
    created(){
    
        this.$store.dispatch('getMe')
        .then(status => {
            this.loaded = status;
        });
     
        this.isSignedIn();
        this.isTokenActive();
       
    },
    computed: {
        ...mapGetters(['authenticatedUser']),
        isLoaded(){
            /*
                function checks that the user profile is loaded and the user is singed in,
                if there is a latency the loaded displays, when data is loaded, then the routeview displays
            */
            if(this.authenticatedUser.username == ""){
                 return this.$store.dispatch('getMe')
                    .then(status => {
                        if(status){
                            console.log("me")
                            return true;
                        }
                        return false;
                    });
            }
            else{
                return true;
            }
            
        },
    },
    methods:{
        isSignedIn(){
            // checks that the user is siged in, if not redirect to signin page
              authService.isSignedIn()
                .then(status => {
                    if(!status){
                        authService.clearStorage();
                        this.$router.push({name: "SignIn"})
                        return;
                    }
                    this.signedIn = true;
                    return;
                })
        },

        isTokenActive(){
            // check that is token or active or not, if it is not active than refresh them
            this.tokenCheckerInterval = setInterval(() => {
                if(authService.isTokenExpired()){
                    authService.refreshTokens()
                    .then(result => {
                        if(!result){
                            authService.clearStorage();
                            this.$router.push({name: "SignIn"})
                            return;                        }
                    })
                }
            }, 10 * 1000)
        }
    },
    beforeDestroy(){
        clearInterval(this.tokenCheckerInterval)
    }
    
}
</script>

<style lang="stylus" scoped>

</style>
