<template>
  <div class="container">
    <h1>Register</h1>
    <input type="email" name="email" v-model="email" placeholder="Email">
    <input type="password" name="password" v-model="password" placeholder="Password">
    <button @click="register">Register</button>
  </div>
</template>

<script>
import authenticationService from '../services/authenticationService.js';
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      const response = await authenticationService.register({
        email: this.email,
        password: this.password
      });
      console.log(response);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
