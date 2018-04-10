<template>
    <div class="full-height white" >
        <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm >
            <v-layout>
            <v-flex md12 xs12>
                    <div><h1 class="headline">{{courseQA.title}}</h1></div>
                    <v-divider class="divider-space-title"></v-divider>                   
            </v-flex>
            </v-layout>            
            <v-layout row wrap>
             
                <v-flex md9 xs12 >
                    <QAAnswer-template v-if="update" :answer="courseQA" :key="`qa-answer-${courseQA.publicKey}`" />
                    <div class="qa-bottom"></div>
                    <div>
                        <h1 class="headline" v-if="courseQA.answers.length > 1">{{courseQA.answers.length}} Answers</h1>
                        <h1 class="headline" v-else>{{courseQA.answers.length}} Answer</h1>
                    </div>
                    
                    <v-divider class="divider-space"></v-divider>                    
                    <template v-for="(answer, i) in courseQA.answers">
                        <QAAnswer-template v-if="update"  :answer="answer"  :key="`qa-answer-${answer.publicKey}`"/>
                        <v-divider class="divider-space" :key="`qa-divider-${i}`"></v-divider>
                    </template>
                    <v-layout row wrap>
                        <v-flex md12>
                            <submit-QA-answer
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
                            <span class="">{{ moment(courseQA.createdAt).fromNow() }}</span>
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
    import QAAnswerTemplate from "@/components/common-components/course/QAAnswerTemplate";
    import SubmitQAAnswer from "@/components/common-components/course/SubmitCourseQAAnswer";
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
                update: true,
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
            this.loadData();
        },
        computed: {
            ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQA']),
        },    
        methods: {
            loadData(){
                const data = {
                    coursePublicKey: this.$route.params.id,
                    publicKey: this.$route.params.qaId,
                }
                this.$store.dispatch("getCourseQA", data);
            },
            updatePage(){
                this.update = false;
                //Object.assign(this.$data,this.$options.data.call(this));
                this.update = true;
            }
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
