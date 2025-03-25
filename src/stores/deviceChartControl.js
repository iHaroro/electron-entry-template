import dayjs from 'dayjs'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getShipEcharts } from '@/api/device.js'

const defaultDeviceChartData = {
  name: '',
  xaxle: new Array(7).fill(0).map((_, index) => {
    return dayjs()
    .subtract(6 - index, 'day')
    .format('YYYY-MM-DD')
  }),
  yaxle: new Array(7).fill(0),
}

/**
 * @constant DEVICE_TYPE
 * @description 查询设备类型
 */
export const DEVICE_TYPE = {
  SERVO_DEVICE: '1',
  ELECTRICS_DEVICE: '2',
  MAIN_DEVICE: '3',
}

/**
 * @constant TIME_TYPE
 * @description 查询时间类型
 */
export const TIME_TYPE = {
  WEEK: '1',
  MONTH: '2',
}

export const useDeviceChartControlStore = defineStore('deviceChartControl', () => {
  let requestParams = ref({
    mmsi: '', // 船舶标识
    name: '', // 设备名称
    type: '', // 设备类型：1舵机2电机3主机
    time: '', // 时间类型：1周，2月
    paramName: '', // 参数字段
    fieldName: '', // 字段名称
  })
  const chartData = ref(defaultDeviceChartData)
  const chartLoading = ref(false)

  const getChartData = (param = {}) => {
    chartLoading.value = true
    setRequestParams(param)
    getShipEcharts({
      mmsi: requestParams.value.mmsi,
      name: requestParams.value.name,
      type: requestParams.value.type,
      time: requestParams.value.time,
      paramName: requestParams.value.paramName,
    }).then((res) => {
      console.log('获取图表数据', res)
      chartLoading.value = false
      chartData.value = res?.data || defaultDeviceChartData
    }).then(() => {
      chartLoading.value = false
    })
  }

  /**
   * @function setRequestParams
   * @description 设置请求参数
   * @param {object} params 要设置的参数
   * @param {boolean} isAssign 是否合并参数
   **/
  const setRequestParams = (params, isAssign = true) => {
    if (!isAssign) {
      Object.keys(requestParams.value).forEach((key) => {
        requestParams.value[key] = ''
      })
    }
    Object.keys(params).forEach((key) => {
      requestParams.value[key] = params[key]
    })
    console.log('更新查询图表参数', requestParams.value)
  }

  return {
    requestParams,
    chartData,
    chartLoading,
    getChartData,
    setRequestParams,
  }
})
