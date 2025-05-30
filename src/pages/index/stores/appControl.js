import { defineStore } from 'pinia'
import { setLogout } from '@/pages/index/api/user'
import { nextTick } from 'vue'
import { cleanTokenFromApplication } from '@/pages/index/utils/userInfo'
import { getCurrentPagePath } from '@/pages/index/utils/utils'

export const useAppControlStore = defineStore('deviceChartControl', () => {
  const logout = () => {
    setLogout()
    nextTick(() => {
      cleanTokenFromApplication()
      const pagePath = getCurrentPagePath()
      location.replace(`${pagePath}#/login`)
    })
  }
  
  return {
    logout
  }
})
