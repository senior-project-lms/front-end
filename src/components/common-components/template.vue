<template>
    <div>
        <v-container>
            <v-layout row wrap>
                <v-flex md1>
                    <div class="text-md-center">
                        <a>
                            <v-icon :style="votingStyle(object.hasUpVoting)">fa-chevron-up</v-icon>
                        </a>
                    </div>
                    <div class="text-md-center">
                        <h3>{{ object.votingCount }}</h3>
                    </div>
                    <div class="text-md-center">
                        <a>
                            <v-icon :style="votingStyle(object.hasDownVoting)">fa-chevron-down</v-icon>
                        </a>
                    </div>
                    <div class="text-md-center">
                        <a>
                            <v-icon v-html="star(object.hasStared)" :style="startStyle(object.hasStared)"></v-icon>
                        </a>
                    </div> 
                    <div class="text-md-center">
                        <h4>{{ object.starCount }}</h4>
                    </div>                         
                </v-flex>
                <v-flex md11>
                    <v-layout row wrap>
                        <v-flex>
                            <h2>{{ object.title }}</h2>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex>
                            {{ object.content }}
                        </v-flex>
                    </v-layout>            
                </v-flex>
            </v-layout>
        </v-container>

    </div>



</template>
<script>

export default {

    data(){
        return{
            object:{
                title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                updatedAt: '2018-02-25 11:22:02',
                votingCount: 20,
                starCount:  1,
                hasUpVoting: true,
                hasDownVoting: false,
                hasStared: true,
                isVerified: false

            },
        }
    },
    methods:{
        star(is){
            return is ? 'fa-star' : 'far fa-star'
        },
        startStyle(is){
            return is ? { color: '#F9A825'} : {}
        },
        votingStyle(has){
            return has ? { color: '#1E88E5'} : {}
        }
    },
    computed:{

    }
}
    
</script>