import request from '@/pages/monitor/utils/request'

// 航行通告分页查询接口
export const getList = (data) => {
  return request({
    url: '/notam/page',
    method: 'POST',
    data
  })
}

// 航行通告新增编辑接口
export const addOrUpdateArea = (data) => {
  return request({
    url: '/notam/addOrEdit',
    method: 'POST',
    data
  })
}

// 航行通告详情
export const getDetail = (data) => {
  return request({
    url: '/notam/query',
    method: 'POST',
    data
  })
}

// 航行通告删除
export const setDelete = (data) => {
  return request({
    url: '/notam/delete',
    method: 'POST',
    data
  })
}
