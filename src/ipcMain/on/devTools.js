import { ipcMain } from 'electron'

/**
 * @function initOpenDevTools
 * @description 打开调试工具
 * @param {BrowserWindow} mainWindow
 **/
export const initOpenDevTools = (mainWindow) => {
  ipcMain.on('openDevTools', (event) => {
    mainWindow.webContents.openDevTools()
  })
}