import request from '@/pages/index/utils/request'

// 获取智能驾驶信息
export const getDrivingCab = (data) => {
  return request({
    url: '/largeScreen/drivingCab',
    method: 'POST',
    data,
  })
}

// 获取智能驾驶海图，雷达数据
export const getShipSrs = (data) => {
  return request({
    url: '/largeScreen/shipSrs',
    method: 'POST',
    data,
  })
}

// 轮询通知设备推流
export const updateShipMap = (data) => {
  return request({
    url: '/mqtt/updateShipMap',
    method: 'POST',
    data,
  })
}


// 获取船舶始发港信息
export const getDest = (data) => {
  return request({
    url: '/largeScreen/getDest',
    method: 'POST',
    data,
  })
}
