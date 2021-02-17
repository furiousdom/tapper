<template>
  <v-card max-width="29.5rem" rounded="lg" outlined class="ma-auto mt-sm-16">
    <div class="d-flex justify-center mt-4">
      <v-img src="@/assets/tapb-logo.svg" max-width="64" eager contain />
    </div>
    <v-card-title class="justify-center">Log In</v-card-title>
    <v-alert
      :value="!!loginError"
      dismissible text dense
      class="mb-7 text-left">
      {{ loginError }}
    </v-alert>
    <validation-observer
      ref="observer">
      <v-form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email">
          <v-text-field
            v-model="email"
            :error-messages="errors"
            label="Email"
            outlined />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="password"
          rules="required">
          <v-text-field
            v-model="password"
            @click:append="show = !show"
            :error-messages="errors"
            :type="textType"
            :append-icon="eyeIcon"
            label="Password" outlined />
        </validation-provider>
        <div class="d-flex justify-space-between">
          <v-btn
            :to="{ name: 'register' }"
            large text plain class="pl-0">
            Create Account
          </v-btn>
          <v-spacer />
          <v-btn type="submit" dark large>Login</v-btn>
        </div>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

const LOGIN_ERR_MESSAGE = 'The email or password you entered is incorrect.';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    show: false,
    loginError: null
  }),
  computed: {
    textType() {
      return this.show ? 'text' : 'password';
    },
    eyeIcon() {
      return this.show ? 'mdi-eye' : 'mdi-eye-off';
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      const { email, password } = this;
      return this.login({ email, password })
        .then(() => this.$router.push({ name: 'dashboard' }))
        .catch(() => (this.loginError = LOGIN_ERR_MESSAGE));
    }
  }
};
</script>
