import Auth from '@/src/components/auth';
import CreateOrder from '@/src/components/CreateOrder';
import Dashboard from '@/src/components/Dashboard';
import Login from '@/src/components/auth/Login';
import Orders from '@/src/components/Orders';
import Register from '@/src/components/auth/Register';
import store from '@/src/store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

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
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.auth) && !store.state.auth.user) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
