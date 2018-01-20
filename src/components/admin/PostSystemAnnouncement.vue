<template>
      <v-dialog v-model="dialog" persistent max-width="900">
        <v-card>
          <v-card-title class="headline">System Announcement</v-card-title>
          <v-flex class="post">
              <v-text-field label="Title" v-model="systemAnnouncement.title" required=""/>
          </v-flex>
          <v-flex class="post">
            <vue-editor v-model="systemAnnouncement.content" required/>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" flat @click.native="cancel">Cancel</v-btn>
            <v-btn color="green darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  
</template>
<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: ['dialog'],
  components: {
      VueEditor,
  },
  data(){
      return{
          systemAnnouncement: {
            title: '',
            content: '',
            resources: [],
          }
      }
  },
  created(){

  },
  methods:{

    save(){
        if(this.systemAnnouncement.title.length > 0 && this.systemAnnouncement.content.length > 0){
            this.$store.dispatch("saveSystemAnnouncement", this.systemAnnouncement)
            .then(response => {
              console.log(response)
              if(response){
                this.cancel();
              }
            });
        }
    },
    cancel(){
            this.$parent.cancelSystemAnnouncementPosting();
    }
  },
  computed: {
  },
  watch:{
      dialog(){
        this.systemAnnouncement = {
            title: '',
            content: '',
            resources: [],
          }
      }
  }
}
</script>
<style lang="stylus" scoped>
    .post
      margin-right 20px;
      margin-left  20px;
</style>
