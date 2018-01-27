<template>
  <v-app>
    <notifications />
    <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">
  pre
    white-space pre-wrap       /* Since CSS 2.1 */
    white-space -moz-pre-wrap  /* Mozilla, since 1999 */
    white-space -pre-wrap     /* Opera 4-6 */
    white-space -o-pre-wrap    /* Opera 7 */
    word-wrap break-word       /* Internet Explorer 5.5+ */

  .notifications
    margin-top 20px
    margin-left 5px
</style>
