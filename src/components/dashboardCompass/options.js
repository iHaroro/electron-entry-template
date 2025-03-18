import * as echarts from 'echarts'
const imageSrc = `image://data:image/png;base64,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`

export const getOptions = (value) => {
  return {
    series: [
      {
        type: 'gauge',
        radius: '95%',
        splitNumber: 1,
        min: 0,
        max: 360,
        z: 5,
        startAngle: 90,
        endAngle: -269.9999,
        axisLine: {
          show: false,
          lineStyle: {
            color: [[1, 'rgba(0,191,194,1)']],
            width: 3,
            shadowBlur: 5,
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
        min: 0,
        max: 360,
        z: 6,
        startAngle: 90,
        endAngle: -269.9999,
        radius: '103%',
        splitNumber: 8,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
          splitNumber: 10,
          length: 8,
          lineStyle: {
            color: 'rgba(0, 191, 194, 1)',
            width: 1,
          },
        },
        splitLine: {
          show: false,
          length: 20,
          lineStyle: {
            color: 'rgba(0, 191, 194, 1)',
            width: 5,
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
            fontSize: 20,
            color: '#ffffff',
          },
        },
        pointer: {
          show: true,
          length: '55%',
          width: 80,
          icon: imageSrc,
          itemStyle: {},
        },
        detail: {
          show: false,
        },
        data: [value],
      },
    ],
  }
}
