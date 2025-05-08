import request from '@/pages/monitor/utils/request'

// 水域分页查询接口
export const getList = (data) => {
  return request({
    url: '/waters/page',
    method: 'POST',
    data
  })
}

// 水域新增编辑接口
export const addOrUpdateArea = (data) => {
  return request({
    url: '/waters/addOrEdit',
    method: 'POST',
    data
  })
}

// 水域详情
export const getDetail = (data) => {
  return request({
    url: '/waters/query',
    method: 'POST',
    data
  })
}

// 水域删除
export const setDelete = (data) => {
  return request({
    url: '/waters/delete',
    method: 'POST',
    data
  })
}
