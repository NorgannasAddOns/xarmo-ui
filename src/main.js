// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';

import App from './App'
import Home from './components/Home'

import '../theme/index.css';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI, { locale });

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: Home,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/create',
      component: Home,
      meta: {
        title: 'Create an account',
      },
    },
    {
      path: '/report',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

let auth = {
  loggedIn: function () {
    return false;
  },
};

const defaultTitle = document.title;
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + defaultTitle;
  } else {
    document.title = defaultTitle;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
      return;
    }
  }
  next();
});

/* eslint-disable no-new, no-unused-vars */
const vue = new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
