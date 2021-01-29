<template>
  <v-card v-if="latestOrder" v-model="latestOrder" flat class="pb-2">
    <div class="d-flex justify-space-between">
      <v-card-subtitle class="pb-2">
        Order Date: {{ formatDate(latestOrder.createdAt) }}
      </v-card-subtitle>
      <v-checkbox @click="markDone" :disabled="status" dense class="mt-2" />
    </div>
    <v-divider class="mx-2" />
    <v-card-subtitle class="pb-2">Beers</v-card-subtitle>
    <div
      v-for="(item, index2) in formatOrderItems(latestOrder.ProductOrders)"
      :key="index2"
      class="ml-16">
      {{ item }}
    </div>
  </v-card>
</template>

<script>
import { format } from 'date-fns';
import { mapState } from 'vuex';
import { OK } from 'http-status-codes';
import orderApi from '@/services/order';

export default {
  name: 'active-order',
  data: () => ({ latestOrder: null }),
  computed: {
    ...mapState('auth', ['user']),
    status() {
      return this.latestOrder.status !== 'REVIEWED';
    }
  },
  methods: {
    formatDate(date) {
      return date && format(new Date(date), 'MMM do, yyyy');
    },
    formatOrderItems(orderItems) {
      return orderItems.map(({ quantity, Product }) => (
        `${quantity} ${Product.brand} ${Product.volume}L ${Product.type}`
      ));
    },
    async markDone() {
      if (!this.latestOrder) return;
      const params = { orderId: this.latestOrder.id, status: 'CLOSED' };
      const { status } = await orderApi.setClosed(params);
      if (status === OK) this.latestOrder = null;
    }
  },
  async created() {
    this.latestOrder = this.latestOrder ? this.latestOrder
      : await orderApi.getOpen({ userId: this.user.id });
  }
};
</script>
