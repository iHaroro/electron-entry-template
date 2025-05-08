import request from '@/pages/index/utils/request'

// 手机号+验证码登录
export const phoneLogin = (data) => {
  return request({
    url: '/user/phoneLogin',
    method: 'POST',
    data,
  })
}

//  获取手机验证码
export const getPhoneCode = (data) => {
  return request({
    url: '/user/getPhoneCode',
    method: 'POST',
    data,
  })
}
