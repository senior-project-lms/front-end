<template>
    <v-dialog 
    v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
        <v-toolbar card dark color="primary">
                <v-btn icon @click="cancel" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Quiz-Test</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title v-if="courseQuizTest.available">{{remainingTime}}</v-toolbar-title>
                <v-toolbar-title v-if="courseQuizTest.available"></v-toolbar-title>

                <v-toolbar-items>
                <v-btn dark flat v-if="!courseQuizTest.available" @click="startDialog = true;" >Start</v-btn>
                </v-toolbar-items>

                <v-menu bottom right offset-y>
                    <v-btn slot="activator" dark icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </v-menu>
            </v-toolbar>
            <v-card-text>
                <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
                    <v-layout row wrap>
                        <v-flex md9>
                        <h1 class="header grey--text text--darken-3"                             
                            v-if="courseQuizTest.available">
                            Questions
                        </h1>
                            <question-view 
                            class="question-view" 
                            v-if="courseQuizTest.available"
                            v-for="question in courseQuizTest.questions" 
                            :key="question.publicKey" 
                            :question="question"
                            :qtPublicKey="courseQuizTest.publicKey">
                            </question-view>       
                            <el-alert
                            v-if="!courseQuizTest.available"                                
                                title="Start the exam to view questions"
                                type="info"
                                :closable="false">
                            </el-alert>                            
                        </v-flex>
                        <v-flex md3>
                            <v-card class="">
                                <v-card-title class="headline grey--text text--darken-3">Details</v-card-title>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex md12>
                                            <h4 class="title grey--text text--darken-2">{{courseQuizTest.name}}</h4>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>                                   
                                    <v-layout row wrap>
                                        <v-flex md12>
                                            <h4 class="header grey--text text--darken-2">Description: </h4>
                                            <p class="header  grey--text text--darken-2">{{courseQuizTest.detail}}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-layout v-if="courseQuizTest.limitedDuration">
                                        <v-flex md12>
                                                <h4 class="header grey--text text--darken-2">Duration: {{courseQuizTest.duration}} min</h4>
                                        </v-flex>
                                    </v-layout>                                                                        
                                </v-card-text>
                            </v-card>
                            
                        </v-flex>                                             
                    </v-layout>
            </v-container>
        </v-card-text>

        </v-card>
        <div>
            <v-dialog v-model="startDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Start Quiz-Test</v-card-title>
                    <v-card-text>Are you sure to start quiz, questions will be viewed. If duration is exist, you can never stop the timer.</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="startDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="start">Start</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>      
        <div>
            <v-dialog v-model="closeDialog" persistent max-width="290">
            <v-btn color="primary" dark slot="activator">Open Dialog</v-btn>
            <v-card>
                <v-card-title class="headline">Time is up!</v-card-title>
                <v-card-text>The time is up, we saved your answers, exam will be closed. </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click.native="cancel">Close</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>        
        </div>    
    </v-dialog>
</template>


<script>
import {mapGetters} from 'vuex';
import QuestionView from './QTStudentQView';
import * as moment from 'moment'
import { min } from 'moment';
export default {
    components: {
        QuestionView,
    },
    props: ['dialog', 'publicKey'],

    data(){
        return{
            closeDialog: false,
            timer: null,
            remainingTime: '00:00:00',
            moment: moment,
            startDialog: false,
            newQuestion: false,
    
        }
    },
    created(){
        this.fetchQT();
    },
    methods:{
        fetchQT(){
            const data = {
                    coursePublicKey: this.$route.params.id,
                    qtPublicKey: this.publicKey,
            }

            this.$store.dispatch("getCourseQTBeforeStartExam", data)
            .then(resp => {
                if(resp.status){
                    const dt = resp.data;
                    if(dt.available){
                        this.fetchCourseQTUser(data);
                    }
                }
            });


        },
        fetchCourseQTUser(data){
            this.$store.dispatch("getCourseQTUser", data)
            .then(rsp => {
                if(rsp.status){
                    if(rsp.data.started){
                        this.startTimer();                        
                    }
                }
            }); 
        },
        cancel(){
            this.$parent.cancelDialog();
        },
        start(){
            const data = {
                    coursePublicKey: this.$route.params.id,
                    qtPublicKey: this.publicKey,
            }
            this.$store.dispatch("startCourseQT", data)
            .then(response => {
                if(response.status){
                    this.fetchCourseQTUser(data);
                }
            });
  
            this.startDialog = false;
        },
        finish(){
            const data = {
                    coursePublicKey: this.$route.params.id,
                    qtPublicKey: this.publicKey,
            }
            this.$store.dispatch("finishCourseQT", data);
        },
        startTimer(){
            this.runTimer();
        },
        stopTimer(){
            clearInterval(this.timer);
        },
        calculateTime(remaining){
                if(remaining <= 0){
                    this.remainingTime = '00:00:00'
                    this.closeDialog = true;
                    this.stopTimer();
                    return;
                }            
                const ahour = 60 * 60 * 1000;
                const amin = 60 * 1000;
                const asec = 1000;

                const hour = Math.floor(remaining / ahour);
                remaining -= hour * ahour;
                const min = Math.floor(remaining / amin);
                remaining -= min * amin;
                const sec = Math.floor(remaining / asec);



                const textHour = hour < 10 ? '0' + hour : '' + hour;
                const textMin = min < 10 ? '0' + min : '' + min;
                const textSec = sec < 10 ? '0' + sec : '' + sec;
      
                this.remainingTime = textHour + ':' + textMin + ':' + textSec

        },
        runTimer(){
                           

                const currentTime = this.courseQTUser.currentTime;
                const finishesAt = this.courseQTUser.finishesAt;
                var remaining = finishesAt - currentTime;    
                
                const interval = 1000;

                const self = this;
                this.timer = setInterval(function(){
                    remaining -= interval;
                    self.calculateTime(remaining)
                    
                }, interval);            
            }
    },

  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTest', 'courseQTUser',]),

  },
  watch:{  
  },
  beforeDestroy(){
    this.stopTimer();
    this.$store.commit("clearQuizTestAllStates");

  }
}
</script>
<style lang="stylus" scoped>
    .warn
        margin-top 10px

    .full-height
        height calc(100%) !important    
    .el-switch
        float: right
    .add-new-btn
        margin-top 25px
    .question-view
        margin-bottom 10px
</style>
