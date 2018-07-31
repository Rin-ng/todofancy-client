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
  background-image: url('../assets/images/bg1.jpg');
  background-size: cover;
  background-repeat: none;
  min-height: 100vh;
}
</style>
