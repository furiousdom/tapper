<template>
  <v-form>
    <v-row
      v-for="item in orderItems"
      :key="item.productId">
      <v-col cols="8">
        <v-select
          v-model="item.productId"
          :items="availableProducts"
          item-value="id"
          item-text="text"
          label="Available Products"
          dense outlined />
      </v-col>
      <v-col cols="4">
        <v-select
          v-model="item.quantity"
          :items="itemQuantities"
          label="Quantity"
          dense outlined />
      </v-col>
    </v-row>
    <div class="d-flex flex-column">
      <v-btn @click="addProduct" depressed plain class="mb-2">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn @click="submit" depressed class="my-2">Submit Order</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';
import orderApi from '@/services/order';
import productApi from '@/services/product';

const setOrderItem = () => ({ productId: null, quantity: null });

export default {
  name: 'create-order',
  data: () => ({
    latestOrder: null,
    availableProducts: [],
    quantities: [],
    orderItems: [setOrderItem()]
  }),
  computed: {
    ...mapState('auth', ['user']),
    itemQuantities: () => [1, 2, 3, 4, 5, 6]
  },
  methods: {
    async submit() {
      const { orderItems, user: { id: userId } } = this;
      const { data } = await orderApi.create({ userId, products: orderItems });
      if (data === 'Created') this.$router.push({ name: 'orders' });
    },
    addProduct() {
      this.orderItems.push(setOrderItem);
    }
  },
  async created() {
    const { data: orderItems } = await productApi.fetch();
    orderItems.forEach(({ id, type, liters, Brand }) => {
      this.availableProducts.push({ id, text: `${Brand.name} ${type} ${liters}L` });
    });
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 0.25rem;
  background: #fff;
}
</style>
