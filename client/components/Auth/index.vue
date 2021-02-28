<template>
  <v-container>
    <router-view />
  </v-container>
</template>

<script>
export default {
  name: 'auth'
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .v-card {
    background-color: transparent!important;
    border: 0;
    margin: 0;
  }
}

.v-card {
  padding: 0 2rem 5rem 2rem;
}
</style>
