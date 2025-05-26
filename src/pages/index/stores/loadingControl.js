import { ref } from 'vue'
import { defineStore } from 'pinia'

const defaultOptions = {
  delay: 0,
  tip: '',
  size: 'large',
  indicator: '',
  wrapperClassName: 'boat-custom-loading',
}

export const useLoadingStore = defineStore('loadingControl', () => {
  const options = ref(defaultOptions)
  const isLoading = ref(false)

  const showLoading = (options = {}) => {
    options.value = { ...defaultOptions, ...options }
    isLoading.value = true
  }

  const hideLoading = () => {
    isLoading.value = false
  }

  return {
    options,
    isLoading,
    showLoading,
    hideLoading,
  }
})
