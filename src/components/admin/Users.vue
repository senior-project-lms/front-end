<template>
    <div>
        <loader v-if="!isLoaded"/>
        <div v-if="isLoaded">
            <v-container fluid grid-list-md>
                <v-layout >   
                    <v-flex md4 sm4>
                        <v-card color="green lighten-2" class="white--text">
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">{{ usersStatus.visibleUsers }}</div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                        <div class="headline text-md-center text-sm-center">
                                                <a class="white--text" @click="fetchActiveUsers">
                                                    Active
                                                </a>
                                            </div>
                                        </div>
                                    </v-flex>
                                </v-layout>                            
                            </v-container>
                        </v-card>
                    </v-flex>
                    <v-flex md4 sm4>
                        <v-card color="blue lighten-2" class="white--text">
                            <v-container fluid grid-list-lg>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">{{ usersStatus.invisibleUsers }}</div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">
                                                <a class="white--text" @click="fetchInactiveUsers">
                                                    Deactivated
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
                                            <div class="headline text-md-center text-sm-center">0</div>
                                        </div>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex>
                                        <div>
                                            <div class="headline text-md-center text-sm-center">Nothing</div>
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
                            <v-card>
                                <v-card-title>
                                    <h2 class="active-text grey--text darken-4">{{ activeText }}</h2>
                                    <v-spacer></v-spacer>
                                    <v-text-field
                                        append-icon="search"
                                        label="Search"
                                        single-line
                                        hide-details
                                        v-model="search"
                                    ></v-text-field>
                                </v-card-title>
                                <v-data-table
                                    :headers="headers"
                                    :items="users"
                                    :rows-per-page-items="[50, 75]"
                                    :search="search">
                                        <template slot="items" slot-scope="props">
                                            <tr :class="props.item.color">
                                                <td :to="{name: 'Profile', params: {id: props.item.publicKey}}">{{ props.item.username }}</td>
                                                <td class="text-xs-center">
                                                    {{props.item.name}} {{ props.item.surname}}
                                                </td>
                                                
                                                
                                                <td class="text-xs-center">{{ props.item.email }}</td>
                                                <td class="text-xs-center">{{ props.item.authority.name }}</td>
    
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
                            </v-card>
                        </v-flex>
                </v-layout> 
            </v-container>
            <div>
                <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
                v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_USER)"> 
                    <v-icon>add</v-icon>
                </v-btn>
            </div>
            <save-user :dialog="dialog"/>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import SaveUser from "./SaveUser";
import Loader from "@/components/Loader";

export default {
  components: {
    SaveUser,
    Loader
  },
  data() {
    return {
      search: "",
      activeText: "",
      isLoaded: false,
      dialog: false,
      headers: [
        { text: "Username", value: "username", align: "left" },
        { text: "Name", value: "name", align: "center" },
        { text: "Email", value: "email", align: "center" },
        { text: "Role", value: "authority.name", align: "center" },
        { text: "", value: "event" }
      ]
    };
  },
  created() {
    this.$store
      .dispatch("hasAccessPrivilege", this.accessPrivileges.READ_ALL_USERS)
      .then(auth => {
        if (!auth) {
          this.$router.push({ name: "Page404" });
          return;
        }
        this.initializeData();
        this.isLoaded = true;
      });
  },
  methods: {
    initializeData() {
      this.fetchActiveUsers();
      this.$store.dispatch("getUsersStatus");
      this.activeText = "Active Users";
    },
    fetchActiveUsers() {
      this.$store.dispatch("getAllActiveUsers", true);
      this.activeText = "Active Users";
    },
    fetchInactiveUsers() {
      this.$store.dispatch("getAllActiveUsers", false);
      this.activeText = "Deactiveted Users";
    },
    updateVisibility(publicKey, visible) {
      for (var index in this.users) {
        if (publicKey == this.users[index].publicKey) {
          if (visible) {
            this.users[index].color = "light-green lighten-4";
          } else {
            this.users[index].color = "red lighten-4";
          }

          break;
        }
      }
      this.$store.dispatch("updateUserVisibility", {
        publicKey: publicKey,
        visible: visible
      });
    },
    closeDialog() {
      this.dialog = false;
    }
  },
  computed: {
    ...mapGetters([
      "authenticatedUser",
      "accessPrivileges",
      "users",
      "usersStatus"
    ])
  },
};
</script>

<style lang="stylus" scoped>

.box-divider 
    margin-top 20px
    margin-bottom 10px



</style>
