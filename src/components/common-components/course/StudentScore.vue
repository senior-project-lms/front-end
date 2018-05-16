<template>
    <div>
        <el-input v-show="!view" class="score" placeholder="Grade" size="small" maxlength="4" v-model="score"></el-input> 
        <b class="score-num" v-show="view">{{ score }}</b>                                         
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default{
    props: ['user', 'view'],
    data(){
        return {
            score: 0,
        }
    },
    created(){
        this.setScore();
    },
    methods: {
        setScore(){
            this.grade.scores.some(item => {
                if(item.student.publicKey == this.user.publicKey){
                    this.score = item.score;
                    return;
                }
            })
        },
        save(){
            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.grade.publicKey,
                params: {
                    userPublicKey: this.user.publicKey,
                    score: this.score
                }
            }
            this.$store.dispatch("saveCourseScore", data);
        },
    },
    computed: {
    ...mapGetters(['authenticatedUser', 'accessPrivileges', 'grade']),
    },
    watch:{
        score(nval, oval){
            if(nval != oval){
                this.save();
            }
            return nval;
        }
    }
}
</script>
<style lang="stylus" scoped>
    .score
        width  80px
    .score-num
        margin-left 20px
</style>
