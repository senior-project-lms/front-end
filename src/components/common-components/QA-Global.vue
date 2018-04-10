<template>
<v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>

    <v-layout row wrap v-for="(qa, i) in globalQAs" :key="`qa-lay-${i}`">
        <v-flex md12>
            <QA-template class="qa" :key="i" :qa="qa"/>
        </v-flex>
    </v-layout>
        <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
        
        > 
            <v-icon>add</v-icon>
        </v-btn>
            <post-global-question :dialog="dialog"/>

        <template>
            <v-btn block class="load-more" light outline @click="loadGlobalQAs(page)" v-if="loader">More</v-btn>
        </template>
  </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {AccessLevel} from "../../properties/accessLevel";
    import {AccessPrivileges} from '../../properties/accessPrivileges'

    import QATemplate from "@/components/common-components/QATemplate";
    import PostGlobalQuestion from "@/components/common-components/SaveGlobalQA";
    export default {
        components:{
            QATemplate,
            PostGlobalQuestion
        },
        data(){
            return{
                dialog: false,
                page: 1,
                //Placeholder data for testing. The 'qa' array will be originally empty. Real data will be taken from the backend.
            }
        },
        created(){
            this.loadGlobalQAs(this.page);
        },

        methods:{

            loadGlobalQAs(page){
                this.$store.dispatch("getGlobalQAs", page);
                this.page++;
            },
    
            cancelDialog(){
                this.dialog = false;
            },

        },

    computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'globalQAs']),
      loader(){
        return (this.globalQAs.length / this.page) == 5;
        }
    }
}    
</script>
<style lang="stylus" scoped>
    .qa
        margin-bottom 10px
</style>
