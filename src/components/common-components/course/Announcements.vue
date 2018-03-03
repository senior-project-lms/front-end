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
                    
                ]
            }
        }
    }    
</script>
<style lang="stylus" scoped>

</style>
