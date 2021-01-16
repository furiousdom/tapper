<template>
  <div>
    <v-row
      v-for="({ id, createdAt, updatedAt, delivered, ProductOrders }, index) in orders"
      :key="id" no-gutters>
      <v-col cols="2" sm="2" lg="2">
        <v-card class="pa-2" tile flat>
          <div class="caption grey-text">Order</div>
          <div>{{ index }}</div>
        </v-card>
      </v-col>
      <v-col cols="5" sm="5" lg="3">
        <v-card class="pa-2" tile flat>
          <div class="caption grey-text">Date ordered</div>
          <div>{{ formatDate(createdAt) }}</div>
        </v-card>
      </v-col>
      <v-col cols="5" sm="5" lg="3">
        <v-card class="pa-2" tile flat>
          <div class="caption grey-text">Date delivered</div>
          <div v-if="delivered">{{ formatDate(updatedAt) }}</div>
        </v-card>
      </v-col>
      <v-divider />
      <v-col cols="12" sm="12" lg="4">
        <v-card tile flat class="pa-2">
          <div class="caption grey-text">Beers</div>
          <div
            v-for="(item, index2) in formatOrderItems(ProductOrders)"
            :key="index2"
            class="ml-16">
            {{ item }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from '@/main/services/order';
import { format } from 'date-fns';
import { mapState } from 'vuex';

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
    this.orders = await api.fetch({ userId });
  }
};
</script>

<style lang="scss" scoped>
.row {
  background: white;
}
</style>
