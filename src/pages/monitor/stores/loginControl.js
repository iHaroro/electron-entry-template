import { md5 } from 'js-md5'
import { login } from '@/pages/monitor/api/user.js'
import { defineStore } from 'pinia'

const salt = 'djys'

export const useLoginControl = defineStore('loginControl', () => {
  const loginAction = ({
    userAccount,
    password
  }) => {
    return login({
      userAccount,
      password: md5(salt + password)
    })
  }
  
  return {
    loginAction
  }
})