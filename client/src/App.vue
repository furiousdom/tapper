<template>
  <v-app>
    <navbar v-if="user" />
    <router-view :key="$route.path" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import navbar from './components/Navbar';

export default {
  name: 'app',
  computed: mapState('auth', ['user']),
  components: { navbar }
};
</script>
