export const getColumns = () => {
  return [
    // {
    //   title: '序号',
    //   key: 'index',
    //   width: 236,
    //   align: 'center',
    //   customRender: ({ index }) => {
    //     return index + 1
    //   }
    // },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      align: 'center',
      width: 278
    },
    {
      title: '报警内容',
      dataIndex: 'message',
      align: 'center'
    },
    {
      title: '报警时间',
      dataIndex: 'createTime',
      align: 'center',
      width: 278
    }
  ]
}
