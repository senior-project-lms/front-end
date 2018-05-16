<template>
    <div>
        <v-card>
            <v-card-text>
                <v-layout row wrap>

                </v-layout>
                <v-layout row wrap>
                    <v-flex md11>   
                        <p v-html="question.content"></p>                
                    </v-flex>
                    <v-flex md1 class="text-md-right" v-if="item != null">
                        <el-input class="score" size="small" placeholder="Score"></el-input>
                    </v-flex>                    
                </v-layout>
                <v-layout row wrap>
                    <v-flex md12>
                        <div class="text-space">
                            <span class="header grey--text text--darken-1" v-if="question.answers.length > 1">Answers</span>
                            <span class="header grey--text text--darken-1" v-else>Answer</span>
                            <v-divider></v-divider>                            
                        </div>
                        <v-layout row wrap>
                            <v-flex md12>
                                <template v-for="(answer, i) in question.answers">
                                    <v-layout v-if="answer.type == 1" :key="`layout-${i}`">
                                        <v-flex md12>
                                            <p class="answer-text">{{text}}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="answer.type == 2" :key="`layout-${i}`">
                                        <v-flex md12 class="">
                                            <el-checkbox-group v-model="checkboxes" size="mini" :disabled="true">
                                            
                                                <el-checkbox :label="answer.publicKey">
                                                    {{answer.text}}
                                                <v-icon color="green" v-if="answer.correct">check_circle_outline</v-icon>

                                                </el-checkbox>
                                            </el-checkbox-group>
                                        </v-flex>
                                    </v-layout>                                      
                                    <v-layout v-if="answer.type == 3" :key="`layout-${i}`">
                                        <v-flex md12 class="">                                                                                                                                                                                                                                   
                                            <el-radio :label="answer.publicKey" v-model="radio" :disabled="true">
                                                {{answer.text}}
                                            </el-radio>
                                            <v-icon color="green" v-if="answer.correct">check_circle_outline</v-icon>
                                        
                                        </v-flex>
                                    </v-layout>                                    
                                </template>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex class="">
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-divider></v-divider>         
        </v-card>     
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props:['question', 'qtPublicKey', 'item'],
    data(){
        return{
            radio: null,
            dialog: false,
            checkboxes: [],
            text: '',
            correctCount: 0,
        }
    },
    created(){
        
        
    },
    methods: {
        setAnswers(){
            const answers = this.item.answers;
            for (const i in answers) {
                if(answers[i].questionPublicKey == this.question.publicKey){
                    if(this.question.answers[0].type == 3){
                        this.radio = answers[i].answerPublicKeys[0]
                    }
                    else if(this.question.answers[0].type == 2){
                        this.checkboxes = answers[i].answerPublicKeys
                    }
                    else if(this.question.answers[0].type == 1){
                        this.text =  answers[i].text;
                    }
                    break;
                }
            }            
        }
    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTest', 'courseQTUser']),
        
    },   
    watch: {
        item(nval, oval){
            if(nval != null){
                this.setAnswers();            
            }
            return nval;
        }
    }
}    
</script>
<style lang="stylus" scoped>
    .counter-num
        margin-left 5px
        margin-right 5px
    .text-space
        margin-top 10px
        margin-bottom 10px
    .counter
        margin-top 25px
    .save-btn
        margin-top 10px
    .answer-text
        color #616161
    .score
        width 70px

</style>
