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
              <v-toolbar-title>{{ title }}</v-toolbar-title>
            </v-toolbar>
            <slot>No slot content defined</slot>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>
