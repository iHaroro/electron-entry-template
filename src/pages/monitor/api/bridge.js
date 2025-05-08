import request from '@/pages/monitor/utils/request'

// 桥区分页查询接口
export const getList = (data) => {
  return request({
    url: '/bridge/page',
    method: 'POST',
    data
  })
}

// 桥区新增编辑接口
export const addOrUpdateArea = (data) => {
  return request({
    url: '/bridge/addOrEdit',
    method: 'POST',
    data
  })
}

// 桥区详情
export const getDetail = (data) => {
  return request({
    url: '/bridge/query',
    method: 'POST',
    data
  })
}

// 桥区删除
export const setDelete = (data) => {
  return request({
    url: '/bridge/delete',
    method: 'POST',
    data
  })
}
