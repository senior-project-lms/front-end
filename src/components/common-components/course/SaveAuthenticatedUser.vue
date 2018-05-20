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
                <v-toolbar-title>New Assistant</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn dark flat @click.native="save" v-if="selectedAssistant">Save</v-btn>
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
                        <v-flex md4 xs12>
                            <v-layout row wrap>
                                <v-flex md12 xs12>
                                    <v-card>
                                        <v-card-title class="title grey--text text--darken-2">User</v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-layout row wrap>
                                                    <v-flex md3 sm3 xs4>
                                                        <v-select
                                                        label="Search By"
                                                        :items="selectItems"
                                                        v-model="selectedSearchType">
                                                        </v-select>
                                                    </v-flex>  
                                                    <v-flex md6 sm6 xs6>
                                                        <v-text-field
                                                            label="Search"
                                                            v-model="searchParam"
                                                            required>

                                                        </v-text-field>
                                                    </v-flex>
                                                    <v-flex md2 sm2 xs2 v-if="$vuetify.breakpoint.width > 600">
                                                        <v-btn class="primary"
                                                        :loading="loading"
                                                        @click="search">
                                                        Search
                                                        </v-btn>
                                                    </v-flex>
                                                    <v-flex md2 sm2 xs1 v-else>
                                                        <v-btn icon class="primary"
                                                        :loading="loading"
                                                        @click="search">
                                                        <v-icon>search</v-icon>
                                                        </v-btn>
                                                    </v-flex>                                            
                                            </v-layout> 
                                            <v-layout row wrap>
                                                <v-flex md12 sm12 xs12>
                                                    <v-data-table
                                                        :headers="headers"
                                                        :items="users"
                                                        hide-actions
                                                        class="elevation-1"                                            
                                                    >
                                                    <template slot="items" slot-scope="props">
                                                        <tr :class="props.item.color">
                                                            <td class="text-xs-center">
                                                                {{props.item.name}}
                                                            </td>        
                                                            <td class="text-xs-center">
                                                                {{props.item.surname}}
                                                            </td>                                                                                                  
                                                            <td class="text-xs-center">{{ props.item.authority.name }}</td>
                                                            <td>
                                                            <a @click="selectAssistant(props.item)">Select</a>
                                                            </td>
                                                        </tr>
                                                    </template>                                                
                                                    </v-data-table>
                                                </v-flex>
                                            </v-layout>                                        
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex md12 xs12>
                                    <v-card v-if="selectedAssistant">
                                        <v-card-title class="title grey--text text--darken-2">
                                            Available Privileges
                                        <v-spacer></v-spacer>
                                        <v-text-field
                                            append-icon="search"
                                            label="Search"
                                            single-line
                                            hide-details
                                            v-model="privilegeSearch"
                                        ></v-text-field>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-data-table
                                        :headers="privilegeHeaders"
                                        :items="availableCoursePrivileges"
                                        :search="privilegeSearch"
                                        >
                                        <template slot="items" slot-scope="props">
                                            <td>{{ props.item.name }}</td>
                                            <td class="text-xs-right">
                                                <a @click="addNew(props.item)">add</a>
                                            </td>
                                        </template>
                                        </v-data-table>
                                    </v-card>                                    
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex md8 xs12>
                            <v-layout row wrap>
                                <v-flex md12 xs12>
                                    <v-card  v-if="selectedAssistant">
                                        <v-card-title class="title grey--text text--darken-2">
                                            Selected Assistant
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text>
                                            <v-layout row wrap>
                                                <v-flex md1 xs3>Name</v-flex>
                                                <v-flex md3 xs9>: {{ selectedAssistant.name }}</v-flex>
                                                <v-flex md1 xs3>Surname</v-flex>
                                                <v-flex md3 xs9>: {{ selectedAssistant.surname }}</v-flex>                                                                                                            
                                            </v-layout>
                                            <v-layout row wrap>
                                                <v-flex md1 xs3>Role</v-flex>
                                                <v-flex md3 xs9>: {{ selectedAssistant.authority.name }}</v-flex>  
                                                <v-flex md1 xs3>Email</v-flex>
                                                <v-flex md3 xs9>: {{ selectedAssistant.email }}</v-flex>                                                            
                                            </v-layout>                                                    
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex md6 xs12>
                                    <v-flex md12 xs12>
                                        <v-card v-if="selectedAssistant">
                                            <v-card-title class="title grey--text text--darken-2">
                                                Default Privileges
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                append-icon="search"
                                                label="Search"
                                                single-line
                                                hide-details
                                                v-model="defaultAssistantPrivilegeSearch"
                                            ></v-text-field>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-data-table
                                            :headers="privilegeHeaders"
                                            :items="defaultPrivileges"
                                            :search="defaultAssistantPrivilegeSearch"
                                            >
                                            <template slot="items" slot-scope="props">
                                                <td>{{ props.item.name }}</td>
                                                <td class="text-xs-right">
                                                    <a class="red--text" @click="removeDefault(props.item)">remove</a>
                                                </td>
                                            </template>
                                            </v-data-table>
                                        </v-card>                                    
                                    </v-flex>                           
                                </v-flex>
                                <v-flex md6 xs12>
                                    <v-flex md12 xs12>
                                        <v-card v-if="selectedAssistant">
                                            <v-card-title class="title grey--text text--darken-2">
                                                New Privileges
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                append-icon="search"
                                                label="Search"
                                                single-line
                                                hide-details
                                                v-model="newPrivilegeSearch"
                                            ></v-text-field>
                                            </v-card-title>
                                            <v-divider></v-divider>
                                            <v-data-table
                                            :headers="privilegeHeaders"
                                            :items="newPrivileges"
                                            :search="newPrivilegeSearch"
                                            >
                                            <template slot="items" slot-scope="props">
                                                <td>{{ props.item.name }}</td>
                                                <td class="text-xs-right">
                                                    <a class="red--text" @click="removeNew(props.item)">remove</a>
                                                </td>
                                            </template>
                                            </v-data-table>
                                        </v-card>                                    
                                    </v-flex>                           
                                </v-flex>                                
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>         
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';

import {SearchType} from '../../../properties/searchType'

export default{
    props:['dialog'],
    components:{
    },
    data(){
        return{
            privilegeSearch: '',
            defaultAssistantPrivilegeSearch: null,
            newPrivilegeSearch: '',
            loading: false,
            searchParam: '',
            step: 0,
            selectedSearchType: null,
            selectedAssistant: null,
            newPrivileges: [],
            selectItems: [
                {
                    text: 'Name',
                    type: SearchType.User.NAME
                },
                {
                    text: 'Lecturer',
                    type: SearchType.User.Surname
                },
            ],
            headers: [
                { text: "Name", value: "name", align: "center", sortable: false},
                { text: "Surname", value: "email", align: "center" , sortable: false},
                { text: "Role", value: "authority.name", align: "center" , sortable: false},
                { text: "", value: "name", align: "center" , sortable: false},

            ],     
            privilegeHeaders: [
                { text: "Name", value: "name", align: "center", sortable: false },
                { text: "", value: "name", align: "center" , sortable: false},

            ],                

        }
    },
    created(){
        //this.selectedSearchType = this.selectItems[0];
        this.initialize();
    },
    methods:{
        initialize(){
            this.selectedSearchType = this.selectItems[0];
            this.$store.commit('setAllCoursePrivileges', []);
            this.$store.commit('setDefaultPrivileges', []);
            this.searchParam = '';
            this.selectedAssistant = null;
            this.privilegeSearch = '';
            this.defaultAssistantPrivilegeSearch = '';
            this.newPrivilegeSearch = '';
        },
        cancel(){
            this.$parent.closeDialog();
        },
        selectAssistant(assistant){
            this.$store.commit('setUsers', []);
            this.selectedAssistant = assistant; 
        },
        search(){
            this.$store.commit('setAllCoursePrivileges', []);
            this.selectedAssistant = null;
            this.loading = true;
            if(this.selectedSearchType == null){
                this.$notify({type: "error", title: "Assistant Error", text: "Select a search type"})
                this.loading = false;                
                return;
            }
            else if (this.searchParam.length == 0){
                this.$notify({type: "error", title: "Assistant Error", text: "Enter a search parameter"})
                return;
            }
            else{
                const data = {
                    publicKey: this.$route.params.id,
                    type: this.selectedSearchType.type,
                    param: this.searchParam
                };
                this.$store.dispatch('getAllAssistantUsers', data)
                .then(response => {
                    this.loading = false;
                    this.$store.dispatch('getAllCoursePrivileges', this.$route.params.id)
                    this.$store.dispatch('getDefaultCourseAssistantPrivileges', this.$route.params.id)
                });
            }            
        },
        addNew(item){
            this.newPrivileges.push(item);
        },
        test(){
        },
        removeNew(item){
            this.newPrivileges.some((obj, index) => {
                if(obj.publicKey === item.publicKey){
                    this.newPrivileges.splice(index, 1);
                    return;
                }
            })
        },
        removeDefault(item){
            this.defaultPrivileges.some((obj, index) => {
                if(obj.publicKey === item.publicKey){
                    this.defaultPrivileges.splice(index, 1);
                    return;
                }
            })
        },
        save(){
            if(this.selectAssistant == null){
                this.$notify({type: "error", title: "Assistant Error", text: "Select a user"})
            }

            var privileges = [];

            this.defaultPrivileges.map(item => {
                privileges.push({publicKey: item.publicKey})
            })

            this.newPrivileges.map(item => {
                privileges.push({publicKey: item.publicKey})
            })

            var params = {
                user: {
                    publicKey: this.selectedAssistant.publicKey,
                },
                privileges: privileges
            }

            var data = {
                publicKey: this.$route.params.id,
                params: params,
            }

            this.$store.dispatch('saveAssistant', data);
            this.cancel();

        },
    },
    computed: {
        ...mapGetters(["authenticatedUser", 'accessPrivileges', 'users', 'allCoursePrivileges', 'defaultPrivileges']),
        availableCoursePrivileges(){
            var privileges = [];

            var defaultPrivilegesKeys = [];

            this.defaultPrivileges.map(item => {
                defaultPrivilegesKeys.push(item.publicKey);
            })    

            var newPrivilegeKeys = [];

            this.newPrivileges.map(item => {
                newPrivilegeKeys.push(item.publicKey);
            })

            for(var i in this.allCoursePrivileges){
                var privilege = this.allCoursePrivileges[i];
                if(!defaultPrivilegesKeys.includes(privilege.publicKey) && !newPrivilegeKeys.includes(privilege.publicKey)){
                    privileges.push(privilege)
                }    
            }
            return privileges;
            
        }
    },
    watch:{
        dialog(nval, oval){
            if(nval){
                this.initialize();
            }
            return nval;
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
