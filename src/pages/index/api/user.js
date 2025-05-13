import request from '@/pages/index/utils/request'

// 登录
export const setLogin = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

// 登出
export const setLogout = () => {
  return request({
    url: '/logout',
    method: 'POST'
  })
}