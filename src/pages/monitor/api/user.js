import request from '@/pages/monitor/utils/request'

// 账号密码登录
export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  })
}

// 获取用户数据
export const getUserInfo = (data) => {
  return request({
    url: '/user/getUserInfo',
    method: 'POST',
    data,
  })
}
