<template>
  
</template>
<script>
    import {mapGetters} from 'vuex';

    export default{
        data(){
            return {
                someData: {}
            }
        },
        created(){

        },
        computed:{
            ...mapGetters(['exampleArray', 'exampleObject']), // asyncly fetch data from store

        },
        methods: {
            refreshSomewhere(){

            },
            getExampleObject(){
                var dataFromComponents = this.someData;
                return this.$store.dispatch("fetchExampleObjectFromServer", dataFromComponents)
                .then(result => {
                    // to whatever you want.
                    // as it is known requests are async therefore then method is used, for waiting to do some stuff
                    this.refreshSomewhere()
                    return result;
                });
            },
        }
    }
</script>
<style scoped>

</style>
