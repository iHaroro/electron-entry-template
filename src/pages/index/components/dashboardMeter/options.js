import * as echarts from 'echarts'

const pointer = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAgCAYAAADXEMInAAAAAXNSR0IArs4c6QAAATdJREFUKFM1zE8oRFEUBvDve7MYmrKxspMy5j0lC2sLWwtrC2sLdkhTSlITC1FmMSmKUmoUC0qirFhYSDHvT0pSdlLm3dukuffozZs5q/PrnO8jkhFxQFome8H/7Q3cnu8W8lFjIBrMfrbgRfEo/nJvLbi1+rhQXlNEatJaPKUFkZ6G4UOa8dWsYeauDb1oaK87l7WmwUVaEOhtC5yml0DtGzjHHVRBHHRwJRaVdkbdE9xpt8Uv4mQ222/6QyjrKUL1I8aupJlQNQEuceRZcs2sji2lSLem+ujgyxKrLPiNvEMTWqLEoUCNZYBHULY4HNQnBM4tBGV6gZoCcA5ij24Yz1B4JILDpG2ODsoickLPj4sgSyI4S1ACWRTikl6odyEyL4IbupHeoJVlAarsf5eu7oauCMzCP3wKnzVzytosAAAAAElFTkSuQmCC'

export const getOptions = (value, min, max) => {
  const startAngle = 180 // 起始点角度
  const endAngle = 0 // 结束点角度

  return {
    grid: {
      top: '0%',
      left: '0%',
      right: '0%',
      bottom: '0%',
    },
    series: [
      {
        type: 'gauge',
        radius: '100%',
        splitNumber: 10,
        min,
        max,
        z: 5,
        startAngle,
        endAngle,
        pointer: {
          show: true,
          length: '55%',
          width: 10,
          icon: pointer,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [[1, 'rgba(44, 56, 82, 1)']],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          length: 10,
          distance: -10,
          lineStyle: {
            color: 'rgba(6, 39, 89, 1)',
            width: 3,
          },
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [{ value }],
      },
      {
        name: '',
        type: 'gauge',
        min,
        max,
        z: 6,
        startAngle,
        endAngle,
        radius: '100%',
        splitNumber: 0, // Math.floor(((value / max) * 100) / 10),
        pointer: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 10,
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
          show: true,
          length: 10,
          distance: -10,
          lineStyle: {
            color: 'rgba(6, 39, 89, 1)',
            width: 3,
          },
        },
        splitLine: {
          show: false,
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
        detail: {
          show: false,
        },
        data: [value],
      },
      {
        name: '圆点',
        type: 'gauge',
        min,
        max,
        z: 10,
        startAngle,
        endAngle,
        pointer: {
          // 仪表盘指针。
          icon: 'circle',
          width: 15,
          offsetCenter: [0, -111],
          itemStyle: {
            color: '#ffffff',
          },
        },
        splitLine: {
          // 仪表盘轴线(轮廓线)相关配置。
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          // 刻度标签。
          show: false,
        },
        data: [{ value }],
        detail: {
          show: false,
        },
      },
    ],
  }
}
