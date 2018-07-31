<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px" min-height="400px">
      <v-btn slot="activator" class="blue-grey darken-3  white--text">Add New Task</v-btn>
      <v-card class="blue-grey darken-3 white--text">
        <v-card-title >
          <span class="headline">Task Info</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                 <v-text-field 
                     v-validate="'required:true'" 
                     name="name" 
                     type="text" 
                     v-model="task.name"
                     label="Task Name" 
                     :error-messages="errors.collect('name')"
                     data-vv-as="name"
                     required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  
                  name="description"
                  v-model="task.description" 
                  label="Description">
               </v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Tags"
                  v-model="task.tags" 
                  hint="Separate multiple tags with space, eg: 'awesome' 'great'"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancel()">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save()">Saved</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import {mapActions} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      task:{
         name: '',
         description: '',
         tags: ''
      }
    }),
    methods:{
      ...mapActions([
          'addTask', 'getIncomplete'
      ]),
      save(){
         let validation = false;
         let self = this;

         this.$validator.validateAll()
         .then(function(res){
            console.log(res)
           validation = res;
           console.log("!!", validation)
         
           if(validation){
               self.addTask(self.task);
               self.cancel();
               self.dialog = false;
            }
         })
         .catch(function(err){
            console.log(err)
         })
      },
      cancel(){
         this.task.name = ''
         this.task.description = ''
         this.task.tags = ''
         this.$validator.reset()
         this.dialog = false;
      }
    },
  }
</script>