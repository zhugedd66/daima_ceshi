// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// elementUI 导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 调用插件
Vue.use(ElementUI);
import '../static/global/global.css'
import '../static/global/gt.js'
import 'animate.css'
// 导入axios

import * as api from './restful/api'
Vue.prototype.$http = api;
// 添加请求拦截器


// store的引入
import store from '../src/store'

// 全局守卫
router.beforeEach((to, from, next) => {
console.log(to)
if(to.meta.requiresAuth){ //表示用户访问该组件需要登录
  if(!localStorage.getItem('token')){
    next({
        name: 'Login'
      })
  }else{
    	let user = {
        token:localStorage.getItem('token'),
        username:localStorage.getItem('username'),
        head_img:localStorage.getItem('head_img'),
      };

	  store.dispatch('getUserInfo',user);
    next()
  }
}else{
  //放行
  next()
}
//if (localStorage.getItem('token')) {
//	// 用户登录过
//	let user = {
//		token:localStorage.getItem('token'),
//		username:localStorage.getItem('username'),
//		head_img:localStorage.getItem('head_img'),
//	};
//
//	store.dispatch('getUserInfo',user);
//}
//
//  // ...
//  next();
})


Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
