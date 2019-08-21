import { NAME_PAGE, TYPE_ONBORDING } from './mutation-type';

export const updateNamePage = ({ commit }, namePage) => {
  commit(NAME_PAGE, namePage);
};