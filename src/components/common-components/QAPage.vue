<template>
    <div class="full-height white">
        <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm >
            <v-layout>
            <v-flex md12 xs12>
                    <div><h1 class="headline">{{globalQA.title}}</h1></div>
                    <v-divider class="divider-space-title"></v-divider>                   
            </v-flex>
            </v-layout>            
            <v-layout row wrap>
             
                <v-flex md9 xs12 >
                    <QAAnswer-template :answer="globalQA"  />
                    <div class="qa-bottom"></div>
                    <div>
                        <h1 class="headline" v-if="globalQA.answers.length > 1">{{globalQA.answers.length}} Answers</h1>
                        <h1 class="headline" v-else>{{globalQA.answers.length}} Answer</h1>
                    </div>
                    
                    <v-divider class="divider-space"></v-divider>                    
                    <template v-for="(answer, i) in globalQA.answers">
                        <QAAnswer-template  :answer="answer"  :key="`qa-${i}`"/>
                        <v-divider class="divider-space" :key="`qa-divider-${i}`"></v-divider>
                    </template>
                    <v-layout row wrap>
                        <v-flex md12>
                            <submit-QA-answer
                                v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_GLOBAL_QA)"
                            />
                            
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md3 xs0>
                    <v-layout row wrap>
                        <v-flex md2 xs4>
                            <span class="grey--text ">asked</span>
                        </v-flex>
                        <v-flex md10 xs8>
                            <span class="">{{ moment(globalQA.createdAt).fromNow() }}</span>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex md2 xs4>
                            <span class="grey--text ">viewed</span>
                        </v-flex>
                        <v-flex md10 xs8>
                            <span class="">112</span>
                        </v-flex>
                    </v-layout> 
                    <v-layout row wrap>
                        <v-flex md12 xs12>
                            <div><h1 class="headline">Related</h1></div>
                            <v-divider class="divider-space-title"></v-divider>

                            <v-layout row wrap v-for="(item,i) in relatedQAs" :key="`rel-${i}`" class="align-center justify-center">
                                <v-flex md3 xs2>
                                    <el-button type="primary" plain size="mini">{{item.votes}}</el-button>
                                </v-flex>
                                <v-flex md9 xs10>
                                    <router-link class="" :to="{name:'QAPage', params:{'qaId': item.publicKey}}">{{ item.title }}</router-link>
                                </v-flex>                                
                            </v-layout>                 
                        </v-flex>
                    </v-layout>                                   
                </v-flex>
            </v-layout>

        </v-container>   
            <!--<a v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)"
                @click="dialog = true"
                class="right dismiss">
                delete
            </a>-->

      
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import QAAnswerTemplate from "@/components/common-components/QAAnswerTemplate";
    import SubmitQAAnswer from "@/components/common-components/SubmitQAAnswer";
    import * as moment from 'moment';


    export default {
        name: 'QAPage',
        components:{
            QAAnswerTemplate,
            SubmitQAAnswer
        },
        data(){
            return{
                dialog: false,
                moment: moment,
               qa:{
                 title: "I can't find Eidolon Teralyst.",
                content: "I've been wandering at the Plains of Eidolon during night time for 2 hours and I can't find any Eidolon. Am I missing something?",
                updatedAt: "20180202",
                createdBy: "Steve Sinclair",
                numAnswers: 5,
                isVerified: false,
                votingCount: 20,
                hasUpVoting: true,
                hasDownVoting: false,
                hasStared: true,
                isVerified: false,  
                tags: ['test1', 'test2', 'test3', 'test4'],              
                answers: [
                    {
                    content: "I have absolutely no idea.",
                    updatedAt: "20180202",
                    createdBy: "Tarik Keceli",
                    votingCount: 20,
                    starCount:  1,
                    hasUpVoting: true,
                    hasDownVoting: false,
                    hasStared: true,
                    isVerified: false,
                    instructorNote: "You're a horrible person."
                    },
                    {
                    content: "You should check for Eidolon lures. Usually they spawn near an Eidolon.",
                    updatedAt: "20180202",
                    createdBy: "Triss Merigold",
                    votingCount: 20,
                    starCount:  1,
                    hasUpVoting: true,
                    hasDownVoting: false,
                    hasStared: true,
                    isVerified: false,
                    instructorNote: "Correct. However you should also watch out for pulsating light trails on the ground."
                    }
                ]                   
               },
               relatedQAs: [
                   {
                       publicKey: '1231231231',
                       title: 'mock related topic mock related topic mock related topic ',
                       votes: 231
                   },
                   {
                       publicKey: '1231231231',
                       title: 'mock related topic',
                       votes: 231
                   },
                   {
                       publicKey: '1231231231',
                       title: 'mock related topic',
                       votes: 231
                   },
                   {
                       publicKey: '1231231231',
                       title: 'mock related topic',
                       votes: 231
                   },
                   {
                       publicKey: '1231231231',
                       title: 'mock related topic',
                       votes: 231
                   },
                   {
                       publicKey: '1231231231',
                       title: 'mock related topic',
                       votes: 231
                   },                                      
                
               ]
            }
        },
        created(){
            this.$store.dispatch("getGlobalQA", this.$route.params.qaId);
        },
        computed: {
            ...mapGetters(['authenticatedUser', 'accessPrivileges', 'globalQA']),
        },     
           
    }    
</script>
<style lang="stylus" scoped>
    .full-height
        height calc(100%) !important
    .divider-space
        margin-top  20px
        margin-bottom  20px
    .qa-bottom 
        margin-bottom 40px
    .divider-space-title
        margin-top  20px
</style>
