import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useExpendedControl = defineStore('dictControl', () => {
  const expended = ref(false)
  
  const toggleExpend = () => {
    expended.value = !expended.value
  }
  
  return {
    expended,
    toggleExpend
  }
})
