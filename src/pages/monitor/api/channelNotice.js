import request from '@/pages/monitor/utils/request'

// 航道通知分页查询接口
export const getList = (data) => {
  return request({
    url: '/channelNotice/page',
    method: 'POST',
    data
  })
}

// 航道通知新增编辑接口
export const addOrUpdateArea = (data) => {
  return request({
    url: '/channelNotice/addOrEdit',
    method: 'POST',
    data
  })
}

// 航道通知删除
export const setDelete = (data) => {
  return request({
    url: '/channelNotice/delete',
    method: 'POST',
    data
  })
}
