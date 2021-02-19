<template>
  <v-card v-if="activeOrder" v-model="activeOrder" flat class="pb-2">
    <div class="d-flex justify-space-between">
      <v-card-subtitle class="pb-2">
        Order Date: {{ formatDate(activeOrder.createdAt) }}
      </v-card-subtitle>
      <v-checkbox @click="markDone" :disabled="status" dense class="mt-2" />
    </div>
    <v-divider class="mx-2" />
    <v-card-subtitle class="pb-2">Beers</v-card-subtitle>
    <div
      v-for="(item, index2) in formatOrderItems(activeOrder.ProductOrders)"
      :key="index2"
      class="ml-16">
      {{ item }}
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { format } from 'date-fns';

export default {
  name: 'active-order',
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('order', ['activeOrder']),
    status() {
      return this.activeOrder.status !== 'Reviewed';
    }
  },
  methods: {
    ...mapActions('order', ['deliver']),
    formatDate(date) {
      return date && format(new Date(date), 'MMM do, yyyy');
    },
    formatOrderItems(orderItems) {
      return orderItems.map(({ quantity, Product }) => {
        const { brand, packageVolume, packageType } = Product;
        return `${quantity} ${brand} ${packageVolume}L ${packageType}`;
      });
    },
    markDone() {
      const { activeOrder: { id: orderId } } = this;
      this.deliver({ orderId, status: 'Delivered' });
    }
  }
};
</script>
