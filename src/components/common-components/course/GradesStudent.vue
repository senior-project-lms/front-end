<template>
    <div>
        <v-data-table :headers="tableHeaders" :items="studentGrades"  hide-actions light>
            <template slot="items" slot-scope="props">
                <td>
                    <b>
                        {{ props.item.name }}
                    </b>
                </td>
                <td class="" >{{ floarNumber(props.item.score) }}/{{ floarNumber(props.item.maxScore) }}</td>
                <td class="" >{{ floarNumber(props.item.average) }} / {{ floarNumber(props.item.maxScore) }}</td>
                <td class="" >{{ props.item.weight }}%</td>
                <td class="text-xs-right">
                    <!-- <v-btn v-if="props.item.menu" outline color="indigo" slot="activator" small>View Detail</v-btn>                                -->
                </td>

            </template>                
        </v-data-table>                 
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props: [],
    components: {
    },
    data(){
        return {
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
        }
    },
    created(){
        this.fetchGrades();
    },
    methods: {
        fetchGrades(){
            this.$store.dispatch("getCourseGradeForStudent", this.$route.params.id);
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
        ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courseQuizTests', 'studentGrades']),

    }
    

}
</script>

<style lang="stylus" scoped>

</style>
