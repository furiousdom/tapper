<template>
  <panel title="Log In">
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="password" label="Password" type="password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <router-link :to="{ name: 'register' }">Or Sign Up</router-link>
      <v-spacer />
      <v-btn @click="submit" dark color="rgb(236, 91, 91)">Login</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import { mapActions } from 'vuex';
import panel from '@/main/components/shared/Panel';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    error: null
  }),
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      const { email, password } = this;
      return this.login({ email, password })
        .then(data => this.$router.push({ name: 'orders' }));
    }
  },
  components: { panel }
};
</script>
