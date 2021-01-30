<template>
  <v-card v-if="openOrder" v-model="openOrder" flat class="pb-2">
    <div class="d-flex justify-space-between">
      <v-card-subtitle class="pb-2">
        Order Date: {{ formatDate(openOrder.createdAt) }}
      </v-card-subtitle>
      <v-checkbox @click="markDone" :disabled="status" dense class="mt-2" />
    </div>
    <v-divider class="mx-2" />
    <v-card-subtitle class="pb-2">Beers</v-card-subtitle>
    <div
      v-for="(item, index2) in formatOrderItems(openOrder.ProductOrders)"
      :key="index2"
      class="ml-16">
      {{ item }}
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { format } from 'date-fns';

export default {
  name: 'active-order',
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('order', ['openOrder']),
    status() {
      return this.openOrder.status !== 'REVIEWED';
    }
  },
  methods: {
    ...mapActions('order', ['getOpen', 'setClosed']),
    formatDate(date) {
      return date && format(new Date(date), 'MMM do, yyyy');
    },
    formatOrderItems(orderItems) {
      if (!orderItems) return;
      return orderItems.map(({ quantity, Product }) => (
        `${quantity} ${Product.brand} ${Product.volume}L ${Product.type}`
      ));
    },
    async markDone() {
      const { user: { id: userId }, openOrder: { id: orderId } } = this;
      this.setClosed({ userId, orderId, status: 'CLOSED' });
    }
  },
  created() {
    this.getOpen({ userId: this.user.id });
  }
};
</script>
