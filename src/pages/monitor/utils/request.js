import axios from 'axios'
import { message } from 'ant-design-vue'
import { getTokenFormApplication, cleanTokenFromApplication } from '@/pages/monitor/utils/userInfo'
// import { useLoadingStore } from '@/pages/monitor/stores/loadingControl.js'

// const loadingControl = useLoadingStore()
// const { showLoading, hideLoading } = loadingControl
// const hideDelay = 500

// 请求实例
const service = axios.create({
  baseURL: import.meta.env.VITE_MONITOR_BASE_URL, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;'
  }
})

// 请求 拦截器
service.interceptors.request.use(
  async (config) => {
    // showLoading()
    config.headers['token'] = `${getTokenFormApplication()}`
    commonParamsAssignHandler(config)
    return config
  },
  (error) => {
    // setTimeout(hideLoading, hideDelay)
    return Promise.reject(error)
  }
)

// 响应 拦截器
service.interceptors.response.use(
  async (response) => {
    const res = response.data
    // setTimeout(hideLoading, hideDelay)
    // 常规业务状态码判断
    let successFlag = isRequestSuccess(res)
    if (successFlag) {
      // 业务成功
      return res
    } else {
      // 业务失败 Business Error
      return handlerBusinessError(response)
    }
  },
  (error) => {
    // setTimeout(hideLoading, hideDelay)
    return Promise.reject(error)
  }
)

/**
 * @function 处理业务请求通用参数 TODO：尽量不要修改入参，改为拷贝 -> 处理 -> 返回
 * @description 包扩通用参数、验签等
 * @param {object} config axios配置
 **/
const commonParamsAssignHandler = (config) => {
  config.data = config.data || {}
  config.params = config.params || {}
  // 请求公共参数...
  // ...
}

/**
 * @function 响应数据处理
 * @param {any} res 响应数据
 * @returns {boolean} 业务请求是否成功，根据后端code判断，true：成功，false：失败
 **/
const isRequestSuccess = (res = { errorMsg: undefined }) => {
  let successCodes = ['200'] // 响应编码，200为正常，其他均为异常状态。注意和http返回编码区分。
  return successCodes.includes(res.code)
}

/**
 * @function 处理异常集合
 * @param {Object} response axios 完整响应
 * @returns {Promise} 返回请求service or 异常reject
 **/
const handlerBusinessError = async (response) => {
  let {
    data: { code }
  } = response
  switch (code) {
    // case '403': // token失效
    //   cleanTokenFromApplication()
    //   message.error('登录失效，请重新登录')
    //   location.replace('/login')
    //   return Promise.reject()
    default:
      return Promise.reject(response.data)
  }
}

export default service
