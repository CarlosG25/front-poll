import { ERROR_API, LOADING } from './mutation-type';

export const saveError = ({ commit }, error) => {
  commit(ERROR_API, error);
};

export const loading = ({ commit }, loading) => {
  commit(LOADING, loading);
};
