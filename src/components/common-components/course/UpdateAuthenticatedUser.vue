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
                <v-toolbar-title>Update Assistant</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn dark flat @click.native="save" v-if="selectedAssistant">Save</v-btn>
                </v-toolbar-items>
                <v-menu bottom right offset-y>
                    <v-btn slot="activator" dark icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile @click="deleteAssistant">
                        <v-list-tile-title>Delete</v-list-tile-title>
                        </v-list-tile>
                    </v-list>                    
                </v-menu>
            </v-toolbar>
            <v-card-text>
                <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
                    <v-layout row wrap>
                        <v-flex md4 xs12>
                            <v-layout row wrap>
                                <v-flex md12 xs12>
                                    <v-card>
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
                                    <v-card >
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
                                        <v-card>
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
    props:['dialog', 'selectedAssistant'],
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
            newPrivileges: [],
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
            this.privilegeSearch = '';
            this.defaultAssistantPrivilegeSearch = '';
            this.newPrivilegeSearch = '';
            this.$store.dispatch('getAllCoursePrivileges', this.$route.params.id)
            this.$store.dispatch('getDefaultCourseAssistantPrivileges', this.$route.params.id)            
        },
        cancel(){
            this.$parent.closeDialog();
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
        deleteAssistant(){

            const data ={
                publicKey: this.$route.params.id,
                userPublicKey: this.selectedAssistant.publicKey,
            }
            this.$store.dispatch('deleteAssistant', data);
            this.cancel();

        }
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
