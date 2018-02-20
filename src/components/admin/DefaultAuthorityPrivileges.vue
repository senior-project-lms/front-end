<template>
    <div>
        <loader v-if="!isLoaded"/>
        <div v-if="isLoaded">
            <v-layout row wrap class="def-auth-priv">
                  <v-flex md2>
                    <v-card>
                        <v-list subheader>
                            <v-subheader>Authorities</v-subheader>
                            <template v-for="(defaultAuth, i) in displayedAuthorities">
                                <v-list-tile v-model="selectedAuthority" :key="defaultAuth.authority.publicKey" @click="updatePrivilegeStatus(defaultAuth.publicKey)">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="defaultAuth.authority.name"/>
                                    </v-list-tile-content>      
                                    <v-icon right v-if="i == selectedAuthority">check_circle</v-icon>
                                </v-list-tile>
                                <v-divider :key="`defaultAuth-${i}`"></v-divider>
                            </template>
                        </v-list>
                        <div class="text-xs-center">
                            <v-pagination  class="center" :length="authorityPageCount" v-model="authorityPage"></v-pagination>
                        </div>
                    </v-card>
                </v-flex>              
                <v-flex md4 offset-md1>
                    <v-card>
                        <v-list subheader>
                            <v-subheader> Privileges</v-subheader>
                            <v-list-tile v-for="privilege in displayedPrivileges" :key="privilege.publicKey">
                                <v-list-tile-action>
                                <v-checkbox v-model="privilege.hasAccess" @click="updateHasAccess(privilege.publicKey)"></v-checkbox>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ privilege.name }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                        <div class="text-xs-center">
                            <v-pagination center :length="privilegePageCount" v-model="privilegePage"></v-pagination>
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Loader'

const   PRIVILEGE_PER_PAGE = 10;

export default {
    components:{
        Loader
    },
    data(){
        return {
            selectedAuthority: null,
            privilegePage: 1,
            authorityPage: 1,
            isLoaded: false,
            displayedPrivileges: [],
            displayedAuthorities: [],


        }
    },
    created(){

        this.$store.dispatch("hasAccessPrivilege", this.accessPrivileges.READ_DEFAULT_AUTHORITIES_AND_PRIVILEGES)
        .then(auth => {
            if(!auth){
                this.$router.push({name: 'Page404'})
                return;
            }
            this.initializeData();
            this.isLoaded = true;
        })
    },
    methods:{    
        initializeData(){
            this.$store.dispatch("getAllDefaultAuthorityPrivileges")
              .then(response => {
                if(response.status){
                    var publicKey = this.defaultAuthorityPrivileges[0].publicKey;
                    this.updatePrivilegeStatus(publicKey);
                    this.updateDisplayedAuthorities(1);
                }
                
            });
            this.$store.dispatch("getAllPrivileges")
            .then(response => {
                if(response.status){
                    this.privileges.map(privilege => {
                        privilege.hasAccess = false;
                    })
                    this.updateDisplayedPrivileges(1);
                }
                
            });
         },
         updatePrivilegeStatus(defaultAuthorityKey){
            for(var i in this.defaultAuthorityPrivileges){
                var defAuth = this.defaultAuthorityPrivileges[i];
                if(defAuth.publicKey == defaultAuthorityKey){
                    
                    this.privileges.map(privilege => {
                        privilege.hasAccess = false;
                        if(defAuth.privileges.includes(privilege.publicKey)){
                            privilege.hasAccess = true;
                        }
                    });
                    this.updateDisplayedPrivileges(this.privilegePage)
                    this.selectedAuthority = i;
                    return;
                }
            }
        
         },
         updateDisplayedPrivileges(page){
            this.displayedPrivileges = [];
            const indexBefore = PRIVILEGE_PER_PAGE * (page - 1)
            const indexAfter = PRIVILEGE_PER_PAGE * page;
            this.privileges.map((privilege, index) => {
                if(indexBefore <= index && index < indexAfter){
                    this.displayedPrivileges.push(privilege);
                }
            })
         },

        updateDisplayedAuthorities(page){
            this.displayedAuthorities = [];
            const indexBefore = PRIVILEGE_PER_PAGE * (page - 1)
            const indexAfter = PRIVILEGE_PER_PAGE * page;
            this.defaultAuthorityPrivileges.map((defaultAuth, index) => {
                if(indexBefore <= index && index < indexAfter){
                    
                    this.displayedAuthorities.push(defaultAuth);
                }
            })
         },
        updateHasAccess(privilegePublicKey){
            this.privileges.map(privilege => {
                if(privilege.publicKey == privilegePublicKey){
                    privilege.hasAccess = !privilege.hasAccess;
                    return;
                }
            })
            this.updateDisplayedPrivileges(this.privilegePage)

        }

    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges','accessLevels', 'defaultAuthorityPrivileges', 'privileges']),
        privilegePageCount(){
            return Math.ceil(this.privileges.length / PRIVILEGE_PER_PAGE);
        },

        authorityPageCount(){
            return Math.ceil(this.defaultAuthorityPrivileges.length / PRIVILEGE_PER_PAGE);
        }


        
    },
    watch: {
        privilegePage(newVal, oldVal){
            this.updateDisplayedPrivileges(newVal);
            this.privilegePage = newVal;
        }
    }
}
</script>

<style lang="stylus" scoped>

    .def-auth-priv
        margin-left 15px
        margin-top 20px
</style>
