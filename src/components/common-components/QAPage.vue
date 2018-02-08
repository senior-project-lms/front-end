<template>
    <div>
        Question Answer
        <v-card :color="unread">
            


            <!--<a v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.DELETE_SYSTEM_ANNOUNCEMENT)"
                @click="dialog = true"
                class="right dismiss">
                delete
            </a>
            <a v-else class="right dismiss" href="">dismiss</a> -->
            
            <v-card-title>
                <h5 class="headline">{{ qa.title }}</h5>
            </v-card-title>
            <v-divider class="divider"></v-divider>
            <v-card-text>
                <pre>
                    <p class="text" v-html="qa.content"/>
                </pre>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="detail">
                        <span class="right grey--text ">{{ moment(qa.updatedAt).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{qa.createdBy}}</span>
                    </div>
            </v-card-actions>
            
        </v-card>
        <v-flex>
        <section class="Container">
            <QAAnswer-template v-for="(answer, i) in answers" :key="i" :answer="answer"/>
        </section>
    </v-flex>
    <div>
             <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" > 
              <v-icon>add</v-icon>
            </v-btn>
      </div>
    </div>
</template>

<script>
    import QAAnswerTemplate from "@/components/common-components/QAAnswerTemplate";
    import SubmitQAAnswer from "@/components/SubmitQAAnswer";

    export default {
        name: 'QAPage',
        components:{
            QAAnswerTemplate,
            SubmitQAAnswer
        },
        data(){
            return{
                dialog: false,
            }
        }
    }    
</script>
<style>

</style>
