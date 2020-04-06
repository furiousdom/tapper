<template>
  <div class="container">
    <router-link to="/orders">
      <v-btn>
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </router-link>
    <panel title="Create Order">
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
export default {
  name: 'create-order',
  data: () => {
    return {
      date: null,
      status: false,
      products: []
    };
  },
  methods: {
    submit() {
      console.log('Submitting orders is not implemented yet!');
    }
  }
};
</script>
