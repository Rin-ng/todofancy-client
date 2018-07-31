<template>
  <v-flex xs8 offset-xs2 >
      <v-card dark color="light-blue" style="padding: 20px 0px" >
        <v-card color="white" style="margin: 20px;">
          <v-card-text style="color: black">
            <h3 class="cardDesc"> Name: </h3> 
            <p class="cardEntry">{{name}} </p>
            <h3 class="cardDesc"> Description: </h3> 
            <p class="cardEntry" v-if="description">{{description}} </p> 
            <p class="cardEntry" v-if="!description">{{altDesc}}</p>
            <h3 class="cardDesc"> Tags: </h3> 
            <v-btn flat small a v-for="(tag, index) in tags" :key=index class = "deep-purple--text" style="font-size: 15px;" @click="search(tag)">{{tag}} </v-btn> 
            <h3 class="cardDesc"> Completed: </h3> 
            <p class="cardEntry">{{completeStatus}} </p>
            <div v-if="completeStatus === true">
            <h3 class="cardDesc"> Completed On: </h3> 
            <p class="cardEntry">{{completedDate}} </p>
            </div>
            <br>
          </v-card-text>
        </v-card>
        <v-card-actions>
        <v-spacer></v-spacer>

          <v-btn fab dark small color="red darken-4 " @click="deleteThis(id)"><v-icon class="material-icons">
            delete_outline
          </v-icon></v-btn>
          <v-btn v-if="completeStatus === false" fab dark small color="green accent-4" style="margin-left: 15px" @click="complete(id)"><v-icon class="material-icons">
            
            check_circle_outline
          </v-icon></v-btn>
      </v-card-actions>

      </v-card>
    </v-flex>
</template>
<script>
import {mapActions} from 'vuex'

export default{
  data(){
    return{
      altDesc: 'N/A',
    }
  },
  props:['name', 'description', 'tags', 'id', 'completeStatus', 'completedDate'],
  methods:{
    ...mapActions([
      'deleteTask', 'markComplete', 'searchByTag'
    ]),
    deleteThis(id){
      this.deleteTask(id);
    },
    complete(id){
      this.markComplete(id);
    },
    search(tag){
      this.searchByTag(tag);
    }
  },
}
</script>

<style scoped>
.cardDesc{
  font-size: 20px;
  font-weight: 600;
}

.cardEntry{
  font-size: 20px;
}
</style>
