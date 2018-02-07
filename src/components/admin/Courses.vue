<template>
    <div>
        <v-layout class="top-info">   
            <v-flex md4 class="outer-left-box">
                <v-card color="green lighten-2" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">26</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">Active Courses</div>
                                </div>
                            </v-flex>
                        </v-layout>                            
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex md4 class="inner-box">
                <v-card color="blue lighten-2" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">132</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">Deaactiveted Courses</div>
                                </div>
                            </v-flex>
                        </v-layout>                            
                    </v-container>
                </v-card>
            </v-flex>   
            <v-flex md4 class="outer-right-box">
                <v-card color="red lighten-1" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">26</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">Active Courses</div>
                                </div>
                            </v-flex>
                        </v-layout>                            
                    </v-container>
                </v-card>
            </v-flex>             
        </v-layout>
        <v-divider class="box-divider"></v-divider>
        <v-layout class="course-list">
                <v-flex>
                    <v-data-table
                    :headers="headers"
                    :items="courses">
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td>{{ props.item.code }}</td>
                                <td class="text-xs-center">{{ props.item.name }}</td>
                                <td class="text-xs-center">{{ `${props.item.owner.name} ${props.item.owner.surname}` }}</td>
                                <td class="text-xs-right"><a @click="removeCourse(props.index)"><v-icon color="blue darken-2">settings</v-icon></a></td>
                            </tr>
                        </template>
                    </v-data-table>

                </v-flex>
        </v-layout>        
        <div>
            <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE)"> 
                <v-icon>add</v-icon>
                </v-btn>
        </div>

        <save-course :dialog="dialog"/>
    </div>


</template>
<script>
import { mapGetters } from 'vuex';
import SaveCourse from './SaveCourse'

export default {
    components:{
        SaveCourse
    },
    data(){
        return {
            dialog: false,
           headers: [
                { text: 'Code', value: 'code', align: 'left' },
                { text: 'Name', value: 'name', align: 'center'},
                { text: 'Lecturer', value: 'lecturer', align: 'center'},
                { text: '', value: 'event' },
            ],
        }
    },
    created(){


        this.$store.dispatch("getAllActiveCourses");
    },
    methods:{
          
    cancelSavingCourse(){
      this.dialog = false;
    }

    },
    computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courses']),
    },

  
}
</script>

<style lang="stylus" scoped>
    .outer-left-box
        margin-top 10px
        margin-left 15px
        margin-right 5px
    
    .outer-right-box
        margin-top 10px
        margin-right 15px
        margin-left 5px
    
    .inner-box
        margin-top 10px
        margin-right 5px
        margin-left 5px

    .box-divider
        margin-top 20px
        margin-bottom 10px

    .course-list
        margin-right 15px
        margin-left 15px

</style>
