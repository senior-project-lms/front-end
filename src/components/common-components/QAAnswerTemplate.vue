<template>
    <div class="qa" v-if="!deleted">
        <v-layout row wraped>
        <v-flex md1 xs1>
            <v-card dark color="primary">
                <v-icon v-if="answer.isVerified">check_circle</v-icon>
                <v-flex xs12 sm3>
                    <v-btn flat icon color="blue">
                        <v-icon>thumb_up</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12 sm3>
                    <v-btn flat icon color="blue">
                        <v-icon>thumb_down</v-icon>
                    </v-btn>
                </v-flex>
            </v-card>
            
        </v-flex>

        <v-flex md11>

        <v-card :color="unread" :class="yellow">
            


            <!--<a v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)"
                @click="dialog = true"
                class="right dismiss">
                delete
            </a>
            <a v-else class="right dismiss" href="">dismiss</a> -->
            
            <v-divider class="divider"></v-divider>
            <v-card-text>
                <pre>
                    <p class="text" v-html="answer.content"/>
                </pre>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="detail">
                        <span class="right grey--text ">{{ moment(answer.updatedAt).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{answer.createdBy}}</span>
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
    name: 'QAAnswerTemplate',
    props: ['answer'],
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
