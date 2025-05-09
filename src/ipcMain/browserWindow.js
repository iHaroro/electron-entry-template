import { app, ipcMain } from 'electron'
import { createCustomWindow } from '@/utils/createWindow'
import { shipAppEntryPath, shipAppDevPath, shipMonitorAppEntryPath, monitorAppDevPath } from '@/config'

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
    const appConfig = {
      version: app.getVersion(),
      appPath: app.getAppPath(),
      // 应用的资源目录
      resourcesPath: process.resourcesPath,
      // 当前开发环境还是生产环境
      isPackaged: app.isPackaged,
      // 打包后的应用的入口路径
      shipAppEntryPath,
      // 打包后的智能监控应用的入口路径
      shipMonitorAppEntryPath,
      // 开发时船端应用地址
      shipAppDevPath,
      // 开发时智能监控应用地址
      monitorAppDevPath
    }
    
    console.log('app config', appConfig)
    
    return appConfig
  })
}