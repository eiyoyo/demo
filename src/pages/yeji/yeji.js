import Vue from 'vue'
import Person from './App'
import router from '@/router/yeji'
import '@/common/scss/common.scss'
import '@/plugins/axios.js'
import '@/plugins/mint.js'
import VeLine from 'v-charts/lib/line.common'

// 注入axios请求的api地址
import { yejiHandle } from '@/common/js/apiRegister.js'
yejiHandle()

Vue.component(VeLine.name, VeLine)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Person)
})
