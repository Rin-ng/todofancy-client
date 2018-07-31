<template>
  <v-toolbar color="blue darken-1"
      light>
    <v-toolbar-title style="font-weight: 600; color: white">This To-Do is so Fancy</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items >
      <!-- <v-btn flat style="font-weight: 600; color: white">Profile</v-btn> 
        NOTE: Tadinya mau profile update, tapi vuetify ga ada file uploader lol
       -->
      <v-btn flat style="font-weight: 600; color: white" @click="logOut()">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import {mapActions} from 'vuex'

export default{
  methods:{
    ...mapActions([
      'facebookSignOut'
    ]),
    logOut(){
      this.facebookSignOut();
    }
  },
}
</script>