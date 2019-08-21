import * as actions from './actions';
import * as getters from './getters';

import { GET_ALL_BY_USER, GET_ALL } from './mutation-type';

const state = {
  allPolls: null,
  pollsForUser: null
};

export const mutations = {
  [GET_ALL_BY_USER] (state, pollsForUser) {
    state.pollsForUser = pollsForUser;
  },
  [GET_ALL] (state, allPolls) {
    state.allPolls = allPolls;
  }
};

export default {
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
};
