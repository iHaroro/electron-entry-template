import { ref } from 'vue'
import { defineStore } from 'pinia'

const PAGES = {
  deviceInfo: {
    name: 'deviceInfo',
    desc: '设备信息',
  },
  monitoringInfo: {
    name: 'monitoringInfo',
    desc: '监控信息',
  },
  aiCopilot: {
    name: 'aiCopilot',
    desc: '智能驾驶',
  },
}

export const usePageControlStore = defineStore('pageControl', () => {
  const pageRouters = ref(PAGES)
  const activePage = ref(null)
  const routeStack = []
  let currentRouterStackIndex = -1

  const goPage = (pageName) => {
    console.log(currentRouterStackIndex, routeStack)
    activePage.value = pageName
    currentRouterStackIndex += 1
    routeStack[currentRouterStackIndex] = pageName
    console.log(currentRouterStackIndex, routeStack)
  }

  const goBack = (step = 1) => {
    console.log(currentRouterStackIndex, routeStack)
    if (currentRouterStackIndex > 0) {
      currentRouterStackIndex -= step
      activePage.value = routeStack[currentRouterStackIndex]
    } else {
      activePage.value = null
    }
    console.log(currentRouterStackIndex, routeStack)
  }

  const reset = () => {
    currentRouterStackIndex = -1
    routeStack.length = 0
    activePage.value = null
  }

  return {
    pageRouters,
    activePage,
    goPage,
    goBack,
    reset,
  }
})
