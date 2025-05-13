import request from '@/pages/index/utils/request'

// 监控配置列表查询
export const getShipMonitorConfig = () => {
  return request({
    url: '/decoderList',
    method: 'GET'
  })
}