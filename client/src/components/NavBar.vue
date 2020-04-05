<template>
  <v-app-bar
    app
    color="white">
    <div class="d-flex align-center">
      <v-img
        alt="TapB Logo"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        src="../assets/tapb-logo.svg" />
    </div>

    <span>
      <v-toolbar-title class="mr-4">Ticketer</v-toolbar-title>
    </span>

    <v-toolbar-items>
      <v-btn>
        <router-link to="dashboard">
          Dashboard
        </router-link>
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        @click="logout">
        LOG OUT
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>

<style>
  router-link {
    text-decoration: none;
    text-decoration-line: none;
  }
</style>
