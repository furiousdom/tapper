<template>
  <div class="form-container">
    <v-card-title class="justify-center">Log In</v-card-title>
    <v-form>
      <v-text-field v-model="email" label="Email" outlined />
      <v-text-field v-model="password" label="Password" type="password" outlined />
      <v-checkbox v-model="showPassword" label="Show Password" />
      <div class="d-flex justify-space-between">
        <v-btn
          :to="{ name: 'register' }"
          large text plain class="pl-0">
          Create Account
        </v-btn>
        <v-spacer />
        <v-btn @click="submit" dark large>Login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    error: null
  }),
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      const { email, password } = this;
      return this.login({ email, password })
        .then(data => this.$router.push({ name: 'dashboard' }));
    }
  }
};
</script>
