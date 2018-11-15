import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router);

export const constantRouterMap=[
  {
    path: '/class',
    name: '我的班级',
    component: () => import("./views/Class.vue"),
    // meta:{roles:['SYS_STUDENT','SYS_BZR','SYS_TEACHER_MATH','SYS_TEACHER_CHINESE','SYS_ADMIN']}
  },
  {
    path: '/loading',
    name: '加载',
    component: () => import("./views/Loading.vue"),
    // meta:{roles:['SYS_STUDENT','SYS_BZR','SYS_TEACHER_MATH','SYS_TEACHER_CHINESE','SYS_ADMIN']}
  },
];
export default new Router({
  routes:constantRouterMap
})
export const asyncRouterMap=[
  {
    path: '/circle',
    name: '成长圈',
    component: () => import("./views/GrowthCircle.vue"),
    meta:{roles:['SYS_STUDENT'],student:true}
  },
  {
    path: '/archives',
    name: '我的档案',
    component: () => import("./views/Archives.vue"),
    meta:{roles:['SYS_STUDENT'],student:true}
  },
  {
    path:"/backstage/1",
    name:'国家维度',
    component: () => import("./views/backstage/1/table.vue"),
    meta:{roles:['SYS_ADMIN'],admin:true}
  },
  {
    path:"/backstage/2",
    name:'学校维度',
    component: () => import("./views/backstage/2/table.vue"),
    meta:{roles:['SYS_ADMIN'],admin:true}
  },
  {
    path:"/backstage/3",
    name:'档案管理',
    component: () => import("./views/backstage/3/table.vue"),
    meta:{roles:['SYS_BZR','SYS_TEACHER_MATH','SYS_TEACHER_CHINESE'],teacher:true}
  },
  {
    path:"/backstage/4-1",
    name:'过程评价',
    component: () => import("./views/backstage/4/table1.vue"),
    meta:{roles:['SYS_BZR','SYS_TEACHER_MATH','SYS_TEACHER_CHINESE'],teacher:true}
  },
  {
    path:"/backstage/4-2",
    name:'评价设置',
    component: () => import("./views/backstage/4/table2.vue"),
    meta:{roles:['SYS_ADMIN'],admin:true}
  },
  {
    path:"/backstage/5-1",
    name:'奖章授予',
    component: () => import("./views/backstage/5/table1.vue"),
    meta:{roles:['SYS_BZR','SYS_TEACHER_MATH','SYS_TEACHER_CHINESE','SYS_ADMIN'],teacher:true,admin:true}
  },
  {
    path:"/backstage/5-2",
    name:'奖章设置',
    component: () => import("./views/backstage/5/table2.vue"),
    meta:{roles:['SYS_ADMIN'],admin:true}
  },
  {
    path:"/backstage/6",
    name:'成长奖励',
    component: () => import("./views/backstage/6/table.vue"),
    meta:{roles:['SYS_BZR','SYS_TEACHER_MATH','SYS_TEACHER_CHINESE','SYS_ADMIN'],teacher:true,admin:true}
  },
  { path: '*',
    name: '404',
    redirect: '/class' }
]

