<template>
    <div class="">
        <v-flex>
            <v-data-table :headers="tableHeaders" :items="grades"  hide-actions>
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.text }}</td>
                    <td class="text-xs-right" >{{ props.item.score }}/{{ props.item.maxScore }}</td>
                    <td class="text-xs-right" >{{ props.item.average }}</td>
                    <td v-show="!props.item.visible" class="text-xs-right" >%{{ props.item.affect }}</td>
                    <td v-show="!props.item.visible" class="text-xs-right">
                        <router-link :to="{name: 'GradeDetails'}" >view details</router-link>
                    </td>
                </template>                
            </v-data-table>
        </v-flex>
        <v-divider></v-divider>
        <v-flex>
        </v-flex>
    </div>
</template>

<script>
    export default {
        data(){
            return{
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
                        gradePublicId: '3019283012830912378192739123',
                        studentGradePublicId: '04530750j3274587c359634j5692387',
                        text: 'Quiz 1',
                        score: 78,
                        maxScore: 100,
                        average: 54,
                        affect: 3,
                    },
                    {
                        gradePublicId: 'mc928492134826346128734c812634',
                        studentGradePublicId: 'm72603461283648c12b63462b754b`125348',
                        text: 'Assignment 1',
                        score: 90,
                        maxScore: 100,                        
                        average: 70,
                        affect: 4,
                    },
                    {
                        gradePublicId: 'm02364cb2893946895v219378469m23y4s2cb',
                        studentGradePublicId: ',082398xy12tbt4x2g3413yug4nx23h41uhanhx',
                        text: 'Quiz 2',
                        maxScore: 100,                        
                        score: 90,
                        average: 70,
                        affect: 3,
                    },
                    {
                        gradePublicId: 'x,o2u1mz3248u8n1y8794yuecgufgi1273t4',
                        studentGradePublicId: 'co5m467yn2txuz3btr1b61r523bzd3ty2f',
                        text: 'Midterm',
                        maxScore: 100,                        
                        score: 56,
                        average: 34,
                        affect: 30,
                    }                                                            
                ]
            }
        },
        computed: {
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
        methods: {
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
        created(){
            this.addOverall();
        }

    }    
</script>
<style lang="stylus" scoped="scoped">
    .grade-footer
        padding-left 25px

</style>
