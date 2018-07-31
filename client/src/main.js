import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'
import VeeValidate from 'vee-validate'
import swal from 'sweetalert'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyC4p4ZZ9Ty5HUaUrtpFdMb9_kWVVa-77Nk',
  authDomain: 'todofancy-210609.firebaseapp.com',
  databaseURL: 'https://todofancy-210609.firebaseio.com',
  projectId: 'todofancy-210609',
  storageBucket: 'todofancy-210609.appspot.com',
  messagingSenderId: '544528765468'
}

firebase.initializeApp(config)

Vue.use(VeeValidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
