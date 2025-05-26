<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
      <router-link
        v-if="index < breadcrumbItems.length - 1"
        :to="getRedirectPath(item.route)"
      >
        {{ item.title }}
      </router-link>
      <span v-else>
        {{ item.title }}
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadcrumbItems = computed(() => {
  const matched = route.matched
  return matched.map(r => ({
    path: r.path,
    title: r.meta?.title || r.name,
    route: r // 保留完整路由记录
  }))
})

const getRedirectPath = (routeRecord) => {
  // 如果有重定向配置，使用重定向路径
  if (routeRecord.redirect) return routeRecord.redirect
  // 如果有子路由，返回第一个子路由的路径
  if (routeRecord.children?.length) {
    return routeRecord.children[0].path
  }
  // 否则返回当前路由路径
  return routeRecord.path
}
</script>
