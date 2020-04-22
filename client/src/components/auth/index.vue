<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col>
          <h1 class="text">Welcome to TAP B ticketer.</h1>
          <h2 class="text">Please log in or register to continue.</h2>
        </v-col>
        <v-col>
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<style lang="scss" scoped>
router-link {
  text-decoration: none;
}

.fill-height {
  height: 100%;
  background-image: url("../../assets/b.jpg");
}

.text {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 50px;
  color: white;
}
</style>
