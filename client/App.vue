<template>
  <v-app id="inspire">
    <frame v-if="user" />
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Frame from './components/shared/Frame';
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState('auth', ['user']),
  components: { Frame }
};
</script>
