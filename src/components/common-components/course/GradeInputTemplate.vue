<template>
    <div class="GradeInput" v-if="!deleted">
        <v-card flat>
            <v-layout row wrap>
            <v-flex xs4>
                <v-card-text>
                    <p v-html="student.name"/>
                </v-card-text>
            </v-flex>
            <v-flex xs2>
                <v-text-field name = "grade-input" label="Enter grade..." single-line></v-text-field>
            </v-flex>
            </v-layout>
        </v-card>
  
    </div>
</template>
<script>

import {mapGetters} from 'vuex';
export default {
    props: ['student', 'grade-item'],
    data(){
        return{
            dialog: false,

        }
    },
    methods: {
        
    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges']),
        unread (){
           
        },
    
        
    }
}
</script>


<style lang="stylus"  scoped="scoped">
    .divider
        margin-top 2px
        margin-bottom 2px
    .GradeInput
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
