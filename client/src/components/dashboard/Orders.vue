<template>
  <panel title="Orders">
    <v-list>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="({ date, status, ProductOrders}, i) in orders"
          :key="i">
          <v-list-item-content>
            <v-row
              :align="align">
              <v-col cols="3">
                <div>{{ status }}</div>
              </v-col>
              <c-col cols="3">
                <div>{{ formatDate(date) }}</div>
              </c-col>
              <v-col cols="3">
                <div
                  v-for="{ id, quantity, Product } in ProductOrders"
                  :key="id">
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
