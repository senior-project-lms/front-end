<template>
    <div>
  <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon @click.native="cancel" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Calendar</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
              <v-container fluid grid-list-md grid-list-sm grid-list-xs >
                  <v-layout row wrap>
                      <v-flex md12>
                        <v-card>
                            <v-card-title class="title">
                                Add New
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-layout>
                                    <v-flex md7 xs12>
                                        <el-input
                                        v-model="event.title"
                                        placeholder="Title"
                                        ></el-input>
                                    </v-flex>                            
                                    <v-flex md3 xs12>
                                        <el-date-picker
                                        v-model="event.date"
                                        type="datetimerange"
                                        range-separator="To"
                                        start-placeholder="Start date"
                                        end-placeholder="End date">
                                        </el-date-picker>                                                                    
                                    </v-flex>
                                    <v-flex md2 class="">
                                        <el-button type="primary" @click="save">Add to Calendar</el-button>
                                    </v-flex>                                     
                                </v-layout>
                            </v-card-text>
                        </v-card>                                       
                      </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                      <v-flex md6 xs12>
                        <v-card>
                            <v-card-title class="title">
                            Events
                            <v-spacer></v-spacer>
                            <v-text-field
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                                v-model="search"
                            ></v-text-field>
                            </v-card-title>
                            <v-data-table
                            :headers="headers"
                            :items="systemEvents"
                            :search="search"
                            >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.title }}</td>
                                <td>{{ moment(props.item.start).format('MMMM Do YYYY, h:mm:ss a')}}</td>
                                <td>{{ moment(props.item.end).format('MMMM Do YYYY, h:mm:ss a')}}</td>
                                <td class="text-xs-right"><a class="red--text" @click="deleteEvent(props.item.publicKey)"
                                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_GLOBAL_CALENDAR)"
                                >delete</a></td>
                            </template>
                            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                            </v-data-table>
                        </v-card>
                      </v-flex>
                  </v-layout>                  
              </v-container>
          </v-card-text>
          <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import * as moment from 'moment'
export default{
    props: ['dialog'],
    data(){
        return{
            moment: moment,
            search: '',
            event: {
                    title: null,
                    date: null,
            },
            headers: [
                { text: "Title", value: "username", align: "left" , sortable: false, },
                { text: "Start Date", value: "start", },
                { text: "End Date", value: "end",},
                { text: "", value: "event", sortable: false }
            ]            
        }
    },
    created(){
        this.$store.dispatch("getAllSystemEvents");
    },
    methods:{
        save(){
            if(this.event.title.length == 0 || this.event.date == null){
                this.$notify({type: "error", title: "Course Event", text: "Date cannot be null"})
            }
            else{
                const data = {
                    title: this.event.title,
                    start: this.event.date[0],
                    end: this.event.date[1]
                }   
            
                this.$store.dispatch("saveSystemEvent", data);
            }
        },
        deleteEvent(publicKey){
            this.$store.dispatch("deleteSystemEvent", publicKey)
            .then(response => {
                if(response.status){
                    this.$store.dispatch("getAllSystemEvents");
                }
            });
        },
        cancel(){
            this.$emit("cancel");
        }
    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'systemEvents']),

    },
    watch:{

    }
}
    
</script>
<style lang="stylus" scoped>

</style>
