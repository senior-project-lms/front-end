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
                    <v-toolbar-title>Courses</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialog = false">Save</v-btn>
                    </v-toolbar-items>
                    <v-menu bottom right offset-y>
                        <v-btn slot="activator" dark icon>
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </v-menu>
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md grid-list-lg grid-list-xs grid-list-sm>
                        <v-layout row wrap>
                            <v-flex md4 xs4 sm4 offset-md2>
                                <v-text-field
                                v-model="searchParam"
                                label="Search..."
                                placeholder="ex: CS101"
                                ></v-text-field>
                            </v-flex>
                            <v-flex md1 xs1 sm1>
                                <v-btn
                                color="secondary"
                                :loading="loading"
                                @click.native="filterCourses"
                                :disabled="loading"
                                >
                                    Search
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex md9>
                                <v-data-table
                                :headers="headers"
                                :items="notEnrolledCourses"
                                :rows-per-page-items="[50, 75]"	>
                                    <template slot="items" slot-scope="props">
                                        <tr :class="props.item.color">
                                            <td>{{ props.item.code }}</td>
                                            <td class="text-xs-center">
                                                <router-link :to="{name: 'CourseAnnouncements', params: {id: props.item.publicKey}}">
                                                    {{ props.item.name }}
                                                </router-link>
                                            </td>
                                            <td class="text-xs-center">{{ `${props.item.owner.name} ${props.item.owner.surname}` }}</td>
                                            <td>
                                               <a>enroll</a>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>                                
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
import { mapGetters } from "vuex";

export default{
    props: ['dialog'],
    data(){
        return{
            searchParam: '',
            loading: null,
            headers: [
            { text: "Code", value: "code", align: "left" },
            { text: "Name", value: "name", align: "center" },
            { text: "Lecturer", value: "lecturer", align: "center" },
            { text: "", value: "event" },
            ],
        }
    },
    created(){

    },
    methods:{
        filterCourses(){
            this.loading = true;
            this.$store.dispatch("searchNotRegisteredCoursesBySearchParam", this.searchParam)
            .then(response => {
                this.loading = false;
            });
        },
        cancel(){
            this.$parent.cancelCourseDialog();
        }
    },
    computed: {
        ...mapGetters(["authenticatedUser", "accessPrivileges", "notEnrolledCourses"
        ])
  },
}
</script>
<style lang="stylus" scoped>

</style>
