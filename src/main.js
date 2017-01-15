// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui'
import Mint from 'mint-ui'

import App from './App'

import '../theme/index.css'
import 'mint-ui/lib/style.css'
import './assets/page.css'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI, { locale })
Vue.use(Mint);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('./views/Home'),
    },
    {
      path: '/login',
      component: require('./views/Login'),
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/create',
      component: require('./views/Create'),
      meta: {
        title: 'Create an account',
      },
    },
    {
      path: '/report',
      component: require('./views/Report'),
      meta: {
        title: 'Reports',
        requiresAuth: true,
      },
    },
  ],
})

/* eslint-disable no-new, no-unused-vars */
const vue = new Vue({
  router,
  el: '#app',
  data() {
    return {
      // TODO these should be stateful between page loads via LocalStorage preferably.
      username: false,
      sessionToken: false,
    }
  },
  methods: {
    login(username, password) {
      this.username = username
      let path = this.$route.query.redirect;

      if (!path) {
        path = '/'
      }

      console.log('Pushing', path)
      this.$router.push(path)
    },
    logout() {
      this.username = false
    }
  },
  computed: {
    isLoggedIn() {
      return this.username !== false
    },
    loggedInAs() {
      return this.username !== false ? this.username : 'guest user'
    },
  },
  mounted() {
    setTimeout(pageReady, 0)
  },
  render: h => h(App),
})

function pageReady() {
  // TODO check user is actually logged in, and sessionToken is valid.
  checkNavigation(vue.$route, null, (where) => {
    if (where) {
      vue.$router.push(where)
    }
  })
}

const defaultTitle = document.title
function checkNavigation(to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + defaultTitle
  } else {
    document.title = defaultTitle
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!vue.isLoggedIn) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
      return
    }
  }
  next()
}

router.beforeEach(checkNavigation)
