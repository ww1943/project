// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import conf from '@/configure/conf'
import image from '@/js/image.js'
import './css/style.less'
import './css/reset.css'
import {
  $_ajax,
  $_post,
  $_post_json
} from '@/js/axios'
Vue.prototype.$get = $_ajax;//get请求
Vue.prototype.$post = $_post;//post请求
Vue.prototype.Image = image;//图片
Vue.prototype.conf = conf;//配置json文件
Vue.config.productionTip = false
axios.defaults.withCredentials = true;
Vue.prototype.$url = `http://${location.hostname}${location.port?':':''}${location.port||''}/api`;
Vue.prototype.$socket = `ws://${location.hostname}${location.port?':':''}${location.port||''}/ws`;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
