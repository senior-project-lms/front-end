<template>
    <div>
        <router-link class="back" :to="{name: 'SignIn'}">Back</router-link>
        <v-flex lg4 offset-lg4 md4 offset-md4 sm6 offset-sm3 xs12 >
            <v-card class="signin-card">
                <v-card-title class="headline">   
                    Forgot Password                  
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text v-if="!success">
                    <v-container fluid>
                        <v-layout row wrap>
                            <v-flex>
                                <v-text-field
                                        label="Enter your email"
                                        v-model="user.email"
                                        required>
                                </v-text-field>    
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex>
                                 <v-btn @click="submit" block color="secondary" dark>Submit</v-btn>
                            </v-flex>
                        </v-layout>                        
                    </v-container>
                </v-card-text>
                <v-card-text v-else>
                    <div class="text-md-center">
                        <p class="title">Mail is successfully sent, check inbox.</p>
                    </div>
                </v-card-text>
            </v-card>                
        </v-flex>            

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            success: false,
            signInProcess: false,
            user: {
                email:'',
            }
        }
    },
    created(){
    },
    methods:{
        submit(){
            if(this.user.email.length > 0){
                this.$store.dispatch("forgotPassword", this.user)
                .then(response => {
                    if(response.status){
                        this.success = true;
                        setTimeout( () => this.$router.push({ name: 'SignIn'}), 3000);
                    }
                    else{
                        this.$notify({type: "error", title: "Forgot Password", text: "Failed"})
                    }

                });

            }
            
        }
    },
    computed: {

    },
    watch:{
    }
  
}
</script>

<style lang="stylus" scoped>
    .signin-card
        margin-top 150px
    
    .back
        margin-left 20px
    .success
        color #66BB6A

</style>
