<template>
    <div>
        <v-data-table :headers="tableHeaders" :items="grades"  hide-actions light>
            <template slot="items" slot-scope="props">
                <td>
                    <b>{{ props.item.name }}</b>
                    <v-tooltip v-if="!props.item.published">
                        <v-icon class="" color="red darken-2" small slot="activator">error_outline</v-icon>                            
                        <span>Not Published</span>
                    </v-tooltip>                  
                </td>
                <td class="" >{{ floarNumber( props.item.average) }}/{{ floarNumber(props.item.maxScore) }}</td>
                <td  class="" >{{ props.item.weight }}%</td>
                <td class="text-xs-right">
                    <v-menu open-on-hover top offset-y 
                    v-if="
                    props.item.menu
                    &&
                    $security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_GRADE)"
                    >
                        <v-btn outline color="indigo" slot="activator" small>Preferences</v-btn>
                    
                        <v-list :key="`menu-${props.item.publicKey}`" >
                            <v-list-tile
                            v-if="props.item.published"
                            @click="selectedItem = props.item; disableDialog = true;" >
                                <v-list-tile-title>Disable</v-list-tile-title>
                            </v-list-tile>        
                            <v-list-tile
                            v-if="!props.item.published"
                            @click="selectedItem = props.item; publishDialog = true;" >
                                <v-list-tile-title>Publish</v-list-tile-title>
                            </v-list-tile>                                              
                            <v-list-tile 
                            @click="selectedItem = props.item; edit=true; viewDialog=true; dialog=true;" >
                                <v-list-tile-title>View</v-list-tile-title>
                            </v-list-tile>  
                            <v-list-tile 
                            @click="selectedItem = props.item; editDialog = true;" >
                                <v-list-tile-title>Edit</v-list-tile-title>
                            </v-list-tile>                                                                                                                                                                                                  
                        </v-list>
                    </v-menu>                                
                </td>

            </template>                
        </v-data-table>  
        <div>

            <v-speed-dial
            dark 
            fab 
            bottom
            fixed
            right 
            color="pink"
            transition="slide-y-reverse-transition"
            >
            <v-btn 
                slot="activator"
                fixed
                dark 
                fab  
                hover
                color="pink" 
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_GRADE)"
          
            > 
                <v-icon>add</v-icon>
                <v-icon>close</v-icon>                
            </v-btn>             
            <v-btn
                fab
                dark
                small               
                color="green"
                @click="dialog = true; edit = false;"
            >
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
                fab
                dark
                small
                color="indigo"
                @click="multipleDialog = true;"
            >
                <v-icon>add</v-icon>
            </v-btn>
            </v-speed-dial>                   
        </div>
        <div>
            <post-grade 
            v-if="
            dialog 
            &&
            ($security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_GRADE)
            ||
            $security.hasPermission(authenticatedUser, accessPrivileges.UPDATE_COURSE_GRADE))"
            
            :dialog="dialog" :edit="edit" :item="selectedItem" :view="viewDialog" ></post-grade>
            <post-multiple-grade
            v-if="
            multipleDialog 
            &&
            ($security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_GRADE)
            ||
            $security.hasPermission(authenticatedUser, accessPrivileges.UPDATE_COURSE_GRADE))"
             :dialog="multipleDialog"
            >
            </post-multiple-grade>
        </div>

        <div>
            <v-dialog v-model="deleteDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Delete</v-card-title>
                    <v-card-text>Are you sure to delete</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="null">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>         
        <div>
            <v-dialog v-model="publishDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Publish</v-card-title>
                    <v-card-text>Are you sure to publish</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="publishDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="publish">Publish</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>
        <div>
            <v-dialog v-model="disableDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Disable</v-card-title>
                    <v-card-text>Are you sure to disable</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="disableDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="disable">Disable</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>  
        <div>
            <v-dialog v-model="editDialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Edit</v-card-title>
                    <v-card-text>Are you sure to edit?</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="editDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="editDialog = false; dialog = true; edit = true;">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>                      
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import PostGrade from './PostGrade'
import PostMultipleGrade from './PostMultipleGrade'

export default {
    props: [],
    components: {
        PostGrade,
        PostMultipleGrade,
    },
    data(){
        return {
            multipleDialog: false,
            dialog: false,
            edit: false,
            viewDialog: false,
            selectedItem: null,
            editDialog: false,
            disableDialog: false,
            publishDialog: false,
            classListDialog: false,
            deleteDialog: false,
            tableHeaders: [
                {
                    text: 'Name',
                    value: 'name',
                    sortable: false,
                    align: 'left',
                },
                {
                    text: 'Average',
                    value: 'average',
                    sortable: false,
                },
                {
                    text: 'Affect',
                    value: 'affect',
                    sortable: false,
                },
                {
                    text: '',
                    value: '',
                    sortable: false,
                }
                
            ],
        }
    },
    created(){
        this.fetchGrades();
    },
    methods: {
        fetchGrades(){
            this.$store.dispatch("getCourseGrades", this.$route.params.id);
        },
        fetchGradesForStudent(){
            this.$store.dispatch("getCourseGradeForStudent", this.$route.params.id);
        },   
        publish(){

            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedItem.publicKey
            }
            this.$store.dispatch("publishCourseGrade", data);
            this.publishDialog = false;
        },
        disable(){

            const data = {
                coursePublicKey: this.$route.params.id,
                publicKey: this.selectedItem.publicKey
            }
            this.$store.dispatch("disableCourseGrade", data);
            this.disableDialog = false;
        },   
        cancelDialog(){
            this.dialog = false;
            this.edit = false;
            this.selectedItem = null;
            this.disableDialog = false;
            this.publishDialog = false;
            this.classListDialog = false;
            this.deleteDialog = false;      
            this.editDialog = false;  
            this.viewDialog = false;
            this.multipleDialog = false;
            this.fetchGrades(); 
            this.fetchGradesForStudent();
        },
        floarNumber(number){
            try{
                return number.toFixed(2);
            }
            catch(e){
                return '-';
            }
        }             
    },
    computed:{
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTests', 'grades']),
    }

    

}
</script>

<style lang="stylus" scoped>
  .speed-dial 
    position absolute
  

  .btn--floating 
    position relative
  
</style>
