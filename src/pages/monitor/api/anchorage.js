import request from '@/pages/monitor/utils/request'

// 锚地分页查询接口
export const getList = (data) => {
  return request({
    url: '/anchorage/page',
    method: 'POST',
    data
  })
}

// 锚地新增编辑接口
export const addOrUpdateArea = (data) => {
  return request({
    url: '/anchorage/addOrEdit',
    method: 'POST',
    data
  })
}

// 锚地详情
export const getDetail = (data) => {
  return request({
    url: '/anchorage/query',
    method: 'POST',
    data
  })
}

// 锚地删除
export const setDelete = (data) => {
  return request({
    url: '/anchorage/delete',
    method: 'POST',
    data
  })
}
