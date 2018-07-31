<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex align-center justify-center layout text-xs-center>
         <v-avatar size="256px" color="grey lighten-4" v-if="userInfo === undefined">
            loading...
         </v-avatar>
         <v-avatar size="256px" color="grey lighten-4" v-else>
            <img :src="userInfo.image" alt="avatar">
         </v-avatar>
      </v-flex>
    </v-layout>
    <v-flex align-center justify-center layout text-xs-center off-set-sm4>
      <h3 style="font-size: 40px"> {{userInfo.name}} </h3>
   </v-flex>
    <v-flex align-center justify-center layout text-xs-center off-set-sm4>
      <h3 style="font-size: 35px"> = {{userInfo.status}} =</h3>
   </v-flex>
   <v-flex align-center justify-center layout text-xs-center off-set-sm4>
     <p style="font-size: 20px; margin-bottom:0px">Level {{userInfo.level}}</p>
   </v-flex>
    <v-flex align-center justify-center layout text-xs-center off-set-sm4>
          <v-progress-linear
            background-color="white"
            color="blue"
            height="10"
            :value="userInfo.progress"
         ></v-progress-linear>
      </v-flex>
      
  </v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    methods:{
      ...mapActions([
        'getUserData'
      ])
    },
    created(){
      this.getUserData();
      // let user =  localStorage.getItem('userInfo');
      // this.userInfo = JSON.parse(user);
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    }
  }
</script>

<style scoped>
.v-progress-linear{
   width: 40%;
}
</style>