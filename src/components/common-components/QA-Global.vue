<template>
<v-container>
  <v-flex>
    <h1>Globally asked questions</h1>
    <br>
    <section class="Container">
      <QA-template v-for="(qa, i) in qas" :key="i" :qa="qa"/>
    </section>
    <div>
      <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
      
      > 
        <v-icon>add</v-icon>
      </v-btn>
        <post-global-question :dialog="dialog"/>

    </div>
    <template>
        <v-btn block class="load-more" light outline @click="loadGlobalQuestions(page)" v-if="loader">More</v-btn>
      </template>
  </v-flex>
  </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {AccessLevel} from "../../properties/accessLevel";
    import {AccessPrivileges} from '../../properties/accessPrivileges'

    import QATemplate from "@/components/common-components/QATemplate";
    import PostGlobalQuestion from "@/components/PostGlobalQuestion";
    export default {
        components:{
            QATemplate,
            PostGlobalQuestion
        },
        data(){
            return{
                dialog: false,
                //Placeholder data for testing. The 'qa' array will be originally empty. Real data will be taken from the backend.
                qas: [{
                    title: "I can't find Eidolon Teralyst.",
                    content: "I've been wandering at the Plains of Eidolon during night time for 2 hours and I can't find any Eidolon. Am I missing something?",
                    updatedAt: "20180202",
                    createdBy: "Steve Sinclair",
                    numAnswers: 5,
                    isVerified: false,
                    answers: [
                      {
                      content: "I have absolutely no idea.",
                      updatedAt: "20180202",
                      createdBy: "Tarik Keceli",
                      numUpvotes: 3,
                      numDownvotes: 18,
                      isVerified: false
                      },
                      {
                      content: "You should check for Eidolon lures. Usually they spawn near an Eidolon.",
                      updatedAt: "20180202",
                      createdBy: "Triss Merigold",
                      numUpvotes: 18,
                      numDownvotes: 3,
                      isVerified: true
                      }
                    ]
                },

                {
                    title: "What is this Fomorian thingy?",
                    content: "Apparently there's this new alert archwing mission. How do we do it and is there any good loot?",
                    updatedAt: "20180205",
                    createdBy: "Rebecca Ford",
                    numAnswers: 18,
                    isVerified: true,
                    answers: [
                      {
                      content: "I have absolutely no idea.",
                      updatedAt: "20180202",
                      createdBy: "Tarik Keceli",
                      numUpvotes: 3,
                      numDownvotes: 18,
                      isVerified: false
                      },
                      {
                      content: "You should check for Eidolon lures. Usually they spawn near an Eidolon.",
                      updatedAt: "20180202",
                      createdBy: "Triss Merigold",
                      numUpvotes: 18,
                      numDownvotes: 3,
                      isVerified: true
                      }
                    ]
                },

                {
                    title: "How to mod Valkyr's Hysteria?",
                    content: "Are melee mods affecting the Hysteria or just purely ability mods?",
                    updatedAt: "20180207",
                    createdBy: "Scott Taylor",
                    numAnswers: 846,
                    isVerified: false,
                    answers: [
                      {
                      content: "I have absolutely no idea.",
                      updatedAt: "20180202",
                      createdBy: "Tarik Keceli",
                      numUpvotes: 3,
                      numDownvotes: 18,
                      isVerified: false
                      },
                      {
                      content: "You should check for Eidolon lures. Usually they spawn near an Eidolon.",
                      updatedAt: "20180202",
                      createdBy: "Triss Merigold",
                      numUpvotes: 18,
                      numDownvotes: 3,
                      isVerified: true
                      }
                    ]
                },

                {
                    title: "How to mod Valkyr's Hysteria?",
                    content: "Are melee mods affecting the Hysteria or just purely ability mods?",
                    updatedAt: "20180207",
                    createdBy: "Scott Taylor",
                    numAnswers: 846,
                    isVerified: false,
                    answers: [
                      {
                      content: "I have absolutely no idea.",
                      updatedAt: "20180202",
                      createdBy: "Tarik Keceli",
                      numUpvotes: 3,
                      numDownvotes: 18,
                      isVerified: false
                      },
                      {
                      content: "You should check for Eidolon lures. Usually they spawn near an Eidolon.",
                      updatedAt: "20180202",
                      createdBy: "Triss Merigold",
                      numUpvotes: 18,
                      numDownvotes: 3,
                      isVerified: true
                      }
                    ]
                },

                {
                    title: "How to mod Valkyr's Hysteria?",
                    content: "Are melee mods affecting the Hysteria or just purely ability mods?",
                    updatedAt: "20180207",
                    createdBy: "Scott Taylor",
                    numAnswers: 846,
                    isVerified: false,
                    answers: [
                      {
                      content: "I have absolutely no idea.",
                      updatedAt: "20180202",
                      createdBy: "Tarik Keceli",
                      numUpvotes: 3,
                      numDownvotes: 18,
                      isVerified: false
                      },
                      {
                      content: "You should check for Eidolon lures. Usually they spawn near an Eidolon.",
                      updatedAt: "20180202",
                      createdBy: "Triss Merigold",
                      numUpvotes: 18,
                      numDownvotes: 3,
                      isVerified: true
                      }
                    ]
                },

                {
                    title: "How to mod Valkyr's Hysteria?",
                    content: "Are melee mods affecting the Hysteria or just purely ability mods?",
                    updatedAt: "20180207",
                    createdBy: "Scott Taylor",
                    numAnswers: 846,
                    isVerified: false,
                    answers: [
                      {
                      content: "I have absolutely no idea.",
                      updatedAt: "20180202",
                      createdBy: "Tarik Keceli",
                      numUpvotes: 3,
                      numDownvotes: 18,
                      isVerified: false
                      },
                      {
                      content: "You should check for Eidolon lures. Usually they spawn near an Eidolon.",
                      updatedAt: "20180202",
                      createdBy: "Triss Merigold",
                      numUpvotes: 18,
                      numDownvotes: 3,
                      isVerified: true
                      }
                    ]
                },
                    
                ]
            }
        },

        methods:{

            loadGlobalQuestions(page){
                this.$store.dispatch("getGlobalQuestions", page);
                this.page++;
            },
    
            deleteQuestion(publicKey){
                if(this.authenticatedUser.accessPrivileges.includes(this.accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)){
                    this.$store.dispatch("deleteGlobalQuestion", publicKey);
                }
            },

            cancelGlobalQuestionPosting(){
                this.dialog = false;
            },

        },

    computed:{
      //...mapGetters(['authenticatedUser', 'systemAnnouncements', 'accessPrivileges']),
     
  

      loader(){
        return (this.qas.length / this.page) == 5;
        }
    }
}    
</script>
<style lang="stylus">
    .Container
        margin-left 10px
        margin-right 10px
</style>
