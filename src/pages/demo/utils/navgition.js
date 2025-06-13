/**
 * @function
 * @description
 * @param {any}
 * @returns {any}
 **/
export const jumpToShipApp = (path) => {
  window.electronAPI.getAppConfig().then(res => {
    if (res.isPackaged) {
      // 打包后
      window.electronAPI.openNewWindow(res.demoAppEntryPath, {
        hash: `/${path}`
      })
    } else {
      // 开发
      window.electronAPI.openNewWindow(`${res.demoAppDevPath}/#/${path}`)
    }
  })
}