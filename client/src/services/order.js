import api from '@/services/api'

export default {
  getAllOrders () {
    return api().get('/orders')
  }
}
