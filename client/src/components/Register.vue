<template>
  <div class="container">
    <h1>Register</h1>
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
    <button @click="register">Register</button>
  </div>
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
