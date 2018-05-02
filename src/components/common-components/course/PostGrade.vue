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
                            <v-data-table
                                :headers="headers"
                                :items="allRegisteredStudets"
                                hide-actions
                            >
                                <template slot="items" slot-scope="props">
                                    <td>{{props.item.name}} {{props.item.surname}}</td>
                                    <td>
                                        <student-score class="student-score" v-if="!isSaved" :user="props.item"></student-score>
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
                                    <v-layout row wrap>
                                        <v-flex md9>
                                            <el-input placeholder="Quiz-Test Name" size="small"
                                            ></el-input>                                                                         
                                        </v-flex>
                                        <v-flex md2>
                                                <el-button plain size="small" @click="save" v-if="!isSaved">Save</el-button>
                                                <el-button plain size="small" @click="update" v-else>Updated</el-button>
                                                
                                        </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>                                                                         
                                        <v-layout>
                                            <v-flex md4>
                                                <el-input placeholder="Max Score" size="small" min="0"></el-input>                                                
                                            </v-flex>
                                            <v-flex md4>
                                                    <el-input placeholder="Grade Weight" size="small" min="0"></el-input>                                            
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
  props: ['dialog', 'edit'],
  components: {
      StudentScore,
},
  data(){
      return{
          newQuestion: false,
          studentList: [],
          headers: [
            {
                text: 'Name Surname',
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
                sortable: true,
                value: 'observer'
            },            
        ],
      }
  },
  created(){
      this.fetchStudents();
  },
  methods:{
    fetchStudents(){
        if(this.$route.params.id != null){
            this.$store.dispatch("getAllRegisteredStudents", this.$route.params.id)
        }        
    },
    save(){

    },
    update(){

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
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'allRegisteredStudets', ]),
    isSaved(){
        return false;
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
    .student-score
        margin-left -20px
</style>
