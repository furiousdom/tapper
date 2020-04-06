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
                  v-for="{ quantity, Product: { type, liters, Brand: { name } }} in ProductOrders"
                  :key="name">
                  {{ quantity }}x
                  {{ name }}
                  {{ type }}
                  {{ liters }}L
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
  data: () => ({ orders: null }),
  computed: mapState('auth', ['user']),
  methods: {
    formatDate(date) {
      return format(date, 'MMM do, yyyy');
    }
  },
  async mounted() {
    const { id: userId } = this.user;
    this.orders = await api.fetch({ userId });
  },
  components: { panel }
};
</script>
