<template>
    
    <div class="Announcement">
        <v-card :color="unread" :class="{'border-color': announcement.borderColor}">
            <a class="right dismiss" href="">dismiss</a>
            <v-card-title >{{ announcement.title }}</v-card-title>
            <v-divider class="divider"></v-divider>
            <v-card-text>
                <pre>
                    <p class="text" v-html="announcement.text"/>
                </pre>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="detail">
                        <span class="right grey--text ">{{ moment(announcement.publishDate).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{announcement.author}}</span>
                    </div>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import * as moment from 'moment';
export default {
    name: 'AnnouncementTemplate',
    props: ['announcement'],
    data(){
        return{
            moment: moment
        }
    },
    computed: {
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
        word-wrap break-word    
    .dismiss
        margin-top 15px
        margin-right 5px
        

</style>
