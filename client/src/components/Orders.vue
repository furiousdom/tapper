<template>
  <panel title="Orders">
    <div v-for="order in orders"
      :key="order.id">
      {{ order.date }}
      <div v-for="product in order.products"
        :key="product.name">
        {{ product.name }}
        {{ product.packaging.type }}
        {{ product.packaging.liters }}
        {{ product.quantity }}
      </div>
    </div>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      orders: null
    }
  },
  components: {
    Panel
  }
}
</script>
