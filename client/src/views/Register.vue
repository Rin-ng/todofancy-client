<template>
  <div class="home">
    <Register/>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register.vue'

export default {
  name: 'register',
  components: {
    Register
  }
}
</script>
<style scoped>
.home{
  background-image: url('../assets/images/bg2.jpg');
  background-size: cover;
  background-repeat: none;
  min-height: 100vh;
}
</style>