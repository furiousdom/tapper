<template>
  <v-card max-width="29.5rem" rounded="lg" outlined class="ma-auto mt-sm-16">
    <div class="d-flex justify-center mt-4">
      <v-img src="@/assets/tapb-logo.svg" max-width="64" eager contain />
    </div>
    <v-card-title class="justify-center">Log In</v-card-title>
    <v-form>
      <v-text-field v-model="email" label="Email" outlined />
      <v-text-field
        v-model="password"
        @click:append="show = !show"
        :type="textType"
        :append-icon="eyeIcon"
        label="Password" outlined />
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
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    show: false,
    error: null
  }),
  computed: {
    textType: vm => vm.show ? 'text' : 'password',
    eyeIcon: vm => vm.show ? 'mdi-eye' : 'mdi-eye-off'
  },
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      const { email, password } = this;
      return this.login({ email, password })
        .then(() => this.$router.push({ name: 'dashboard' }));
    }
  }
};
</script>
