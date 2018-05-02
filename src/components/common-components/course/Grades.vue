<template>
    <div class="">
        <v-container fluid grid-list-md grid-list-lg grid-list-xs grid-list-sm>
            <v-layout row wrap>
                <v-flex md12 sm12 xs12> 
                    <v-data-table :headers="tableHeaders" :items="grades"  hide-actions>
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.text }}</td>
                            <td class="" >{{ props.item.score }}/{{ props.item.maxScore }}</td>
                            <td class="" >{{ props.item.average }}</td>
                            <td v-show="!props.item.visible" class="" >%{{ props.item.affect }}</td>
                            <td v-show="!props.item.visible" class="text-xs-right">
                                <v-menu open-on-hover top offset-y 
                                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_GRADE)"
                                >
                                    <v-btn outline color="indigo" slot="activator" small>Preferences</v-btn>
                                
                                    <v-list :key="`menu-${props.item.publicKey}`" >
                                        <v-list-tile
                                        @click="selectedItem = props.item;" >
                                            <v-list-tile-title>Disable</v-list-tile-title>
                                        </v-list-tile>        
                                        <v-list-tile
                                        @click="selectedItem = props.item;" >
                                            <v-list-tile-title>Publish</v-list-tile-title>
                                        </v-list-tile>                                              
                                        <v-list-tile 
                                        @click="selectedItem = props.item;" >
                                            <v-list-tile-title>View</v-list-tile-title>
                                        </v-list-tile>  
                                        <v-list-tile 
                                        @click="selectedItem = props.item;" >
                                            <v-list-tile-title>Edit</v-list-tile-title>
                                        </v-list-tile>                                                                                                                                                                                                  
                                    </v-list>
                                </v-menu>                                
                            </td>

                        </template>                
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
        <div>
            <v-btn fixed dark fab bottom right color="pink" 
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.SAVE_COURSE_GRADE)"
                @click="dialog = true; edit = false;"
                > 
                <v-icon>add</v-icon>
            </v-btn>        
        </div>
        <div>
            <post-grade :dialog="dialog" :edit="edit" ></post-grade>
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
                    <v-btn color="green darken-1" flat="flat" @click.native="null">Publish</v-btn>
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
                    <v-btn color="green darken-1" flat="flat" @click.native="null">Disable</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>        
        </div>           
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import PostGrade from './PostGrade'

export default {
    components:{
        PostGrade,
    },
    data(){
        return{
            dialog: false,
            edit: false,
            selectedItem: null,
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
                    text: 'Score',
                    value: 'score',
                    sortable: false,
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
            grades: [
                {
                    publicKey: '3019283012830912378192739123',
                    studentpublicKey: '04530750j3274587c359634j5692387',
                    text: 'Quiz 1',
                    score: 78,
                    maxScore: 100,
                    average: 54,
                    affect: 3,
                },
                {
                    publicKey: 'mc928492134826346128734c812634',
                    studentpublicKey: 'm72603461283648c12b63462b754b`125348',
                    text: 'Assignment 1',
                    score: 90,
                    maxScore: 100,                        
                    average: 70,
                    affect: 4,
                },
                {
                    publicKey: 'm02364cb2893946895v219378469m23y4s2cb',
                    studentpublicKey: ',082398xy12tbt4x2g3413yug4nx23h41uhanhx',
                    text: 'Quiz 2',
                    maxScore: 100,                        
                    score: 90,
                    average: 70,
                    affect: 3,
                },
                {
                    publicKey: 'x,o2u1mz3248u8n1y8794yuecgufgi1273t4',
                    studentpublicKey: 'co5m467yn2txuz3btr1b61r523bzd3ty2f',
                    text: 'Midterm',
                    maxScore: 100,                        
                    score: 56,
                    average: 34,
                    affect: 30,
                }                                                            
            ]
        }
    },
    created(){
        this.addOverall();
    },
    methods: {
        cancelDialog(){
            this.dialog = false;
            this.edit = false;
            this.selectedItem = null;
            this.disableDialog = false;
            this.publishDialog = false;
            this.classListDialog = false;
            this.deleteDialog = false;         
        },
        addOverall(){
            var obj = {
                text: 'Overall',
                maxScore: this.maxOverall,                        
                score: this.overall,
                average: this.overAllAverage,
                affect: '',
                visible: true
            }
            this.grades.push(obj)
        }
    },
        
    computed: {
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTests']),
        
        overall(){
            var total = 0;
            this.grades.forEach(grade => {
                total += grade.score * (grade.affect / 100)
            });
            return parseFloat(total).toFixed(2);
        },
        maxOverall(){
                var total = 0;
            this.grades.forEach(grade => {
                total += grade.maxScore * (grade.affect / 100)
            });
            return parseFloat(total).toFixed(2);
        },
        overAllAverage(){
            var total = 0;
        this.grades.forEach(grade => {
            total += grade.average * (grade.affect / 100)
        });
            return parseFloat(total).toFixed(2);
        }
        
    },    
}    
</script>
<style lang="stylus" scoped>
    .grade-footer
        padding-left 25px

</style>
