export const warnModelRoutes = [
  {
    path: '/warnModelPage',
    name: 'WarnModelPage',
    meta: {
      title: '告警模型',
      showLayout: true,
      icon: 'icon-warn_model_icon',
    },
    component: () => import('@/pages/monitor/views/warnModelPage')
  },
]
