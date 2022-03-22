import { createStore } from 'vuex';
import toyStore from './modules/toy-module.js';
import { reviewStore } from './modules/review-module.js';
import { userStore } from './modules/user-module.js';
// create a store instance
const store = createStore({
  strict: true,
  state: { userMsg: null },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    toyStore,
    reviewStore,
    userStore,
  },
});

export default store;
