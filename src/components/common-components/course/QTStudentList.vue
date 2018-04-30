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
                <v-toolbar-title>Quiz-Test Student List</v-toolbar-title>
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
                                <template v-for="(item, index) in courseQTUsers">
                                    <v-divider :key="index"></v-divider>
                                    <v-list-tile :key="item.publicKey" @click="selectedItem = item; ">
                                        <v-list-tile-content>
                                        <v-list-tile-title v-html="item.createdBy.name + ' ' + item.createdBy.surname"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    </template>                                
                            </v-list>
                        </v-flex>
                        <v-flex md9>
                            <qt-student-answer-view 
                            class="question-view"
                            v-for="question in courseQuizTest.questions" 
                            :key="question.publicKey" 
                            :question="question"
                            :qtPublicKey="courseQuizTest.publicKey"
                            :item="selectedItem">
                            </qt-student-answer-view>
                        </v-flex>
                    </v-layout>
            </v-container>
        </v-card-text>

        </v-card>

    </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';
import QtStudentAnswerView from './QTStudentAnswerView'
export default{
    components: {
    QtStudentAnswerView,
    },
    props: ['dialog', 'publicKey'],
    data(){
        return {
            selectedItem: null,

        }
    },
    created(){
        this.fetchQT();
        this.fetchCourseQTUsers();
    },
    methods:{
        fetchCourseQTUsers(){
            const data = {
                    coursePublicKey: this.$route.params.id,
                    qtPublicKey: this.publicKey,
            }

            this.$store.dispatch("getCourseQTUsers", data)     
        },
        fetchQT(){
            const data = {
                    coursePublicKey: this.$route.params.id,
                    publicKey: this.publicKey,
            }
            this.$store.dispatch("getCourseQuizTest", data);
        },        
        cancel(){
            this.$emit("cancel")
        },

    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQTUsers', 'courseQuizTest']),
    }

}
    
</script>
<style lang="stylus" scoped>
    .question-view
        margin-bottom 10px
</style>
