<template>
   <v-container grid-list-xl text-xs-center>
      <v-layout row wrap >
         <v-flex flex lg6 offset-lg3 style="margin-top: 60px">
         <v-card style="background-color: #ECEFF1">
            <v-card-text >
              <h2 style="font-weight: 600; text-decoration: underline"> Log In</h2>
              <form>
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
               
                  <p style="font-weight: 600"> OR</p>
                  
                  <v-btn @click="loginFB" style="background-color: #4267B2" id="fb-login" scope="public_profile,email" onlogin="checkLoginState();">
                    <span class="white--text" style="font-weight: 600"> Login with Facebook </span>
                  </v-btn>
                  
                  <br> <br>
                  <p style="font-weight: 500"> Don't have an account yet? <a  href="#" style="font-weight: 600" @click="changePage()">Register</a> for free </p> 
                  
                  <v-btn class="blue-grey lighten-3 white--text" @click="clear()">Clear</v-btn>
                  <v-btn class="light-blue darken-2 white--text" @click="submit()">Submit</v-btn>
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
      email: '',
      password: '',
      dictionary: {
         attributes: {
          email: 'E-mail Address'
        },
        custom: {
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
       'facebookSignIn', 'signIn', 'register'
     ]),
      submit () {
        let self = this;
        let inputEmail = this.email;
        inputEmail = inputEmail.toLowerCase();
        console.log("input email: ", inputEmail)
         let userData = {
           email: inputEmail,
           password: self.password
         }

         this.$validator.validateAll()
         .then(function(result){
           if(result === true){
              self.signIn(userData)
           }
         })
         .catch(function(err){
           console.log(err)
         })
         
         
      },
      clear () {
         this.email = ''
         this.password = ''
         this.$validator.reset()
      },
      changePage(){
         this.$router.push('/register')
      },
      loginFB(){
        this.facebookSignIn()
      },
   },
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