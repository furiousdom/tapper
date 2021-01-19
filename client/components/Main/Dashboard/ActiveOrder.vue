<template>
  <v-card v-if="latestOrder" v-model="latestOrder" flat>
    <div class="d-flex justify-space-between">
      <v-card-subtitle class="pb-2">
        Order Date: {{ formatDate(latestOrder.createdAt) }}
      </v-card-subtitle>
      <v-checkbox dense class="mt-2" />
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
import orderApi from '@/services/order';

export default {
  name: 'active-order',
  data: () => ({ latestOrder: null }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    formatDate(date) {
      return date && format(new Date(date), 'MMM do, yyyy');
    },
    formatOrderItems(orderItems) {
      return orderItems.map(({ quantity, Product }) => (
        `${quantity} ${Product.Brand.name} ${Product.liters}L ${Product.type}`
      ));
    }
  },
  async created() {
    const { id: userId } = this.user;
    this.latestOrder = await orderApi.fetchOne({ userId });
  }
};
</script>
