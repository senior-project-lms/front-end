<template>
    <div>
        <v-layout>
                <v-flex>
                    <v-data-table
                    :headers="headers"
                    :items="courses">
                        <template slot="items" slot-scope="props">
                            <tr>
                                <td>{{ props.item.code }}</td>
                                <td class="text-xs-center">{{ props.item.name }}</td>
                                <td class="text-xs-center">{{ `${props.item.owner.name} ${props.item.owner.surname}` }}</td>
                                <td class="text-xs-right"><a @click="removeCourse(props.index)"><v-icon color="red darken-2">settings</v-icon></a></td>
                            </tr>
                        </template>
                    </v-data-table>

                </v-flex>
        </v-layout>        
        <div>
            <v-btn fixed dark fab bottom right color="pink"  @click="dialog = !dialog" v-if="authenticatedUser.accessPrivileges.includes(accessPrivileges.SAVE_COURSE)"> 
                <v-icon>add</v-icon>
                </v-btn>
        </div>

        <save-course :dialog="dialog"/>
    </div>


</template>
<script>
import { mapGetters } from 'vuex';
import SaveCourse from './SaveCourse'

export default {
    components:{
        SaveCourse
    },
    data(){
        return {
            dialog: false,
           headers: [
                { text: 'Code', value: 'code', align: 'left' },
                { text: 'Name', value: 'name', align: 'center'},
                { text: 'Lecturer', value: 'lecturer', align: 'center'},
                { text: '', value: 'event' },
            ],
        }
    },
    created(){


        this.$store.dispatch("getAllActiveCourses");
    },
    methods:{
          
    cancelSavingCourse(){
      this.dialog = false;
    }

    },
    computed:{
      ...mapGetters(['authenticatedUser', 'accessPrivileges', 'courses']),
    },

  
}
</script>

<style lang="stylus" scoped>

</style>
