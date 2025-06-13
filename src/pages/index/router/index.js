import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 默认重定向到aiCopilot智能驾驶页面
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: () => import('@/pages/index/views/index')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
