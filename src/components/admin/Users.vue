<template>
    <div>
        <v-layout class="top-info">   
            <v-flex md4 class="outer-left-box">
                <v-card color="green lighten-2" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">{{ usersStatus.visibleUsers }}</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                   <div class="headline text-md-center">
                                        <a class="white--text" @click="fetchActiveUsers">
                                            Active Users
                                        </a>
                                        
                                    </div>
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
                                    <div class="headline text-md-center">{{ usersStatus.invisibleUsers }}</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">
                                        <a class="white--text" @click="fetchInactiveUsers">
                                            Deactivated Users
                                        </a>
                                    </div>
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
                                    <div class="headline text-md-center">GG</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">??</div>
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
                    :rows-per-page-items="[50, 75]"
                        <template slot="items" slot-scope="props">
                            <tr :class="props.item.color">
                                <td>{{ props.item.username }}</td>


                                <td class="text-xs-center">
                                <router-link :to="{name: 'Profile', params: {id: props.item.publicKey}}">
                                    {{ `${ props.item.name} ${ props.item.surname}` }}
                                </router-link>
                                </td>
                                
                                
                                <td class="text-xs-center">{{ props.item.email }}</td>
                        <!--       
                                <td class="text-xs-right"><a @click="removeUsers(props.index)"><v-icon color="blue darken-2">settings</v-icon></a></td>
                        -->
                        
                            <td>
                                <v-layout  right>
                                    <v-flex>
                                        <v-switch class="user-switch" v-model="props.item.visible" @change="updateVisibility(props.item.publicKey, props.item.visible)"></v-switch>
                                    </v-flex>
                                    <v-flex>
                                        <a><v-icon color="blue darken-2">settings</v-icon></a>
                                    </v-flex>
                                </v-layout>    
                            </td>
                            
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
        fetchActiveUsers(){
            this.$store.dispatch("getAllActiveUsers", true);
        },
        fetchInactiveUsers(){
            this.$store.dispatch("getAllActiveUsers", false);
        },
        updateVisibility(publicKey, visible){
            for(var index in this.users){
                if(publicKey == this.users[index].publicKey){
                    if(visible){
                        this.users[index].color = 'light-green lighten-4';
                    }
                    else{
                        this.users[index].color = 'red lighten-4';
                    }
                    
                    break;
                }
            }
            this.$store.dispatch('updateUserVisibility', {publicKey: publicKey, visible: visible});
        },      
    cancelSavingUser(){
      this.dialog = false;
    }

    },
    computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'users','usersStatus']),
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
    
    .user-switch
        margin-right 20px
</style>
