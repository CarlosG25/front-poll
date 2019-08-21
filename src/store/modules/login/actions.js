import { LOGIN, USER } from './mutation-type';
import HTTP from '../../api/http-common';
import router from '../../../router';
import axios from 'axios';

export const login = ({ commit }, credentials) => {
  loginAction(credentials)
    .then(data => {
      commit(LOGIN, data);
      commit(USER, data);
      const token = data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      router.push('/dashboard');
    })
    .catch(err => {
      console.log(err);
    });
};

function loginAction (credentials) {
  return new Promise((resolve, reject) => {
    HTTP.post('auth/login', credentials)
      .then(response => {
        return resolve(response.data);
      })
      .catch(err => {
        return reject(err.response.data.message);
      });
  });
}

export const logout = ({ commit }, username) => {
  let data = {
    idUser_j: username
  };

  HTTP.post('auth/logout', data)
    .then(function (response) {
      commit(LOGIN, {});
      commit(USER, {});
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }).catch(function (error) {
      console.log(error);
    });
};
