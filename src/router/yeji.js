import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/yeji/views/Index'

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
      component: Index
    },
    {
      path: '/placeUser/:placeUserId/:propertyId',
      name: 'place-user',
      component: () => import('@/pages/yeji/views/PlaceUser')
    },
    {
      path: '/evaluationAllbox/:placeUserId',
      name: 'evaluation-allbox',
      component: () => import('@/pages/yeji/views/EvaluationAllbox')
    },
    {
      path: '/list/:type',
      name: 'list',
      component: () => import('@/pages/yeji/views/list')
    },
    {
      path: '/list/nopayMsg/:id',
      name: 'hkdetail',
      component: () => import('@/pages/yeji/views/nopayMsg')
    }
  ]
})
