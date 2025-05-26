import request from '@/pages/monitor/utils/request'

// 危险码头分页查询接口
export const getList = (data) => {
  return request({
    url: '/wharf/page',
    method: 'POST',
    data
  })
}

// 危险码头新增编辑接口
export const addOrUpdateArea = (data) => {
  return request({
    url: '/wharf/addOrEdit',
    method: 'POST',
    data
  })
}

// 危险码头详情
export const getDetail = (data) => {
  return request({
    url: '/wharf/query',
    method: 'POST',
    data
  })
}

// 危险码头删除
export const setDelete = (data) => {
  return request({
    url: '/wharf/delete',
    method: 'POST',
    data
  })
}
