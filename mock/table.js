import mockjs from 'mockjs'
const { mock } = mockjs

export default [
  {
    url: '/djysConfig/tableList',
    method: 'post',
    response: ({ body }) => {

      return mock({
        code: '200',
        message: 'success',
        data: {
          'list|20': [{
            'id|+1': 1,
            'name': body.name
                    ? `${body.name}-@cword(5,10)`
                    : '@cword(5,10)',
            'level|1': ['1', '2', '3'],
            'type|1': ['1', '2', '3'],
            'alarmType|1': ['1', '2'],
            'shipName': '@cword(4)',
            'date': '@datetime',
            'isOpen|1': ['0', '1'],
            'phone': /^1[385][1-9]\d{8}/,
            'areaList|10': [{
              lat: '28.88',
              lng: '116.39'
            }]
          }],
          'pageNum': body.pageNum,
          'pageSize': body.pageSize,
          'total|100-1000': 100
        }
      })
    }
  }
]
