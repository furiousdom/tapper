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

    <span @click="navigateTo({ name: 'root' })">
      <v-toolbar-title class="mr-4">Ticketer</v-toolbar-title>
    </span>

    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        @click="navigateTo('dashboard')">
        Dashboard
      </v-btn>
    </v-toolbar-items>

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
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
        LOG OUT
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.navigateTo({ name: 'root' })
    },
    navigateTo (route) {
      if (route === 'root') this.rootRedirect(route)
      else {
        this.$router.push(route)
      }
    },
    rootRedirect (route) {
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push({ name: 'dashboard' })
      } else {
        this.$router.push(route)
      }
    }
  }
}
</script>
