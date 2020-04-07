<template>
  <v-content>
    <router-view :key="$route.path" />
    <router-link to="{ name: 'create-order' }">
      <v-btn
        color="rgb(236, 91, 91)"
        fab dark absolute large
        right class="mx-2">
        <v-icon>+</v-icon>
      </v-btn>
    </router-link>
  </v-content>
</template>
