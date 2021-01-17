<template>
  <v-row>
    <v-col cols="12" md="6">
      <active-order />
    </v-col>
    <v-col cols="12" md="6">
      <create-order />
    </v-col>
  </v-row>
</template>

<script>
import ActiveOrder from './ActiveOrder';
import CreateOrder from './CreateOrder';

export default {
  name: 'dashboard',
  components: { ActiveOrder, CreateOrder }
};
</script>
