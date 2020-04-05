<template>
  <v-content>
    <v-card
      class="mx-auto"
      max-width="500"
      outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Hello</div>
          <v-list-item-title class="headline mb-1">Ticketer</v-list-item-title>
          <v-list-item-subtitle>Welcome to the Ticketer app.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
      <v-spacer />
      <v-btn color="rgb(236, 91, 91)">
        <router-link to="/login">
          Log In
        </router-link>
      </v-btn>
      <v-btn color="rgb(236, 91, 91)">
        <router-link to="/register">
          Sign Up
        </router-link>
      </v-btn>
    </v-card-actions>
    </v-card>
    <router-view :key="$route.path"></router-view>
  </v-content>
</template>

<style>
router-link {
  text-decoration: none;
}
</style>
