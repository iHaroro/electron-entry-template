/**
 * @function
 * @description
 * @param {any}
 * @returns {any}
 **/
export const jumpToShipApp = (path) => {
  window.electronAPI.getShipAppConfig().then(res => {
    if (res.isPackaged) {
      // 打包后
      window.electronAPI.openNewWindow(res.shipMonitorAppEntryPath, {
        hash: `/${path}`
      })
    } else {
      // 开发
      window.electronAPI.openNewWindow(`${res.monitorAppDevPath}/#/${path}`)
    }
  })
}