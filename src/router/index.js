import { createRouter, createWebHashHistory } from 'vue-router'
import { getConfigFromApplication, setConfigToApplication } from '@/utils/userInfo.js'
import { getGlobalConfig } from '@/api/public.js'

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
      component: () => import('@/views/aiCopilot')
    },
    {
      path: '/deviceInfo',
      name: 'DeviceInfoPage',
      component: () => import('@/views/deviceInfo')
    },
    {
      path: '/monitoringInfo',
      name: 'MonitoringInfoPage',
      component: () => import('@/views/monitoringInfo')
    },
    {
      path: '/alarmInfo',
      name: 'AlarmInfoPage',
      component: () => import('@/views/alarmInfo')
    },
    {
      path: '/dataAnalysis',
      name: 'DataAnalysisPage',
      component: () => import('@/views/dataAnalysis')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('路由跳转', to, from)
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
