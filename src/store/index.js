import Vue from 'vue';
import Vuex from 'vuex';
import errors from './modules/errors';
import login from './modules/login';
import app from './modules/app';
import poll from './modules/poll';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    login,
    errors,
    app,
    poll
  },
  strict: debug
});
