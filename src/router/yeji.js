import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/yeji/views/Index'
import PlaceUser from '@/pages/yeji/views/PlaceUser'
import EvaluationAllbox from '@/pages/yeji/views/EvaluationAllbox'

import List from '@/pages/yeji/views/list'
import nopayMsg from '@/pages/yeji/views/nopayMsg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/placeUser/:placeUserId/:propertyId',
      component: PlaceUser
    },
    {
      path: '/evaluationAllbox/:placeUserId',
      component: EvaluationAllbox
    },
    {
      path: '/list/:type',
      component: List
    },
    {
      path: '/list/nopayMsg/:id',
      component: nopayMsg
    }
  ]
})
