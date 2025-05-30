export const warnStatisticsRoutes = [
  {
    path: '/warnStatisticsPage',
    name: 'WarnStatisticsPage',
    meta: {
      title: '告警统计',
      showLayout: true,
      icon: 'icon-warn_statistics_icon',
    },
    component: () => import('@/pages/monitor/views/warnStatisticsPage')
  }
]
