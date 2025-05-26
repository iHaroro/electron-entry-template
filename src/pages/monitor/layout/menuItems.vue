<template>
  <a-menu
    id="pageMenu"
    style="width: 100%"
    mode="inline"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :items="items"
    :inline-collapsed="inlineCollapsed"
    @click="handleClick"
  ></a-menu>
</template>

<script setup>
import { reactive, ref, watch, h, onMounted } from 'vue'
import { routes } from '@/pages/monitor/router/modules'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'MenuItems' })

defineProps({
  inlineCollapsed: {
    type: Boolean,
    default: false
  }
})

/**
 * 点击菜单
 * @param e 点击事件
 * @param key 菜单key
 */
const handleClick = ({ key }) => {
  const findRoute = (routes, targetKey) => {
    for (const route of routes) {
      if (route.name === targetKey) {
        return route
      }
      if (route.children) {
        const found = findRoute(route.children, targetKey)
        if (found) return found
      }
    }
    return null
  }

  const targetRoute = findRoute(routes, key)
  if (targetRoute) {
    router.push({ name: targetRoute.name })
  }
}

const route = useRoute()
const router = useRouter()
const selectedKeys = ref([])
const openKeys = ref([])

const transformRoutesToMenuItems = (routes) => {
  return routes
    .filter(route => !route.meta?.hideInMenu)
    .map(route => {
      const item = {
        key: route.name,
        label: route.meta?.title || route.name,
        title: route.meta?.title || route.name
      }

      if (route.meta?.icon) {
        item.icon = () => h(route.meta.icon, {
          style: { fontSize: '18px' }
        })
      }

      if (route.children?.length) {
        item.children = transformRoutesToMenuItems(route.children)
      }

      return item
    })
}

const items = reactive(transformRoutesToMenuItems(routes))

const updateMenuState = () => {
  const matchedRoutes = route.matched
  if (matchedRoutes.length) {
    // 优先使用activeMenu指定的菜单key
    const activeMenu = matchedRoutes[matchedRoutes.length - 1].meta?.activeMenu
    selectedKeys.value = activeMenu ?
      [activeMenu] :
      [matchedRoutes[matchedRoutes.length - 1].name]
    openKeys.value = matchedRoutes
      .slice(0, -1)
      .map(r => r.name)
      .filter(Boolean)
  }
}

onMounted(() => {
  updateMenuState()
})

watch(() => route.path, () => {
  updateMenuState()
})

watch(openKeys, val => {
  console.log('openKeys', val)
})
</script>
