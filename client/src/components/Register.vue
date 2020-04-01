<template>
  <panel title="Register">
    <v-card-text>
      <v-form>
        <v-text-field
          label="Username"
          v-model="username" />
        <v-text-field
          label="Password"
          type="password"
          v-model="password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="register" color="rgb(236, 91, 91)">Register</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import authenticationService from '../services/authenticationService.js'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await authenticationService.register({
          username: this.username,
          password: this.password
        })
      } catch (err) {
        this.error = err.response.data.error
        console.log(err)
      }
    }
  },
  components: {
    Panel
  }
}
</script>
