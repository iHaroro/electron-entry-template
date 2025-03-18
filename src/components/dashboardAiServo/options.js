const imageSrc = `image://data:image/png;base64,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`

export const getOptions = (value, min = -40, max = 40, textStyle = {}) => {
  const colorSet = {
    color: '#ffffff', // 仪表值颜色
  }
  const startAngle = 234 // 起始点角度
  const endAngle = 306 // 结束点角度
  const animationDuration = 0 // 动画时间

  const getColorStart = () => {
    if (value === 0) {
      return [[0, 'transparent']]
    } else if (value > 0) {
      // 右舵
      return [
        [0.5, 'transparent'],
        [Math.abs(value) / 80 + 0.5, 'rgba(16,233,48, 1)'],
      ]
    } else if (value < 0) {
      // 左舵
      return [
        [0.5 - Math.abs(value) / 80, 'transparent'],
        [0.5, 'rgba(233, 16, 16, 1)'],
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
        radius: '95%',
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
        radius: '95%',
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
          formatter: function (value) {
            let text = 0
            if (value !== 0) {
              // 大于0为右舵，小于0为右舵
              text = `${value > 0 ? '右舵' : '左舵'}${Math.abs(value)}°`
            } else {
              text = '0°'
            }

            return `实时舵角：${text}`
          },
          fontFamily: '庞门正道标题体3.0',
          offsetCenter: [0, 150],
          textStyle: {
            padding: [0, 0, 0, 0],
            fontSize: 20,
            fontWeight: 700,
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
          show: false,
          color: 'rgba(255,255,255,1)',
          fontSize: 16,
          distance: 5,
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
          length: '40%',
          width: 70,
          icon: imageSrc,
          itemStyle: {},
        },
        itemStyle: {
          show: false,
          normal: {
            color: '#2e8fff', // 指针颜色
            // color: 'rgba(253, 95, 83, 1)', // 指针颜色
          },
        },
      },
      {
        name: '进度盘',
        type: 'gauge',
        radius: '132',
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
            width: 17,
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
