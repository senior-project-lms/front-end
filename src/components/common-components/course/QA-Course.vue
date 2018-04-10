<template>
<v-container  fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>

    <v-layout row wrap v-for="(qa, i) in courseQAs" :key="`qa-lay-${i}`">
        <v-flex md12>
            <QA-template class="qa" :key="i" :qa="qa"/>
        </v-flex>
    </v-layout>
        <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
            v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_QA)"
        > 
            <v-icon>add</v-icon>
        </v-btn>
            <post-qa :dialog="dialog" 
            v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_QA)"
            />

        <template>
            <v-btn block class="load-more" light outline @click="loadCourseQAs(page)" v-if="loader">More</v-btn>
        </template>
  </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {AccessLevel} from "@/properties/accessLevel";
    import {AccessPrivileges} from '@/properties/accessPrivileges'

    import QATemplate from "@/components/common-components/course/QATemplate";
    import PostQa from "@/components/common-components/course/SaveCourseQA";
    export default {
        components:{
            QATemplate,
            PostQa
        },
        data(){
            return{
                dialog: false,
                page: 1,
                //Placeholder data for testing. The 'qa' array will be originally empty. Real data will be taken from the backend.
            }
        },
        created(){
            this.loadCourseQAs(this.page);
        },

        methods:{

            loadCourseQAs(page){
                const data = {
                    coursePublicKey: this.$route.params.id,
                    page: page
                }
                this.$store.dispatch("getCourseQAs", data);
                this.page++;
            },
    
        
            cancelDialog(){
                this.dialog = false;
          
          },

        },

    computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQAs']),
      loader(){
        return (this.courseQAs.length / this.page) == 5;
        }
    }
}    
</script>
<style lang="stylus" scoped>
    .qa
        margin-bottom 10px
</style>
