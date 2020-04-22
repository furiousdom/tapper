<template>
  <div class="container">
    <panel title="Orders">
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="({ id, createdAt, delivered, ProductOrders}) in orders"
            :key="id">
            <v-list-item-content>
              <v-row>
                <v-col cols="3">
                  <div>{{ delivered }}</div>
                </v-col>
                <v-col cols="3">
                  <div>{{ formatDate(createdAt) }}</div>
                </v-col>
                <v-col cols="3">
                  <div
                    v-for="{ id: productId, quantity, Product } in ProductOrders"
                    :key="productId">
                    {{ quantity }}x
                    {{ Product.Brand.name }}
                    {{ Product.type }}
                    {{ Product.liters }}L
                  </div>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </panel>
    <router-link :to="{ name: 'create-order' }">
      <v-btn
        color="rgb(236, 91, 91)"
        fab dark absolute large
        right class="mx-2">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import api from '@/src/services/order';
import { format } from 'date-fns';
import { mapState } from 'vuex';
import panel from '@/src/components/shared/Panel';

export default {
  name: 'orders',
  data: () => ({ orders: null }),
  computed: mapState('auth', ['user']),
  methods: {
    formatDate(date) {
      return date && format(new Date(date), 'MMM do, yyyy');
    }
  },
  async mounted() {
    const { id: userId } = this.user;
    this.orders = await api.fetch({ userId });
  },
  components: { panel }
};
</script>
