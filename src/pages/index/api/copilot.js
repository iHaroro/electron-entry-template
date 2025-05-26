import request from '@/pages/index/utils/request'

// 获取智能驾驶信息
export const getDrivingCab = (data) => {
  return request({
    url: '/cabinInfo',
    method: 'GET',
    data,
  })
}

// 获取智能驾驶海图，雷达数据
export const getShipSrs = (data) => {
  return request({
    url: '/radarMarineInfo',
    method: 'GET',
    data,
  })
}

// 获取船舶始发港信息
export const getDest = (data) => {
  return request({
    url: '/coscoInfo',
    method: 'GET',
    data,
  })
}
