<template>
    <div>
        <v-flex lg4 offset-lg4 md4 offset-md4 sm6 offset-sm3 xs12 >
            <v-card class="signin-card">
                <v-card-title>
                        <v-flex >
                            <v-flex>
                                <v-select
                                    label="Enter your username"
                                    v-model="authUser.username"
                                    :items="usernames"
                                    :error-messages="usernameErrorMessage"
                                    :error="usernameError"
                                    required>
                                    </v-select>
                            </v-flex>
                            <v-flex>
                                <v-text-field
                                        label="Enter your password"
                                        v-model="authUser.password"
                                        min="8"
                                        :error="passwordError"
                                        :error-messages="passwordErrorMessage"
                                        :append-icon="show ? 'visibility' : 'visibility_off'"
                                        :append-icon-cb="() => (show = !show)"
                                        :type="show ? 'password' : 'text'"
                                        required>
                                </v-text-field>    
                            </v-flex>
                            <v-flex>
                                <v-layout>
                                    <v-flex md6 xs12>
                                        <v-checkbox
                                            label="Remember me."
                                            v-model="checkbox">
                                        </v-checkbox>                                
                                    </v-flex>
                                    <v-flex md6>
                                        <router-link :to="{name: 'SignIn'}" class="right">
                                            forgot your password
                                        </router-link>
                                    </v-flex>                                
                                </v-layout>
                            </v-flex>
                            <v-flex>
                                 <v-btn @click="submit" block color="secondary" dark>Sign in</v-btn>
                            </v-flex>
                            <v-flex>
                                  <v-progress-linear v-if="signInProcess" v-bind:indeterminate="signInProcess"></v-progress-linear>
                            </v-flex>

                        </v-flex>                        
                </v-card-title>
            </v-card>                
        </v-flex>            

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            signInProcess: false,
            show: true,
            checkbox: false,
            usernameError: false,
            passwordError: false,
            usernameErrorMessage: [],
            passwordErrorMessage: [],
            items: [
                'super.admin',
                'mock.admin',
                'mock.lecturer',
                'mock.assistant',
                'mock.student'
            ],
            authUser: {
                username: 'super.admin',
                password: 'test.password',
            },
        }
    },
    created(){
        this.$store.dispatch("getAllUsernames");
    },
    methods:{
        submit(){
            this.signInProcess = true;
            this.usernameErrorMessage = [];
            this.passwordErrorMessage = [];
            if(this.authUser.username.length == 0){
                this.usernameErrorMessage.push("Password cannot be null")
                this.usernameError = true;
                return;
            }
            if (this.authUser.password.length == 0){
                this.passwordErrorMessage.push("Password cannot be null")
                return;
            }
            
            this.$store.dispatch("login", this.authUser)
            .then(response => {
                this.signInProcess = false;
                if(response){
                    this.$router.push({name:"SystemAnnouncements"});
                }
            });

        }
    },
    computed: {
        ...mapGetters(['usernames']),
    },
    watch:{
        // usernames(nval,oval){
        
        //     console.log(nval)
        //     unames: []
        //     for(var i in nval){
        //         unames.push({text: nval[i]})
        //     }
        //     return unames;
        // }
    }
  
}
</script>

<style lang="stylus" scoped>
    .signin-card
        margin-top 150px
        padding-top 20px
        padding-bottom 10px
        padding-right 30px
        padding-left 30px
    
</style>
