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
                                    <td v-for="(name, i) in examNames" :key="`col-${i}`" class="blue--text text--lighten-1">
                                        {{ props.item.grades[name] }}
                                    </td>                                       
                                </template>

                            </v-data-table>                        
                        </v-flex>  
                        <v-flex md3></v-flex>                                  
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
          exam: {
              name: '',
              maxScore: null,
              gradeWeight: null,

          },
          headers: [
            {
                text: 'Name Surname',
                align: 'left',
                sortable: true,
                value: 'name'
            },            
        ],
        examNames: [],
        examList: [],
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
    processFile(event){
        var file = event.target.files[0];
        if(file != undefined || file != null){

            this.$store.dispatch('excelToJson', file);
        }
    },      
    save(){

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
            this.examNames.push(name)
            }
            console.log(nval)
            nval.forEach(item => {
                for(var name in item) {
                    this.examList.some(itm => {
                        console.log(item.username)
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


    .upload-btn-wrapper input[type=file] 
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
</style>
