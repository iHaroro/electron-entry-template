import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './modules'
import { getTokenFormApplication } from '@/pages/demo/utils/userInfo.js'
import { Modal } from 'ant-design-vue'

export const routesList = [
  // 重定向
  {
    path: '/',
    redirect: '/index'
  },
  ...routes,
  // 登录页
  // {
  //   path: '/login',
  //   name: 'LoginPage',
  //   component: () => import('@/pages/demo/views/login')
  // },
  // 404页面
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFoundPage',
  //   component: () => import('@/pages/demo/views/404')
  // }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_DEMO_BASE_URL),
  routes: routesList
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
