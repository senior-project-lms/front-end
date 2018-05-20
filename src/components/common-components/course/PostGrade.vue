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
                <v-toolbar-title>New Grade</v-toolbar-title>
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
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>                            
                            <v-data-table
                                :headers="headers"
                                :items="allRegisteredStudets"
                                hide-actions
                                :search="search"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>{{props.item.name}} {{props.item.surname}}</td>
                                    <td>
                                        <student-score class="student-score" v-if="isSaved && !view" :user="props.item"></student-score>
                                        <div v-else-if="props.item.score != undefined">{{props.item.score}}</div>
                                        <div v-else>-</div>
                                    </td>
                                    <td class="red--text text--lighten-2" v-if="props.item.observer">Observer</td>    
                                    <td class="blue--text text--lighten-1" v-else>Student</td>                                       
                                </template>

                            </v-data-table>                            
                        </v-flex>
                        <v-flex md3>
                            <v-card class="">
                                <v-card-title class="headline grey--text text--darken-3">Details</v-card-title>
                                <v-card-text>
                                    <v-layout row wrap v-show="!view">
                                        <v-flex md9>
                                            <el-input
                                            v-show="!view"
                                            placeholder="Grade name" size="small" 
                                            v-model="grade.name"
                                            ></el-input>
                                        </v-flex>
                                        <v-flex md2>
                                                <el-button v-show="!view" plain size="small" @click="save" v-if="!isSaved">Save</el-button>
                                                <el-button v-show="!view" plain size="small" @click="update" v-else>Updated</el-button>
                                                
                                        </v-flex>
                                    </v-layout>
                                    <v-layout  v-show="view">
                                        <v-flex md12>
                                            <b v-show="view" class="header grey--text text--darken-3">Grade Name: <span class="detail">{{ grade.name }}</span></b>                                                                                                                                                                
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>                                                                         
                                    <v-layout v-show="!view">
                                        <v-flex md4>
                                            <el-input v-show="!view" placeholder="Max Score" size="small" min="0"
                                            v-model="grade.maxScore"
                                            ></el-input>                          
                                                                            
                                        </v-flex>
                                        <v-flex md4>
                                                <el-input
                                                v-show="!view"
                                                placeholder="Grade Weight" size="small" min="0"
                                                v-model="grade.weight">
                                                </el-input>
                                        </v-flex>                                            
                                    </v-layout>                                                                               
                                    <v-layout v-show="view">
                                        <v-flex md6>
                                            <b v-show="view" class="header grey--text text--darken-3">Max Score: <span class="detail">{{ grade.maxScore }}</span></b>                                                                                                                    
                                        </v-flex>
                                        <v-flex md6>
                                                <b v-show="view" class="header grey--text text--darken-3">Weight: <span class="detail">{{ grade.weight }}%</span></b>                                                                                                                                                                                                                 
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
import StudentScore from './StudentScore'


export default {
  props: ['dialog', 'edit', 'item', 'view'],
  components: {
      StudentScore,
},
  data(){
      return{

          search: '',
          exam: {
              name: '',
              maxScore: null,
              gradeWeight: null,

          },
          headers: [
            {
                text: 'Name Sugrade',
                align: 'left',
                sortable: true,
                value: 'name'
            },
            {
                text: 'Score',
                sortable: false,
                value: 'score'
            },
            {
                text: 'Status',
                sortable: false,
                value: 'observer'
            },            
        ],
      }
  },
  created(){
      this.fetchStudents();
      if(this.edit){
          this.fetchGrade();
      }
  },
  methods:{
    fetchStudents(){
        if(this.$route.params.id != null){
            this.$store.dispatch("getAllRegisteredStudents", this.$route.params.id)
        }
        
    },
    fetchGrade(){
        const data = {
            coursePublicKey: this.$route.params.id,
            publicKey: this.item.publicKey,
        }
        this.$store.dispatch("getCourseGrade", data)
    
        
    },
    save(){
        if(this.grade.name.size == '' || this.grade.name == null){
            this.$notify({type: "error", title: "Course Grade", text: "Grade name cannot be empty"})
        }
        else if(this.grade.maxScore <= 0){
            this.$notify({type: "error", title: "Course Grade", text: "Grade max score cannot be less than or equeal to 0"})
        }        
        else if(this.grade.weight <= 0){
            this.$notify({type: "error", title: "Course Grade", text: "Grade weight cannot be less than or equeal to 0"})
        }           
        else {
            const data = {
                coursePublicKey: this.$route.params.id,
                params: this.grade,
            }
            this.$store.dispatch("saveCourseGrade", data);
        }
    },
    update(){
        if(this.grade.name.size == '' || this.grade.name == null){
            this.$notify({type: "error", title: "Course Grade", text: "Grade name cannot be empty"})
        }
        else if(this.grade.maxScore <= 0){
            this.$notify({type: "error", title: "Course Grade", text: "Grade max score cannot be less than or equeal to 0"})
        }        
        else if(this.grade.weight <= 0){
            this.$notify({type: "error", title: "Course Grade", text: "Grade weight cannot be less than or equeal to 0"})
        }           
        else {
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.grade.publicKey,
                params: this.grade,
            }
            this.$store.dispatch("updateCourseGrade", data);
        }
    },    
    cancel(saved){
      this.$parent.cancelDialog();
        
      this.$store.commit("clearAllGrades");
    },

    setScores(){
        this.allRegisteredStudets.forEach(student => {
            this.grade.scores.some(item => {
                if(item.student.publicKey == student.publicKey){
                    student.score = item.score;
                    return;
                }
            })        
        })
        
    }
 
  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'allRegisteredStudets', 'grade']),
    isSaved(){
        return this.grade.publicKey != '';
    },

  },
  watch:{  
    grade(nval, oval){
        var list = [];
        if(!this.allRegisteredStudets){
            return nval;
        }
        if(!nval){
            return nval;
        }
        this.setScores();
        
        return nval;
    },
    allRegisteredStudets(nval, oval){
        this.setScores();
    }

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
    .student-score
        margin-left -20px
    .detail
        margin-left 10px
</style>
