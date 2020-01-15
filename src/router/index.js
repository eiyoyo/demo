import Vue from 'vue'
import Router from 'vue-router'
import searchItem from '@/pages/index/views/searchItem.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: resolve => require(['@/pages/index/views/Index'], resolve)
    },
    {
      path: '/placeUser/:placeUserId/:propertyId',
      component: resolve => require(['@/pages/index/views/PlaceUser'], resolve)
    },
    {
      path: '/evaluationAllbox/:placeUserId',
      component: resolve => require(['@/pages/index/views/EvaluationAllbox'], resolve)
    },
    {
      path: '/approval',
      name: 'approval',
      component: resolve => require(['@/pages/index/views/approval'], resolve)
    }, {
      path: '/approval/approvalMsg/:type/:transactionNumber/:id/:reviewState',
      name: 'approvalMsg',
      component: resolve => require(['@/pages/index/views/approvalMsg'], resolve)
    }, {
      path: '/searchitem',
      component: searchItem
    }
  ]
})
