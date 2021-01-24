<template>
  <div>
    <v-card
      v-for="({ id, createdAt, updatedAt, ProductOrders }, index) in orders"
      :key="id"
      flat
      class="my-6">
      <v-row class="mx-2 ml-md-4">
        <v-col cols="2" md="2">
          <div class="caption grey-text">Order no.</div>
          <div class="black--text pl-2">{{ index + 1 }}</div>
        </v-col>
        <v-col cols="5" md="3">
          <div class="caption grey-text">Ordered on:</div>
          <div class="pl-2">{{ formatDate(createdAt) }}</div>
        </v-col>
        <v-col cols="5" md="3">
          <div class="caption grey-text">Delivered on:</div>
          <div class="pl-2">{{ formatDate(updatedAt) }}</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-divider class="hidden-md-and-up" />
          <div class="caption grey-text">Beers:</div>
          <div
            v-for="(item, i) in formatProducts(ProductOrders)"
            :key="i"
            class="pl-16">
            {{ item }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { mapState } from 'vuex';
import orderApi from '@/services/order';

export default {
  name: 'orders',
  data: () => ({ orders: null }),
  computed: mapState('auth', ['user']),
  methods: {
    formatDate(date) {
      return date && format(new Date(date), 'MMM do, yyyy');
    },
    formatProducts(orderItems) {
      return orderItems.map(({ quantity, Product }) => (
        `${quantity} ${Product.Brand.name} ${Product.liters}L ${Product.type}`
      ));
    }
  },
  async mounted() {
    const { id: userId } = this.user;
    this.orders = await orderApi.getClosed({ userId });
  }
};
</script>
