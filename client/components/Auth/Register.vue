<template>
  <v-card max-width="50rem" rounded="lg" outlined class="ma-auto mt-sm-16">
    <div class="d-flex justify-center mt-4">
      <v-img src="@/assets/tapb-logo.svg" max-width="64" contain />
    </div>
    <v-card-title class="justify-center">Register</v-card-title>
    <v-form>
      <v-text-field v-model="user.email" label="Email" dense outlined />
      <div class="split">
        <v-text-field
          v-model="user.password"
          @click:append="show = !show"
          :type="textType(show)"
          :append-icon="eyeIcon(show)"
          label="Password" dense outlined />
        <v-text-field
          v-model="user.rePassword"
          @click:append="reShow = !reShow"
          :type="textType(reShow)"
          :append-icon="eyeIcon(reShow)"
          label="Confirm Password" dense outlined />
      </div>
      <div class="split">
        <v-text-field v-model="user.name" label="Name" dense outlined />
        <v-text-field v-model="user.address" label="Address" dense outlined />
      </div>
      <div class="split">
        <v-text-field v-model="user.contactName" label="Contact Name" dense outlined />
        <v-text-field v-model="user.contactNumber" label="Contact Number" dense outlined />
      </div>
      <div class="d-flex justify-space-between">
        <v-btn :to="{ name: 'login' }" large text plain class="pl-0">Sign In</v-btn>
        <v-spacer />
        <v-btn @click="register" dark large>Register</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import api from '@/services/auth.js';

export default {
  name: 'register',
  data: () => ({
    errors: null,
    show: false,
    reShow: false,
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
    textType: show => show ? 'text' : 'password',
    eyeIcon: show => show ? 'mdi-eye' : 'mdi-eye-off',
    register() {
      return api.register(this.user)
        .then(() => this.$router.push({ name: 'login' }));
    }
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 600px) {
  .split {
    display: flex;
    justify-content: space-evenly;
  }
  .v-text-field {
    margin: 0 0.5rem;
  }
}
</style>
