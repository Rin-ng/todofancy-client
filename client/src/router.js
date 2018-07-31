import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Task from './views/Task.vue'
import Vuetify from 'vuetify'
import Register from './views/Register.vue'

Vue.use(Vuetify)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
