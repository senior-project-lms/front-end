<template>
    <div>
        <h1>404 page is not found</h1>
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
            console.log("worked")
            --this.remainingTime 
            if(this.remainingTime == 0){
                clearInterval(this.intervar);
                this.$router.push({name: 'HomePage'})
            }
        }

    }
}
</script>