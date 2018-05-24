<template>
    <div class="full-height white" >
        <v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm >
            <v-layout>
            <v-flex md11 xs11>
                    <div><h1 class="headline">{{courseQA.title}}</h1></div>
                    <v-divider class="divider-space-title"></v-divider>                   
            </v-flex>
            <v-flex md1 xs1 class="text-md-right">
                <a v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_QA) || courseQA.owner" class="red--text" @click="deleteDialog = true;">delete</a>
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


                                <v-layout row wrap v-for="(item,i) in courseQARelateds" :key="`rel-${i}`" >
                                <v-flex md3 xs2>
                                    <el-button type="primary" plain size="mini">{{ item.upCount - item.downCount }}</el-button>
                                </v-flex>
                                <v-flex md9 xs10>
                                    <router-link class="" :to="{name:'CourseQAPage', params:{'qaId': item.publicKey}}">{{ item.title }}</router-link>
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
        <div>
            <v-dialog v-model="deleteDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Delete</v-card-title>
                    <v-card-text>Are you sure to delete</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteQA">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>   
      
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
                deleteDialog: false,
                dialog: false,
                moment: moment,
                update: true,
            
            }
        },
        created(){
            this.loadData();
        },
        computed: {
            ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQA',  'courseQARelateds']),
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
            },
            deleteQA(){
                const data = {
                    coursePublicKey: this.$route.params.id,
                    publicKey: this.$route.params.qaId,
                }
                this.$store.dispatch("deleteCourseQA", data);
                this.cancel();
            },
            cancel(){
                this.$router.push({name: "CourseQA"});
            }            
        },
        watch: {
            '$route' (to, from) {
                if(to.params.qaId != from.params.qaId){
                   this.loadData();

                }
                return to;
            }
        }        
           
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
