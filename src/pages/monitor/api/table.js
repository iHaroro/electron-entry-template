import request from '@/pages/monitor/utils/request'

// MOCK列表数据
export const getTableList = (data) => {
  return request({
    url: '/tableList',
    method: 'POST',
    data
  })
}
