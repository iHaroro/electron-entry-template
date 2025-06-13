/**
 * @function shipAppLogout
 * @description 发送船端工具退出登录事件
 * @param {object} mainWindow
 **/
export const shipAppLogout = (mainWindow) => {
  mainWindow.webContents.send('logout')
}