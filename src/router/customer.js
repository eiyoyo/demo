import Vue from 'vue'
import Router from 'vue-router'
import list from '@/pages/customer/views/list'

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
      component: () => import('@/pages/customer/views/khDetail')
    },
    {
      path: '/customerFollowbox',
      name: 'customer-Followbox',
      component: () => import('@/pages/customer/views/customerFollowbox')
    },
    {
      path: '/baobeiDetail/:id',
      name: 'baobei-detail',
      component: () => import('@/pages/customer/views/baobeiDetail')
    },
    {
      path: '/laifangDetail/:id',
      name: 'laifang-detail',
      component: () => import('@/pages/customer/views/laifangDetail')
    },
    {
      path: '/dadingDetail/:id',
      name: 'dading-detail',
      component: () => import('@/pages/customer/views/dadingDetail')
    },
    {
      path: '/presignDetail/:id',
      name: 'presign-detail',
      component: () => import('@/pages/customer/views/presignDetail')
    },
    {
      path: '/signDetail/:id',
      name: 'sign-detail',
      component: () => import('@/pages/customer/views/signDetail')
    },
    {
      path: '/sousuoBox',
      name: 'sousuo-box',
      component: () => import('@/pages/customer/views/sousuoBox'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/sousuoBox/sousuoResult',
      name: 'sousuo-result',
      component: () => import('@/pages/customer/views/sousuoResult')
    },
    {
      path: '/customerAnalysis',
      name: 'customer-analysis',
      component: () => import('@/pages/customer/views/customerAnalysis')
    }
  ]
})
