<template>
    <div>
        <v-flex md12>
            <v-card height="70">
               <v-card-media class="white--text" height="70" src="/static/parallax2.jpg">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline">Introduction to Programming</span>
                        </v-flex>
                    </v-layout>
                </v-container>
               </v-card-media>
            </v-card>
        </v-flex>
        <v-flex md12>
            <v-tabs grow>
                <v-tabs-bar color="grey lighten-4" light >
                    <v-tabs-slider class="blue"></v-tabs-slider>
                    <v-tabs-item v-for="(item, i) in courseTabMenus" :key="i" :to="item.to" router :href="'#tab-'+`${i}`">
                        {{ item.text }}
                            <v-badge class="notification" v-if="notifications[item.text]">
                            <span slot="badge">{{ notifications[item.text] }}</span>
                        </v-badge>
                    </v-tabs-item>
                </v-tabs-bar>
                        
                    <v-card flat>
                        <main>
                            <router-view></router-view>
                        </main>
                    </v-card>
                
            </v-tabs>
        </v-flex>      
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
        
    data () {
        return {
        notifications: {'Announcements': 1, 'Quiz - Testing': 1}

        }
    },
    created(){
    
    },
    computed: {
        ...mapGetters(['courseTabMenus']),
    }

}
</script>

<style lang="stylus" scoped>
    
    .nav
        margin-top 10px
    
    .course
        color #424242
    
    .notification
        margin-left 10px
</style>

