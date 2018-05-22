<template>
    <div>
        <v-container fluid>
        <v-layout column align-center>

            
            <br/><br/><br/><br/><br/><br/><br/><br/>

            <blockquote>
                <v-icon x-large color="blue darken-2">error</v-icon><br/>
                <h1>Hold on...</h1>
                <h3>
                    You're not allowed to enter here.
                </h3>

        <br/>
        <h5>You will be redirected in {{ remainingTime }} seconds.</h5>
        <p>ERROR: 401 - UNAUTHORIZED</p>
        </blockquote>

        </v-layout>
        </v-container>
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