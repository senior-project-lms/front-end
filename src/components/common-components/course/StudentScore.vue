<template>
    <div>
        <el-input class="score" placeholder="Grade" size="small" maxlength="4" v-model="score"></el-input>                                            
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default{
    props: ['user',],
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
</style>
