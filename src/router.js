import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import("./views/Index.vue")
    },
    {
      path: '/class',
      name: 'class',
      component: () => import("./views/Class.vue")
    },
    {
      path: '/archives',
      name: 'archives',
      component: () => import("./views/Archives.vue")
    },
    {
      path:"/backstage/1",
      component: () => import("./views/backstage/1/table.vue"),
      meta:{requireAuth:true}
    },
    {
      path:"/backstage/2",
      component: () => import("./views/backstage/2/table.vue"),
      meta:{requireAuth:true}
    },
    {
      path:"/backstage/3",
      component: () => import("./views/backstage/3/table.vue"),
      meta:{requireAuth:true}
    },
    {
      path:"/backstage/4-1",
      component: () => import("./views/backstage/4/table1.vue"),
      meta:{requireAuth:true}
    },
    {
      path:"/backstage/4-2",
      component: () => import("./views/backstage/4/table2.vue"),
      meta:{requireAuth:true}
    },
    {
      path:"/backstage/5-1",
      component: () => import("./views/backstage/5/table1.vue"),
      meta:{requireAuth:true}
    },
    {
      path:"/backstage/5-2",
      component: () => import("./views/backstage/5/table2.vue"),
      meta:{requireAuth:true}
    },
  ]
})
