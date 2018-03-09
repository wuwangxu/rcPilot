// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

//Piloturl
import pilot from '../build/Piloturl'
Vue.prototype.pilot = pilot

// ElementUI
import ElementUI from 'element-ui' /*   js   */
import 'element-ui/lib/theme-chalk/index.css'   /*   css   */
Vue.use(ElementUI)  /*   使用框架  */

// Axios
import axios from 'axios'
Vue.prototype.axios = axios  /*   this.axios  */

// 引入url
const preUrl = require('../config/url')
Vue.prototype.globalUrl = preUrl.interfaceUrl

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.use(VueRouter)

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.requiresAuth) && (!router.app.$store.state.token || router.app.$store.state.token === 'null')) {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   window.console.log('Not authenticated')
  //   next({
  //     // path: '/login',
  //     // query: { redirect: to.fullPath }
  //   })
  // } else {
  //   next()
  // }

  //获取登录状态

  function isLogin() {
    return sessionStorage.getItem('token')
    /* 获取token值 */
  }

  // 跳转前判断
  let _null = null
  if (to.meta.requiresAuth && isLogin() === _null) {  /* 如果需要登陆并且登陆内容为空 */
    router.push({
      'path': '/login'
    })
  } else {
    next()
  }
  // 如果要跳转到登录
  if (to.name === 'login') {    /* 如果当前页面是登陆页面 */
    if (isLogin() !== _null) {   /* 登陆内容不为空 */
      router.push({
        /* 自动跳转到首页 */
        'path': '/'
      })
    }
  }
})

  sync(store, router)

// Check local storage to handle refreshes
  if (window.localStorage) {
    var localUserString = window.localStorage.getItem('user') || 'null'
    var localUser = JSON.parse(localUserString)

    if (localUser && store.state.user !== localUser) {
      store.commit('SET_USER', localUser)
      store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    }
  }

// Start out app!
// eslint-disable-next-line no-new
  new Vue({
    el: '#root',
    router: router,
    store: store,
    render: h => h(AppView)
  })

