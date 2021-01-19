<template>
  <v-container>
    <v-card max-width="470" rounded="lg" outlined class="ma-auto mt-sm-16">
      <v-card-actions class="justify-center mt-4">
        <v-img src="@/assets/tapb-logo.svg" max-width="64" eager contain />
      </v-card-actions>
      <router-view />
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.text {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 3.125rem;
  color: #fff;
}

@media only screen and (max-width: 600px) {
  .v-card {
    background-color: transparent!important;
    border: 0;
    margin: 0;
  }
}

::v-deep .form-container {
  padding: 0 2rem 5rem 2rem;
}
</style>
