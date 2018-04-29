<template>
    <div>
        <v-card>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex md12>   
                        <p v-html="question.content"></p>                
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
                                            <el-input
                                            :key="`item-form-${i}`"
                                            type="textarea"
                                            :rows="3"
                                            placeholder="Please input"
                                            v-model="text"
                                           >
                                            </el-input> 
                                            <el-button class="save-btn" type="info" size="small" @click="saveText">Save</el-button>
                                             
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="answer.type == 2" :key="`layout-${i}`">
                                        <v-flex md12 class="">
                                            <el-checkbox-group v-model="checkboxes" size="mini">
                                            
                                                <el-checkbox :label="answer.publicKey">{{answer.text}}</el-checkbox>
                                            </el-checkbox-group>
                                        </v-flex>
                                    </v-layout>                                      
                                    <v-layout v-if="answer.type == 3" :key="`layout-${i}`">
                                        <v-flex md12 class="">
                                            <el-radio :label="answer.publicKey" v-model="radio">{{answer.text}}</el-radio>
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
    props:['question', 'qtPublicKey'],
    data(){
        return{
            radio: null,
            dialog: false,
            checkboxes: [],
            text: '',
        }
    },
    created(){
        this.setAnswers();
    },
    methods: {
        save(data){
            this.$store.dispatch("saveCourseQTAnswer", data);
        },
        saveText(){
                const data = {
                    coursePublicKey: this.$route.params.id,
                    qtPublicKey: this.qtPublicKey,
                    params: {
                        questionPublicKey: this.question.publicKey,
                        text: this.text,
                    }
                }            
            this.save(data);
        },
        setAnswers(){
            const answers = this.courseQTUser.answers;
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
        radio(nval, oval){
            if(nval != null){
                const data = {
                    coursePublicKey: this.$route.params.id,
                    qtPublicKey: this.qtPublicKey,
                    params: {
                        questionPublicKey: this.question.publicKey,
                        answerPublicKeys: [
                            this.radio,
                        ]
                    }
                }
                this.save(data);
            }
            return nval;
        },
        checkboxes(nval, oval){
            if(nval.length > 0){
                const data = {
                    coursePublicKey: this.$route.params.id,
                    qtPublicKey: this.qtPublicKey,
                    params: {
                        questionPublicKey: this.question.publicKey,
                        answerPublicKeys: nval
                    }
                }
                this.save(data);
            }
            return nval;
        },
     
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
</style>
