<template>
    <div>
        <v-flex>
            <v-card height="70">
               <v-card-media class="white--text" height="70" src="/static/parallax2.jpg">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline">My Courses</span>
                        </v-flex>
                    </v-layout>
                </v-container>
               </v-card-media>
            </v-card>
        </v-flex>
        <v-flex md4>
                <v-card class="courses-temp"> 
                    <v-list>                      
                        <template v-for="(course, i) in courses">
                                <v-list-tile  :key="i" :to="{name: 'CourseAnnouncements', params: {id: course.publicId}}">                           
                                    <v-list-tile-content>
                                        <v-list-tile-title><p class="course">{{course.code}} - {{course.name}}</p></v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider :key="i" v-if="i + 1 < courses.length"></v-divider>                      
                        </template>
                        
                    </v-list>
                </v-card>
        </v-flex>      
    </div>
</template>


<script>
    export default{
        data(){
            return{
                courses: [
                    {
                        publicId: '73982492n9417987354i459127c987298377n123798213',
                        code: "CS481 #LEC1",
                        name: 'Management Information System'
                    },   
                    {
                        publicId: '73982492n941798739127c987298377n123798213',
                        code: 'CS101 #LEC1',
                        name: 'Introduction To Programing'
                    },
                    {
                        publicId: '73982492n941798739127c987298377n123798213231c',
                        code: 'CS204',
                        name: 'Industry 4.0'
                    },
                    {
                        publicId: '73982492n941798739127c987298377n12379821t235533',
                        code: 'CS424',
                        name: 'Introduction to Artificial Inteligence'
                    },
                    {
                        publicId: '73982492n941798739127c98729hf3458377n123798213',
                        code: 'CS464',
                        name: 'Cloud Computing'
                    },
                    {
                        publicId: '73982492n9417987391279jnckc987298377n123798213',
                        code: 'CS404',
                        name: 'Introduction To Cryptology'
                    }
                                     
                ]
            }
        },
    }
</script>

<style scoped>
    .courses-temp{
        margin-top: 20px;
        margin-left: 25px;
    }
    .nav{
        margin-top: 10px;
    }
    .course{
        color: #424242;
    }
</style>

