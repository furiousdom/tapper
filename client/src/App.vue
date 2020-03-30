<template>
  <v-app>
    <PageHeader />
    <router-view></router-view>
  </v-app>
</template>

<script>
import PageHeader from './components/Header'

export default {
  name: 'App',

  components: {
    PageHeader
  },

  data: () => ({
    //
  })
}
</script>
