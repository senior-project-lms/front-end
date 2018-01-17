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
                                :items="items"
                                @change="$v.select.$touch()"
                                @blur="$v.select.$touch()"
                                required>
                                </v-select>
                        </v-flex>
                        <v-flex>
                            <v-text-field
                                    label="Enter your password"
                                    hint="At least 8 characters"
                                    v-model="authUser.password"
                                    min="8"
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
                              <v-btn block color="secondary" dark>Sign in</v-btn>
                        </v-flex>

                    </v-flex>
                
                </v-card-title>
            </v-card>                
        </v-flex>
    </div>
</template>

<script>
export default {
    data(){
        return {
            show: true,
            checkbox: false,
            items: [
                'mock.admin',
                'mock.lecturer',
                'mock.student'
            ],
            authUser: {
                username: 'mock.admin',
                password: 'test.password',
            },
        }
    }
  
}
</script>

<style scoped>

    .signin-card{
        margin-top: 150px;
        padding-top: 20px;
        padding-bottom: 10px;
        padding-right: 30px;
        padding-left: 30px;
    }

</style>
