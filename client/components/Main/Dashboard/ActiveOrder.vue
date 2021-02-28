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
      v-for="item in activeOrder.ProductOrders"
      :key="item.Product.id"
      class="ml-16">
      {{ formatProduct(item) }}
    </div>
  </v-card>
</template>

<script>
import { DELIVERED, REVIEWED } from '@/../common/config/orderStatus';
import { mapActions, mapGetters, mapState } from 'vuex';
import { format } from 'date-fns';

export default {
  name: 'active-order',
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('order', ['activeOrder']),
    status: vm => vm.activeOrder.status !== REVIEWED
  },
  methods: {
    ...mapActions('order', ['deliver']),
    formatDate: date => date && format(new Date(date), 'MMM do, yyyy'),
    formatProduct({ quantity, Product }) {
      const { brand, packageVolume, packageType } = Product;
      return `${quantity} ${brand} ${packageVolume}L ${packageType}`;
    },
    markDone() {
      const { activeOrder: { id: orderId } } = this;
      this.deliver({ orderId, status: DELIVERED });
    }
  }
};
</script>
