import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './modules'
import { getTokenFormApplication } from '@/pages/monitor/utils/userInfo.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 重定向
    {
      path: '/',
      name: 'HomePage',
      redirect: '/index'
    },
    ...routes,
    // 登录页
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/pages/monitor/views/login')
    },
    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: () => import('@/pages/monitor/views/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getTokenFormApplication()
  const whiteList = ['/login']
  if (token || whiteList.includes(to.path)) {
    // 已登录
    next()
  } else {
    console.log(to)
    // 未登录
    next({ name: 'LoginPage' })
  }
})

export default router
