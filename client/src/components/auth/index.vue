<template>
  <v-content>
    <v-layout>
      <v-flex xs6>
        <h1>Welocome to Ticketer.</h1>
        <h2>Please log in or register to continue.</h2>
      </v-flex>
      <v-flex xs6>
        <router-view :key="$route.path" />
      </v-flex>
    </v-layout>
  </v-content>
</template>

<style lang="scss" scoped>
router-link {
  text-decoration: none;
}
</style>
