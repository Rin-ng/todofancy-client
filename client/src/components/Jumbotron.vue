<template>
  <v-jumbotron
    :gradient="gradient"
    style="height: 500px;"
    dark
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
  >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h3 class="display-3"><Avatar/></h3>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import Avatar from '@/components/Avatar.vue'

export default {
  name: 'avatar',
  components:{
    Avatar
  },
  data: () => ({
    valueDeterminate: 50,
    gradient: 'to top right, rgba(63,81,181, .08), rgba(25,32,72, .01)'
  })
}
</script>
