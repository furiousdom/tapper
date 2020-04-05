<template>
  <panel title="Log In">
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
      <v-btn @click="login" color="rgb(236, 91, 91)">Login</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import authService from '@/services/auth.js'
import Panel from '@/components/Panel'

export default {
  props: {
    source: String
  },
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await authService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('dashboard')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
