import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/components/auth/Container'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Dashboard from '@/components/Dashboard'
import Orders from '@/components/Orders'
import CreateOrder from '@/components/CreateOrder'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth,
      children: [
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { auth: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: { auth: true }
    },
    {
      path: '/orders/create',
      name: 'orders-create',
      component: CreateOrder,
      meta: { auth: true }
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.auth) && !store.state.auth.user) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
