import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mobile',
    component: () => import('./../views/mobile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
