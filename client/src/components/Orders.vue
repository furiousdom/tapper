<template>
  <panel title="Orders">
    <div v-for="order in orders"
      :key="order.id">
      {{ order.date }}
      {{ order.status }}
      <div v-for="productOrder in order.ProductOrders"
        :key="productOrder.name">
        {{ productOrder.quantity }}
        {{ productOrder.Product.type }}
        {{ productOrder.Product.liters }}
        {{ productOrder.Product.brandId }}
      </div>
    </div>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
import OrderService from '@/services/order'

export default {
  data () {
    return {
      orders: null
    }
  },
  components: {
    Panel
  },
  async mounted () {
    const params = {
      userId: this.$store.state.auth.user.id
    }
    this.orders = await OrderService.fetch(params)
  }
}
</script>
