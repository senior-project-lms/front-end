<template>
  <div>
      <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn icon @click="cancel" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Add Users</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn dark flat @click.native="saveAll">Save</v-btn>
                </v-toolbar-items>
                <v-menu bottom right offset-y>
                    <v-btn slot="activator" dark icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </v-menu>
            </v-toolbar>
            <v-card-text>
                <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
                    <v-layout row wrap>
                        <v-flex md5 lg5 xs12 sm12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>

                                        <v-flex md6>
                                            <v-select
                                            label="username"
                                            :items="notEnrolledUsers"
                                            v-model="selectedUser"
                                            autocomplete
                                            ></v-select>
                                         </v-flex>
                                         <v-flex md6>
                                            <v-btn outline color="indigo" @click="addToList">Add</v-btn>                                           
                                         </v-flex>
                                    </v-layout>             
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex md7 lg7 xs12 sm12>
                            <v-card>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex md2 sm3 xs6>
                                            <div class="upload-btn-wrapper">
                                                <v-btn block outline>Upload File</v-btn>
                                                <input type="file" @change="processFile($event)"/>
                                            </div>
                                        </v-flex>
                                        <v-flex md4 sm12 xs12>
                                            <b>Columns must be in excel file:</b> <p class="red--text">username(unique)</p>
                                        </v-flex>
                                    </v-layout>                                         
                                    <v-layout row wrap> 
                                        <v-flex sm12 xs12>
                                            <v-data-table
                                            :headers="headers"
                                            :items="users"
                                            class="elevation-1">
                                                <template slot="items" slot-scope="props">
                                                    <tr>
                                                        <td class="text-xs-left">{{ props.item.username }}</td>
                                                        <td class="text-xs-right"><a @click="removeUser(props.index)"><v-icon color="red darken-2">cancel</v-icon></a></td>
                                                    </tr>
                                                </template>
                                            </v-data-table>

                                        </v-flex>
                                    </v-layout>                                    
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>                           

            </v-card-text>     
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    props: ['dialog'],
    data(){
        return {
            usernames: [],
            multiUserAuthority: null,
            selectedUser: null,
            user: {
                active: null,
                username: '',

            },
            headers: [
                { text: 'Username', value: 'username', align: 'left' },

                { text: '', value: 'event' },
            ],
            users: [],
           
        }
    },
    created(){
     
        this.fetchNotEnrolledUsers();
    },
    methods:{
        fetchNotEnrolledUsers(){
            this.$store.dispatch("getNotEnrolledUsers", this.$route.params.id)
        },
        processFile(event){
            var file = event.target.files[0];
            if(file != undefined || file != null){
                this.$store.dispatch('excelToJson', file);
                this.uploadFile = false;
            }
        },
        addToList(){
            
            if(this.selectedUser != null && !this.usernames.includes(this.selectedUser.username)){
                this.users.push(this.selectedUser)
                this.usernames.push(this.selectedUser.username);
            }
        },
        saveAll(){
            const data = {
                coursePublicKey:  this.$route.params.id,
                params: this.usernames
            }
            this.$store.dispatch("registerByAdmin", data );
            this.cancel();
                 
        },
        removeUser(index){
            this.users.splice(index, 1);
            this.usernames.splice(index, 1);
        },
        clearForm(){
            this.users = [];
            this.user = {
                username: '',
            };
        },
        cancel(){
            this.clearForm();
            this.users = [];
            this.$parent.closeDialog();    
        },


    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'excelJson', 'notEnrolledUsers']),
    },
    watch:{
        excelJson(nValue, oValue){
            nValue.map(item =>{
                if(item.username != undefined && item.username != '' &&  !this.usernames.includes(item.username)){
                    this.users.push(item)
                    this.usernames.push(item.username);
                }
            });
            //this.users = this.users.concat(nValue);

        },
        notEnrolledUsers(nValue,oValue){
            for (var index in nValue){
                nValue[index].text = nValue[index].username;
            }
            return nValue;
        },        
    }
}
    
</script>
<style lang="stylus" scoped>
    .post
        margin-top 30px
    .tab-btn
        margin-left 5px
        margin-right 5px
    
    .input-file
        background-color Transparent
        background-repeat no-repeat
        border none
        cursor pointer
        overflow hidden
        outline none
    .upload-btn-wrapper
        position: relative
        overflow: hidden
        
    
    .upload-btn-wrapper input[type=file] 
        font-size 100px
        position absolute
        left 0
        top 0
        opacity 0

    .auth-select
        margin-top -10px

</style>