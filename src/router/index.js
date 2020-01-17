import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/views/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/placeUser/:placeUserId/:propertyId',
      name: 'place-user',
      component: () => import('@/pages/index/views/PlaceUser')
    },
    {
      path: '/evaluationAllbox/:placeUserId',
      name: 'evaluation-allbox',
      component: () => import('@/pages/index/views/EvaluationAllbox')
    },
    {
      path: '/approval',
      name: 'approval',
      component: () => import('@/pages/index/views/approval')
    }, {
      path: '/approval/approvalMsg/:type/:transactionNumber/:id/:reviewState',
      name: 'approvalMsg',
      component: () => import('@/pages/index/views/approvalMsg')
    }, {
      path: '/searchitem',
      name: 'searchitem',
      component: () => import('@/pages/index/views/searchItem.vue')
    }
  ]
})
