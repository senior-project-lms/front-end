<template>
    <div>
        <v-container>
            <v-layout row wrap>
                <v-flex d-flex xs1 md1>
                    <v-card>
                    <div class="text-md-center">
                        <a>
                            <v-icon :style="votingStyle(answer.hasUpVoting)">fa-chevron-up</v-icon>
                        </a>
                    </div>
                    <div class="text-md-center">
                        <h3>{{ answer.votingCount }}</h3>
                    </div>
                    <div class="text-md-center">
                        <a>
                            <v-icon :style="votingStyle(answer.hasDownVoting)">fa-chevron-down</v-icon>
                        </a>
                    </div>
                    <div class="text-md-center">
                        <a>
                            <v-icon v-html="star(answer.hasStared)" :style="startStyle(answer.hasStared)"></v-icon>
                        </a>
                    </div> 
                    <div class="text-md-center">
                        <h4>{{ answer.starCount }}</h4>
                    </div>  
                    </v-card>                       
                </v-flex>
                <v-flex d-flex xs11 md11>
                    <v-card>
                    <v-layout row wrap>
                        
                        <v-flex>
                            <h2>{{ answer.title }}</h2>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex>
                            {{ answer.content }}
                        </v-flex>
                        <!--<v-flex>
                            {{ answer.instructorNote }}
                        </v-flex>-->
                    </v-layout>
                     <v-card-actions>
                    <v-spacer></v-spacer>
                    <div>
                        <span class="right grey--text ">{{ moment(answer.updatedAt).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{answer.createdBy}}</span>
                        <v-btn icon @click="answerDialog = !answerDialog">
                            <v-icon>reply</v-icon>
                        </v-btn>
                            <post-qa-answer-comment :answerDialog="answerDialog"/>

                    </div>
            </v-card-actions>
                   </v-card>             
                </v-flex>

                <v-flex>
                    <v-card color="yellow">
                        <v-card-text>
                            <p>{{answer.instructorNote}}</p>
                        </v-card-text>
                    </v-card>
                </v-flex>
                
            </v-layout>
        </v-container>

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
