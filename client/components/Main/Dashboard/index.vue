<template>
  <v-row justify-sm="space-around">
    <v-col cols="12" sm="8" md="6">
      <active-order />
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <create-order />
    </v-col>
  </v-row>
</template>

<script>
import ActiveOrder from './ActiveOrder';
import CreateOrder from './CreateOrder';
import { mapState } from 'vuex';

export default {
  name: 'dashboard',
  computed: { ...mapState('auth', ['user']) },
  created() {
    this.$store.dispatch('order/fetch', { userId: this.user.id });
  },
  components: { ActiveOrder, CreateOrder }
};
</script>
