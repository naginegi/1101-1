import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path:'/userA',
      name:'userA',
      component:() => import('../views/user/userA.vue')
    },
    {
      path:'/userB',
      name:'userB',
      component:() => import('../views/user/userB.vue')
    },
    {
      path:'/userB1',
      name:'userB1',
      component:() => import('../views/user/userB1.vue')
    },
    {
      path:'/C',
      name:'C',
      component:() => import('../views/C.vue')
    },
    {
      path:'/managerA',
      name:'managerA',
      component:() => import('../views/manager/managerA.vue')
    },
    {
      path:'/managerB',
      name:'managerB',
      component:() => import('../views/manager/managerB.vue')
    },
    {
      path:'/managerB1',
      name:'managerB1',
      component:() => import('../views/manager/managerB1.vue')
    },
    {
      path:'/mainpage',
      name:'mainpage',
      component:() => import('../views/test/mainpage.vue')
    },
    {
      path:'/Qdesign',
      name:'Qdesign',
      component:() => import('../views/test/Qdesign.vue')
    },
    {
      path:'/QdesignCopy',
      name:'QdesignCopy',
      component:() => import('../views/test/Qdesign copy.vue')
    },
    {
      path:'/Qreply',
      name:'Qreply',
      component:() => import('../views/test/Qreply.vue')
    },
    {
      path:'/Qcheck',
      name:'Qcheck',
      component:() => import('../views/test/Qcheck.vue')
    },
  ]
})

export default router
