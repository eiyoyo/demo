import Vue from 'vue'
import Custormer from './App'
import router from '@/router/customer'
import '@/plugins/axios.js'
import '@/plugins/mint.js'
import './../../assets/list.scss'

// 注入axios请求的api地址
import { customerHandle } from '@/common/js/apiRegister.js'
customerHandle()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Custormer)
})
