import { initOpenDevTools } from './on/devTools.js'

/**
 * @function initIpcOns
 * @description 初始化浏览器窗口的 IPC 通信
 * @param {BrowserWindow} mainWindow
 **/
export const initIpcOns = (mainWindow) => {
  initOpenDevTools(mainWindow)
}

