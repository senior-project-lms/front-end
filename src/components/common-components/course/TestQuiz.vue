
<template>
    <div>
        <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
            <v-layout row wrap>
                <v-flex md12 sm12 xs12>
                    <v-data-table
                        :headers="headers"
                        :items="courseQuizTests"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                        <td><b>{{ props.item.name }}</b></td>
                        <td class="text-xs-left">{{ props.item.publishDate }}</td>
                        <td class="text-xs-left">{{ props.item.dueDate }}</td>
                        <td class="text-xs-right">
                            <v-btn outline color="indigo" small>Start</v-btn>
                            <v-menu open-on-hover top offset-y>
                                <v-btn outline color="indigo" slot="activator" small>Preferences</v-btn>
                                <v-list :key="`menu-${props.item.publicKey}`" >
                                    <v-list-tile  >
                                        <v-list-tile-title>Edit</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile  >
                                        <v-list-tile-title>Delete</v-list-tile-title>
                                    </v-list-tile>
                                    <v-list-tile  >
                                        <v-list-tile-title>Disable</v-list-tile-title>
                                    </v-list-tile>                                                                                         
                                </v-list>
                            </v-menu>
                        </td>
                        </template>
                        <template slot="no-data">
                            <div  class="text-xs-center">
                                <b class="">No Quiz or Test exist:(</b>
                            </div>
                        </template>                        
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
        <div>
            <v-btn fixed dark fab bottom right color="pink" 
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_ANNOUNCEMENT)"
                @click="dialog = !dialog" > 
                <v-icon>add</v-icon>
            </v-btn>
        </div> 
        <post-quiz-test v-if="dialog" :dialog="dialog"></post-quiz-test>       
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import PostQuizTest from './PostTestQuiz';

export default {
    components:{
        PostQuizTest,
    },
    data(){
        return{
            dialog: false,
            headers: [
            {
                text: 'Exam Date',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            { text: 'Publish Date', value: 'publishDate', sortable:false, align: 'left'},
            { text: 'Due Date', value: 'dueDate', sortable:false, align: 'left' },
            { text: '', value: 'publicKey', sortable:false, align: 'right' }
            ],                
            exams: [   
                {
                    publicKey: '1231231231230',
                    name: 'Quiz-1',
                    publishDate: '11/04/2018 15:30',
                    dueDate: '19/04/2018 15:30',
                }      
            ]
        }
    },
    created(){
        this.$store.dispatch("getAllCourseQuizTest", this.$route.params.id);
    },
    methods:{
        cancelDialog(){
            this.dialog = false;
        }
    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTests']),
    }    
}    
</script>
<style scoped>

</style>
