import Vue from 'vue'
import App from './App'
import router from '@/router/index'
import '@/plugins/axios.js'
import '@/plugins/mint.js'
import '@/common/scss/reset.scss'

// 注入axios请求的api地址
import { indexHandle } from '@/common/js/apiRegister.js'
indexHandle()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
