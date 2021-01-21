<template>
  <div class="form-container">
    <v-card-title class="justify-center">Register</v-card-title>
    <v-form>
      <v-text-field v-model="user.email" label="Email" dense outlined />
      <v-text-field v-model="user.password" label="Password" type="password" dense outlined />
      <v-text-field v-model="user.rePassword" label="Confirm Password" type="password" dense outlined />
      <v-text-field v-model="user.name" label="Name" dense outlined />
      <v-text-field v-model="user.address" label="Address" dense outlined />
      <v-text-field v-model="user.contactName" label="Contact Name" dense outlined />
      <v-text-field v-model="user.contactNumber" label="Contact Number" dense outlined />
      <v-checkbox v-model="showPassword" label="Show Password" dense />
      <div class="d-flex justify-space-between">
        <v-btn :to="{ name: 'login' }" large text plain class="pl-0">Sign In</v-btn>
        <v-spacer />
        <v-btn @click="register" dark large>Register</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import api from '@/services/auth.js';

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
      api.register(this.user);
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
