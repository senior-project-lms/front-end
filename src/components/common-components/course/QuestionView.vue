<template>
    <div>
        <v-card>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex md12>
                        <p v-html="qt.content"></p>                
                    </v-flex>
                </v-layout>
                <div class="textspace">
                    <span class="title grey--text text--darken-1">Answers</span>
                    <v-divider></v-divider>
                </div>

                <v-layout row wrap>
                    <v-flex md12>
                        <div class="text-space">
                            <span class="title grey--text text--darken-1" >Answers</span>
                            <v-divider></v-divider>                            
                        </div>
                        <v-layout row wrap>
                            <v-flex md12>
                                <template v-for="(answer, i) in qt.answers">
                                    <v-layout v-if="answer.code == 1" :key="`layout-${i}`">
                                        <v-flex md12>
                                            <el-input
                                            :key="`item-form-${i}`"
                                            type="textarea"
                                            :rows="2"
                                            placeholder="Please input"
                                           >
                                            </el-input>  
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="answer.code == 2" :key="`layout-${i}`">
                                        <v-flex md1 class="">
                                            <el-checkbox></el-checkbox>
                                        </v-flex>
                                        <v-flex md11>
                                            <p v-html="answer.text"></p>
                                        </v-flex>
                                    </v-layout>                                      
                                    <v-layout v-if="answer.code == 3" :key="`layout-${i}`">
                                        <v-flex md1 class="">
                                            <el-radio   :label="i" ></el-radio>
                                        </v-flex>
                                        <v-flex md11>
                                            <p v-html="answer.text"></p>
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
            <v-layout row wrap>
                <v-flex>
                    <v-btn outline color="red" small @click="cancel">Cancel</v-btn>
                    <v-btn outline color="green" small>Save</v-btn>                    
                </v-flex>
            </v-layout>            
        </v-card>

        
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props:['item', 'qt'],
    data(){
        return{
  
        }
    },
    methods: {
        
    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', ]),
        
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
