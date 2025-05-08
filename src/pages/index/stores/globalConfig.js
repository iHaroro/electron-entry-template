import { ref } from 'vue'
import { defineStore } from 'pinia'
import { setConfigToApplication } from '@/pages/index/utils/userInfo.js'

const defaultConfig = {
  mmsi: '',
}

export const useGlobalConfigStore = defineStore('loadingControl', () => {
  const config = ref(defaultConfig)

  const setConfig = (params = {}) => {
    config.value = { ...params }
    setConfigToApplication(JSON.stringify(config.value))
  }

  return {
    config,
    setConfig,
  }
})
