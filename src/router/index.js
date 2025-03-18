import { createRouter, createWebHashHistory } from 'vue-router'
import { getTokenFormApplication } from '@/utils/userInfo.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/home')
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/views/login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getTokenFormApplication()
  console.log('路由跳转', to, from)
  const whiteList = ['/login']
  if (token || whiteList.includes(to.path)) {
    // 已登录
    next()
  } else {
    console.log(to)
    // 未登录
    next({ path: '/login' })
  }
})

export default router
