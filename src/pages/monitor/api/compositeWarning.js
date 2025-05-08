import request from '@/pages/monitor/utils/request'

// 复合预警分页查询列表
export const getList = (data) => {
  return request({
    url: '/compositeWarning/page',
    method: 'POST',
    data
  })
}

//  复合预警编辑
export const addOrUpdateArea = (data) => {
  return request({
    url: '/compositeWarning/edit',
    method: 'POST',
    data
  })
}

// 复合预警启用/禁用
export const setOpenOrClose = (data) => {
  return request({
    url: '/compositeWarning/openOrClose',
    method: 'POST',
    data
  })
}

//   船舶列表    参数name(非必填) 
export const getShipList = (data) => {
  return request({
    url: '/compositeWarning/shipList',
    method: 'POST',
    data
  })
}


