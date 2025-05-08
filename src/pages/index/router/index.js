import { createRouter, createWebHashHistory } from 'vue-router'
import { getConfigFromApplication, setConfigToApplication } from '@/pages/index/utils/userInfo.js'
import { getGlobalConfig } from '@/pages/index/api/public.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 默认重定向到aiCopilot智能驾驶页面
    {
      path: '/',
      redirect: '/aiCopilot'
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
  console.log('路由跳转')
  console.log('to', to)
  console.log('from', from)
  const config = getConfigFromApplication()
  console.log('系统配置', config)
  if (config) {
    next()
  } else {
    getGlobalConfig().then((res) => {
      setConfigToApplication(JSON.stringify(res.data))
      next()
    })
  }
})

export default router
