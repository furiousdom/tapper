<template>
  <div class="container">
    <router-link :to="{ name: 'orders' }">
      <v-btn>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
    <panel title="Create Order">
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in orderItems"
            :key="item.productId">
            <v-list-item-content>
              <v-form>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="item.productId"
                      :items="availableProducts"
                      label="Available Products"
                      item-value="id"
                      item-text="text"
                      dense outlined />
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      v-model="item.quantity"
                      :items="quantityItems"
                      label="Quantity"
                      dense outlined />
                  </v-col>
                </v-row>
              </v-form>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-btn @click="addProduct">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-list>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" dark color="rgb(236, 91, 91)">Submit Order</v-btn>
      </v-card-actions>
    </panel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import orderApi from '@/main/services/order';
import panel from '@/main/components/shared/Panel';
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
    orderItems.forEach(({ id, type, liters, brand }) => {
      this.availableProducts.push({ id, text: `${brand.name} ${type} ${liters}L` });
    });
  },
  components: { panel }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none !important;
}
</style>
