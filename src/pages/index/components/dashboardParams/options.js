import { fitChartSize } from '@/pages/index/assets/js/dataUtils.js'
import { colorSet } from '@/pages/index/constants/chart.js'

export const getOptions = (data) => {
  const lineColor = 'rgba(0, 134, 196, 1)'
  const series = getSeries([
    {
      name: data.name,
      data: data.yaxle,
    },
  ])
  const xAxisData = data.xaxle
  const legendData = [data.name]

  return {
    title: {
      show: false,
    },
    tooltip: {
      show: true,
      enterable: true,
      alwaysShowContent: true,
      triggerOn: 'mousemove',
      trigger: 'axis',
      renderMode: 'html',
      extraCssText: '',
      className: 'line-tooltip-style',
      formatter: '<div class="date">{b0}</div><div class="value">{a0} {c0}</div>',
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: lineColor,
        },
      },
      axisTick: {
        show: true,
        inside: true,
        lineStyle: {
          color: lineColor,
        },
      },
      axisLabel: {
        // interval: 0,
        color: 'rgba(173, 225, 255, 1)',
        fontSize: fitChartSize(12),
        padding: [0, 0, 0, 0],
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(173, 225, 255, 1)',
        fontSize: fitChartSize(12),
        padding: [0, 0, 0, 0],
      },
      splitLine: {
        lineStyle: {
          color: lineColor,
          type: 'solid',
        },
      },
    },
    legend: {
      show: false,
      data: legendData,
      icon: 'circle',
      top: '85%',
      left: fitChartSize(25),
      itemGap: fitChartSize(30),
      itemHeight: fitChartSize(8),
      itemWidth: fitChartSize(8),
      textStyle: {
        color: '#ffffff',
        fontSize: fitChartSize(14),
      },
    },
    series,
  }
}

function getSeries(list) {
  return list.map((item, i) => {
    return {
      name: item.name,
      data: item.data,
      type: 'line',
      smooth: true,
      lineStyle: {
        width: fitChartSize(2),
      },
      color: colorSet[i].color,
      areaStyle: {
        color: colorSet[i].areaColor,
        shadowColor: colorSet[i].shadowColor,
        shadowBlur: colorSet[i].shadowBlur,
      },
      zoomLock: false,
      symbol: 'circle',
      symbolSize: fitChartSize(10),
    }
  })
}

// function getXAxisData(series) {
//   return series[0].data.map((item, i) => dayjs().add(i, 'day').format('MM-DD'))
// }
//
// function getLegendData(series) {
//   return series.map((item) => item.name)
// }
