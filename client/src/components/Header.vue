<template>
    <v-app-bar
      app
      color="white"
      dark>
      <!-- TODO: <div class="d-flex align-center">
        <v-img
          alt="TapB Logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          src="../assets/tapb-logo.svg" />
      </div>
      <v-toolbar-title>Ticketer</v-toolbar-title>
      <v-toolbar-items>
        <v-btn>
          My orders
        </v-btn>
      </v-toolbar-items> -->

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat dark>
          <router-link to="register">
            SIGN UP
          </router-link>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
