<template>
  <div class="form-container">
    <v-card max-width="700px" outlined>
      <v-card-title class="justify-center">Create Order</v-card-title>
      <v-form>
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="item in orderItems"
              :key="item.productId">
              <v-list-item-content>
                <v-row>
                  <v-col cols="12" md="9">
                    <v-select
                      v-model="item.productId"
                      :items="availableProducts"
                      label="Available Products"
                      item-value="id"
                      item-text="text"
                      dense outlined />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="item.quantity"
                      :items="quantityItems"
                      label="Quantity"
                      dense outlined />
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="new-product">
          <v-spacer />
          <v-btn @click="addProduct" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" dark>Submit Order</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import orderApi from '@/main/services/order';
import productApi from '@/main/services/product';

const setOrderItem = () => ({ productId: null, quantity: null });

export default {
  name: 'create-order',
  data: () => ({
    availableProducts: [],
    quantities: [],
    delivered: false,
    orderItems: [setOrderItem()]
  }),
  computed: {
    ...mapState('auth', ['user']),
    quantityItems: () => [1, 2, 3, 4, 5, 6]
  },
  methods: {
    submit() {
      const { id: userId } = this.user;
      const { orderItems } = this;
      return orderApi.create({ userId, products: orderItems })
        .then(({ data }) => {
          if (data === 'Created') this.$router.push({ name: 'orders' });
        });
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
a {
  text-decoration: none !important;
}

.form-container {
  padding: 0 2rem 5rem 2rem;
}
</style>
