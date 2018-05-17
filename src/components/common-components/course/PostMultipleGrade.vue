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
                <v-toolbar-title>Add New Grades</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <!-- <v-btn dark flat @click.native="save">Publish</v-btn> -->
                </v-toolbar-items>
                    <div class="upload-btn-wrapper">
                        <v-btn outline>Upload File</v-btn>
                        <input type="file" @change="processFile($event)"/>
                    </div>                                     
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
                                :items="examList"
                                hide-actions
                                :search="search"
                            >
                                
                                <template slot="items" slot-scope="props">
                                    <td>{{props.item.student.name}} {{props.item.student.surname}}</td>
                                    <td v-for="(name, i) in gradeNames" :key="`col-${i}`" class="blue--text text--lighten-1">
                                        {{ props.item.grades[name] }}
                                    </td>                                       
                                </template>

                            </v-data-table>                        
                        </v-flex>  
                        <v-flex md3>
                            <v-card  v-if="grades.length > 0">
                                <v-card-title class="headline grey--text text--darken-3">
                                    Details
                                    <v-spacer></v-spacer>                                
                                <el-button v-if="grades.length > 0" plain size="small"  @click="removeAll">Remove All</el-button>
                                    
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    
                                    <template v-for="(grade, i) in grades">
                                        <v-layout row wrap :key="`name-lay-${i}`">
                                            <v-flex md9>
                                                <el-input
                                                placeholder="Quiz-Test Name" size="small" 
                                                v-model="grade.name"
                                                disabled
                                                ></el-input>
                                            </v-flex>
                                            <v-flex md2>
                                                    <el-button plain size="small" @click="removeItem(i)">Remove</el-button>
                                            </v-flex>
                                        </v-layout>
                                        <v-divider :key="`divider-${i}`"></v-divider>                                                                         
                                        <v-layout :key="`score-lay-${i}`">
                                            <v-flex md4>
                                                <el-input placeholder="Max Score" size="small" min="0"
                                                v-model="grade.maxScore"
                                                ></el-input>                          
                                                                                
                                            </v-flex>
                                            <v-flex md4>
                                                    <el-input
                                                    placeholder="Grade Weight" size="small" min="0"
                                                    v-model="grade.weight">
                                                    </el-input>
                                            </v-flex>                                            
                                        </v-layout>                                      
                                    </template>
                                    <v-layout row wrap>
                                        <v-flex md12>
                                            <v-btn v-if="grades.length > 0" block outline color="indigo" @click="save">Save</v-btn>                                                                                                                                                                                                        
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


export default {
  props: ['dialog'],
  components: {

  },
  data(){
      return{
          fileList: [],
          search: '',
          headers: [
            {
                text: 'Name Surname',
                align: 'left',
                sortable: true,
                value: 'name'
            },            
        ],
        gradeNames: [],
        examList: [],
        grades: []
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
    removeAll(){
        this.headers = [];
        this.examList = []; 
        this.gradeNames = [];
        this.grades = [];
        this.$store.commit('clearExcelStore');
        this.reInitialize();
    },
    removeItem(index){
        this.headers.splice(index + 1, 1);
        this.gradeNames.splice(index, 1);
        this.grades.splice(index, 1);
    },
    processFile(event){
        var file = event.target.files[0];
        if(file != undefined || file != null){

            this.$store.dispatch('excelToJson', file);
        }
        event.target.value = ''
    },
    reInitialize(){
        
        this.headers.push({
                text: 'Name Surname',
                align: 'left',
                sortable: true,
                value: 'name'
        })               
        this.allRegisteredStudets.map(item => {
            this.examList.push({student: item})
        });

    },   
    save(){
        
        var list = []

        for(var i in this.grades){
            var grade = this.grades[i]
            var scores = [];
        
            for(var j in this.examList){
             
                var exam = this.examList[j]
            

                scores.push(
                    {
                        userPublicKey: exam.student.publicKey,
                        score: exam.grades[grade.name]
                    }
                )
        
            }
            grade.userScores = scores;
            
            list.push(grade)
        }


        const data = {
            coursePublicKey: this.$route.params.id,
            params: list
        }
        this.$store.dispatch('saveAllCourseGrade', data);
        this.$parent.cancelDialog();
    },
    update(){

    },    
    clearForm(){

    },
    cancel(saved){
      this.$store.commit("clearAllGrades");
      this.clearForm();
      this.$parent.cancelDialog();
    },
 
  },


  computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'allRegisteredStudets', 'excelJson']),

  },
  watch:{
    allRegisteredStudets(nval, oval){

        if(nval.length > 1){
            nval.map(item => {
                this.examList.push({student: item})
            });
        }

        return nval;
    },
    excelJson(nval, oval){
        if(nval != null){
            var cols = nval[0];
            
            for(var name in cols){
                if(name == 'username'){
                    continue;
                }   
                this.headers.push({
                text: name,
                align: 'left',
                sortable: true,
                value: name
                })
                this.gradeNames.push(name)
                this.grades.push(
                    {
                        name: name,
                        maxScore: null,
                        weight: null,
                    }
                )
            }

            nval.forEach(item => {
                for(var name in item) {
                    this.examList.some(itm => {
                        if(itm.student.username == item.username){
                            delete item.username;
                            itm.grades = item
                            return;
                        }
                    });
                    var value = item[name];
                }                
            })
        }
        return nval;
    }      
  },
  beforeDestroy(){
    
  }
}
</script>
<style lang="stylus" scoped>
    .input-file
        background-color Transparent
        background-repeat no-repeat
        border none
        cursor pointer
        overflow hidden
        outline none

    .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        
    }

    .remove-all
        float: right


    .upload-btn-wrapper input[type=file] 
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
</style>
