<template>
    <div>
        <el-input class="score" placeholder="Grade" size="small" maxlength="4" ></el-input>                                            
    </div>
</template>
<script>
export default{
    props: ['user'],
    data(){
        return {

        }
    },
    created(){

    },
    computed: {

    }
}
</script>
<style lang="stylus" scoped>
    .score
        width  80px
</style>
