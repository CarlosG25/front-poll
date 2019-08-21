import Vue from 'vue';
import Index from './views/DashboardView.vue';
import Vuetify from 'vuetify';
import router from './router'; 
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import colors from 'vuetify/es5/util/colors';
import Truncate from 'lodash.truncate';
import Moment from 'vue-moment';
import axios from 'axios';

import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

axios.defaults.baseURL = process.env.ROOT_API;
axios.defaults.headers.get['Accept'] = 'application/json';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.filter('truncate', Truncate);
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(Moment);

Vue.use(Vuetify, {
  theme: {
    primary: '#006fb9', 
    secondary: colors.blue.accent4,
    accent: '#ffdd30', 
    error: colors.red.base, 
    warning: colors.yellow.base, 
    info: colors.blue.base, 
    success: colors.green.base
  },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Index },
  store,
  template: '<Index/>'
});
