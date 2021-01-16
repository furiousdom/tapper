<template>
  <v-container>
    <v-card max-width="500px" outlined>
      <v-card-actions class="justify-center mt-4">
        <v-img src="@/main/assets/tapb-logo.svg" max-width="64" eager contain />
      </v-card-actions>
      <router-view />
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.v-card {
  margin: 10rem auto auto auto;
}

.text {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 50px;
  color: white;
}
</style>
