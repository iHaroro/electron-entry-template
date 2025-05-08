import { ref } from 'vue'
import { getUserInfo } from '@/pages/monitor/api/user.js'

export const useUserControl = () => {
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
