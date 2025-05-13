import request from '@/pages/index/utils/request'

// 登录
export const phoneLogin = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data,
  })
}