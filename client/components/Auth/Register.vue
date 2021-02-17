<template>
  <v-card max-width="50rem" rounded="lg" outlined class="ma-auto mt-sm-16">
    <div class="d-flex justify-center mt-4">
      <v-img src="@/assets/tapb-logo.svg" max-width="64" contain />
    </div>
    <v-card-title class="justify-center">Register</v-card-title>
    <v-alert
      :value="!!registerError"
      dismissible text dense
      class="mb-7 text-left">
      {{ registerError }}
    </v-alert>
    <validation-observer
      ref="observer">
      <v-form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email">
          <v-text-field
            v-model="user.email"
            :error-messages="errors"
            label="Email"
            dense outlined />
        </validation-provider>
        <div class="split">
          <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required|min:8|alphanumerical|confirmed:confirmation">
            <v-text-field
              v-model="user.password"
              @click:append="show = !show"
              :error-messages="errors"
              :type="textType(show)"
              :append-icon="eyeIcon(show)"
              label="Password" dense outlined />
          </validation-provider>
          <validation-provider
            vid="confirmation">
            <v-text-field
              v-model="user.rePassword"
              @click:append="reShow = !reShow"
              :type="textType(reShow)"
              :append-icon="eyeIcon(reShow)"
              label="Confirm Password" dense outlined />
          </validation-provider>
        </div>
        <div class="split">
          <validation-provider
            v-slot="{ errors }"
            name="name"
            rules="required">
            <v-text-field
              v-model="user.name"
              :error-messages="errors"
              label="Name"
              dense outlined />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="address"
            rules="required|alphanumerical">
            <v-text-field
              v-model="user.address"
              :error-messages="errors"
              label="Address"
              dense outlined />
          </validation-provider>
        </div>
        <div class="split">
          <validation-provider
            v-slot="{ errors }"
            name="contact name"
            rules="required">
            <v-text-field
              v-model="user.contactName"
              :error-messages="errors"
              label="Contact Name"
              dense outlined />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="contact number"
            rules="required|nochar">
            <v-text-field
              v-model="user.contactNumber"
              :error-messages="errors"
              label="Contact Number"
              dense outlined />
          </validation-provider>
        </div>
        <div class="d-flex justify-space-between">
          <v-btn :to="{ name: 'login' }" large text plain class="pl-0">Sign In</v-btn>
          <v-spacer />
          <v-btn @click="register" dark large>Register</v-btn>
        </div>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script>
import api from '@/services/auth.js';

export default {
  name: 'register',
  data: () => ({
    registerError: null,
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
  .split > span {
    width: 100%;
  }
  .split {
    display: flex;
    justify-content: space-evenly;
  }
  .v-text-field {
    margin: 0 0.5rem;
  }
}
</style>
