import request from '@/pages/monitor/utils/request.js'

// 获取字典
export const getDict = (data) => {
  return request({
    url: '/dict/getName',
    method: 'post',
    data
  })
}
