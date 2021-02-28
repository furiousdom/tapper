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
    <v-btn @click="addProduct" block depressed plain class="mb-2">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-textarea v-model="note" label="Note" dense outlined />
    <v-btn @click="submit" block depressed class="my-2">Submit Order</v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import productApi from '@/services/product';

const setOrderItem = () => ({ productId: null, quantity: null });

export default {
  name: 'create-order',
  data: () => ({
    availableProducts: [],
    quantities: [],
    orderItems: [setOrderItem()],
    note: ''
  }),
  computed: {
    ...mapState('auth', ['user']),
    itemQuantities: () => [1, 2, 3, 4, 5, 6]
  },
  methods: {
    ...mapActions('order', ['create']),
    submit() {
      const { orderItems, user: { id: userId }, note } = this;
      this.create({ userId, note, products: orderItems })
        .then(() => this.clearForm());
    },
    addProduct() {
      this.orderItems.push(setOrderItem());
    },
    clearForm() {
      this.orderItems = [setOrderItem()];
      this.note = '';
    }
  },
  async created() {
    const { data: products } = await productApi.fetch();
    products.forEach(({ id, packageType, packageVolume, brand, availableQuantity }) => {
      this.availableProducts.push({
        id,
        text: `${brand} ${packageType} ${packageVolume}L`,
        quantity: availableQuantity,
        selected: false
      });
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
