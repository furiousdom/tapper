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
import { mapActions, mapState } from 'vuex';
import ActiveOrder from './ActiveOrder';
import CreateOrder from './CreateOrder';

export default {
  name: 'dashboard',
  computed: mapState('auth', ['user']),
  methods: mapActions('order', { getOrders: 'fetch' }),
  created() {
    this.getOrders({ userId: this.user.id });
  },
  components: { ActiveOrder, CreateOrder }
};
</script>
