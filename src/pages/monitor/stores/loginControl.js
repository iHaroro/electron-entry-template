import { md5 } from 'js-md5'
import { login } from '@/pages/monitor/api/user.js'

const salt = 'djys'

export const useLoginControl = () => {
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
}
