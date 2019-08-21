import axios from 'axios';
import store from '../../store';

const apiCall = axios.create({
  baseURL: process.env.ROOT_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiCall.interceptors.request.use(config => {
  store.commit('error/ERROR_API', false);
  store.commit('error/LOADING', true);
  return config;
}, function (error) {
  store.commit('error/LOADING', false);
  store.commit('error/ERROR_API', true);
  return Promise.reject(error);
});

apiCall.interceptors.response.use(response => {
  store.commit('error/ERROR_API', false);
  store.commit('error/LOADING', false);
  return response;
}, function (error) {

  let errorMessage = 'There was an error communicating with the server.';
  if (error.response) {
    console.log(error.response.data);
    errorMessage = error.response.data.message;
  } else if (error.request) {
    console.log(error.request);
  } else {
    errorMessage = error.message;
  }
  window.getApp.snackbar = {
    show: true,
    color: 'error',
    text: errorMessage,
    position: 'top'
  };
  store.commit('error/LOADING', false);
  store.commit('error/ERROR_API', true);
  return Promise.reject(error);
});

export default apiCall;
