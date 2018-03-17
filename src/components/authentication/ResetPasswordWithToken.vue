<template>
    <div>
        <v-flex lg4 offset-lg4 md4 offset-md4 sm6 offset-sm3 xs12 >
            <v-card class="signin-card">
                <v-card-title class="headline">   
                    Update Password                  
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container fluid>
                        <v-layout row wrap>
                            <v-flex>
                                <v-text-field
                                        label="Enter your password"
                                        v-model="passwords.password"
                                        :text="text"
                                        :min="8"
                                        required>
                                </v-text-field>    
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex>
                                <v-text-field
                                        label="Enter your password"
                                        v-model="passwords.confirmPassword"
                                        :text="text"
                                        :min="8"
                                        required>
                                </v-text-field>    
                            </v-flex>
                        </v-layout>                        
                        <v-layout row wrap>
                            <v-flex>
                                 <v-btn @click="submit" block color="secondary" dark>Update</v-btn>
                            </v-flex>
                            
                        </v-layout>                        
                    </v-container>
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
            text: 'password',
            signInProcess: false,
            passwords: {
                password:'',
                confirmPassword:'',
            }
        }
    },
    created(){
    },
    methods:{
        submit(){
            if(this.passwords.password.length < 8){
                this.$notify({type: "error", title: "Reset Password", text: "Password must be mininum 8 character"})

            }
            else if(this.passwords.password != this.passwords.confirmPassword){
                this.$notify({type: "error", title: "Reset Password", text: "Passwords are not matched"})
            }
            else{
                const data = {
                    passwords: this.passwords,
                    token: this.$route.params.token
                }
                this.$store.dispatch("resetPassword", data)
                .then(response => {
                    this.signInProcess = false;
                    if(response){
                        this.$router.push({name:"SignIn"});
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
    
</style>
