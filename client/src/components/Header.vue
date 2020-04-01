<template>
  <v-app-bar
    app
    color="white">
    <!-- TODO: Implement this
    <div class="d-flex align-center">
      <v-img
        alt="TapB Logo"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        src="../assets/tapb-logo.svg" />
    </div>-->

    <span @click="navigateTo('root')">
      <v-toolbar-title class="mr-4">Ticketer</v-toolbar-title>
    </span>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn">
        <router-link to="login">
          LOG IN
        </router-link>
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn">
        <router-link to="register">
          SIGN UP
        </router-link>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
