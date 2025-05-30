import { colorEchelon } from '@/pages/monitor/constants/chart'

export const getOptions = (values) => {
  const minRadius = '25%';
  return {
    color: colorEchelon,
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
          data
        } = params
        const htmlArr = [`<div class="line-tooltip-dot-content">`]
        htmlArr.push(`
            <div class="dot-value-box">
              <div class="left-box">
                <div class="dot" style="background-color: ${color};"></div>
                <div class="value">${data.name}</div>
              </div>
              <div class="right-box">
                <div class="value">${data.value}</div>
              </div>
            </div>
          `)
        
        htmlArr.push('</div>')
        
        return htmlArr.join('')
      }
    },
    legend: {
      show: true,
      bottom: 0,
      itemGap: 32,
      itemWidth: 9,
      itemHeight: 9,
      type: 'scroll',
      pageIconColor: '#ffffff',
      pageIconInactiveColor: '#2f4554',
      pageTextStyle: {
        color: '#ffffff'
      },
      textStyle: {
        fontSize: 16,
        color: 'rgba(242, 252, 255, 1)'
      },
      data: values.map(item => ({
        name: item.name,
        icon: 'circle'
      }))
    },
    series: [
      {
        z: 1,
        name: '数据',
        type: 'pie',
        radius: [minRadius, '60%'],
        center: ['50%', '40%'],
        roseType: 'area',
        label: {
          formatter: function (param) {
            return `{percent|${param.percent.toFixed(0)}%}\n{name|${param.name}}`;
          },
          // 自定义富文本样式
          rich: {
            percent: {
              align: 'center',
              padding: [0, 0, 10, 0],
              fontSize: 21,
              fontWeight: 500,
              color: 'rgba(0, 252, 238, 1)'
            },
            name: {
              align: 'center',
              padding: [0, 0, 0, 0],
              fontSize: 16,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 1)'
            }
          }
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 50
        },
        data: values
      },
      {
        z: 10,
        name: '内圈',
        type: 'pie',
        color: ['rgba(0, 0, 0, 0.5)'],
        radius: [minRadius, '30%'],
        center: ['50%', '40%'],
        silent: true,
        label: {
          show: false
        },
        data: [
          {
            name: '',
            value: 0
          }
        ]
      }
    ]
  };
}