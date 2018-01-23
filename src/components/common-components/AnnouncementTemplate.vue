<template>
    <div class="Announcement" v-if="!deleted">
        <v-card :color="unread" :class="{'border-color': announcement.borderColor}">

            <a v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)"
                @click="dialog = true"
                class="right dismiss">
                delete
            </a>
            <a v-else class="right dismiss" href="">dismiss</a>
            
            <v-card-title>
                <h5 class="headline">{{ announcement.title }}</h5>
            </v-card-title>
            <v-divider class="divider"></v-divider>
            <v-card-text>
                <pre>
                    <p class="text" v-html="announcement.content"/>
                </pre>
                <ul class="file-list" v-for="(resource, i) in announcement.resources" :key="i">
                    <li>
                       <a  :href="resource.url" download> {{ resource.originalFileName}}</a>
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="detail">
                        <span class="right grey--text ">{{ moment(announcement.updatedAt).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{announcement.createdBy.username}}</span>
                    </div>
            </v-card-actions>
        </v-card>
        <!-- DELETE DIALOG -->
        <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card>
                <v-card-title class="headline">Confim</v-card-title>
                <v-card-text>Are you sure to delete system announcement?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteAnnouncement">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>  
    </div>
</template>
<script>
import * as moment from 'moment';
import {mapGetters} from 'vuex';
export default {
    name: 'AnnouncementTemplate',
    props: ['announcement', 'systemAnnouncement'],
    data(){
        return{
            moment: moment,
            dialog: false,
            deleted: false
        }
    },
    methods: {
        deleteAnnouncement(){
            try{
                this.dialog = false;
                if(this.authenticatedUser.accessPrivileges.includes(this.accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)){
                    this.$parent.deleteAnnouncement(this.announcement.publicKey);
                }
            }
            catch(e){

            }
        }
    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges']),
        unread (){
            // if(!this.announcement.isRead){
            //     return "yellow lighten-4"
            // }
            // return "red lighten-3"
           
        },
    
        
    }
}
</script>


<style lang="stylus"  scoped="scoped">
    .divider
        margin-top 2px
        margin-bottom 2px
    .Announcement
        // margin-right 10px
        // margin-left 10px
        margin-top 10px
        margin-bottom 15px

    .detail
        margin-top -100px
        margin-bottom -70px
        

    .text 
        margin-top -20px
        padding-left 20px
        margin-right 20px
        word-wrap break-word    
    .dismiss
        margin-top 15px
        margin-right 5px
        
    .file-list
      margin-top 10px
      margin-bottom 10px
      list-style-type none
</style>
