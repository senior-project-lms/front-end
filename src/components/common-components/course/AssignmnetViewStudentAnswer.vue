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
                <v-toolbar-title>Assignment Student Responses</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
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
                        <v-flex md3>
                            <v-list subheader>

                                <v-subheader>Participant Students</v-subheader>
                                <template v-for="(student, index) in allRegisteredStudets">
                                    <v-divider :key="index"></v-divider>
                                    <v-list-tile :key="student.publicKey" @click="selectedItem = student; ">
                                        <v-list-tile-content>
                                        <v-list-tile-title v-html="student.name + ' ' + student.surname"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    </template>                                
                            </v-list>
                        </v-flex>
                        <v-flex md9>
                            <v-layout row wrap v-if="selectedItem != null">
                                <v-flex>
                                    <v-card>
                                        <v-card-text>
                                            <v-layout>
                                                <v-flex md8>
                                                    <span class="title grey--text text--darken-1">Student: </span>
                                                    <span class="title grey--text text--darken-5">
                                                        {{selectedItem.name + " " + selectedItem.surname}}
                                                    </span>
                                                </v-flex>
                                                <v-flex md4 class="text-md-right">
                                                    <span class="title grey--text text--darken-1">Total Score: </span>
                                                    <span class="title grey--text text--darken-5">0</span>
                                                </v-flex>  
                                                                                                                                              
                                            </v-layout>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap v-if="assignment != null">
                                <v-flex md12>
                                    <v-layout row wrap>
                                      <v-flex md12>
                                            <p v-html="assignment.content"></p>
                                      </v-flex>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-layout row wrap>

                                    </v-layout>
                                    <v-layout row wrap>
                                      <v-flex md12>
                                      </v-flex>                                        
                                        <v-flex md12 sm12>
                                            <b class="subheading">Files</b>
                                            <ul class="file-list">
                                                <li v-for="(resource, i) in assignment.resources" :key="i" >
                                                <v-layout>
                                                <v-flex md10 xs10>
                                                    <a  :href="resource.url" download>{{resource.originalFileName}}</a>                                 
                                                    </v-flex>
                                                    <v-flex md2 xs2 class="text-md-right">
                                                    </v-flex>                         
                                                </v-layout>
                                                    
                                                    <v-divider class="divide-li"/>

                                                </li>
                                            </ul>
                                        </v-flex>                    
                                    </v-layout> 
                                    <!-- student response -->
                                </v-flex>
                            </v-layout>


                        </v-flex>
                    </v-layout>
            </v-container>
        </v-card-text>

        </v-card>

    </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';
import * as moment from 'moment';

export default{
    components: {
    },
    props: ['dialog', 'publicKey'],
    data(){
        return {
            moment: moment,
            selectedItem: null,
            assignment: null,

        }
    },
    created(){
        this.fetchAllStudents();
        this.fetchStudentAnswers();
    },
    methods:{
        fetchAllStudents(){
            return this.$store.dispatch("getAllRegisteredStudents", this.$route.params.id);
        },
        fetchStudentAnswers(){

            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.publicKey,
            }
            return this.$store.dispatch("getCourseStudentAssignments", data);

            
        },
        cancel(){
            this.$emit("cancel")
        },

    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'allRegisteredStudets', 'studentAssignments']),
    },
    watch:{
        selectedItem(nval, oval){
            if(nval != oval){
                this.assignment = null;
                this.studentAssignments.some(element => {
                    if(element.createdBy.publicKey == this.selectedItem.publicKey){
                        this.assignment = element;
                        return element;
                    }
                });
            }
        
            return nval
        }
    }

}
    
</script>
<style lang="stylus" scoped>
.file-list 
    margin-top 10px
    list-style-type none
</style>
