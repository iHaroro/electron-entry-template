/**
 * @function getBrowserLocation
 * @description 获取浏览器定位
 * @returns {Promise} 定位回调
 **/
export const getBrowserLocation = () => {
  // 获取浏览器定位经纬度
  return new Promise((resolve, reject) => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position)
          },
          (error) => {
            let message = ''
            switch (error.code) {
              case error.PERMISSION_DENIED:
                message = '用户拒绝对获取地理位置的请求'
                break
              case error.POSITION_UNAVAILABLE:
                message = '位置信息是不可用的'
                break
              case error.TIMEOUT:
                message = '请求用户地理位置超时'
                break
              case error.UNKNOWN_ERROR:
                message = '未知错误'
                break
              default:
                message = error.mesaage
            }
            console.log('调用回调失败')
            reject(message)
          },
        )
      } else {
        console.log('浏览器不支持地理定位')
        reject('浏览器不支持地理定位')
      }
    } catch (err) {
      console.log('调用定位失败', err)
      reject('调用定位失败')
    }
  })
}
