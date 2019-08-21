import * as actions from './actions';
import * as getters from './getters';
import { NAME_PAGE } from './mutation-type';

const state = {
  namePage: 'EncuestaLandia'
};

export const mutations = {
  [NAME_PAGE] (state, namePage) {
    state.namePage = namePage;
  }
};

export default {
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  getters,
  mutations
};
