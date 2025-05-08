export const getOptions = (values) => {
  const minRadius = '30%';
  const option = {
    color: ['#1890FF', '#12DDA1', '#F78048', '#FFB026', '#FD4D63', 'rgba(255,255,255,.5)'],
    tooltip: {
      trigger: 'item',
      padding: [10, 10, 10, 10],
      formatter: '{b} :<br/> {d}%'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: [minRadius, '80%'],
        center: ['50%', '50%'],
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
        data: [
          {
            name: '运转',
            value: '40'
          },
          {
            name: '停机',
            value: '25'
          },
          {
            name: '故障',
            value: '18'
          },
          {
            name: '其他',
            value: '12'
          }
        ]
      },
      {
        type: 'pie',
        radius: [minRadius, '36%'],
        center: ['50%', '50%'],
        silent: true,
        data: [
          {
            name: '',
            value: 0
          }
        ]
      }
    ]
  };
  return option;
}