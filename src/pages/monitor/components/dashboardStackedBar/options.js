export const getOptions = (values) => {
  values = [
    [1, 2, 4, 10, 0, 19, 12], // x天的在线数据集合
    [2, 2, 4, 10, 0, 1, 10], // x天的离线数据集合
    [21, 20, 16, 4, 24, 4, 2] // x天的其他数据集合
  ]
  
  const xAxisData = [
    '2024-01-01',
    '2024-01-02',
    '2024-01-03',
    '2024-01-04',
    '2024-01-05',
    '2024-01-06',
    '2024-01-07'
  ]
  const legendData = [
    '在线',
    '离线',
    '其他'
  ]
  const totalValue = 24
  
  const series = legendData.map((item, index) => {
    return {
      name: item,
      type: 'bar',
      stack: 'total',
      barWidth: 46,
      barGap: 40,
      data: values[index].map((data, dataIndex) => data)
    };
  });
  console.log(series)
  const option = {
    color: ['rgba(0, 169, 255, 1)', 'rgba(253, 106, 94, 1)', 'rgba(130, 145, 169, 1)'],
    grid: {
      top: 100,
      bottom: 20,
      left: 30,
      right: 50
    },
    tooltip: {
      show: true,
      trigger: 'item',
      enterable: true,
      confine: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      renderMode: 'html',
      extraCssText: '',
      padding: [0, 0, 0, 0],
      className: 'line-tooltip-dot-box-style',
      formatter: (params) => {
        const {
          color,
          name,
          seriesName,
          value
        } = params
        const htmlArr = [`<div class="line-tooltip-dot-content"><div class="date">${name}</div>`]
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
        
        htmlArr.push('</div>')
        
        return htmlArr.join('')
      }
    },
    legend: {
      left: 0,
      itemGap: 26,
      itemWidth: 12,
      itemHeight: 12,
      icon: 'rect',
      textStyle: {
        fontSize: 14,
        color: 'rgba(242, 252, 255, 1)'
      },
      data: legendData.map(item => ({
        name: item
      }))
    },
    yAxis: {
      name: '单位：h',
      type: 'value',
      interval: 4,
      min: 0,
      max: 24,
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
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: 'rgba(54, 109, 135, 1)'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(54, 109, 135, 1)'
        }
      },
      axisLabel: {
        fontSize: 12,
        color: 'rgba(221, 240, 246, 1)'
      }
    },
    series
  };
  return option;
}