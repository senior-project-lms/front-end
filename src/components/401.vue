<template>
    <div>
        <h1>401 page is not authorized</h1>
        <h4>We will redirect you in {{ remainingTime }} second later</h4>
    </div>
</template>
<script>
export default{
    data(){
        return{
            remainingTime: 5,
        }
    },
    created(){
        this.intervar = setInterval(this.countDown, 1000);
    },
    methods:{
        countDown(){
            --this.remainingTime 
            if(this.remainingTime == 0){
                clearInterval(this.intervar);
                this.$router.push({name: 'SignOut'})
            }
        }

    }
}
</script>