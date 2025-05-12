import request from '@/pages/index/utils/request'
// import deviceData from '@/data/device.json'

// 获取船舶信息
export const getShipList = () => {
  return request({
    url: '/largeScreen/shipList',
    method: 'POST'
  })
}

// 获取设备信息
// export const getShipDevice = (data) => {
//   return request({
//     url: '/largeScreen/shipDevice',
//     method: 'POST',
//     data
//   })
// }

// 获取设备信息
export const getShipDevice = () => {
  return request({
    url: '/shipDevice',
    method: 'GET'
  })
}

// 获取设备参数数据折线图
export const getShipEcharts = (data) => {
  return request({
    url: '/largeScreen/shipEcharts',
    method: 'POST',
    data
  })
}

// 获取设备报警
export const getShipAlarm = (data) => {
  return request({
    url: '/largeScreen/shipAlarm',
    method: 'POST',
    data
  })
}

// 设备告警事件列表
export const getDeviceAlarmList = (params, data) => {
  return request({
    url: '/alarmList',
    method: 'POST',
    params,
    data
  })
}
