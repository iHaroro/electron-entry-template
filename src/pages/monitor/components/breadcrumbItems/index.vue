<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
      <template v-if="index === breadcrumbItems.length - 1">
        {{ item.title }}
      </template>
      <template v-else>
        <router-link :to="getRedirectPath(item.route)">
          {{ item.title }}
        </router-link>
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { routesList } from '@/pages/monitor/router'

const route = useRoute()

const homeItem = {
  path: '/',
  title: '智能化配置平台',
  route: {
    path: '/',
    name: 'IndexPage',
    meta: {
      title: '智能化配置平台'
    }
  }
}

const findRouteByPath = (path) => {
  let result = []
  const segments = path.split('/').filter(Boolean)
  // 计算出所有的路由路径，路由路径定义必须按照层级顺序定义，否则会出现问题
  const paths = segments.reduce((acc, segment, index) => {
    const prevPath = index > 0 ? acc[index - 1] : ''
    const currentPath = `${prevPath}/${segment}`
    acc.push(currentPath)
    return acc
  }, [])

  // 遍历所有的路由路径，找到对应的路由对象，然后将路由对象添加到结果数组中
  paths.forEach((path) => {
    const route = findRouteInRoutesList(path)
    route && result.push({
      path,
      route,
      title: route.meta.title
    })
  })

  return result
}

const findRouteInRoutesList = (path, routes = routesList) => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (route.path === path) {
      return route
    } else if (route.children) {
      const result = findRouteInRoutesList(path, route.children)
      if (result) {
        return result
      }
    }
  }
}

const breadcrumbItems = computed(() => {
  const matchedRoutes = findRouteByPath(route.path)
  return [homeItem, ...matchedRoutes]
})

const getRedirectPath = (route) => {
  // 如果有重定向配置，使用重定向路径
  if (route.redirect) return route.redirect
  // 如果有子路由，返回第一个子路由的路径
  if (route.children?.length) {
    return route.children[0].path
  }
  // 否则返回当前路由路径
  return route.path
}


</script>
