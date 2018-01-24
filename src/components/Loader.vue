<template>
  <div>
        <v-progress-circular indeterminate v-bind:size="100" 
            class="progress"
            color="primary">
        </v-progress-circular>  
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    }
  
}
</script>

<style lang="stylus" scoped>
     
    div
        text-align: center

  .progress-circular
        margin: 1rem
        margin-top: 300px

</style>

