<template>
  <panel title="Register">
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="password" label="Password" type="password" />
        <v-text-field v-model="rePassword" label="Confirm Password" type="password" />
        <v-text-field v-model="role" label="Role" disabled />
        <v-text-field v-model="name" label="Name" />
        <v-text-field v-model="address" label="Address" />
        <v-text-field v-model="contactName" label="Contact Name" />
        <v-text-field v-model="contactNumber" label="Contact Number" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <router-link :to="{ name: 'login' }">Or Sign In</router-link>
      <v-spacer />
      <v-btn @click="register" color="rgb(236, 91, 91)">Register</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
// import api from '@/src/services/auth.js';
import panel from '@/src/components/shared/Panel';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    rePassword: '',
    role: 'USER',
    name: '',
    address: '',
    contactName: '',
    contactNumber: '',
    error: null
  }),
  methods: {
    register() {
      const { error, ...payload } = this;
      console.log(payload);
      // return api.register(payload);
    }
  },
  components: { panel }
};
</script>
