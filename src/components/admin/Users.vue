<template>
    <div>
        <v-layout class="top-info">   
            <v-flex md4 class="outer-left-box">
                <v-card color="green lighten-2" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">26</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">Active Users</div>
                                </div>
                            </v-flex>
                        </v-layout>                            
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md4 class="inner-box">
                <v-card color="blue lighten-2" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">132</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">?? Users</div>
                                </div>
                            </v-flex>
                        </v-layout>                            
                    </v-container>
                </v-card>
            </v-flex>   
            <v-flex md4 class="outer-right-box">
                <v-card color="red lighten-1" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">26</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">Active Users</div>
                                </div>
                            </v-flex>
                        </v-layout>                            
                    </v-container>
                </v-card>
            </v-flex>             
        </v-layout>
        <v-divider class="box-divider"></v-divider>
        <v-layout class="user-list">
                <v-flex>
                    <v-data-table
                    :headers="headers"
                    :items="users">
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td>{{ props.item.username }}</td>
                                <td class="text-xs-center">{{ props.item.name }}</td>
                                <td class="text-xs-center">{{props.item.surname}}</td>
                                <td class="text-xs-center">{{ props.item.email }}</td>
                                <td class="text-xs-right"><a @click="removeUsers(props.index)"><v-icon color="blue darken-2">settings</v-icon></a></td>
                            </tr>
                        </template>
                    </v-data-table>

                </v-flex>
        </v-layout>        
        <div>
            <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
            v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_USER)"> 
                <v-icon>add</v-icon>
            </v-btn>
        </div>

        <save-user :dialog="dialog"/>
    </div>


</template>
<script>
import { mapGetters } from 'vuex';
import SaveUser from './SaveUser'

export default {
    components:{
        SaveUser
    },
    data(){
        return {
            dialog: false,
           headers: [
                { text: 'Username', value: 'username', align: 'left' },
                { text: 'Name', value: 'name', align: 'center'},
                { text: 'Surname', value: 'surname', align: 'center'},
                { text: 'Email', value: 'email', align: 'center'},
                { text: '', value: 'event' },
            ],
        }
    },
    created(){
      this.$store.dispatch("hasAccessPrivilege", this.accessPrivileges.READ_ALL_USERS)
      .then(auth => {
          if(!auth){
            this.$router.back();
          return;
          }
      })
  
        this.$store.dispatch("getAllActiveUsers");
    },
    methods:{
          
    cancelSavingUser(){
      this.dialog = false;
    }

    },
    computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'users']),
    },

  
}
</script>

<style lang="stylus" scoped>
    .outer-left-box
        margin-top 10px
        margin-left 15px
        margin-right 5px
    
    .outer-right-box
        margin-top 10px
        margin-right 15px
        margin-left 5px
    
    .inner-box
        margin-top 10px
        margin-right 5px
        margin-left 5px

    .box-divider
        margin-top 20px
        margin-bottom 10px

    .user-list
        margin-right 15px
        margin-left 15px

</style>
