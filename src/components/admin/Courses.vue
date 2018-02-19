<template>
    <div>
        <v-layout class="top-info">   
            <v-flex md4 class="outer-left-box">
                <v-card color="green lighten-2" class="white--text">
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">{{ coursesStatuses.visibleCourses }}</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">
                                        <a class="white--text" @click="fetchActiveCourses">
                                            Active Courses
                                        </a>
                                        
                                    </div>
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
                                    <div class="headline text-md-center">{{ coursesStatuses.invisibleCourses }}</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">
                                        <a class="white--text" @click="fetchInactiveCourses">
                                            Deactivated Courses
                                        </a>
                                    </div>
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
                                    <div class="headline text-md-center">99</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <div>
                                    <div class="headline text-md-center">Nothing Determined</div>
                                </div>
                            </v-flex>
                        </v-layout>                            
                    </v-container>
                </v-card>
            </v-flex>             
        </v-layout>
        <v-divider class="box-divider"></v-divider>
            <h1 class="active-text grey--text darken-4">{{ activeText }}</h1>
        <v-divider></v-divider>
        <v-layout class="course-list">
            <v-flex>
                <v-data-table
                :headers="headers"
                :items="courses"
                :rows-per-page-items="[50, 75]"	>
                    <template slot="items" slot-scope="props">
                        <tr :class="props.item.color">
                            <td>{{ props.item.code }}</td>
                            <td class="text-xs-center">
                                <router-link :to="{name: 'CourseAnnouncements', params: {id: props.item.publicKey}}">
                                    {{ props.item.name }}
                                </router-link>
                            </td>
                            <td class="text-xs-center">{{ `${props.item.owner.name} ${props.item.owner.surname}` }}</td>
                            <td>
                                <v-layout  right>
                                    <v-flex>
                                        <v-switch class="course-switch" v-model="props.item.visible" @change="updateVisibility(props.item.publicKey, props.item.visible)"></v-switch>
                                    </v-flex>
                                    <v-flex>
                                        <a><v-icon color="blue darken-2">settings</v-icon></a>
                                    </v-flex>
                                </v-layout>    
                            </td>
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
            activeText: 'Active Courses',
            headers: [
                { text: 'Code', value: 'code', align: 'left' },
                { text: 'Name', value: 'name', align: 'center'},
                { text: 'Lecturer', value: 'lecturer', align: 'center'},
                { text: '', value: 'event' },
            ],
        }
    },
    created(){
        
        this.$store.dispatch("getCoursesStatuses");
        this.$store.dispatch("getAllCoursesByVisibility", true);
    },
    methods:{
        fetchActiveCourses(){
            this.$store.dispatch("getAllCoursesByVisibility", true);
            this.activeText = 'Active Courses'
        },
        fetchInactiveCourses(){
            this.$store.dispatch("getAllCoursesByVisibility", false);
            this.activeText = 'Deactivated Courses'
        },
        updateVisibility(publicKey, visible){
            for(var index in this.courses){
                if(publicKey == this.courses[index].publicKey){
                    if(visible){
                        this.courses[index].color = 'light-green lighten-4';
                    }
                    else{
                        this.courses[index].color = 'red lighten-4';
                    }
                    
                    break;
                }
            }
            this.$store.dispatch('updateCourseVisiblity', {publicKey: publicKey, visible: visible});
        },

        cancelSavingCourse(){
        this.dialog = false;
        }

    },
    computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courses', 'coursesStatuses']),
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
    
    .course-switch
        margin-right 20px
    
    .active-text
        margin-left 15px
</style>
