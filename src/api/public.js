import request from '@/utils/request'

// 获取字典
export const getDictName = (data) => {
  return request({
    url: '/dict/getName',
    method: 'POST',
    data,
  })
}

// 获取船端配置
export const getGlobalConfig = () => {
  // return request({
  //   url: '/config',
  //   method: 'POST',
  // })
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          mmsi: '413569570',
        },
      })
    }, 800)
  })
}
