<template>
    <div :key="`div-${answer.publicKey}`">
            <v-layout row wrap>
                <v-flex d-flex xs12 md12>
                        <v-layout row wrap>
                            <v-flex md1 xs1>
                                <v-layout row wrap>
                                    <v-flex md12 xs12 class="text-xs-center">
                                        <a @click="voteUp">
                                            <i class="el-icon-arrow-up fa-3x" :style="voteColor(answer.upped)"></i>
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
                                        <a @click="voteDown">
                                            <i class="el-icon-arrow-down fa-3x" :style="voteColor(answer.downed)" ></i>
                                        </a>                                     
                                    </v-flex>
                                </v-layout>   
                                <v-layout row wrap >
                                    <v-flex  md12 xs12 class="text-xs-center">
                                        <a @click="voteStar">
                                            <i class="el-icon-star-off fa-2x" v-if="!answer.starred" :style="{color: '#757575'}"></i>
                                            <i class="el-icon-star-on fa-2x" v-else :style="{color: '#FDD835'}"></i>
                                            
                                        </a>                                          
                                    </v-flex>
                                </v-layout>    
                                <v-layout row wrap >
                                    <v-flex md12 xs12 class="text-xs-center">
                                        <span class="grey--text text--darken-1">{{ answer.starCount }}</span>                                                                              
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
                                    <v-chip small v-for="(tag, i) in answer.tags" :key="`qa-tag-${i}`">{{tag.name}}</v-chip>     
                                    <v-spacer></v-spacer>                                                                   
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
                                                    <span else class="blue--text"> -{{comment.createdBy.username}}</span>
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

export default {
 name: 'QAAnswerTemplate',
    props: ['answer'],
    data(){
        return{
            comment: false,
            moment: moment,
            deleted: false,
            commentContent: '',
            upIcon: '',
            
        }
    },
    methods:{
        updatePage(){
            //Object.assign(this.$data,this.$options.data.call(this));
            this.$parent.updatePage();
        },
        isStar(is){
            return is ? 'fa-star' : 'far fa-star'
        },
        startStyle(is){
            return is ? { color: '#FFEE58'} : {}
        },
        
        voteColor(status){
            return status ? {color: '#448AFF'} : {color: '#757575'}
            //return status ? 'primary' : 'secondary'
        },

        voteStar(){

            const data = {
                coursePublicKey: this.$route.params.id,
                parentPublicKey: this.$route.params.qaId,
                publicKey: this.answer.publicKey,
            }
            
            this.$store.dispatch("starVoteCourseQA", data)
            .then(resp => {
                this.updatePage();
            })
            
        },
        voteUp(){
          const data = {
                coursePublicKey: this.$route.params.id,
                parentPublicKey: this.$route.params.qaId,
                publicKey: this.answer.publicKey,
            }            
            this.$store.dispatch("upVoteCourseQA", data)
            .then(resp => {
                this.updatePage();
            })        },
        voteDown(){
          const data = {
                coursePublicKey: this.$route.params.id,              
                parentPublicKey: this.$route.params.qaId,
                publicKey: this.answer.publicKey,
            }            
            this.$store.dispatch("downVoteCourseQA", data)
            .then(resp => {
                this.updatePage();
            })        
        },                

        saveComment(){
            const data = {
                coursePublicKey: this.$route.params.id,                
                parentPublicKey: this.$route.params.qaId,
                publicKey: this.answer.publicKey,
                params: {
                    content: this.commentContent
                }
            }
            this.$store.dispatch("saveCourseQAComment", data)
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
    .has-voted
        color #82B1FF
    .not-voted
        color #757575

    .has-starred
        color #F9A825
</style>
