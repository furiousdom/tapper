<template>
  <v-app>
    <Navbar v-if="$store.state.auth.user" />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar }
}
</script>
