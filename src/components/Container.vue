<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.width > 1264"
      app
      width="250"
      >
      <v-list  dense class="left-menu-list" >
        <template v-for="(item, i) in leftMenuItems" v-if="item.authenticated.includes(authUser.accessLevel)">
          <v-list-tile  v-bind:to="item.to" :key="i">
            <v-list-tile-action>
                <v-badge  v-if="item.badge && user.badge">
                    <span slot="badge">{{ user.badgeCount}}</span>
                    <v-icon>{{item.icon}}</v-icon>
                </v-badge>
                <v-icon v-else>
                  {{ item.icon }}
                </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{ item.title }}
                </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left>

      <v-toolbar-side-icon @click.stop="menuVisible"></v-toolbar-side-icon>

      <v-btn v-show="drawer" icon @click.stop="menuMini">
        <v-icon  v-html="miniVariant ? 'chevron_right' : 'chevron_left'" v-show="$vuetify.breakpoint.width > 1264"></v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- diger icerikler-->
      <v-menu left>
        <v-btn flat  slot="activator">
          <v-icon left>fa-angle-down</v-icon>
          {{authUser.username}}
        </v-btn>
        <v-list>
           <template v-for="(item, i) in topMenuItems">
            <v-list-tile  v-bind:to="item.to" :key="i">
              <v-list-tile-action>
                  <v-icon >
                    {{ item.icon }}
                  </v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                  <v-list-tile-title>
                      {{ item.title }}
                  </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-menu>
    </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
  import {AccessLevel} from "../properties/accessLevel";
  
  import {mapGetters} from 'vuex';
  export default {
    data () {
      return {
        user: {
          username: '',
          badge: true,
          badgeCount: 3,
        },
        arrow: false,
        clipped: false,
        drawer: true,
        miniVariant: false,
        title: 'LMS',
        leftMenuItems: [
          {
            icon: 'fa-tachometer',
            title: 'Home',
            to: {name: 'Announcement'},
            authenticated: [],
            
          },
          {
            icon: 'fa-bullhorn',
            title: 'Announcement',
            to: {name: 'Announcement'},
            badge: true,
            authenticated: [],
          },
          {
            icon: 'fa-book',
            title: 'Courses',
            to: {name: 'CourseList'},
            authenticated: [],
          },
          {
            icon: 'fa-calendar',
            title: 'Calendar',
            to: {name:'Calendar'},
            authenticated: [],
          },
          {
            icon: 'fa-files-o',
            title: 'Public Resources',
            to: {name:'PublicResources'},
            authenticated: [],
          },
          {
            icon: 'fa-question-circle-o',
            title: 'QA-Global',
            to: {name: 'QA-Global'},
            authenticated: [],
          },
          {
            icon: 'fa-bullhorn',
            title: 'System Announcement',
            to: {name: 'SystemAnnouncements'},
            authenticated: [AccessLevel.SUPER_ADMIN, AccessLevel.ADMIN, AccessLevel.LECTURER, AccessLevel.ASISTANT, AccessLevel.STUDENT],
          },
          {
            icon: 'fa-book',
            title: 'Courses',
            to: {name: 'CoursesForAdmin'},
            authenticated: [AccessLevel.SUPER_ADMIN, AccessLevel.ADMIN],
          },
          {
            icon: 'fa-users',
            title: 'Users',
            to: {name: 'UsersForAdmin'},
            authenticated: [AccessLevel.SUPER_ADMIN, AccessLevel.ADMIN],
          },
                    
        ],
        topMenuItems: [
          {
            icon: 'fa-user',
            title: 'Profile',
            to: {name:'Profile'},
            authenticated: [],
          },
          {
            icon: 'fa-cog',
            title: 'Settings',
            to: {name:'Settings'},
            authenticated: [],
          },
          {
            icon: 'fa-sign-out',
            title: 'Sign Out',
            to: {name:'SignOut'},
            authenticated: [],
          },
        ]

      }
    },
    created(){
          this.setMenuStatus();

          


    },
    methods:{
      menuVisible(){
        this.drawer = !this.drawer;
        localStorage.setItem('menu-visible', this.drawer);
      },
      menuMini(){
        this.miniVariant = !this.miniVariant
        localStorage.setItem('menu-mini', this.miniVariant);
      },
      setMenuStatus(){
          if(this.$vuetify.breakpoint.width > 1264){
            var menuMini = localStorage.getItem('menu-mini');
            var menuVisible = localStorage.getItem('menu-visible')
            this.drawer = JSON.parse(menuVisible);
            this.miniVariant = JSON.parse(menuMini);
          }
      }
    },
    updated(){
          this.setMenuStatus();
    },
    computed:{
      ...mapGetters(['authenticatedUser']),

      authUser(){
        return {
          
          username: this.authenticatedUser.username,
          accessLevel: this.authenticatedUser.authority.accessLevel,
        }
      }

    }

  }

</script>

<style lang="stylus" scoped>

  .link
    text-decoration none
    color initial
    cursor pointer
    color #424242
  
  .left-menu-list v-list-tile:hover 
    color dark
    

</style>
