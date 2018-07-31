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
  background-image: url('https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-tracks-163518_960_720.jpg');
  background-size: cover;
  background-repeat: none;
  min-height: 100vh;
}
</style>