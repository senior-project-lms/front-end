<template>
    <div v-if="signedIn">        
        <v-progress-linear class="loader" v-if="!isLoaded" key="loader"/>
        <router-view v-if="isLoaded || loaded"/>
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
            loaded: false,
            tokenCheckerInterval: null,
        }
    },
    created(){

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
            if(this.authenticatedUser.username == "" && this.signedIn){
                 return this.$store.dispatch('getMe')
                    .then(status => {
                        if(status){
                            this.loaded = true;
                        }
                        this.loaded = false;
                    });
            }
            this.loaded = true;
            return true;
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
                        if(result){
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

<style lang="stylus" scosdadsaped>
    .loader
        position absolute
        top 50%
        left 5%
        right 5%
</style>
