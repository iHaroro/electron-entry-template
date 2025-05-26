export const getColumns = () => {
  return [
    {
      title: '序号',
      key: 'index',
      width: 236,
      align: 'center',
      customRender: ({ index }) => {
        return index + 1
      },
    },
    {
      title: '船名',
      dataIndex: 'shipName',
      align: 'center',
      width: 240,
    },
    {
      title: '设备名称',
      dataIndex: 'cameraName',
      align: 'center',
      width: 278,
    },
    {
      title: '报警时间',
      dataIndex: 'alarmTime',
      align: 'center',
      width: 278,
    },
    {
      title: '报警内容',
      dataIndex: 'alarmTypeTxt',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 200,
    },
  ]
}
