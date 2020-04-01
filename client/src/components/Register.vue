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
              <v-toolbar-title>Registration form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Username"
                  v-model="username" />
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password" />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="register" color="rgb(236, 91, 91)">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import authenticationService from '../services/authenticationService.js'

export default {
  props: {
    source: String
  },
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await authenticationService.register({
          username: this.username,
          password: this.password
        })
      } catch (err) {
        this.error = err.response.data.error
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
