import * as echarts from 'echarts'

export const legendIcon = 'path://M585.142857 512a73.142857 73.142857 0 1 1-146.285714 0 73.142857 73.142857 0 0 1 146.285714 0z m106.057143 36.571429a182.857143 182.857143 0 0 1-358.4 0H182.857143a36.571429 36.571429 0 0 1 0-73.142858h149.942857a182.857143 182.857143 0 0 1 358.4 0H841.142857a36.571429 36.571429 0 0 1 0 73.142858H691.2z'

export const colorSet = [
  {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    color: 'rgba(21, 176, 255, 1)',
    areaColor: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: 'rgba(21, 176, 255, .2)',
        },
        {
          offset: 1,
          color: 'rgba(21, 176, 255, 0)',
        },
      ],
      false,
    ),
  },
  {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    color: 'rgba(0, 252, 238, 1)',
    areaColor: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: 'rgba(0, 252, 238, .2)',
        },
        {
          offset: 1,
          color: 'rgba(0, 252, 238, 0)',
        },
      ],
      false,
    ),
  },
  {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    color: 'rgba(255, 162, 23, 1)',
    areaColor: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: 'rgba(255, 162, 23, .2)',
        },
        {
          offset: 1,
          color: 'rgba(255, 162, 23, 0)',
        },
      ],
      false,
    ),
  },
  {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    color: 'rgba(112, 204, 14, 1)',
    areaColor: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: 'rgba(112, 204, 14, .2)',
        },
        {
          offset: 1,
          color: 'rgba(112, 204, 14, 0)',
        },
      ],
      false,
    ),
  },
  {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    color: 'rgba(252, 82, 50, 1)',
    areaColor: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: 'rgba(252, 82, 50, .2)',
        },
        {
          offset: 1,
          color: 'rgba(252, 82, 50, 0)',
        },
      ],
      false,
    ),
  },
  {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowBlur: 10,
    color: 'rgba(253, 208, 20, 1)',
    areaColor: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: 'rgba(253, 208, 20, .2)',
        },
        {
          offset: 1,
          color: 'rgba(253, 208, 20, 0)',
        },
      ],
      false,
    ),
  },
]
