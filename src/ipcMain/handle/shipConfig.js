import { app, ipcMain } from 'electron'
import { monitorAppDevPath, shipAppDevPath, shipAppEntryPath, shipMonitorAppEntryPath } from '@/config'

export const initShipConfig = () => {
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
    return appConfig
  })
}