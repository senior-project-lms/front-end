<template>
    <div class="Announcement" v-if="!deleted">
    <v-container grid-list-xl>
    <v-layout row wrap>
    <v-flex xs7 offset-xs5 offset-md2 offset-lg5>

        <v-card :color="unread" :class="{'border-color': announcement.borderColor}">

            <a
                v-if="$security.hasPermission(authenticatedUser, accessPrivileges.DELETE_COURSE_RESOURCE)"
                @click="dialog = true"
                class="right dismiss">
                delete
            </a>
            
            
            <v-card-title>
                <h5 class="headline">{{ announcement.title }}</h5>
            </v-card-title>
            <v-divider class="divider"></v-divider>
            <v-card-text>
                <pre>
                    <p class="text" v-html="announcement.content"/>
                </pre>
                <ul class="file-list" v-for="(resource, i) in announcement.resources" :key="i">
                    <li>
                       <a  :href="resource.url" download> {{ resource.originalFileName}}</a>
                    </li>
                </ul>
            </v-card-text>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <div class="detail">
                        <span class="right grey--text ">{{ moment(announcement.updatedAt).fromNow() }}</span>
                        <br>
                        <span class="right grey--text ">{{announcement.createdBy.username}}</span>
                    </div>
            </v-card-actions>
        </v-card>
        <!-- DELETE DIALOG -->
        <v-dialog v-model="dialog" max-width="400" persistent>
            <v-card>
                <v-card-title class="headline">Confirm</v-card-title>
                <v-card-text>Do you want to remove it?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="deleteResourceFile">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
        </v-flex>

            </v-layout>

        </v-container>
    </div>
</template>
<script>
import * as moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "PublicResourcesTemplate",
  props: ["announcement"],
  data() {
    return {
      moment: moment,
      dialog: false,
      deleted: false
    };
  },
  methods: {
    deleteResourceFile() {
      try {
        this.dialog = false;
        if (
          this.authenticatedUser.accessPrivileges.includes(
            this.accessPrivileges.DELETE_COURSE_RESOURCE
          )
        ) {
          this.$parent.deleteResourceFile(this.announcement.publicKey);
        }
      } catch (e) {}
    }
  },
  computed: {
    ...mapGetters(["authenticatedUser", "accessPrivileges"]),
    unread() {}
  }
};
</script>


<style lang="stylus"  scoped="scoped">
.divider {
    margin-top: 2px;
    margin-bottom: 2px;
}

.Announcement {
    // margin-right 10px
    // margin-left 10px
    margin-top: 10px;
    margin-bottom: 15px;
}

.detail {
    margin-top: -100px;
    margin-bottom: -70px;
}

.text {
    margin-top: -35px;
    padding-left: 5px;
    margin-right: 20px;
    word-wrap: break-word;
}

.dismiss {
    margin-top: 15px;
    margin-right: 5px;
}

.file-list {
    margin-top: 5px;
    margin-bottom: -10px;
    list-style-type: none;
}
</style>
