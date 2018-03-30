<template>
    <div>
        <v-container>
        <v-card>
            


            <!--<a v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)"
                @click="dialog = true"
                class="right dismiss">
                delete
            </a>
            <a v-else class="right dismiss" href="">dismiss</a> -->
            
            <v-card-title>
                <h5 class="headline">{{ title }}</h5>
            </v-card-title>
            <v-divider class="divider"></v-divider>
            <v-card-text>
                <pre>
                    <p class="text" v-html="content"/>
                </pre>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="detail">
                        <span class="right grey--text ">{{ moment(updatedAt).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{createdBy}}</span>
                    </div>
            </v-card-actions>
            
        </v-card>
        <v-flex>
        <section class="Container">
            <QAAnswer-template v-for="(answer, i) in answers" :key="i" :answer="answer"/>
            
        </section>
    </v-flex>
    <v-flex>
        <submit-QA-answer/>
    </v-flex>
    
      
      </v-container>
    </div>
</template>

<script>
    import QAAnswerTemplate from "@/components/common-components/QAAnswerTemplate";
    import SubmitQAAnswer from "@/components/SubmitQAAnswer";
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
                title: "I can't find Eidolon Teralyst.",
                content: "I've been wandering at the Plains of Eidolon during night time for 2 hours and I can't find any Eidolon. Am I missing something?",
                updatedAt: "20180202",
                createdBy: "Steve Sinclair",
                numAnswers: 5,
                isVerified: false,
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
                


               
                
                    
                
            }
        }
    }    
</script>
<style>

</style>
