<template>
  <panel title="Log In">
    <v-card-text>
      <v-form>
        <v-text-field v-model="username" label="Username" />
        <v-text-field v-model="password" label="Password" type="password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <router-link to="/register">Or Sign Up</router-link>
      <v-spacer />
      <v-btn @click="submit" color="rgb(236, 91, 91)">Login</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import { mapActions } from 'vuex';
import panel from '@/src/components/shared/Panel';

export default {
  name: 'login',
  data: () => ({ username: '', password: '', error: null }),
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      const { username, password } = this;
      return this.login({ username, password })
        .then(data => this.$router.push('/orders'));
    }
  },
  components: { panel }
};
</script>
