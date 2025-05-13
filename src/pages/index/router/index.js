import { createRouter, createWebHashHistory } from 'vue-router'
import { getTokenFormApplication } from '@/pages/index/utils/userInfo'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 默认重定向到aiCopilot智能驾驶页面
    {
      path: '/',
      redirect: '/aiCopilot'
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('@/pages/index/views/login/index.vue')
    },
    {
      path: '/aiCopilot',
      name: 'AiCopilotPage',
      component: () => import('@/pages/index/views/aiCopilot/index.vue')
    },
    {
      path: '/deviceInfo',
      name: 'DeviceInfoPage',
      component: () => import('@/pages/index/views/deviceInfo/index.vue')
    },
    {
      path: '/monitoringInfo',
      name: 'MonitoringInfoPage',
      component: () => import('@/pages/index/views/monitoringInfo/index.vue')
    },
    {
      path: '/alarmInfo',
      name: 'AlarmInfoPage',
      component: () => import('@/pages/index/views/alarmInfo/index.vue')
    },
    {
      path: '/dataAnalysis',
      name: 'DataAnalysisPage',
      component: () => import('@/pages/index/views/dataAnalysis/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = getTokenFormApplication()
  console.log('路由跳转')
  console.log('to', to)
  console.log('from', from)
  const whiteList = ['/login']
  if (token || whiteList.includes(to.path)) {
    // 已登录
    next()
  } else {
    console.log(to)
    // 未登录
    next({ path: '/login' })
  }
  next()
})

export default router
