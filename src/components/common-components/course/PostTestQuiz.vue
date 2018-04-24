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
                <v-toolbar-items>
                <!-- <v-btn dark flat @click.native="save">Publish</v-btn> -->
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
                            <h1 class="header grey--text text--darken-3">Questions</h1>
                            <v-divider></v-divider>
                            <v-alert class="warn" outline color="error" icon="warning" :value="true" v-if="!isSaved">
                                Please Save Quiz-Test details before add the questions
                            </v-alert>
                            <question-view class="question-view" v-for="question in courseQuizTest.questions" :key="question.publicKey" :qt="question"></question-view>

                            <v-btn 
                            class="add-new-btn"
                            @click="newQuestion=true"
                            v-if="!newQuestion && isSaved"
                            block
                            outline color="indigo"
                            >
                            Add Question</v-btn>
                            <new-qt-object  v-if="newQuestion && isSaved" @cancel="cancelNewQuestion"></new-qt-object>
                                    
                        </v-flex>
                        <v-flex md3>
                            <v-card class="">
                                <v-card-title class="headline grey--text text--darken-3">Details</v-card-title>
                                <v-card-text>
                                    <v-layout row wrap>
                                        <v-flex md9>
                                            <el-input placeholder="Quiz-Test Name" size="small"
                                            v-model="courseQuizTest.name"
                                            ></el-input>                                                                         
                                        </v-flex>
                                        <v-flex md2>
                                                <el-button plain size="small" @click="save" v-if="!isSaved">Save</el-button>
                                                <el-button plain size="small" @click="update" v-if="isSaved">Updated</el-button>
                                                
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-layout row wrap>
                                        <v-flex md12>
                                            <el-input type="textarea" placeholder="Quiz-Test Description"
                                            v-model="courseQuizTest.description"
                                            ></el-input>    
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-layout>
                                        <v-flex md12>
                                                Limited duration
                                                <el-switch
                                                v-model="courseQuizTest.limitedDuration"
                                                active-color="#13ce66"
                                                inactive-color="#E0E0E0">
                                                </el-switch>     
                                        </v-flex>
                                    </v-layout>                                                                        
                                    <v-layout row wrap v-if="courseQuizTest.limitedDuration">
                                        <v-flex md5>
                                            <el-input placeholder="Duration min" size="small"></el-input>                                                                         
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>                                    
                                    <v-layout>
                                        <v-flex md12>
                                            <div>
                                                Has Due Date
                                                <el-switch
                                                v-model="courseQuizTest.dueDated"
                                                active-color="#13ce66"
                                                inactive-color="#E0E0E0">
                                                </el-switch>                                               
                                            </div>
                                        </v-flex>
                                    </v-layout>                                       
                                    <v-layout row wrap v-if="courseQuizTest.dueDated">
                                        <v-flex md12>
                                                <el-date-picker
                                                type="datetime"                                                
                                                placeholder="Due Date"
                                                size="small">
                                                </el-date-picker>
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>
                                        <v-layout>
                                            <v-flex md12>
                                                <div>
                                                    Gradable
                                                    <el-switch
                                                    v-model="courseQuizTest.gradable"
                                                    active-color="#13ce66"
                                                    inactive-color="#E0E0E0">
                                                    </el-switch>                                               
                                                </div>
                                            </v-flex>
                                        </v-layout>                                    
                                        <v-layout row wrap v-if="courseQuizTest.gradable">
                                            <v-flex md8>
                                                    <el-input placeholder="Score Weight" size="small"></el-input>
                                            </v-flex>
                                        </v-layout>
                                </v-card-text>
                            </v-card>
                            
                        </v-flex>                                             
                  </v-layout>
            </v-container>
        </v-card-text>

      </v-card>
    </v-dialog>
</template>


<script>
import {mapGetters} from 'vuex';
import NewQtObject from './NewQTObject';
import QuestionView from './QuestionView';

export default {
  props: ['dialog', 'edit', 'publicKey'],
  components: {
      NewQtObject,
      QuestionView,
},
  data(){
      return{
          newQuestion: false,
  
      }
  },
  created(){
    if(this.edit){
        this.fetchQT();
    }
  },
  methods:{
    fetchQT(){
        const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.publicKey,
        }
        this.$store.dispatch("getCourseQuizTest", data);
    },
    save(){
        if(this.courseQuizTest.name.length == 0){
            this.$notify({type: "info", title: "Quiz-Test", text: "Fill at least name of quiz-test"})
        }
        else{
            const data = {
                params: this.courseQuizTest,
                coursePublicKey: this.$route.params.id,
            }
            this.$store.dispatch("saveCourseQuizTest", data);
        }


    },
    update(){
        if(this.courseQuizTest.name.length == 0){
            this.$notify({type: "info", title: "Quiz-Test", text: "Fill at least name of quiz-test"})
        }
        else{
            const data = {
                params: this.courseQuizTest,
                coursePublicKey: this.$route.params.id,
            }
            //this.$store.dispatch("saveCourseQuizTest", data);
        }


    },    
    clearForm(){

    },
    cancel(saved){
      this.$store.commit("clearQuizTest");
      this.clearForm();
      this.$parent.cancelDialog();
    },
    cancelNewQuestion(){
        this.newQuestion = false;
    },
 
  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTest']),
    isSaved(){
        return this.courseQuizTest.publicKey.length != 0;
    }
  },
  watch:{  
  },
  beforeDestroy(){
    
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
