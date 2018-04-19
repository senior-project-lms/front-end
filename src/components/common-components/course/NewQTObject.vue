<template>
    <div>
        <v-card>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex md12>
                        <el-input type="textarea" :rows="3" placeholder="Fill with question text"
                        v-model="qt.content">
                        </el-input>                
                    </v-flex>
                </v-layout>
                <div class="textspace">
                    <span class="title grey--text text--darken-1">Answers Options</span>
                    <v-divider></v-divider>
                </div>

                <v-layout row wrap>
                    <v-flex md12>
                        <v-layout>
                            <v-flex md2>
                                <v-select
                                :items="options"
                                v-model="value"
                                label="Select"
                                single-line
                                ></v-select>                                
                            </v-flex>
                            <v-flex md1></v-flex>
                            <v-flex md4>
                                <div class="counter">
                                    Answer Count: 
                                    <el-button icon="el-icon-minus" size="mini" @click="counter(-1)"></el-button>
                                    <span class="counter-num">{{answerCount}}</span>
                                    <el-button icon="el-icon-plus" size="mini" @click="counter(1)"></el-button>
                                </div>
                            </v-flex>
                        </v-layout>
                        <div class="text-space">
                            <span class="title grey--text text--darken-1" >Answers</span>
                            <v-divider></v-divider>                            
                        </div>
                        <v-layout row wrap>
                            <v-flex md12>
                                <template v-for="i in answerCount" v-if="value != null">
                                    {{i}}
                                    <v-layout v-if="value.code == 1" :key="`layout-${i}`">
                                        <v-flex md12>
                                            <el-input
                                            :key="`item-form-${i}`"
                                            type="textarea"
                                            :rows="2"
                                            placeholder="Please input"
                                            v-model="qt.answers[i-1].text"
                                           >
                                            </el-input>  
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="value.code == 2" :key="`layout-${i}`">
                                        <v-flex md1 class="">
                                            <el-checkbox> option-{{i}}</el-checkbox>
                                        </v-flex>
                                        <v-flex md11>
                                            <el-input v-model="qt.answers[i-1].text" placeholder="Please input" size="mini"></el-input>
                                        </v-flex>
                                    </v-layout>                                      
                                    <v-layout v-if="value.code == 3" :key="`layout-${i}`">
                                        <v-flex md1 class="">
                                            <el-radio   :label="i" >option-{{i}}</el-radio>
                                        </v-flex>
                                        <v-flex md11>
                                            <el-input   placeholder="Please input" size="mini"></el-input>
                                        </v-flex>
                                    </v-layout>                                    
                                </template>
                                <div class="text-space" v-if="answerCount > 2">
                                    <span class="title grey--text text--darken-1" >Select Correct Answer</span>
                                    <v-divider></v-divider>                            
                                </div>                                
                                <v-layout row wrap v-if="value != null">
                                    <v-flex md12>
                                        <template v-for="i in answerCount">
                                            <el-radio v-model="qt.answers[i].correct" v-if="value.code == 3"  :key="`item-form-${i}`" :label="i" > option-{{i}}</el-radio>
                                        </template>                                        
                                    </v-flex>
                                </v-layout>          
                                <v-layout row wrap v-if="value != null">
                                    <v-flex md12>
                                        <template v-for="i in answerCount">
                                            <el-checkbox v-model="qt.answers[i].correct" v-if="value.code == 2" :key="`item-form-${i}`"> option-{{i}}</el-checkbox>
                                        </template>                                        
                                    </v-flex>
                                </v-layout>                                                           
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
                    <v-btn outline color="green" small @click="save">Save</v-btn>                    
                </v-flex>
            </v-layout>            
        </v-card>

        
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props:['item', ],
    data(){
        return{
            value: null,
            options: [
                {
                text: 'Text',
                code: 1,
                max: 1,
                },
                {
                text: 'Select Multi',
                code: 2,
                max: 5,
                },
                {
                text: 'Select Single',
                code: 3,
                max: 5,
                }                    
                                    
            ],  
            answerCount: 0,
            qt: {
                content: '',
                answers: []
            }
        }
    },
    methods: {
        
        cancel(){
            this.answerCount = 0;
            this.qt.question = '';
            this.qt.answers = []
            this.$emit("cancel");
        },
        counter(i){                
            if(this.value == null){
                return;
            }
            if( this.answerCount + i  > this.value.max){
                return;
            }
            if (this.answerCount + i < 0) {
                this.answerCount = 0;
            }
            else{
                this.answerCount += i;
                if(i > 0){
                    this.qt.answers.push({text: '', type: this.value.code,  correct: false})
                }
                else{
                    this.qt.answers.splice(i, 1); 
                }
            }

            console.log(this.qt.answers)
        },
        save(){
            const data = {
                coursePublicKey: this.$route.params.id,
                qtPublicKey: this.courseQuizTest.publicKey,
                params: this.qt,
            }
            this.$store.dispatch("saveCourseQTQuestion", data)
            .then(response => {
                if(response.status){
                    this.cancel();
                }
            });
        }
    },
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTest']),
        isSaved(){
            return this.courseQuizTest.publicKey.length != 0;
        }
    },        
    watch: {
        value(to, from){
            this.answerCount = 0;
            return to;
        }
    }
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
