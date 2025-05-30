import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './modules'
import { getTokenFormApplication } from '@/pages/monitor/utils/userInfo.js'
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
  //   component: () => import('@/pages/monitor/views/login')
  // },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('@/pages/monitor/views/404')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.MONITOR_BASE_URL),
  routes: routesList
})

router.beforeEach((to, from, next) => {
  console.log('monitor router beforeEach')
  const token = getTokenFormApplication()
  const whiteList = ['/login']
  if (token || whiteList.includes(to.path)) {
    console.log('已登录', to)
    // 已登录
    next()
  } else {
    console.log('未登录', to)
    // 未登录
    Modal.error({
      title: '提示',
      content: '登录已过期，请先登录',
      okText: '确定',
      onOk() {
        console.log('click ok')
        window.close()
      }
    })
  }
})

export default router
