<template>
  <div class="container">
    <panel title="Create Order">
      <router-link :to="{ name: 'orders' }">
        <v-btn>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-select :items="numbers" label="Quantity" dense solo />
            </v-col>
            <v-col>
              <v-select :items="beers" label="Beer Name" dense solo />
            </v-col>
            <v-col>
              <v-text-field label="Package Type" disabled outlined>KEG</v-text-field>
            </v-col>
            <v-col>
              <v-select :items="liters" label="Liters" dense solo />
            </v-col>
          </v-row>
          <v-btn @click="submit" color="rgb(236, 91, 91)">Submit Order</v-btn>
        </v-form>
      </v-card-text>
    </panel>
  </div>
</template>

<script>
import panel from '@/src/components/shared/Panel';

export default {
  name: 'create-order',
  data: () => ({
    date: null,
    status: false,
    products: []
  }),
  methods: {
    submit() {
      console.log('Submitting orders is not implemented yet!');
    }
  },
  components: { panel }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none !important;
}
</style>
