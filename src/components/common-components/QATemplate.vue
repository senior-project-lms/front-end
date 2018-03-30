<template>
    <div class="qa" v-if="!deleted">
        <v-layout row wraped>
        <v-flex d-flex md1 xs3>
            <v-card dark color="primary">
                <!--<v-card-text class="px-0">12</v-card-text>-->
                
                <v-card-text class = "text-xs-center">{{qa.numAnswers}} answers</v-card-text>

            </v-card>
            
        </v-flex>

        <v-flex xs9 md11>

        <v-card :color="unread">
            


            <!--<a v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)"
                @click="dialog = true"
                class="right dismiss">
                delete
            </a>
            <a v-else class="right dismiss" href="">dismiss</a> -->
            
            <v-card-title>
                <h5 class="headline">{{ qa.title }}</h5>
                <v-icon class="icon-xs-left" v-if="qa.isVerified">check_circle</v-icon>
            </v-card-title>
            <!--<v-divider class="divider"></v-divider>
            <v-card-text>
                <pre>
                    <p class="text" v-html="qa.content"/>
                </pre>
            </v-card-text>-->
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="detail">
                        <span class="right grey--text ">{{ moment(qa.updatedAt).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{qa.createdBy}}</span>
                    </div>
            </v-card-actions>
            
        </v-card>
        </v-flex>
        <!-- DELETE DIALOG -->
        <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card>
                <v-card-title class="headline">Confim</v-card-title>
                <v-card-text>Are you sure to delete system announcement?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteAnnouncement">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-layout>  

    </div>
</template>
<script>
import * as moment from 'moment';
import {mapGetters} from 'vuex';
export default {
    name: 'QATemplate',
    props: ['qa'],
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
    .qa
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
