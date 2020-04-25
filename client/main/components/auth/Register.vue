<template>
  <panel title="Register">
    <v-card-text>
      <v-form>
        <v-text-field v-model="user.email" label="Email" />
        <v-text-field v-model="user.password" label="Password" type="password" />
        <v-text-field v-model="user.rePassword" label="Confirm Password" type="password" />
        <v-text-field v-model="user.name" label="Name" />
        <v-text-field v-model="user.address" label="Address" />
        <v-text-field v-model="user.contactName" label="Contact Name" />
        <v-text-field v-model="user.contactNumber" label="Contact Number" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <router-link :to="{ name: 'login' }">Or Sign In</router-link>
      <v-spacer />
      <v-btn @click="register" dark color="rgb(236, 91, 91)">Register</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import api from '@/main/services/auth.js';
import panel from '@/main/components/shared/Panel';

export default {
  name: 'register',
  data: () => ({
    errors: null,
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
  },
  components: { panel }
};
</script>
