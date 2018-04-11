<template>
    <div class="qa" v-if="!deleted">
            <v-card>
                    <v-layout>
                        <v-flex md2 xs3 class="grey lighten-5">
                            <v-layout flex wrap align-center justify-center>
                                <v-flex class="text-md-center text-xs-center" md4 xs12>
                                    <div>{{qa.upCount}}</div>
                                    <div>votes</div>
                                </v-flex>
                                <v-flex class="text-md-center text-xs-center" md4 xs12>
                                    <div>{{qa.answerCount}}</div>
                                    <div>answers</div>
                                </v-flex>
                                <v-flex class="text-md-center text-xs-center" md4 xs12>
                                    <div>3</div>
                                    <div>views</div>
                                </v-flex>      
                            </v-layout>                           
                        </v-flex>
                        <v-flex md10 xs19>
                            <v-layout row wrap>
                                <v-flex md12>
                                    <v-card-title>
                                            <h4 class="subheading"><router-link :to="{name:'QAPage', params:{'qaId': qa.publicKey}}">{{ qa.title }}</router-link></h4>
                                    </v-card-title>
                                    <div>
                                    <v-layout row wrap >
                                        <v-flex md12 xs12 v-if="qa.tags.length > 0">
                                            <v-chip small v-for="(tag, i) in qa.tags" :key="`qa-tag-${i}`">{{tag.name}}</v-chip>                                                                                
                                        </v-flex>
                                        <v-flex md12 xs12 offset-md1>
                                            <h4 class="grey--text text-md-right text-xs-right qa-info">{{ moment(qa.updatedAt).fromNow() }} by {{qa.createdBy.username}}</h4>
                                        </v-flex>
                                    </v-layout>                                        
                                    </div>
                                </v-flex>

                            </v-layout>
                            <!--<a v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)"
                                @click="dialog = true"
                                class="right dismiss">
                                delete
                            </a>
                            <a v-else class="right dismiss" href="">dismiss</a> -->
                        </v-flex>                    
                    </v-layout>
            </v-card>          
      

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
        
    .full-height
        height calc(100%) !important
    a 
    text-decoration none
    
    .qa-info
        margin-right 10px
        margin-top -15px
    
</style>
