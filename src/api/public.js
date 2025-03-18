import request from '@/utils/request'

// 获取字典
export const getDictName = data => {
  return request({
    url: '/dict/getName',
    method: 'POST',
    data,
  })
}
