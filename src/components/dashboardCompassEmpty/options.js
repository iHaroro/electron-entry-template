import * as echarts from 'echarts'
export const getOptions = (value) => {
  const startAngle = 90 // 起始点角度
  const endAngle = -269.9999 // 结束点角度
  const min = 0
  const max = 360

  return {
    series: [
      {
        type: 'gauge',
        radius: '100%',
        splitNumber: 1,
        min,
        max,
        z: 5,
        startAngle,
        endAngle,
        axisLine: {
          show: true,
          lineStyle: {
            width: 12,
            color: [
              [
                (value - min) / (max - min),
                new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(21, 176, 255, .61)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 252, 238, .61)',
                  },
                ]),
              ],
            ],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
      },
      {
        name: '',
        type: 'gauge',
        min,
        max,
        z: 6,
        startAngle,
        endAngle,
        radius: '81%',
        splitNumber: 8,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
          splitNumber: 10,
          length: 5,
          lineStyle: {
            color: 'rgba(0, 191, 194, 1)',
            width: 1,
          },
        },
        splitLine: {
          show: false,
          length: 15,
          lineStyle: {
            color: 'rgba(0, 191, 194, 1)',
            width: 3,
          },
        },
        axisLabel: {
          show: false,
          formatter(e) {
            switch (`${e}`) {
              case '0':
                return 'N'
              case '45':
                return '' // '东北'
              case '90':
                return 'E'
              case '135':
                return '' // '东南'
              case '180':
                return 'S'
              case '225':
                return '' //'西南'
              case '270':
                return 'W'
              case '315':
                return '' // '西北'
              case '360':
                return 'N'
              default:
                return e
            }
          },
          distance: 15,
          textStyle: {
            fontSize: 14,
            color: '#ffffff',
          },
        },
        pointer: {
          show: false,
          length: '45%',
          width: 10,
          itemStyle: {
            color: '#ffffff',
          },
        },
        detail: {
          show: false,
        },
        data: [value],
      },
    ],
  }
}
