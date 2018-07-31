<template>
  <div>
    <v-toolbar
      color="light-blue accent-3"
      dark
      tabs
      height="90px"
    >
    <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs2 style="margin-bottom:10px">
        <v-text-field
          v-model="searchQuery"
          class="mx-3"
          flat
          height="12"
          clear-icon="mdi-close-circle"
          clearable
          label="Search"
          prepend-inner-icon="search"
          solo-inverted
          @keyup.enter="submit()"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>

      <v-tabs
        slot="extension"
        v-model="tabs"
        centered
        color="transparent"
        slider-color="white"
        fixed-tabs
        ref="tab"
      >
        <v-tab  
        @click="incomplete()" >
          Incomplete
        </v-tab>
        <v-tab @click="complete()">
          Completed
        </v-tab>
      </v-tabs>
    </v-toolbar> 

    <v-tabs-items>
      <v-tab-item>
        <AddTask/> 
        <v-container grid-list-xl v-if="status === 'incomplete'">
          <v-layout row wrap text-xs-center v-for="(task, index) in incompleteArr" :key=index> 
            <Card :name="task.name" :description="task.description" :completeStatus="task.completed" :completedDate="task.updatedAt" :tags="task.tags" :id="task._id"> </Card>
          </v-layout>
        </v-container>
        <v-container grid-list-xl v-if="status === 'complete'">
         <v-layout row wrap text-xs-center v-for="(task, index) in completeArr" :key=index> 
            <Card :name="task.name" :description="task.description" :completeStatus="task.completed" :completedDate="task.updatedAt" :tags="task.tags" :id="task._id"> </Card>
          </v-layout>
        </v-container>
         <v-container grid-list-xl v-if="status === 'searching'">
          <v-btn rounded class="indigo white--text" @click="reset"> Clear Search </v-btn>
         <v-layout row wrap text-xs-center v-for="(task, index) in searchArr" :key=index> 
            <Card :name="task.name" :description="task.description" :completeStatus="task.completed" :completedDate="task.updatedAt" :tags="task.tags" :id="task._id"> </Card>
          </v-layout>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import AddTask from '@/components/AddTask.vue';
import { mapActions, mapState } from 'vuex';

  export default {
    name: 'card',
    components:{
      Card,
      AddTask
    },
    data () {
      return {
        searchQuery: '',
        status: 'incomplete',
        prevStatus: '',
        text: '',
        tabs:null,
      }
    },
    methods:{
      ...mapActions([
        'getIncomplete', 'getComplete', 'resetSearch', 'searchKeyword'
      ]),
      submit(){
        console.log(this.searchQuery)
        let query = this.searchQuery;
        this.searchKeyword(query);
        
      },
      incomplete(){
        this.status = 'incomplete'
        console.log("incomplete, " , this.tabs)
        this.getIncomplete();
      },
      complete(){
        this.status = 'complete'

        console.log("complete, " , this.tabs)
        this.getComplete();
      },
      reset(){
        this.status = this.prevStatus;
        this.searchQuery = '';
        this.resetSearch();

      }
    },
    created(){
      this.getIncomplete();
      console.log("STATUS ", this.status)
    },
    computed:{
      ...mapState([
        'incompleteArr', 'completeArr', 'search', 'searchArr'
      ]),
    },
    watch:{
      search(){
        let self = this;
        let currentStatus = this.status;

        if(this.search === true){

          this.prevStatus = currentStatus;
          self.status = 'searching'
        }
        console.log("dari watch: " , this.status, " prev: ", this.prevStatus)
      }
    }
  }
</script>