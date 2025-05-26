import request from '@/pages/index/utils/request'

// 获取字典
export const getDictName = (data) => {
  return request({
    url: '/dict',
    method: 'GET',
    data,
  })
}
