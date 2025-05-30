import { colorEchelon } from '@/pages/monitor/constants/chart.js'
import * as echarts from 'echarts'
import { hexToRgba } from '@/pages/monitor/utils/utils'

export const getOptions = (dataArr) => {
  const series = getSeries(dataArr)
  const [{ x: xAxisData }] = dataArr
  const legendData = getLegendData(dataArr)
  
  return {
    tooltip: {
      show: true,
      showContent: true,
      trigger: 'axis',
      enterable: true,
      confine: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      renderMode: 'html',
      extraCssText: '',
      className: 'line-tooltip-dot-box-style',
      formatter: (params) => {
        const [{ axisValue }] = params
        const htmlArr = [`<div class="line-tooltip-dot-content"><div class="date">${axisValue}</div>`]
        params.forEach((item, index) => {
          const {
            seriesName,
            value
          } = item
          const { color } = series[index]
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
        
        htmlArr.push('</div>')
        
        return htmlArr.join('')
      }
    },
    legend: {
      show: true,
      bottom: 5,
      itemGap: 32,
      itemWidth: 9,
      itemHeight: 9,
      type: 'scroll',
      icon: 'circle',
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#2f4554',
      pageTextStyle: {
        color: '#ffffff'
      },
      textStyle: {
        fontSize: 16,
        color: 'rgba(242, 252, 255, 1)'
      },
      data: legendData
    },
    grid: {
      top: 40,
      right: 40,
      bottom: 70,
      left: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(54, 109, 135, 1)'
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true
      },
      axisLabel: {
        color: 'rgba(221, 240, 246, 1)',
        fontSize: 10,
        padding: [0, 0, 0, 0]
      }
    },
    yAxis: {
      type: 'value',
      nameGap: 40,
      nameTextStyle: {
        fontSize: 12,
        color: 'rgba(221, 240, 246, 1)'
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        fontSize: 12,
        color: 'rgba(221, 240, 246, 1)'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(54, 109, 135, 1)'
        }
      }
    },
    series
  }
}

function getColorConfig(hexColor) {
  return {
    color: hexToRgba(hexColor, 1),
    shadowColor: hexToRgba(hexColor, 0.1),
    shadowBlur: 10,
    areaColor: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: hexToRgba(hexColor, 0.2)
        },
        {
          offset: 1,
          color: hexToRgba(hexColor, 0)
        }
      ],
      false
    )
  }
}

function getSeries(dataArr) {
  return dataArr.map((item, i) => {
    const colorConfig = getColorConfig(colorEchelon[i])
    return {
      name: item.name,
      data: item.y,
      type: 'line',
      smooth: true,
      color: colorConfig?.color,
      zoomLock: false,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: {
        width: 2
      },
      areaStyle: {
        color: colorConfig?.areaColor,
        shadowColor: colorConfig?.shadowColor,
        shadowBlur: colorConfig?.shadowBlur
      }
    }
  })
}

function getLegendData(dataArr) {
  return dataArr.map((item, i) => {
    const colorConfig = getColorConfig(colorEchelon[i])
    return {
      name: item.name,
      itemStyle: {
        color: colorConfig?.color
      }
    }
  })
}
