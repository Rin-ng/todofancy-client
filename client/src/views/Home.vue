<template>
  <div class="home">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/LogIn.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>

<style scoped>
.home{
  background-image: url('https://cdn.pixabay.com/photo/2016/12/16/15/25/christmas-1911637_960_720.jpg');
  background-size: cover;
  background-repeat: none;
  min-height: 100vh;
}
</style>
