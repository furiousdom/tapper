<template>
  <panel title="Register">
    <v-card-text>
      <v-form>
        <v-text-field v-model="username" label="Username" />
        <v-text-field v-model="password" label="Password" type="password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <router-link to="/login">Or Sign In</router-link>
      <v-spacer />
      <v-btn @click="register" color="rgb(236, 91, 91)">Register</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import api from '@/src/services/auth.js';
import panel from '@/src/components/shared/Panel';

export default {
  data: () => ({ username: '', password: '', error: null }),
  methods: {
    register() {
      const { username, password } = this;
      return api.register({ username, password });
    }
  },
  components: { panel }
};
</script>
