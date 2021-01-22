<template>
  <div class="container">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item
          v-for="{ icon, title, route } in drawerItems"
          :key="title"
          :to="route">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app flat clipped-left class="white">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Tapper</v-app-bar-title>
      <v-spacer />
      <v-btn @click="signout" text>
        <span>SIGN OUT</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'frame',
  data: () => ({ drawer: null }),
  computed: {
    drawerItems: {
      get: () => ([{
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        route: { name: 'dashboard' }
      }, {
        icon: 'mdi-view-list',
        title: 'Orders',
        route: { name: 'orders' }
      }])
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    signout() {
      return this.logout()
        .then(this.$router.push({ name: 'login' }));
    }
  }
};
</script>
