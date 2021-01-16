<template>
  <div class="form-container">
    <v-card-title class="justify-center">Register</v-card-title>
    <v-form>
      <v-text-field v-model="user.email" label="Email" outlined />
      <v-text-field v-model="user.password" label="Password" type="password" outlined />
      <v-text-field v-model="user.rePassword" label="Confirm Password" type="password" outlined />
      <v-text-field v-model="user.name" label="Name" outlined />
      <v-text-field v-model="user.address" label="Address" outlined />
      <v-text-field v-model="user.contactName" label="Contact Name" outlined />
      <v-text-field v-model="user.contactNumber" label="Contact Number" outlined />
      <v-checkbox v-model="showPassword" label="Show Password" />
      <div class="form-actions d-flex justify-space-between">
        <v-btn :to="{ name: 'login' }" large text>Sign In</v-btn>
        <v-spacer />
        <v-btn @click="register" dark large>Register</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import api from '@/main/services/auth.js';

export default {
  name: 'register',
  data: () => ({
    errors: null,
    showPassword: false,
    user: {
      email: '',
      password: '',
      rePassword: '',
      role: 'USER',
      name: '',
      address: '',
      contactName: '',
      contactNumber: ''
    }
  }),
  methods: {
    register() {
      const { user } = this;
      return api.register(user);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  padding: 0 2rem 5rem 2rem;
}
</style>
