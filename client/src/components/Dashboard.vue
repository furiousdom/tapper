<template>
  <v-content>
    <v-container
        fluid>
        <v-row
          align="center"
          justify="center">
          <v-col
            cols="12"
            sm="8"
            md="4">
            <v-card
              class="mx-auto"
              max-width="500"
              outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">Login Success</div>
                  <v-list-item-title class="headline mb-1">Dashboard</v-list-item-title>
                  <v-btn @click="logout">Logout</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-card v-if="logoutSuccess != null">
              <v-list-item-title class="headline mb-1">{{ logoutSuccess.label }}</v-list-item-title>
              <v-list-item-subtitle>{{ logoutSuccess.text }}</v-list-item-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </v-content>
</template>

<script>
import authenticationService from '../services/authenticationService'
export default {
  data () {
    return {
      logoutSuccess: null
    }
  },
  methods: {
    async logout () {
      const response = await authenticationService.logout()
      this.logoutSuccess = response.data
      setTimeout(() => this.$router.push('/'), 500)
    }
  }
}
</script>
