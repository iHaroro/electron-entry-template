import { initOpenNewWindow } from './handle/openWindow.js'
import { initShipConfig } from '@/ipcMain/handle/shipConfig'

/**
 * @function initIpcHandles
 * @description 初始化浏览器窗口的 IPC 通信
 * @param {BrowserWindow} mainWindow
 **/
export const initIpcHandles = (mainWindow) => {
  // 打开新窗口
  initOpenNewWindow()
  // 获取化船配置
  initShipConfig()
}
