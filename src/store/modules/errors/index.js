import * as actions from './actions';
import { ERROR_API, LOADING, ERROR_MESSAGE } from './mutation-type';

const state = {
  error: null,
  loading: false,
  errorMessage: null
};

export const mutations = {
  [ERROR_API] (state, error) {
    state.error = error;
  },
  [LOADING] (state, loading) {
    state.loading = loading;
  },
  [ERROR_MESSAGE] (state, errorMessage) {
    state.errorMessage = errorMessage;
  }
};

export default {
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations
};
