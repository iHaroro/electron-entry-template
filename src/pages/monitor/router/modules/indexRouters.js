import { ToolOutlined } from '@ant-design/icons-vue'

export const indexRouters = [
  {
    path: '/index',
    name: 'IndexPage',
    meta: {
      title: '首页',
      icon: ToolOutlined
    },
    component: () => import('@/pages/monitor/views/index')
  }
]
