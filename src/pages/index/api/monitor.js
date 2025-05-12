import request from '@/pages/index/utils/request'

// 更新萤石云api鉴权access Token
export const updateMonitorToken = () => {
  return request({
    url: '/largeScreen/updateMonitorToken',
    method: 'POST'
  })
}

// 监控配置列表查询
// export const getShipMonitorConfig = (data) => {
//   return request({
//     url: '/largeScreen/shipMonitor',
//     method: 'POST',
//     data,
//   })
// }

// 监控配置列表查询
export const getShipMonitorConfig = () => {
  return request({
    url: '/decoderList',
    method: 'GET'
  })
}

// 告警事件分页列表
export const getShipMonitorAlarm = (data) => {
  return request({
    url: '/largeScreen/monitorAlarm',
    method: 'POST',
    data
  })
}

// 告警事件趋势图
export const getShipMonitorAlarmEcharts = (data) => {
  return request({
    url: '/largeScreen/monitorAlarmEcharts',
    method: 'POST',
    data
  })
}

// 告警事件已读
export const setAlarmRead = (data) => {
  return request({
    url: '/largeScreen/alarmRead',
    method: 'POST',
    data
  })
}

// 监控告警事件列表
export const getMonitorAlarmList = (data) => {
  return request({
    url: '/alarm/monitorAlarmList',
    method: 'POST',
    data
  })
}
