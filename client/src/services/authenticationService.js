import api from '@/services/api'

export default {
  register (credentials) {
    return api().post('users/register', credentials)
  },
  login (credentials) {
    return api().post('users/login', credentials)
  },
  logout () {
    return api().get('users/logout')
  }
}
