<template>
  <v-content>
    <v-container
      fluid>
      <v-row
        align="center"
        justify="center">
        <v-col
          cols="12"
          sm="8"
          md="4">
          <v-card class="elevation-12">
            <v-toolbar
              color="rgb(236, 91, 91)"
              dark
              flat>
              <v-toolbar-title>Hello</v-toolbar-title>
              <v-card-actions>
                <v-btn @click="navigateTo({ name:'orders' })" color="rgb(236, 91, 91)">Orders</v-btn>
              </v-card-actions>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
