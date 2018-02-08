<template>
    <div>
        <br>
        <h2>Questions asked in Introduction to Programming Course</h2>
        <br>
        <v-flex>
        <section class="Container">
            <QA-template v-for="(qa, i) in qas" :key="i" :qa="qa"/>
        </section>

        <div>
            <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" 
      
            > 
            <v-icon>add</v-icon>
            </v-btn>
            <post-course-question :dialog="dialog"/>

        </div>
    </v-flex>
    </div>
</template>

<script>
    import QATemplate from "@/components/common-components/QATemplate";
    import PostCourseQuestion from "@/components/PostCourseQuestion";
    export default {
        components:{
            QATemplate,
            PostCourseQuestion
        },
        data(){
            return{
                dialog: false,

                qas: [{
                    title: "What is the point of pointers?",
                    content: "I know it sounds silly but srsly why do we even use them?",
                    updatedAt: "20180202",
                    createdBy: "Steve Sinclair",
                    numAnswers: 5,
                    isVerified: false
                },

                {
                    title: "How do we install Python?",
                    content: "I couldn't attend the last lecture, could you please give me instructions on how to install it?",
                    updatedAt: "20180202",
                    createdBy: "Rebecca Ford",
                    numAnswers: 18,
                    isVerified: false
                }
                    
                ]
            }
        },

        methods:{

            loadCourseQuestions(page){
                this.$store.dispatch("getCourseQuestions", page);
                this.page++;
            },
    
            deleteQuestion(publicKey){
                if(this.authenticatedUser.accessPrivileges.includes(this.accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)){
                    this.$store.dispatch("deleteCourseQuestion", publicKey);
                }
            },

            cancelCourseQuestionPosting(){
                this.dialog = false;
            },

        }
    }    
</script>
<style>

</style>
