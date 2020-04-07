<template>
  <v-app-bar
    app
    color="white">
    <div class="d-flex align-center">
      <v-img
        src="../assets/tapb-logo.svg"
        alt="TapB Logo"
        contain
        class="shrink mt-1 hidden-sm-and-down" />
    </div>
    <span>
      <v-toolbar-title class="mr-4">Ticketer</v-toolbar-title>
    </span>
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        @click="signout">
        LOG OUT
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'navbar',
  methods: {
    ...mapActions('auth', ['logout']),
    signout() {
      this.logout();
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
