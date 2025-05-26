export const getOptions = () => {
  let projectItem = ['运转', '停机', '故障', '其他'],
    projectItemStart = ['2022-01-01', '2022-01-03', '2022-01-10', '2022-01-16'],
    projectItemEnd = ['2022-01-02', '2022-01-12', '2022-01-16', '2022-01-19'];
  
  let projectItemStartValue = projectItemStart.map((item) => {
    return new Date(item).valueOf();
  });
  let projectItemDuringValue = projectItemEnd.map((item, i) => {
    return new Date(item).valueOf() - projectItemStartValue[i];
  });
  let dateMin = projectItemStartValue.sort()[0];
  
  return {
    tooltip: {
      show: true,
      enterable: true,
      alwaysShowContent: true,
      triggerOn: 'mousemove',
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      renderMode: 'html',
      extraCssText: '',
      className: 'line-tooltip-dot-box-style',
      formatter: function (params) {
        const tar = params[1];
        return `${tar.name} <br/> ${tar.seriesName} : ${tar.value / (1000 * 60 * 60 * 24)}天`;
      }
    },
    grid: {
      top: '5%',
      right: '5%',
      bottom: '5%',
      left: '5%',
      containLabel: true
    },
    yAxis: {
      type: 'category',
      data: projectItem,
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    xAxis: {
      type: 'value',
      min: dateMin,
      axisLabel: {
        formatter: function (param) {
          console.log(param);
          let date = new Date(param);
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true
      },
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: projectItemStartValue
      },
      {
        name: '周期',
        type: 'bar',
        stack: 'Total',
        data: projectItemDuringValue
      }
    ]
  };
}