<template>
  <div class="home">
     <Navbar> </Navbar>
      <Jumbotron/>
      <SearchBar/>  
  </div>
</template>

<script>
// @ is an alias to /src
import Jumbotron from '@/components/Jumbotron.vue'
import Navbar from '@/components/Navbar.vue'
import SearchBar from '@/components/SearchBar.vue'
import AddTask from '@/components/AddTask.vue'

export default {
  name: 'task',
  components: {
    Jumbotron,
    Navbar,
    SearchBar,
    AddTask
  },
  created(){
    let token = localStorage.getItem("token");
    let self = this;
    if(!token){
      self.$router.push('/')
    }
  }
}
</script>
