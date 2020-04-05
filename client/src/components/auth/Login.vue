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
      <v-btn @click="submit" color="rgb(236, 91, 91)">Login</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import { mapActions } from 'vuex'
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
    ...mapActions(['login']),
    submit () {
      this.login({ username: this.username, password: this.password })
        .then(data => {
          this.$router.push('/dashboard')
        })
    }
  },
  components: {
    Panel
  }
}
</script>
