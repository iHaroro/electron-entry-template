import request from '@/pages/monitor/utils/request'

// 气象预警通告分页查询接口
export const getList = (data) => {
  return request({
    url: '/meteorologicalWarning/page',
    method: 'POST',
    data
  })
}

// 气象预警通告新增编辑接口
export const addOrUpdateArea = (data) => {
  return request({
    url: '/meteorologicalWarning/addOrEdit',
    method: 'POST',
    data
  })
}

// 气象预警通告详情
export const getDetail = (data) => {
  return request({
    url: '/meteorologicalWarning/query',
    method: 'POST',
    data
  })
}

// 气象预警通告删除
export const setDelete = (data) => {
  return request({
    url: '/meteorologicalWarning/delete',
    method: 'POST',
    data
  })
}
