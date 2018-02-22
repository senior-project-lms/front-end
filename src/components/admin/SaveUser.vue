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
                <v-toolbar-title>Save User</v-toolbar-title>
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
                                            <v-text-field label="Username" v-model="user.username" required/>
                                        </v-flex>
                                        <v-flex md3>
                                            <v-text-field label="Password" v-model="user.password" required disabled/>
                                        </v-flex>
                                        <v-flex md3>
                                            <v-btn color="info" block @click="generatePasswordForUser">Generate</v-btn>
                                        </v-flex>

                                    </v-layout>   
                                    <v-layout row wrap>
                                        <v-flex md6>
                                            <v-text-field label="Name"  v-model="user.name" required/>
                                        </v-flex>
                                        <v-flex md6>
                                            <v-text-field label="Surname"  v-model="user.surname" required/>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row wrap>
                                            <v-flex md6>
                                                <v-text-field label="Email"  v-model="user.email" required/>
                                            </v-flex>
                                            <v-flex md6>
                                                <v-select
                                                        :items="accessLevels"
                                                        label="Select Authority"
                                                        single-line
                                                        v-model="user.authority"
                                                        bottom
                                                        required>
                                                ></v-select>
                                            </v-flex>                        
                                    </v-layout>
                                    <v-layout>
                                        <v-flex md12>
                                              <div class="text-xs-right">
                                                    <v-btn block outline color="indigo" @click="addToList">Add</v-btn>
                                              </div>
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
                                            <v-btn block outline v-if="!uploadFile" disabled="">Upload File</v-btn>
                                            <div class="upload-btn-wrapper" v-if="uploadFile">
                                                <v-btn block outline>Upload File</v-btn>
                                                <input type="file" @change="processFile($event)"/>
                                            </div>
                                        </v-flex>
                                        <v-flex md6 sm6 xs6>
                                            <v-select
                                                class="auth-select"
                                                :items="accessLevels"
                                                label="Select Authority"
                                                single-line
                                                v-model="multiUserAuthority"
                                                bottom
                                                required>
                                            </v-select>
                                        </v-flex>
                                        <v-flex md4 sm12 xs12>
                                            <b>Columns must be in excel file:</b> <p class="red--text">username(unique), email(unique), name, surname</p>
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
                                                        <td class="text-xs-center">{{ props.item.username }}</td>
                                                        <td class="text-xs-center">{{ props.item.name }}</td>
                                                        <td class="text-xs-center">{{ props.item.surname }}</td>
                                                        <td class="text-xs-center">{{ props.item.email }}</td>
                                                        <td class="text-xs-center">{{ props.item.password }}</td>
                                                        <td class="text-xs-center">{{ props.item.authority.name }}</td>
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
            multiUserAuthority: null,
            user: {
                active: null,
                username: '',
                name: '',
                surname:'',
                password:'',
                email: '',
                authority:{
                    publicKey:'',
                }
            },
            uploadFile: false,
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
                { text: 'Password', value: 'password', align: 'center'},
                { text: 'Authority', value: 'authority', align: 'center'},

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
                this.uploadFile = false;
            }
        },
        addToList(){
            if(this.user.username.length > 0 && this.user.name.length > 0 && this.user.surname.length > 0 
                && this.user.password.length >= 8 && this.user.email.length > 0){
                    const user = {
                        username: this.user.username,
                        name: this.user.name,
                        surname:this.user.surname,
                        password:this.user.password,
                        email:this.user.email,
                        authority: this.user.authority,
                        
                    }
                    this.users.push(user);
                    //this.clearForm();
                    return;
            }
            else{
                    this.$notify({type: "error", title: "User", text: "Fill the empty fields."})
            }
        },
        saveAll(){
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
                });

                this.$store.dispatch("saveAllUsers", users)
                .then(response => {
                    if(response.status){
                        this.$notify({type: "success", title: "Users", text: "Saved"})
                        this.cancel();
                    }
                    else{
                        this.$notify({type: "error", title: "Users", text: response.message})
                    }
                });

            }
            else{
                this.$notify({type: "error", title: "User", text: "Add user collection."})
            }
        
        },
        removeUser(index){
            this.users.splice(index, 1);
            if(this.user.length == 0){
                this.multiUserAuthority = null;
            }
        },
        clearForm(){
            this.users = [];
            this.user = {
                username: '',
                name: '',
                surname:'',
                password:'',
                email:'',
                authority:null,
            };
        },
        cancel(){
            this.clearForm();
            this.users = [];
            this.$parent.closeDialog();    
        },
        generatePasswordForUser(){
            this.user.password = this.generatePassword();

        },
        generatePassword(){
            var password = '';
            
            const minForNumber = 48;
            const maxForNumber = 57;
            const minForCapital = 65;
            const maxForCapital = 90;
            const minForLover = 97;
            const maxForLover = 122;

            // capital
                var ascii = Math.floor(Math.random() * (maxForCapital - minForCapital + 1)) + minForCapital;
                password += String.fromCharCode(ascii);
            // lover
            for(var i = 0; i < 3; i++){
                var ascii = Math.floor(Math.random() * (maxForLover - minForLover + 1)) + minForLover;
                password += String.fromCharCode(ascii);
            }

             // number
            for(var i = 0; i < 4; i++){
                var ascii = Math.floor(Math.random() * (maxForNumber - minForNumber + 1)) + minForNumber;
                password += String.fromCharCode(ascii);
            }
            return password;
        }
    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'excelJson','accessLevels']),
    },
    watch:{
        excelJson(nValue, oValue){
            if(this.multiUserAuthority == null){
                return nValue;
            }
            this.users = nValue;
            const auth = {
                publicKey: this.multiUserAuthority.publicKey,
                name:  this.multiUserAuthority.name
            };
            this.users.map(user => {
                user.authority = auth;
                user.password = this.generatePassword();
            });
            this.multiUserAuthority = null;
        },
        accessLevels(nValue,oValue){
            for (var index in nValue){
                nValue[index].text = nValue[index].name;
            }
        },
        multiUserAuthority(nVal, oVal){
            if(nVal != null){
                this.uploadFile = true
                return nVal;
            }
            this.uploadFile = false;
            return nVal;
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