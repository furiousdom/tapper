import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/Hello'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Orders from '@/components/Orders'
import CreateOrder from '@/components/CreateOrder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: Hello
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },
  {
    path: '/orders/create',
    name: 'orders-create',
    component: CreateOrder
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
