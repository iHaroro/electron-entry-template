import { colorSet, legendIcon } from '@/pages/index/constants/chart.js'
import { fitChartSize } from '@/pages/index/assets/js/dataUtils.js'

export const getOptions = (dataArr) => {
  const lineColor = 'rgba(0, 134, 196, 1)'
  const series = getSeries(dataArr)
  const [{ x: xAxisData }] = dataArr
  const legendData = getLegendData(dataArr)

  return {
    tooltip: {
      show: true,
      showContent: true,
      enterable: true,
      confine: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis',
      renderMode: 'html',
      extraCssText: '',
      className: 'line-tooltip-dot-box-style',
      formatter: (params) => {
        const [{ axisValue }] = params
        const htmlArr = [`<div class="date">${axisValue}</div>`]
        params.forEach((item, index) => {
          const { seriesName, value } = item
          const color = colorSet[index].color
          htmlArr.push(`
            <div class="dot-value-box">
              <div class="left-box">
                <div class="dot" style="background-color: ${color};"></div>
                <div class="value">${seriesName}</div>
              </div>
              <div class="right-box">
                <div class="value">${value}</div>
              </div>
            </div>
          `)
        })

        return htmlArr.join('')
      },
    },
    grid: {
      top: fitChartSize(90),
      right: fitChartSize(20),
      bottom: fitChartSize(20),
      left: fitChartSize(20),
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
        inside: true,
      },
      axisLabel: {
        // interval: 0,
        color: 'rgba(173, 225, 255, 1)',
        fontSize: fitChartSize(10),
        padding: [0, 0, 0, 0],
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(173, 225, 255, 1)',
        fontSize: fitChartSize(10),
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
      show: true,
      data: legendData,
      icon: legendIcon,
      top: fitChartSize(10),
      right: fitChartSize(10),
      itemGap: fitChartSize(15),
      itemHeight: fitChartSize(16),
      itemWidth: fitChartSize(16),
      textStyle: {
        color: 'rgba(221, 240, 246, 1)',
        fontSize: fitChartSize(12),
      },
    },
    series,
  }
}

function getSeries(dataArr) {
  return dataArr.map((item, i) => {
    return {
      name: item.name,
      data: item.y,
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

function getLegendData(dataArr) {
  return dataArr.map((item, i) => {
    console.log(colorSet[i].color)
    return {
      name: item.name,
      itemStyle: {
        color: colorSet[i].color,
      },
    }
  })
}
