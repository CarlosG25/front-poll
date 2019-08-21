import * as actions from './actions';
import * as getters from './getters';

import { LOGIN, USER } from './mutation-type';

const state = {
  login: {},
  user: {}
};

export const mutations = {
  [LOGIN] (state, login) {
    state.login = login;
  },
  [USER] (state, user) {
    state.user = user;
  }
};

export default {
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
};
