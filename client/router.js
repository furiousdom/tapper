import Auth from '@/components/Auth';
import Dashboard from '@/components/Main/Dashboard';
import get from 'lodash/get';
import Login from '@/components/Auth/Login';
import Main from '@/components/Main';
import Orders from '@/components/Main/Orders';
import Register from '@/components/Auth/Register';
import store from '@/store';
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
    name: 'main',
    component: Main,
    meta: { auth: true },
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: Dashboard
    }, {
      path: 'orders',
      name: 'orders',
      component: Orders
    }]
  }]
});

router.beforeEach((to, _from, next) => {
  const user = get(store.state, 'auth.user');
  const isNotAuthenticated = to.matched.some(it => it.meta.auth) && !user;
  return isNotAuthenticated ? next({ name: 'login' }) : next();
});

export default router;
