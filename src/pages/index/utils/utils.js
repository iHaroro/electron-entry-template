/**
 * @function dataTypeJudge
 * @description 函数 dataTypeJudge 用于判断输入参数 param 的数据类型
 * @param {any} param 待确认的数据类型
 * @returns {string} 返回数据类型
 **/
export const dataTypeJudge = (param) => {
  switch (typeof param) {
    case 'undefined':
      return 'Undefined'
    case 'string':
      return 'String'
    case 'number':
      return 'Number'
    case 'boolean':
      return 'Boolean'
    case 'object':
      if (param === null) {
        return 'Null'
      } else if (Array.isArray(param)) {
        return 'Array'
      } else {
        return 'Object'
      }
    default:
      return 'Unknown'
  }
}

/**
 * @function isEmpty
 * @description 函数 isEmpty 用于判断输入参数 val 是否为空
 * @param {any} val 待确认是否为空的参数
 * @returns {boolean} 返回是否为空
 **/
export const isEmpty = (val) => {
  if (dataTypeJudge(val) === 'Array' || dataTypeJudge(val) === 'String') return val.length === 0
  if (dataTypeJudge(val) === 'Object') return Object.keys(val).length === 0
  if (dataTypeJudge(val) === 'Null' || dataTypeJudge(val) === 'Undefined') return true
  if (dataTypeJudge(val) === 'Number' && Number.isNaN(val)) return true
  return false
}

/**
 * @function getUrlKey
 * @description 函数 getUrlKey 用于获取 URL 中的参数值
 * @param {string} name 参数名
 * @returns {string|null} 返回参数值
 **/
export const getUrlKey = (name) => {
  // 使用正则表达式从 location.href 中查找参数
  const match = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)
  let val
  if (match) {
    // 对匹配到的参数值进行解码
    val = decodeURIComponent(match[1].replace(/\+/g, '%20'))
  } else {
    // 尝试另一种方式查找
    const parts = location.href.split('/' + name + '/')
    if (parts.length > 1) {
      // 直接获取第一个元素并检查是否为空
      val = parts[1].split('.')[0].split('?')[0].split('/')[0]
      if (isEmpty(val)) {
        val = null
      }
    } else {
      val = null
    }
  }
  return val
}

/**
 * @function getDataFromConstantByValue
 * @description 函数 getDataFromConstantByValue 用于根据常量值获取对应的常量
 * @param {Object} dataObject 常量对象
 * @param {Number|String} value 待获取的值
 * @param {Object} options 配置项
 * @param {String} options.value 常量值的键
 * @returns {Object} 返回对应的常量
 **/
export const getDataByValue = (dataObject, value, options = { value: 'value' }) => {
  return Object.keys(dataObject)
    .map((key) => dataObject[key])
    .find((item) => item[options.value] === value)
}

/**
 * @function calculatePercentage
 * @description 函数 calculatePercentage 用于计算 value 在 min 和 max 之间的百分数
 * @param {number} value 待计算的值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 返回计算的百分数
 **/
export const calculatePercentage = (value, min, max) => {
  return (value - min) / (max - min)
}

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timeout = null
export const debounce = (func, wait = 500, immediate = false) => {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout
    timeout = setTimeout(function () {
      timeout = null
    }, wait)
    if (callNow) typeof func === 'function' && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func()
    }, wait)
  }
}

/**
 * @function objectToQuery
 * @description 简单用于将对象转换为 query 字符串（不做encodeURIComponent操作）
 * @param {object} data 需要转换的数据
 * @returns {string} 返回query数据
 **/
export const objectToQuery = (data) => {
  const keys = Object.keys(data)
  return keys.map((key) => `${key}=${data[key]}`).join('&')
}

/**
 * @function 日志打印
 * @description 打印调试信息
 * @param {object} data 数据
 * @param {string} name 名称
 * @param {object} styles 样式
 **/
export const debugLog = (
  data,
  name = 'DEBUG LOG',
  styles = {
    background: 'red',
  },
) => {
  let stylesStr = ''
  Object.keys(styles).forEach((item) => {
    stylesStr += `${item}:${styles[item]};`
  })
  console.log(`%c${name}`, stylesStr, data)
}

/**
 * @function noop
 * @description 空函数
 * @returns {void}
 **/
export const noop = () => {}

/**
 * @function getValueMapFromMap
 * @description 将Map转为以value为key的Map
 * @param {object} map map对象
 * @returns {object} 返回以value为key的Map对象
 **/
export const getValueMapFromMap = (map) => {
  const fields = Object.keys(map)
  const data = {}
  fields.map((key) => {
    const item = map[key]
    data[item.value] = { key, ...item }
  })
  return data
}

/**
 * @function handlerPromise
 * @description 捕获Promise异常按resolve返回
 * @param {Promise} promise
 * @returns {Promise} 返回Promise
 **/
export const handlerPromise = (promise) =>
  promise.then((data) => [null, data]).catch((err) => [err])

/**
 * 将十进制度数转换为度分秒格式
 * @param {number} decimal 十进制度数值
 * @param {number} [decimalPlaces=0] 秒数保留小数位（默认四舍五入到整数）
 * @returns {string} 度分秒格式字符串
 */
export const decimalToDMS = (decimal, decimalPlaces = 0) => {
  // 获取度数
  const degrees = Math.floor(decimal)
  // 获取小数部分计算分数
  const minutesWithDecimal = (decimal - degrees) * 60
  const minutes = Math.floor(minutesWithDecimal)
  // 计算并四舍五入秒数
  const seconds = (minutesWithDecimal - minutes) * 60
  const roundedSeconds = Number(Math.round(seconds + 'e' + decimalPlaces) + 'e-' + decimalPlaces)

  return `${degrees}°${minutes}'${roundedSeconds.toFixed(decimalPlaces)}"`
}
