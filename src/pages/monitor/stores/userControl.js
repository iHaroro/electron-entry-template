import { ref } from 'vue'
import { getUserInfo } from '@/pages/monitor/api/user.js'
import { defineStore } from 'pinia'

export const useUserControl = defineStore('userControl', () => {
    const userInfo = ref({})
    
    const getUserInfoAction = () => {
      getUserInfo().then(res => {
        if (res.code === '200') {
          userInfo.value = res.data
        }
      })
    }
    
    return {
      userInfo,
      getUserInfoAction
    }
  }
)