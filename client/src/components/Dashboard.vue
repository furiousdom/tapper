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
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Orders />
  </v-content>
</template>

<script>
import Orders from './Orders'

export default {
  components: {
    Orders
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
