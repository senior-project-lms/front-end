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
                                            <div  v-for="(comment, i) in answer.comments" :key="`pre-${i}`">
                                                <div>
                                                    > {{comment.content}}
                                                    <span v-if="comment.anonymous"> -anonymous</span>
                                                    <span else class="blue--text"> -{{answer.createdBy.username}}</span>
                                                </div>
                                                <v-divider :key="`comment-divider-${i}`"></v-divider>

                                            </div>                                                 
                                     
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex md12>
                                        <a  class="grey--text " @click="comment = !comment">add a comment</a>
                                        <v-layout row wrap  v-if="comment">
                                            <v-flex md11 xs10>
                                                <el-input
                                                type="textarea"
                                                :rows="1"
                                                v-model="commentContent"
                                                placeholder="Please input"
                                                >
                                                </el-input>                                        
                                            </v-flex>  
                                            <v-flex md1 xs2>
                                                <el-button type="info" plain size="small" @click="saveComment">save</el-button>                                                
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
            deleted: false,
            commentContent: ''
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
        saveComment(){
            const data = {
                parentPublicKey: this.$route.params.qaId,
                publicKey: this.answer.publicKey,
                params: {
                content: this.commentContent
                }
            }
            this.$store.dispatch("saveGlobalQAComment", data)
            .then(response => {
                if(response.status){
                    this.commentContent = '';
                    this.comment = false;
                }
            });
        }
    },
    computed:{

    }
}
    
</script>
<style lang="stylus" scoped>
    .text 
        word-wrap break-word 
    .qa-info
        margin-right 10px
</style>
