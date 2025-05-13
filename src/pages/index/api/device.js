import request from '@/pages/index/utils/request'

// 获取设备信息
export const getShipDevice = () => {
  return request({
    url: '/shipDevice',
    method: 'GET'
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

// 导出设备告警事件列表
export const getDeviceAlarmExportList = (data) => {
  return request({
    url: '/export',
    method: 'POST',
    data,
    responseType: 'blob',
  })
}
