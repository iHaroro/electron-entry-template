import * as echarts from 'echarts'

// const imageSrc = `image://data:image/png;base64,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`

export const getOptions = (value, min = -40, max = 40, textStyle = {}) => {
  const colorSet = {
    color: 'rgba(221, 240, 246, 1)', // 仪表值颜色
  }
  const startAngle = 235 // 起始点角度
  const endAngle = 305 // 结束点角度
  const animationDuration = 0 // 动画时间

  const getColorStart = () => {
    if (value === 0) {
      return [[0, 'transparent']]
    } else if (value > 0) {
      return [
        [0.5, 'transparent'],
        [
          Math.abs(value) / 80 + 0.5,
          'rgba(16, 233, 48, 1)',
          // new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          //   {
          //     offset: 0,
          //     // color: 'rgba(0,191,194,.1)',
          //     color: 'rgba(54, 205, 123,.1)',
          //   },
          //   {
          //     offset: 1,
          //     // color: 'rgba(0,191,194,0.8)',
          //     color: 'rgba(54, 205, 123,0.8)',
          //   },
          // ]),
        ],
      ]
    } else if (value < 0) {
      return [
        [0.5 - Math.abs(value) / 80, 'transparent'],
        [
          0.5,
          'rgba(233, 16, 16, 1)',
          // new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          //   {
          //     offset: 0,
          //     // color: 'rgba(0,191,194,.1)',
          //     color: 'rgba(255, 84, 73,.1)',
          //   },
          //   {
          //     offset: 1,
          //     // color: 'rgba(0,191,194,0.8)',
          //     color: 'rgba(255, 84, 73,0.8)',
          //   },
          // ]),
        ],
      ]
    }
  }

  return {
    grid: {
      top: '0%',
      left: '0%',
      right: '0%',
      bottom: '0%',
    },
    series: [
      {
        name: '最外部进度条',
        type: 'gauge',
        radius: '100%',
        splitNumber: 8,
        animationDuration,
        axisLine: {
          show: false,
          lineStyle: {
            // color: [[1, '#33507A']],
            color: [[1, 'rgba(0,191,194,1)']],
            width: 5,
            // shadowColor: 'rgba(145,207,255,.3)',
            shadowBlur: 5,
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        itemStyle: {
          show: false,
        },
        detail: {
          show: false,
        },
        title: {
          show: false,
        },
        pointer: {
          show: false,
        },
        data: [
          {
            value,
            name: '',
          },
        ],
      },
      {
        name: '外部刻度',
        type: 'gauge',
        radius: '100%',
        min, //最小刻度
        max, //最大刻度
        z: 7,
        splitNumber: 8, //刻度数量
        startAngle, // 起始点角度
        endAngle, // 结束点角度
        animationDuration,
        data: [
          {
            value,
            name: '',
          },
        ],
        detail: {
          show: false,
          formatter: function (value) {
            let text = 0
            if (value !== 0) {
              // 大于0为右舵，小于0为右舵
              text = `${value > 0 ? '右舵' : '左舵'}${Math.abs(value)}°`
            } else {
              text = '正舵0°'
            }

            return `实时舵角：${text}`
          },
          offsetCenter: [0, 180],
          textStyle: {
            padding: [0, 0, 0, 0],
            fontSize: 20,
            fontWeight: 400,
            color: colorSet.color,
            ...textStyle,
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            width: 0,
            color: [
              [0.49, 'rgba(255, 84, 73, 1)'],
              [0.51, 'rgba(244, 232, 42, 1)'],
              [1, 'rgba(54, 205, 123, 1)'],
            ],
          },
        },
        //仪表盘轴线
        axisLabel: {
          show: true,
          fontSize: 20,
          distance: 30,
          color: 'rgba(221, 240, 246, 1)',
          formatter: function (v) {
            switch (`${v}`) {
              case '-40':
                return '40'
              case '-30':
                return '30'
              case '-20':
                return '20'
              case '-10':
                return '10'
              case '0':
                return '0'
              case '10':
                return '10'
              case '20':
                return '20'
              case '30':
                return '30'
              case '40':
                return '40'
            }
          },
        },
        //刻度标签
        axisTick: {
          show: false,
          splitNumber: 10,
          lineStyle: {
            // color: '#42E5FB',
            color: 'auto',
            width: 1,
          },
          length: 5,
        },
        //刻度样式
        splitLine: {
          show: false,
          length: 15,
          lineStyle: {
            // color: '#42E5FB',
            color: 'auto',
          },
        },
        progress: {
          show: false,
        },
        pointer: {
          show: true,
          // width: 100, //指针粗细
          // icon: imageSrc,
          length: '40%',
          width: 5,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                // color: 'rgba(0,191,194,.1)',
                color: 'rgba(4, 254, 248, 1)',
              },
              {
                offset: 1,
                // color: 'rgba(0,191,194,0.8)',
                color: 'rgba(255, 255, 255, 1)',
              },
            ]),
          },
        },
        itemStyle: {
          show: false,
        },
      },
      {
        name: '进度盘',
        type: 'gauge',
        radius: '65%',
        min, //最小刻度
        max, //最大刻度
        z: 6,
        splitNumber: 8, //刻度数量
        startAngle, // 起始点角度
        endAngle, // 结束点角度
        animationDuration,
        data: [
          {
            value,
            name: '',
          },
        ],
        detail: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 30,
            opacity: 1,
            color: [...getColorStart()],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
      },
    ],
  }
}
