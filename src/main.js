// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import 'font-awesome/css/font-awesome.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// 路由拦截
router.beforeEach((to, from, next) => {
  //console.log(to);
  //console.log(to.path);
  //console.log(next)
  if(to.path == '/Login') {
    sessionStorage.removeItem('user');
  };
  let user = JSON.stringify(sessionStorage.getItem('user'));
  //console.log(user)
  if(user == 'null' && to.path != '/Login') {
   // console.log(' to /Login')
    next({ path: '/Login' })
  } else if (to.path == '/' && user !== 'null' ){
    //console.log('next /Homes')
    next({path: '/Homes'})
  } else {
    //console.log('next')
    next()
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
