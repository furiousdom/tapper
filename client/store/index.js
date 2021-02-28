import auth from './modules/auth';
import order from './modules/order';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const options = {
  strict: true,
  modules: { auth, order }
};

export default new Vuex.Store(options);
