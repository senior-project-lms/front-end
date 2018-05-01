<template>
    <div>
        <v-card>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex md12>
                        <p class="text-md-right">
                            <a class="red--text text-darken-4" @click="dialog = true"
                            v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_QT)"

                            >delete</a>
                        </p>                        
                        <p v-html="qt.content"></p>                
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex md12>
                        <div class="text-space">
                            <span class="header grey--text text--darken-1" v-if="qt.answers.length > 1">Answers</span>
                            <span class="header grey--text text--darken-1" v-else>Answer</span>
                            <v-divider></v-divider>                            
                        </div>
                        <v-layout row wrap>
                            <v-flex md12>
                                <template v-for="(answer, i) in qt.answers">
                                    <v-layout v-if="answer.type == 1" :key="`layout-${i}`">
                                        <v-flex md12>
                                            <el-input
                                            :key="`item-form-${i}`"
                                            type="textarea"
                                            :rows="2"
                                            placeholder="Please input"
                                            :disabled="true"
                                           >
                                            </el-input>  
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="answer.type == 2" :key="`layout-${i}`">
                                        <v-flex md12 class="">
                                            <el-checkbox :label="answer.text" :disabled="true" v-model="answer.correct"></el-checkbox>
                                        </v-flex>
                                    </v-layout>                                      
                                    <v-layout v-if="answer.type == 3" :key="`layout-${i}`">
                                        <v-flex md12 class="">
                                            <el-radio   :label="answer.text" v-model="answer.text" :disabled="true" :value="i" v-if="answer.correct"></el-radio>
                                            <el-radio   :label="answer.text" :disabled="true" :value="i" v-else></el-radio>
                                        </v-flex>
                                    </v-layout>                                    
                                </template>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex></v-flex>
                </v-layout>
            </v-card-text>
            <v-divider></v-divider>         
        </v-card>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Delete</v-card-title>
                <v-card-text>Are you sure to delete</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Candel</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteQuestion">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>        
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props:['item', 'qt'],
    data(){
        return{
            dialog: false,
        }
    },
    created(){
    },
    methods: {
        deleteQuestion(){
            const data = {
                coursePublicKey: this.$route.params.id,
                qtPublicKey: this.courseQuizTest.publicKey,
                publicKey: this.qt.publicKey,
            }
            this.$store.dispatch("deleteCourseQTQuestion", data);
            this.dialog = false;
        }
    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTest']),
        
    },   
}    
</script>
<style lang="stylus" scoped>
    .counter-num
        margin-left 5px
        margin-right 5px
    .text-space
        margin-top 10px
        margin-bottom 10px
    .counter
        margin-top 25px
</style>
