<template>
  <a-menu
    id="demoPageMenuComponent"
    style="width: 100%"
    mode="inline"
    popupClassName="monitor-menu-popup-class"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :items="items"
    :inline-collapsed="inlineCollapsed"
    trigger-sub-menu-action="click"
    @click="handleClick"
  >
  </a-menu>
</template>

<script setup>
import { reactive, ref, watch, h, onMounted } from 'vue'
import { routes } from '@/pages/demo/router/modules'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'MenuItems' })

defineProps({
  inlineCollapsed: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const router = useRouter()
const selectedKeys = ref([])
const openKeys = ref([])

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

/**
 * @function transformRoutesToMenuItems
 * @description 将路由转换为菜单数据
 * @param {array} routes 路由数据
 * @returns {array} 菜单数据
 **/
const transformRoutesToMenuItems = (routes) => {
  return routes
  .filter(route => !route.meta?.hideInMenu)
  .map(route => {
    const item = {
      key: route.name,
      label: route.meta?.title || route.name,
      title: route.meta?.title || route.name
    }

    // 自定义icon
    if (route.meta?.icon) {
      // ICON_FONT
      item.icon = () => h('i', {
        class: ['iconfont', route.meta.icon],
        style: { fontSize: '24px' }
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

<style lang="scss">
#demoPageMenuComponent {
  &.ant-menu {
    background-color: rgba(4, 26, 71, 1);
    border-inline-end: none !important;

    .ant-menu-sub {
      background-color: rgba(4, 26, 71, 1);

      .ant-menu-item {
        width: 100%;
        height: 56px;
        line-height: 56px;
        padding-inline: 0;
        margin-inline: 0;
        margin-block: 0;
      }
    }

    .ant-menu-title-content {
      font-size: 18px;
    }

    &.ant-menu-inline-collapsed {
      .ant-menu-item {
        padding-inline: calc(50% - 12px);
      }

      .ant-menu-submenu {
        .ant-menu-submenu-title {
          padding-inline: calc(50% - 12px);
        }
      }
    }

    .ant-menu-submenu-selected {
      .ant-menu-submenu-title {
        color: rgba(25, 141, 255, 1);
      }
    }

    .ant-menu-item-selected {
      &.ant-menu-item {
        position: relative;
        background-color: rgba(242, 252, 255, 0.10);

        &::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 6px;
          height: 56px;
          background: #198DFF;
          border-radius: 0 5px 5px 0;
        }
      }

      .ant-menu-title-content {
        color: rgba(25, 141, 255, 1);
      }
    }

    .ant-menu-submenu-title {
      width: 100%;
      height: 56px;
      line-height: 56px;
      padding-inline: 0;
      margin-inline: 0;
      margin-block: 0;
    }

    .ant-menu-item {
      width: 100%;
      height: 56px;
      line-height: 56px;
      padding-inline: 0;
      margin-inline: 0;
      margin-block: 0;
      border-radius: 0;

      //.ant-menu-item-icon {
      //  svg {
      //    width: 100%;
      //    height: 100%;
      //
      //    path, rect, circle, polygon, polyline, line {
      //      stroke: red;
      //      fill: none;
      //    }
      //  }
      //}
    }
  }
}

.ant-menu-submenu-popup {
  .ant-menu-vertical {
    .ant-menu-item {
      display: flex;
      align-items: center;
    }
  }
}
</style>