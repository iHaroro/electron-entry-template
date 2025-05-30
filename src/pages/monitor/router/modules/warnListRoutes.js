export const warnListRoutes = [
  {
    path: '/warnListPage',
    name: 'WarnListPage',
    meta: {
      title: '告警列表',
      showLayout: true,
      icon: 'icon-warn_list_icon'
    },
    component: () => import('@/pages/monitor/views/warnListPage')
  },
  {
    path: '/warnListPage/view',
    name: 'WarnListViewPage',
    meta: {
      title: '查看',
      showLayout: true,
      hideInMenu: true,
      activeMenu: 'WarnListPage'
    },
    component: () => import('@/pages/monitor/views/warnListPage/view')
  },
  {
    path: '/warnListPage/handle',
    name: 'WarnListHandlePage',
    meta: {
      title: '处理',
      showLayout: true,
      hideInMenu: true,
      activeMenu: 'WarnListPage'
    },
    component: () => import('@/pages/monitor/views/warnListPage/handle')
  }
]
