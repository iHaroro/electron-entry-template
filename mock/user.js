import mockjs from 'mockjs'
const { mock } = mockjs

export default [
  {
    url: '/djysConfig/user/login',
    method: 'post',
    response: () => {
      return mock({
        code: '200',
        message: 'success',
        data: '@guid'
      })
    }
  }
]
