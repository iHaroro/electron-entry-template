import * as echarts from 'echarts'

const imageSrc = `image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAABWCAYAAAADgIyBAAAAAXNSR0IArs4c6QAABB1JREFUSEtt1nuIFVUcwPHvb+aM7uYj58zukpI9BC170kuwsicZBkZYKGQlPVB6YJlQYRqVlfQg6UEvwcKIIgsh0TZSlCxNtBTMVyYuWfho79w1RXfvnbmn5nH3zuzO+e/ez/zO+f3OmfO7V8gOYyxEavWvJI/H25AhR4ux++hoBrbur0fnIytHLsWR/UjbiSg6j9XSeE717GPoiM4C7LqZariX07y/+mPgTyYIdtPU9kcBlqZhy05E/1aA5fuxZQcybGt/rHQ+hmNtR/SPBQn5T4H1K86wNf0xLD+HCbahWlcWoP8qxmxFecuLSnkXaptRLZ8WlbIU2ITylhThF4j1E7b7TtG03yBswNavF23CGoT12O5LRZEbMazD0c8WlbIdZC22O7doE37HmO9R+tGibP8Gqx3lPli0ZhlYjdLTi7AHzCqUNyWPxtiE5QDMtyjvtj5YGkoox9JSbsrjiaNn0KQOYcwmHO/qPHYfGYVy9iNsw9aX57HHvwibHQi7sfUFfdbsHEdobUY4gK1H5bFavgEx6xAOYesReQz8KP1VQBdKu32w6y6oLQfTjfKa+2DnDLA+AQxKW3ms+A9j8V58cW23CZGexhWsluYi8kaC4iJuVwPD8nyMWRhjdzCcwW2HM5H+IoRnYqz2nEvz8I7stG8hMjvGsDaWgS17GhiUloA8lK55GeJuz6D/GXB3gmY84v2cxRXAHTEauRHHXZ/F74CJCZpJOF57FjcA18ZIbQqqZUW2zl8wJj7keG2lP8+WsgeR8xIzD6C8j7PT/gmMTGblEQbo97MYtTQvRpEnsd3FWTwJxOeIMA9bL0rQGCEsh72NUuQFbPf5FA8PIhwQt9Hk4dprOC1PJ3j8UCvNA3s7NGLexvYeT/BU+Wwc09EbCR+h9Kx02s6xhNauDC5D6Rkpdl1BWIs7ZTq+ROlpCVb9CQg/ZHAlSt+e4rFbkbC9gVFf8CYmGHROAevrRilswNHX1fEesOJmmG7KFhxvXIr+TODDXhR2YOtLEqyUnsCSxQ2UfdjumARDfx6GlzORB7H1WSmWF2LM/Ewp/6B0W1pK6U1E5mRKOYHyhtQT+gCYlYkMUNqp4zLg3gxG11ClWP4KzJ15rAyuR64GJuXwZHdrPXI9mOtzWDEj69luQeTKHAbB6DruRCTuWr0j5OL6mgeAc/IJWVelWDoC0pZHJtQjjwODc2isW+oYvdBxY8qMyYI50ER4+qk+EL3ZUwVzTBOGpf5Yu08wpTMJ5WBB5EzB/DuGMNjbD2u12VHkhYQS/y/IDZE5El+/wN+FyPkNlACbdPsq/iwsogNPhyxHuVPTu3KwmXBQ1BNaYq2Z8QzIdrCw/CLGLPi/UW1E6WuiZxo9IflF6gAzHeXFV6OB0adqaQFq7SvI1Gg7+Q+M3aecOjZ1KAAAAABJRU5ErkJggg==`

/**
 * @function getOptions
 * @description 获取仪表配置
 * @param {string} value 仪表值
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @param {string} type 仪表类型
 * @returns {object} config
 **/
export const getOptions = (value, min = 0, max = 100, type = 'normal') => {
  const startAngle = 240
  const endAngle = -59

  const colorSet = {
    color: '#ffffff', // 仪表值颜色
  }

  let count = 0

  const config = {
    normal: {
      bgColor: 'rgba(18, 66, 110, 1)',
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgba(0, 216, 251, 1)',
        },
        {
          offset: 1 / 3,
          color: 'rgba(0, 158, 248, 1)',
        },
        {
          offset: 2 / 3,
          color: 'rgba(0, 111, 236, 1)',
        },
        {
          offset: 1,
          color: 'rgba(0, 93, 255, 1)',
        },
      ]),
    },
    main: {
      bgColor: 'rgba(1, 82, 114, 1)',
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgba(2, 237, 233, 1)',
        },
        {
          offset: 1 / 3,
          color: 'rgba(218, 246, 112, 1)',
        },
        {
          offset: 2 / 3,
          color: 'rgba(255, 146, 0, 1)',
        },
        {
          offset: 1,
          color: 'rgba(251, 38, 38, 1)',
        },
      ]),
    },
  }[type]

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
        radius: '99%',
        splitNumber: 10,
        startAngle, // 起始点角度
        endAngle, // 结束点角度
        axisLine: {
          show: true,
          lineStyle: {
            width: 20,
            // color: config.color,
            color: [
              [0, 'transparent'],
              [1, config.color],
            ],
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
            name: 'title',
            value: value,
          },
        ],
        animationDuration: 1000,
      },
      {
        name: '内部进度条',
        type: 'gauge',
        radius: '100%',
        z: 4,
        min,
        max,
        // 刻度
        splitNumber: 10,
        startAngle, // 起始点角度
        endAngle, // 结束点角度
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          distance: 50,
          formatter(v) {
            // 刻度值
            count++
            return count % 2 === 1 ? v : ''
          },
          color: 'rgba(255, 255, 255, 1)',
          fontSize: 30,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        detail: {
          show: false,
          formatter: (v) => v, // 仪表值
          offsetCenter: [0, 65],
          textStyle: {
            padding: [0, 0, 0, 0],
            fontSize: 20,
            fontWeight: 700,
            color: colorSet.color,
          },
        },
        title: {
          show: false,
        },
        data: [
          {
            name: '指针',
            value,
          },
        ],
        itemStyle: {
          show: false,
        },
        pointer: {
          show: true,
          icon: imageSrc,
          width: 4, //指针粗细
          length: '66%',
          radius: '20%',
        },
        animationDuration: 1000,
      },
      {
        name: '外部刻度',
        type: 'gauge',
        radius: '99.5%',
        min, //最小刻度
        max, //最大刻度
        z: 6,
        splitNumber: 10,
        startAngle, // 起始点角度
        endAngle, // 结束点角度
        axisLine: {
          show: true,
          lineStyle: {
            width: 23,
            color: [
              [(value - min) / (max - min), 'transparent'],
              [1, config.bgColor],
            ],
            // color: [[(value - min) / (max - min), config.color]],
          },
        },
        //仪表盘轴线
        axisLabel: {
          show: false,
        },
        //刻度标签
        axisTick: {
          show: false,
        },
        //刻度样式
        splitLine: {
          show: false,
        },
        //分隔线样式
        detail: {
          show: false,
        },
        pointer: {
          show: true,
        },
      },
    ],
  }
}
