<template>
    <div>
            <v-layout row wrap>
                <v-flex d-flex xs12 md12>
                        <v-layout row wrap>
                            <v-flex md1 xs1>
                                <v-layout row wrap>
                                    <v-flex md12 xs12 class="text-xs-center">
                                        <a>
                                            <v-icon :style="votingStyle(answer.upped)" large>fa-chevron-up</v-icon>
                                        </a>                                        
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap >
                                    <v-flex md12 xs12 class="text-xs-center">
                                        <span class="title">{{ answer.upCount - answer.downCount }}</span>                                                                              
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap >
                                    <v-flex md12 xs12 class="text-xs-center">
                                        <a>
                                            <v-icon :style="votingStyle(answer.downer)" large>fa-chevron-down</v-icon>
                                        </a>                                     
                                    </v-flex>
                                </v-layout>   
                                <v-layout row wrap >
                                    <v-flex  md12 xs12 class="text-xs-center">
                                        <a>
                                            <v-icon v-html="star(answer.starred)" :style="startStyle(answer.hasStared)"></v-icon>
                                        </a>                                          
                                    </v-flex>
                                </v-layout>                                                              
                            </v-flex>
                            <v-flex md11 xs11>
                                <v-layout row wrap>
                                    <v-flex md12>
                                        <pre>
                                            <p class="text" v-html="answer.content"/>
                                        </pre>                                        
                                    </v-flex>

                                </v-layout>
                                <v-layout >
                                    <v-spacer></v-spacer>
                                    <v-chip small v-for="(tag, i) in answer.tags" :key="`qa-tag-${i}`">{{tag}}</v-chip>                                                                        
                                    <div class="qa-info">
                                        <span class="right grey--text ">{{ moment(answer.updatedAt).fromNow() }}</span>
                                        <br>
                                        <span class="right grey--text ">{{answer.createdBy.username}}</span>
                                    </div>                            
                                </v-layout>  
                                <v-layout>
                                    <v-flex md12>
                                        <a  class="grey--text " @click="comment = !comment">add a comment</a>
                                        <v-layout row wrap  v-if="comment">
                                            <v-flex md11 xs10>
                                                <el-input
                                                type="textarea"
                                                :rows="1"
                                                placeholder="Please input"
                                                >
                                                </el-input>                                        
                                            </v-flex>  
                                            <v-flex md1 xs2>
                                                <el-button type="info" plain size="small">save</el-button>                                                
                                            </v-flex>                                          
                                        </v-layout>
                                    </v-flex>
                                </v-layout>                                                                 
                            </v-flex>
                         
                        </v-layout>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex md12>
                </v-flex>
            </v-layout>

    </div>



</template>
<script>

import * as moment from 'moment';
import {mapGetters} from 'vuex';
import PostQAAnswerComment from './PostQAAnswerComment';

export default {
 name: 'QAAnswerTemplate',
    props: ['answer'],
    data(){
        return{
            comment: false,
            moment: moment,
            dialog: false,
            deleted: false,
            answerDialog: false
        }
    },
    methods:{
        star(is){
            return is ? 'fa-star' : 'far fa-star'
        },
        startStyle(is){
            return is ? { color: '#F9A825'} : {}
        },
        votingStyle(has){
            return has ? { color: '#1E88E5'} : {}
        },

        cancelQAAnswerComment(){

        }
    },
    computed:{

    }
}
    
</script>
<style lang="stylus" scoped>
    .text 
        margin-top -20px
        padding-left 20px
        margin-right 20px
        word-wrap break-word 
    .qa-info
        margin-right 10px
</style>
