import { app, ipcMain } from 'electron'
import { createCustomWindow } from '@electron/utils/createWindow'
import { shipAppEntryPath, shipAppDevPath } from '@/config'

export const initBrowserWindowIpcHandler = () => {
  ipcMain.handle('openNewWindow', (event, {
    url,
    loadOptions = {}
  }) => {
    console.log(url, loadOptions)
    const customWindow = createCustomWindow()
    if (url.startsWith('http')) {
      customWindow.loadURL(url, loadOptions)
    } else {
      customWindow.loadFile(url, loadOptions)
    }
    return customWindow.id
  })
  
  ipcMain.handle('getShipAppConfig', () => {
    return {
      version: app.getVersion(),
      appPath: app.getAppPath(),
      resourcesPath: process.resourcesPath,
      // 当前开发环境还是生产环境
      isPackaged: app.isPackaged,
      // 打包后的应用的入口路径
      shipAppEntryPath,
      // 开发时的web应用地址
      shipAppDevPath
    }
  })
}