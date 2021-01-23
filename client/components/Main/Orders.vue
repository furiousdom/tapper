<template>
  <div>
    <v-row
      v-for="({ id, createdAt, updatedAt, delivered, ProductOrders }, index) in orders"
      :key="id"
      no-gutters>
      <v-col cols="2" lg="2">
        <v-card tile flat class="pa-2">
          <div class="caption grey-text">Order</div>
          <div>{{ index + 1 }}</div>
        </v-card>
      </v-col>
      <v-col cols="5" lg="3">
        <v-card tile flat class="pa-2">
          <div class="caption grey-text">Date ordered</div>
          <div>{{ formatDate(createdAt) }}</div>
        </v-card>
      </v-col>
      <v-col cols="5" lg="3">
        <v-card tile flat class="pa-2">
          <div class="caption grey-text">Date delivered</div>
          <div v-if="delivered">{{ formatDate(updatedAt) }}</div>
        </v-card>
      </v-col>
      <v-divider />
      <v-col cols="12" lg="4">
        <v-card tile flat class="pa-2">
          <div class="caption grey-text">Beers</div>
          <div
            v-for="(item, i) in formatOrderItems(ProductOrders)"
            :key="i"
            class="ml-16">
            {{ item }}
          </div>
        </v-card>
      </v-col>
    </v-row>
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
    formatOrderItems(orderItems) {
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

<style lang="scss" scoped>
.row {
  background: #fff;
}
</style>
