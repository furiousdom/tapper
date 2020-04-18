import Auth from '@/src/components/auth';
import CreateOrder from '@/src/components/dashboard/CreateOrder';
import Dashboard from '@/src/components/dashboard';
import get from 'lodash/get';
import Login from '@/src/components/auth/Login';
import Orders from '@/src/components/dashboard/Orders';
import Register from '@/src/components/auth/Register';
import store from '@/src/store';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/auth',
    name: 'auth',
    component: Auth,
    children: [{
      path: 'register',
      name: 'register',
      component: Register
    }, {
      path: 'login',
      name: 'login',
      component: Login
    }]
  }, {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { auth: true },
    children: [{
      path: 'orders',
      name: 'orders',
      component: Orders
    }, {
      path: 'create',
      name: 'create-order',
      component: CreateOrder
    }]
  }]
});

router.beforeEach((to, _from, next) => {
  const user = get(store.state, 'auth.user');
  const isNotAuthenticated = to.matched.some(it => it.meta.auth) && !user;
  return isNotAuthenticated ? next({ name: 'login' }) : next();
});

export default router;
