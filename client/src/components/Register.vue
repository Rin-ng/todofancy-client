<template>
   <v-container grid-list-xl text-xs-center>
      <v-layout row wrap >
         <v-flex flex lg6 offset-lg3 style="margin-top: 60px">
         <v-card style="background-color: #ECEFF1">
            <v-card-text>
              <h2 style="font-weight: 600; text-decoration: underline">Register</h2>
               <form>
                  <v-text-field
                    v-validate="'required:true'"
                    v-model="name"
                    :error-messages="errors.collect('name')"
                    label="Name"
                    data-vv-name="name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-validate="'required|email'"
                    v-model="email"
                    :error-messages="errors.collect('email')"
                    label="E-mail"
                    data-vv-name="email"
                    required
                  ></v-text-field>
                  <v-text-field
                     v-validate="{required: true, regex: /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/, min: 6}"
                     v-model="password"
                     label="Password"
                     type="password"
                     data-vv-name="password"
                     ref="password"
                     :error-messages="errors.collect('password')"
                     required
                  ></v-text-field>
               <v-text-field 
                     v-validate="'required|confirmed:password'" 
                     name="password_confirmation" 
                     type="password" 
                     v-model="confirmPassword"
                     label="Confirm Password" 
                     :error-messages="errors.collect('password_confirmation')"
                     data-vv-as="password"
                     required></v-text-field>

                     <br>
                  <p > Already have an account? <a href="#" style="font-weight: 600" @click="changePage()">Log in</a> here</p> 
                     <br>
                  <v-btn class="blue-grey lighten-3 white--text" @click="clear()">Clear</v-btn>
                  <v-btn class="light-blue darken-2 white--text" @click="signUp()">Register</v-btn>
               </form>
            </v-card-text>
         </v-card>
      </v-flex>
      </v-layout>
   </v-container>
</template>

<script>
 import {mapActions} from 'vuex'
  export default {
   $_veeValidate: {
      validator: 'new'
   },
   data: () => ({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dictionary: {
         attributes: {
          email: 'E-mail Address'
        },
        custom: {
          name:{
            required:"Please input your name"
          },
          password: {
            required: 'Password can not be empty',
            min: 'Password must contain at least 6 characters',
            regex:'Password must contain at least 1 number'
            // custom messages
          },
          email: {
            required: "E-mail must be filled"
          }
        }
      }
  }),
  mounted () {
      this.$validator.localize('en', this.dictionary)
    },
   methods: {
     ...mapActions([
       'register'
     ]),
      signUp(){
         let self = this;
         let inputEmail = this.email;
         inputEmail = inputEmail.toLowerCase();
         let userData = {
            name: self.name,
            email: inputEmail,
            password: self.password
         }

         this.$validator.validateAll()
         .then(function(result){
            console.log(result)
            if(result === true){
               self.register(userData);
            }
         })
         .catch(function(err){
            console.log(err)
         })
         
      },
      clear () {
         this.name = ''
         this.email = ''
         this.password = ''
         this.confirmPassword =''
         this.$validator.reset()
      },
      changePage(){
        this.$router.push('/')
      }
   }
}
</script>

<style scoped>
.error--text {
   color: red !important;
}
.v-input, .v-text-field{
  padding: 0px 15px;
}
</style>