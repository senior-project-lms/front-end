<template >
    <v-flex>
        <section class="Container">
            <announcement-template v-for="(announcement, i) in announcements" :key="i" :announcement="announcement"/>
        </section>
    </v-flex>
</template>

<script>
    import AnnouncementTemplate from '@/components/common-components/AnnouncementTemplate';
    export default {
        components: {
            AnnouncementTemplate
        },
        data(){
            return{
                announcements: [
                    {
                        publicId: '79234927834c9j3274j293487234',
                        publishDate: new Date().getDate(),
                        author: 'umit.kas',
                        title: 'Midterm Exam is announced',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        isRead: false,
                        borderColor: 'red lighten-3'
                    },
                    {
                        publicId: '79234927834c9j3274j293487234',
                        publishDate: new Date().getDate(),
                        author: 'umit.kas',
                        title: 'Homework 1 grades are assigned',
                        text: 'Hi all,\nthe midterm exam will be on thursday in class.\nit will cover all the topics until last lecture.\ngood luck.\nUmit',
                        isRead: true,
                    },
                    {
                        publicId: '79234927834c9j3274j293487234',
                        publishDate: new Date().getDate(),
                        author: 'umit.kas',
                        title: '#Quiz 1',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        isRead: true,
                    },
                    {
                        publicId: '79234927834c9j3274j293487234',
                        publishDate: new Date().getDate(),
                        author: 'umit.kas',
                        title: '#Quiz 1',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        isRead: true,
                    },                                       
                    //  {
                    //     publicId: '',
                    //     publishDate: '',
                    //     author: '',
                    //     title: '',
                    //     text: '',
                    // }
                ]
            }
        }
    }    
</script>
<style lang="stylus">
    .Container
        margin-left 10px
        margin-right 10px
</style>
