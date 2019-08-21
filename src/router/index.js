import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import store from '../store';

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = store.state.login.login.token;
    if (token === undefined || token === null) {
      next('/login');
    } else {
      next(); 
    }
  } else {
    next();
  }
});


export default router;
