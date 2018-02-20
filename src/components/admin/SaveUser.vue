<template>
 <v-dialog v-model="dialog" persistent max-width="1000">
        <v-card>
          <v-card-title class="headline">User</v-card-title>
            <v-layout row wrap class="tab-btn">
                <v-flex md6>
                    <a color="" block @click="active = false" ><p class="text-md-center text-sm-center text-xs-center">Add User</p></a>
                    <v-divider v-if="!active" class="grey darken-4"></v-divider>
                </v-flex>
                <v-flex md6>
                    <a color="" block @click="active = true"><p class="text-md-center text-sm-center text-xs-center">Add Users</p></a>
                    <v-divider v-if="active" class="grey darken-4"></v-divider>
                </v-flex>
            </v-layout>
                

            <v-flex xs10 sm10 md10 offset-md1 offset-sm1 offset-xs1 class="post"> 
            <v-divider></v-divider>
                <div v-if="!active">
                    <v-layout row wrap>
                        <v-flex>
                            <v-text-field label="Username" v-model="user.username" required/>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Password" v-model="user.password" required/>
                        </v-flex>
                    </v-layout>   
                    <v-layout row wrap>
                        <v-flex>
                            <v-text-field label="Name"  v-model="user.name" required/>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="Surname"  v-model="user.surname" required/>
                        </v-flex>
                    </v-layout>
                    
                        


                    
                        
                    
                    <v-layout row wrap>
                        <v-flex>
                            <v-text-field label="Email"  v-model="user.email" required/>
                        </v-flex>
                    
                        
                        <v-flex>
                        <v-select
                                :items="accessLevels"
                                label="Select"
                                single-line
                                v-model="user.authority"
                                bottom
                        ></v-select>
                        </v-flex>                        
                </v-layout>
            </div>
                <div v-if="active" class="post">

                    <v-layout>
                        <v-flex>
                            <div class="upload-btn-wrapper">
                                <v-btn block outline>Upload File</v-btn>
                                <input type="file" @change="processFile($event)"/>
                            </div>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                            <v-flex>
                                <v-data-table
                                :headers="headers"
                                :items="users">
                                    <template slot="items" slot-scope="props">
                                        <tr>
                                            <td class="text-xs-center">{{ props.item.username }}</td>
                                            <td class="text-xs-center">{{ props.item.name }}</td>
                                            <td class="text-xs-center">{{ props.item.surname }}</td>
                                            <td class="text-xs-center">{{ props.item.password }}</td>
                                            <td class="text-xs-center">{{ props.item.email }}</td>
                                            <td class="text-xs-right"><a @click="removeUsers(props.index)"><v-icon color="red darken-2">cancel</v-icon></a></td>
                                        </tr>
                                    </template>
                                </v-data-table>

                            </v-flex>
                    </v-layout>
                </div> 
            </v-flex>
    
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" flat @click.native="cancel(false)">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click="save"
            v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_USER)">
            Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  
</template>
<script>
import { mapGetters } from 'vuex';


export default{
    props: ['dialog'],
    data(){
        return {
            user: {
                username: '',
                name: '',
                surname:'',
                password:'',
                email: '',
                authority:{
                    publicKey:'',

                }
            },
            uploadedFile: null,
            active: false,
            leftButton: null,
            rightButton: null,
            pagination: {
                sortBy: 'name'
            },
            headers: [
                { text: 'Username', value: 'username', align: 'center' },
                { text: 'Name', value: 'name', align: 'center'},
                { text: 'Surname', value: 'surname', align: 'center'},
                { text: 'Email', value: 'email', align: 'center'},
                { text: '', value: 'event' },
            ],
            users: [],
           
        }
    },
    created(){
        this.$store.dispatch('getAllAccessLevels');
     
        
    },
    methods:{
        processFile(event){
            var file = event.target.files[0];
            if(file != undefined || file != null){
                this.$store.dispatch('excelToJson', file);
            }
        },
        save(){
            if(!this.active){ // single save
                
                if(this.user.username.length > 0 && this.user.name.length > 0 && this.user.surname.length > 0 
                && this.user.password.length > 5 && this.user.email.length > 0){

                    const user = {
                        username: this.user.username,
                        name: this.user.name,
                        surname:this.user.surname,
                        password:this.user.password,
                        email:this.user.email,
                        authority: this.user.authority,
                        
                    }
                    this.$store.dispatch('saveUser', user)
                    .then(response => {
                        if(response.status){
                            this.$notify({type: "success", title: "User", text: "Successfully added."})
                            this.cancel();
                        }
                        else{
                            this.$notify({type: "error", title: "User", text: response.message})
                        }
                    });
                }
                else{
                    this.$notify({type: "error", title: "User", text: "Fill the empty fields."})
                }
            }
            else{ // multi save
                if(this.users.length > 0){
                    var users = [];
                    
                    this.users.forEach(item => {
                         const user = {
                            username : item.username,
                            name : item.name,
                            surname : item.surname,
                            password : item.password,
                            email : item.email,
                            authority: item.authority,
                        }
                        users.push(user);
                    })


                    this.$store.dispatch("saveAllUsers", users)
                    .then(response => {
                        if(response.status){
                            this.$notify({type: "success", title: "User", text: "Saved"})
                            this.cancel();
                        }
                        else{
                            this.$notify({type: "error", title: "User", text: response.message})
                        }
                    })
                }
                else{
                    this.$notify({type: "error", title: "User", text: "Add user collection."})
                }
            }
        },
        removeUser(index){
            this.users.splice(index, 1);
        },
        cancel(){
            this.$store.dispatch("clearExcelJson");
            this.users = [];
            this.user = {
                username: '',
                name: '',
                surname:'',
                password:'',
                email:'',
                authority:null,
            },
            this.$parent.cancelSavingUser();
        
        }

    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'excelJson','accessLevels']),
    },
    watch:{
        excelJson(nValue, oValue){
            this.users = nValue;
        },
        accessLevels(nValue,oValue){
            for (var index in nValue){
                nValue[index].text = nValue[index].name;
            }
        }
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

    .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        
    }


    .upload-btn-wrapper input[type=file] 
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
</style>
