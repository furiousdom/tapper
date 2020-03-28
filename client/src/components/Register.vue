<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pd-2">
          <input
            type="email"
            name="email"
            v-model="email"
            placeholder="Email" />
          <br>
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="Password" />
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn @click="register">Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import authenticationService from '../services/authenticationService.js';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register() {
      try {
        const response = await authenticationService.register({
          email: this.email,
          password: this.password
        });
        console.log(response);
      } catch (err) {
        this.error = err.response.data.error
        console.log(err);
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
