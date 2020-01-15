import Vue from 'vue'
import Router from 'vue-router'
import list from '@/pages/customer/views/list'
import khDetail from '@/pages/customer/views/khDetail'
import baobeiDetail from '@/pages/customer/views/baobeiDetail'
import dadingDetail from '@/pages/customer/views/dadingDetail'
import laifangDetail from '@/pages/customer/views/laifangDetail'
import presignDetail from '@/pages/customer/views/presignDetail'
import signDetail from '@/pages/customer/views/signDetail'
import sousuoBox from '@/pages/customer/views/sousuoBox'
import sousuoResult from '@/pages/customer/views/sousuoResult'
import customerFollowbox from '@/pages/customer/views/customerFollowbox'
import customerAnalysis from '@/pages/customer/views/customerAnalysis'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/khDetail/:customerId/:userId/:propertyId',
      name: 'kh-detail',
      component: khDetail
    },
    {
      path: '/customerFollowbox',
      name: 'customer-Followbox',
      component: customerFollowbox
    },
    {
      path: '/baobeiDetail/:id',
      name: 'baobei-detail',
      component: baobeiDetail
    },
    {
      path: '/laifangDetail/:id',
      name: 'laifang-detail',
      component: laifangDetail
    },
    {
      path: '/dadingDetail/:id',
      name: 'dading-detail',
      component: dadingDetail
    },
    {
      path: '/presignDetail/:id',
      name: 'presign-detail',
      component: presignDetail
    },
    {
      path: '/signDetail/:id',
      name: 'sign-detail',
      component: signDetail
    },
    {
      path: '/sousuoBox',
      name: 'sousuo-box',
      component: sousuoBox,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/sousuoBox/sousuoResult',
      name: 'sousuo-result',
      component: sousuoResult
    },
    {
      path: '/customerAnalysis',
      name: 'customer-analysis',
      component: customerAnalysis
    }
  ]
})
