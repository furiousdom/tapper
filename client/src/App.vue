<template>
  <v-app>
    <PageHeader />
    <v-content>
      <Register />
    </v-content>
  </v-app>
</template>

<script>
import PageHeader from './components/Header';
import Register from './components/Register';

export default {
  name: 'App',

  components: {
    PageHeader,
    Register,
  },

  data: () => ({
    //
  }),
};
</script>
