import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home
    },
    {
      path:"/backstage/1",
      component: () => import("./views/backstage/1/table.vue"),
      meta:{requireAuth:true}
    },
  ]
})
