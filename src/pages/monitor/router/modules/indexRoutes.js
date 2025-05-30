export const indexRoutes = [
  {
    path: '/index',
    name: 'IndexPage',
    meta: {
      title: '首页',
      showLayout: true,
      icon: 'icon-home_menu_icon'
    },
    component: () => import('@/pages/monitor/views/index')
  }
]
